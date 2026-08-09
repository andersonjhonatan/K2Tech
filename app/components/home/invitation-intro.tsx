"use client";

import {
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { WebGLEnvelopeFlap } from "./webgl-envelope-flap";

const STORAGE_KEY = "k2tech-invitation-opened";
const OPEN_THRESHOLD = 150;

export function InvitationIntro() {
  const [visible, setVisible] = useState(false);
  const [drag, setDrag] = useState(0);
  const [opening, setOpening] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [webglActive, setWebglActive] = useState(false);
  const startY = useRef(0);
  const dragging = useRef(false);
  const dragRef = useRef(0);
  const progressRef = useRef(0);
  const openingRef = useRef(false);
  const sealRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(STORAGE_KEY) === "1";
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadyOpened || reducedMotion) return;

    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => sealRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [visible]);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function sync(value: number) {
    dragRef.current = value;
    progressRef.current = Math.min(value / OPEN_THRESHOLD, 1);
    setDrag(value);
  }

  function finish() {
    if (openingRef.current) return;
    openingRef.current = true;
    dragging.current = false;
    sync(OPEN_THRESHOLD);
    setOpening(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    navigator.vibrate?.(25);
    timersRef.current.push(window.setTimeout(() => setLetterOpen(true), 1050));
    timersRef.current.push(window.setTimeout(() => setVisible(false), 3500));
  }

  function skip() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function prepareCurl() {
    setWebglActive(true);
  }

  function down(event: PointerEvent<HTMLButtonElement>) {
    if (openingRef.current) return;
    prepareCurl();
    dragging.current = true;
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (!dragging.current || openingRef.current) return;
    const next = Math.min(Math.max(0, startY.current - event.clientY), OPEN_THRESHOLD);
    sync(next);
    if (next >= OPEN_THRESHOLD * 0.98) finish();
  }

  function up() {
    if (!dragging.current || openingRef.current) return;
    dragging.current = false;
    if (dragRef.current >= OPEN_THRESHOLD * 0.72) finish();
    else sync(0);
  }

  function handleSealKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      prepareCurl();
      finish();
    }
  }

  function handleDialogKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      skip();
      return;
    }

    if (event.key !== "Tab") return;
    const first = sealRef.current;
    const last = skipRef.current;
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!visible) return null;

  const progress = Math.min(drag / OPEN_THRESHOLD, 1);
  const style = {
    "--seal-progress": progress,
    "--paper-rise": `${Math.round(progress * 10)}px`,
  } as CSSProperties;

  return (
    <div
      className={`invitation-intro ${opening ? "is-opening" : ""} ${letterOpen ? "letter-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invitation-intro-title"
      aria-describedby="invitation-intro-description invitation-intro-instruction"
      onKeyDown={handleDialogKey}
    >
      <button ref={skipRef} className="intro-skip" type="button" onClick={skip}>
        Pular introdução
      </button>
      <div className="intro-atmosphere" aria-hidden="true"><i/><i/><i/></div>
      <div className="intro-copy">
        <span>K2 TECH · EXPERIÊNCIA DIGITAL</span>
        <h2 id="invitation-intro-title">Você recebeu<br/><em>um convite.</em></h2>
        <p id="invitation-intro-description">Algumas experiências começam antes mesmo do evento.</p>
      </div>
      <div className="envelope-stage" style={style}>
        <div className="letter" aria-hidden="true">
          <span>K2 TECH APRESENTA</span>
          <strong>SEU EVENTO<br/><em>COMEÇA AQUI.</em></strong>
          <small>DESIGN · TECNOLOGIA · EXPERIÊNCIA</small>
        </div>
        <div className="envelope-shadow" aria-hidden="true"/>
        <div className="envelope" aria-hidden="true">
          <div className="envelope-back"><div className="inner-paper"><span>K2 TECH</span></div></div>
          <WebGLEnvelopeFlap progress={progressRef} active={webglActive}/>
          <div className="envelope-left"/><div className="envelope-right"/><div className="envelope-bottom"/><div className="envelope-edge"/>
        </div>
        <button
          ref={sealRef}
          className="wax-seal"
          type="button"
          aria-label="K2 — abrir o convite. Arraste o lacre para cima ou pressione Enter ou Espaço."
          aria-describedby="invitation-intro-instruction"
          onPointerEnter={prepareCurl}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onKeyDown={handleSealKey}
          style={{ transform: `translate(-50%,calc(-50% - ${drag}px))` }}
        >
          <span>K2</span><i aria-hidden="true"/>
        </button>
        <div className="seal-thread" aria-hidden="true"/>
      </div>
      <div id="invitation-intro-instruction" className="intro-instruction">
        <span aria-hidden="true">↑</span>
        <strong>{progress > 0.15 ? "CONTINUE PUXANDO" : "ARRASTE PARA ROMPER O LACRE"}</strong>
        <small>{progress > 0.15 ? `${Math.round(progress * 100)}% · a folha está curvando` : "Arraste para cima ou pressione Enter"}</small>
      </div>
    </div>
  );
}
