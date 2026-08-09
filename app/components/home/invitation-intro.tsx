const INTRO_GATE_SCRIPT = `(function(){try{var skip=sessionStorage.getItem("k2tech-invitation-opened")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.k2Intro=skip?"skip":"show";}catch(e){document.documentElement.dataset.k2Intro="show";}})();`;

export function InvitationIntro() {
  return (
    <>
      <style>{`html[data-k2-intro="skip"] .invitation-intro{display:none!important}`}</style>
      <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      <div
        data-k2-invitation-intro
        className="invitation-intro"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invitation-intro-title"
        aria-describedby="invitation-intro-description invitation-intro-instruction"
      >
        <button className="intro-skip" type="button">
          Pular introdução
        </button>
        <div className="intro-atmosphere" aria-hidden="true"><i/><i/><i/></div>
        <div className="intro-copy">
          <span>K2 TECH · EXPERIÊNCIA DIGITAL</span>
          <h2 id="invitation-intro-title">Você recebeu<br/><em>um convite.</em></h2>
          <p id="invitation-intro-description">Algumas experiências começam antes mesmo do evento.</p>
        </div>
        <div className="envelope-stage">
          <div className="letter" aria-hidden="true">
            <span>K2 TECH APRESENTA</span>
            <strong>SEU EVENTO<br/><em>COMEÇA AQUI.</em></strong>
            <small>DESIGN · TECNOLOGIA · EXPERIÊNCIA</small>
          </div>
          <div className="envelope-shadow" aria-hidden="true"/>
          <div className="envelope" aria-hidden="true">
            <div className="envelope-back"><div className="inner-paper"><span>K2 TECH</span></div></div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 5,
                width: "100%",
                height: "62%",
                display: "block",
                pointerEvents: "none",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg,#17243a 0%,#0b1422 100%)",
                filter: "drop-shadow(0 7px 9px rgba(0,0,0,.48))",
              }}
            />
            <div className="envelope-left"/><div className="envelope-right"/><div className="envelope-bottom"/><div className="envelope-edge"/>
          </div>
          <button
            className="wax-seal"
            type="button"
            aria-label="K2 — abrir o convite. Arraste o lacre para cima ou pressione Enter ou Espaço."
            aria-describedby="invitation-intro-instruction"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <span>K2</span><i aria-hidden="true"/>
          </button>
          <div className="seal-thread" aria-hidden="true"/>
        </div>
        <div id="invitation-intro-instruction" className="intro-instruction">
          <span aria-hidden="true">↑</span>
          <strong>ARRASTE PARA ROMPER O LACRE</strong>
          <small>Arraste para cima ou pressione Enter</small>
        </div>
      </div>
      <script src="/js/invitation-intro.js" defer />
    </>
  );
}
