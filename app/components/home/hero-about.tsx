import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";

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
      <div className="hero-visual reveal" aria-label="Interface conceitual de produto digital desenvolvido pela K2 Tech">
        <div className="visual-note"><span>DESIGN + CÓDIGO + ESTRATÉGIA</span><i/></div>
        <div className="tech-ring ring-one"/><div className="tech-ring ring-two"/>
        <div className="network-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <div className="invite-device">
          <div className="device-top"><span>K2 TECH / DIGITAL LAB</span><i aria-hidden="true">●</i></div>
          <div className="device-content">
            <p>PRODUTO DIGITAL</p>
            <div className="device-title">WEB<br/><em>SYSTEMS</em></div>
            <div className="device-date">DESIGN · CODE · STRATEGY</div>
            <span className="device-button">PROJETO PRONTO PARA CRESCER <Arrow/></span>
          </div>
          <div className="device-footer"><span aria-hidden="true">⌁</span><b>SITES · SISTEMAS · EXPERIÊNCIAS</b></div>
        </div>
        <div className="floating-tag tag-one">sites &<br/>interfaces</div>
        <div className="floating-tag tag-two">K2®</div>
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
