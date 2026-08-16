import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";
import matrixStyles from "./matrix-hero.module.css";

export function HeroSection() {
  return (
    <section id="inicio" className="hero container">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span/> DESIGN · DESENVOLVIMENTO · PRODUTO DIGITAL</p>
        <h1>Ideias que viram<br/>produtos digitais<br/><em>de verdade.</em></h1>
        <p className="hero-text">Sites, sistemas e experiências web desenvolvidos sob medida para transformar uma ideia em presença, operação e crescimento.</p>
        <div className="hero-actions">
          <a className="button button-whatsapp" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar sobre um projeto <Arrow/></a>
          <a className="text-link" href="#projetos">Ver projetos reais <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <div className={`${matrixStyles.visual} reveal`} aria-label="Workspace conceitual de desenvolvimento digital da K2 Tech">
        <div className={matrixStyles.glow} aria-hidden="true" />
        <div className={matrixStyles.grid} aria-hidden="true" />

        <div className={matrixStyles.workspace}>
          <div className={matrixStyles.topbar}>
            <div className={matrixStyles.dots} aria-hidden="true"><i/><i/><i/></div>
            <span>K2 TECH / DIGITAL WORKSPACE</span>
            <span className={matrixStyles.status}><i/> BUILD READY</span>
          </div>

          <div className={matrixStyles.body}>
            <aside className={matrixStyles.sidebar} aria-hidden="true">
              <div className={matrixStyles.sideBrand}>K2<b>.</b></div>
              <span className={`${matrixStyles.sideItem} ${matrixStyles.sideItemActive}`}>OVERVIEW</span>
              <span className={matrixStyles.sideItem}>WEB</span>
              <span className={matrixStyles.sideItem}>SYSTEMS</span>
              <span className={matrixStyles.sideItem}>INTERFACES</span>
              <span className={matrixStyles.sideItem}>DEPLOY</span>
            </aside>

            <div className={matrixStyles.main}>
              <section className={matrixStyles.heroPanel}>
                <span className={matrixStyles.kicker}>K2 DIGITAL LAB</span>
                <strong>Design, código e produto no mesmo fluxo.</strong>
                <p>Do primeiro wireframe ao deploy, cada camada conversa com a próxima.</p>
              </section>

              <section className={matrixStyles.architecture} aria-label="Fluxo de arquitetura digital">
                <div className={matrixStyles.panelHead}><span>ARQUITETURA</span><span>CONNECTED</span></div>
                <div className={matrixStyles.flow}>
                  <span className={matrixStyles.node}>INTERFACE</span>
                  <span className={matrixStyles.node}>API</span>
                  <span className={matrixStyles.node}>DADOS</span>
                </div>
              </section>

              <section className={matrixStyles.terminal} aria-label="Trecho conceitual de código">
                <div className={matrixStyles.panelHead}><span>PRODUCT.TS</span><span>LIVE</span></div>
                <div className={matrixStyles.code}>
                  <div><b>const</b> <span>product</span> = {'{'}</div>
                  <div>&nbsp;&nbsp;design: <em>true</em>,</div>
                  <div>&nbsp;&nbsp;scalable: <em>true</em>,</div>
                  <div>&nbsp;&nbsp;responsive: <em>true</em></div>
                  <div>{'}'}</div>
                </div>
              </section>

              <div className={matrixStyles.stack} aria-label="Tecnologias e áreas">
                <span>NEXT.JS</span><span>REACT</span><span>NODE</span><span>UX/UI</span><span>APIs</span><span>DEPLOY</span>
              </div>
            </div>
          </div>
        </div>

        <div className={matrixStyles.floatingA}>WEB DESIGN</div>
        <div className={matrixStyles.floatingB}>SYSTEMS / APPS</div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="sobre" className="intro container section-space">
      <div className="section-label"><span>01</span><i/> SOBRE A K2 TECH</div>
      <div className="intro-grid">
        <h2>Tecnologia para<br/><em>crescimento real.</em></h2>
        <div className="intro-content">
          <p className="lead">A K2 Tech é uma empresa de desenvolvimento web e design digital que transforma necessidades em produtos claros, funcionais e profissionais.</p>
          <p>Construímos sites institucionais, landing pages, sistemas web, interfaces e experiências interativas. Os convites digitais fazem parte desse ecossistema como uma especialidade criativa — não como o limite do que a K2 Tech pode construir.</p>
          <a className="text-link" href="#servicos">Conheça nossas frentes <Arrow/></a>
        </div>
      </div>
      <div className="values-row"><span>DESIGN COM INTENÇÃO</span><b aria-hidden="true">✳</b><span>CÓDIGO COM ESTRUTURA</span><b aria-hidden="true">✳</b><span>SOLUÇÕES FEITAS PARA EVOLUIR</span></div>
    </section>
  );
}
