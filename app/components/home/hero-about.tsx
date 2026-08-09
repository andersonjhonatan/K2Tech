import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";

export function HeroSection() {
  return (
    <section id="inicio" className="hero container">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span/> EXPERIÊNCIAS DIGITAIS QUE MARCAM</p>
        <h1>Seu evento<br/>começa no<br/><em>primeiro clique.</em></h1>
        <p className="hero-text">Convites online interativos que encantam seus convidados, organizam cada detalhe e transformam expectativa em experiência.</p>
        <div className="hero-actions">
          <a className="button button-whatsapp" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <Arrow/></a>
          <a className="text-link" href="#projetos">Ver experiências <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-visual reveal" aria-label="Exemplo de convite digital interativo">
        <div className="visual-note"><span>DESIGN + TECNOLOGIA</span><i/></div>
        <div className="tech-ring ring-one"/><div className="tech-ring ring-two"/>
        <div className="network-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <div className="invite-device">
          <div className="device-top"><span>K2 TECH</span><i aria-hidden="true">●</i></div>
          <div className="device-content">
            <p>VOCÊ ESTÁ CONVIDADO</p>
            <h3>LIA<br/><em>&amp; CAIO</em></h3>
            <div className="device-date">23 · AGOSTO · 2026</div>
            <span className="device-button">CONFIRMAR PRESENÇA <Arrow/></span>
          </div>
          <div className="device-footer"><span aria-hidden="true">⌁</span><b>EXPERIÊNCIA DIGITAL INTERATIVA</b></div>
        </div>
        <div className="floating-tag tag-one">convites<br/>interativos</div>
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
        <h2>Um convite pode ser<br/><em>muito mais.</em></h2>
        <div className="intro-content">
          <p className="lead">A K2 Tech transforma momentos importantes em experiências digitais memoráveis.</p>
          <p>Com design, tecnologia e cuidado com os detalhes, criamos espaços onde seus convidados encontram tudo o que precisam — e sentem a energia do que está por vir.</p>
          <a className="text-link" href="#servicos">Conheça as possibilidades <Arrow/></a>
        </div>
      </div>
      <div className="values-row"><span>DETALHE EM CADA TELA</span><b aria-hidden="true">✳</b><span>DESIGN COM EMOÇÃO</span><b aria-hidden="true">✳</b><span>TECNOLOGIA SEM COMPLICAÇÃO</span></div>
    </section>
  );
}
