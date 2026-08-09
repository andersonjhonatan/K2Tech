"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "k2tech-invitation-opened";
const OPEN_THRESHOLD = 112;

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
    window.setTimeout(() => setLetterOpen(true), 520);
    window.setTimeout(() => setVisible(false), 2100);
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
    if (drag >= OPEN_THRESHOLD * 0.72) finish();
    else setDrag(0);
  }

  if (!visible) return null;
  const progress = Math.min(drag / OPEN_THRESHOLD, 1);

  return <div className={`invitation-intro ${opening ? "is-opening" : ""} ${letterOpen ? "letter-open" : ""}`} role="dialog" aria-modal="true" aria-label="Convite de entrada K2 Tech">
    <button className="intro-skip" type="button" onClick={skip}>Pular introdução</button>
    <div className="intro-atmosphere" aria-hidden="true"><i/><i/><i/></div>
    <div className="intro-copy"><span>K2 TECH · EXPERIÊNCIA DIGITAL</span><h2>Você recebeu<br/><em>um convite.</em></h2><p>Algumas experiências começam antes mesmo do evento.</p></div>
    <div className="envelope-stage" style={{"--seal-progress": progress} as React.CSSProperties}>
      <div className="letter"><span>K2 TECH APRESENTA</span><strong>SEU EVENTO<br/><em>COMEÇA AQUI.</em></strong><small>DESIGN · TECNOLOGIA · EXPERIÊNCIA</small></div>
      <div className="envelope"><div className="envelope-back"/><div className="envelope-paper"><span>K2</span><small>PRIVATE INVITATION · 2026</small></div><div className="envelope-front"/><div className="envelope-flap"/></div>
      <button className="wax-seal" type="button" aria-label="Arraste o lacre para cima para abrir o convite" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} style={{transform:`translate(-50%, calc(-50% - ${drag}px))`}}><span>K2</span><i/></button>
    </div>
    <div className="intro-instruction"><span>↑</span><strong>ARRASTE PARA ROMPER O LACRE</strong><small>Use o mouse ou toque e arraste para cima</small></div>
  </div>;
}
