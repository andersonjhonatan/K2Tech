"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Efeitos da página: revela blocos ao rolar ([data-rv]), luz que segue o mouse nos cartões
 * ([data-spot]) e o botão de pular a abertura. Sem JavaScript, tudo aparece normalmente.
 */
export function PageFx() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("kl-anim");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("kl-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-rv]").forEach((n) => io.observe(n));

    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    // abertura: some sozinha; o botão "pular" encerra na hora
    const intro = document.getElementById("kl-intro");
    const end = () => intro?.classList.add("kl-gone");
    const skip = document.getElementById("kl-skip");
    skip?.addEventListener("click", end);
    const timer = window.setTimeout(end, 3600);

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
      skip?.removeEventListener("click", end);
      window.clearTimeout(timer);
    };
  }, []);
  return null;
}

/** "Um dia na loja": o celular/painel troca de tela conforme o passo que está no meio da tela. */
export function DayStory({
  steps,
  screens,
  classes,
}: {
  steps: { hora: string; titulo: string; texto: string }[];
  screens: React.ReactNode[];
  classes: Record<string, string>;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-62% 0px -30% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className={classes.day}>
      <div className={classes.dayStage}>
        <div className={classes.dayDevice}>
          <div className={classes.dayNotch} />
          {screens.map((s, i) => (
            <div key={i} className={`${classes.dayScreen} ${i === active ? classes.dayOn : ""}`} aria-hidden={i !== active}>
              {s}
            </div>
          ))}
        </div>
        <div className={classes.dayClock} aria-live="polite">
          {steps[active].hora}
        </div>
      </div>
      <ol className={classes.daySteps}>
        {steps.map((s, i) => (
          <li
            key={s.hora}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={i === active ? classes.stepOn : i < active ? classes.stepDone : ""}
          >
            <span className={classes.stepHora}>{s.hora}</span>
            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Antes e depois: arraste para trocar o caderno pelo crediário do KLOJA. */
export function CadernoSlider({ before, after, classes }: { before: React.ReactNode; after: React.ReactNode; classes: Record<string, string> }) {
  const [v, setV] = useState(52);
  return (
    <div className={classes.cmp} style={{ ["--cut" as string]: `${v}%` }}>
      <div className={classes.cmpAfter}>{after}</div>
      <div className={classes.cmpBefore}>{before}</div>
      <div className={classes.cmpHandle} aria-hidden="true">
        <span>⇆</span>
      </div>
      <label className={classes.cmpLabel}>
        <span className={classes.srOnly}>Arraste para comparar o caderno com o KLOJA</span>
        <input id="kl-cmp" type="range" min={4} max={96} value={v} onChange={(e) => setV(Number(e.target.value))} />
      </label>
      <span className={`${classes.cmpTag} ${classes.cmpTagL}`}>Antes: caderno</span>
      <span className={`${classes.cmpTag} ${classes.cmpTagR}`}>Depois: KLOJA</span>
    </div>
  );
}
