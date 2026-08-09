"use client";

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "k2tech-invitation-opened";
const OPEN_THRESHOLD = 128;

export function InvitationIntro() {
  const [visible, setVisible] = useState(false);
  const [drag, setDrag] = useState(0);
  const [opening, setOpening] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const startY = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opened = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (!opened && !reduced) setVisible(true);
  }, []);

  function finish() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpening(true);
    setDrag(OPEN_THRESHOLD);
    if ("vibrate" in navigator) navigator.vibrate?.(28);
    window.setTimeout(() => setLetterOpen(true), 650);
    window.setTimeout(() => setVisible(false), 2650);
  }

  function skip() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (opening) return;
    dragging.current = true;
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragging.current || opening) return;
    const distance = Math.max(0, startY.current - event.clientY);
    setDrag(Math.min(distance, OPEN_THRESHOLD));
  }

  function pointerUp() {
    if (!dragging.current || opening) return;
    dragging.current = false;
    if (drag >= OPEN_THRESHOLD * 0.68) finish();
    else setDrag(0);
  }

  if (!visible) return null;
  const progress = Math.min(drag / OPEN_THRESHOLD, 1);
  const style = {"--seal-progress": progress, "--flap-angle": `${Math.round(progress * 74)}deg`, "--paper-rise": `${Math.round(progress * 18)}px`} as CSSProperties;

  return <div className={`invitation-intro ${opening ? "is-opening" : ""} ${letterOpen ? "letter-open" : ""}`} role="dialog" aria-modal="true" aria-label="Convite de entrada K2 Tech">
    <button className="intro-skip" type="button" onClick={skip}>Pular introdução</button>
    <div className="intro-atmosphere" aria-hidden="true"><i/><i/><i/></div>
    <div className="intro-copy"><span>K2 TECH · EXPERIÊNCIA DIGITAL</span><h2>Você recebeu<br/><em>um convite.</em></h2><p>Algumas experiências começam antes mesmo do evento.</p></div>
    <div className="envelope-stage" style={style}>
      <div className="letter"><span>K2 TECH APRESENTA</span><strong>SEU EVENTO<br/><em>COMEÇA AQUI.</em></strong><small>DESIGN · TECNOLOGIA · EXPERIÊNCIA</small></div>
      <div className="envelope-shadow" aria-hidden="true"/>
      <div className="envelope">
        <div className="envelope-back"><div className="inner-paper"><span>K2 TECH</span></div></div>
        <div className="envelope-left"/><div className="envelope-right"/><div className="envelope-bottom"/>
        <div className="envelope-flap"><div className="flap-lining"/></div>
        <div className="envelope-edge"/>
      </div>
      <button className="wax-seal" type="button" aria-label="Arraste o lacre para cima para abrir o convite" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} style={{transform:`translate(-50%, calc(-50% - ${drag}px))`}}><span>K2</span><i/></button>
      <div className="seal-thread" aria-hidden="true"/>
    </div>
    <div className="intro-instruction"><span>↑</span><strong>{progress > .15 ? "CONTINUE PUXANDO" : "ARRASTE PARA ROMPER O LACRE"}</strong><small>{progress > .15 ? "A aba está se abrindo" : "Use o mouse ou toque e arraste para cima"}</small></div>
  </div>;
}
