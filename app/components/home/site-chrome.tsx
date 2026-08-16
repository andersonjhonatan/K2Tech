import { SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { siteConfig } from "../../site-config";
import { Arrow, K2Mark } from "./home-ui";

export function SiteHeader() {
  return (
    <header className="site-header container">
      <a className="brand" href="#inicio" aria-label="K2 Tech, início"><K2Mark /></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#projetos">Projetos</a>
        <a href="#avaliacoes">Padrão K2</a>
        <a href="#contato">Contato</a>
      </nav>
      <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar sobre um projeto <Arrow /></a>
      <details className="mobile-nav">
        <summary aria-label="Abrir menu"><span/><span/></summary>
        <div>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#projetos">Projetos</a>
          <a href="#avaliacoes">Padrão K2</a>
          <a href="#contato">Contato</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar sobre um projeto</a>
        </div>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="footer k2-footer">
        <div className="container k2-footer-shell">
          <div className="k2-footer-main">
            <div className="k2-footer-brand-block">
              <a className="brand footer-brand" href="#inicio" aria-label="K2 Tech, voltar ao início"><K2Mark /></a>
              <p>Sites, sistemas, interfaces e experiências digitais construídos para negócios que querem crescer com presença e tecnologia.</p>
              <span className="k2-footer-signature">K2 TECH · DESIGN + DESENVOLVIMENTO + PRODUTO</span>
            </div>

            <div className="k2-footer-column">
              <span className="k2-footer-label">CONTATO</span>
              <a className="k2-footer-contact" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="contact-icon whatsapp-icon" aria-hidden="true"/>
                <span><small>WhatsApp</small>{siteConfig.phoneDisplay}</span>
              </a>
              <a className="k2-footer-contact" href={`mailto:${siteConfig.contactEmail}`}>
                <SiGmail className="contact-icon gmail-icon" aria-hidden="true"/>
                <span><small>E-mail</small>{siteConfig.contactEmail}</span>
              </a>
              <a className="k2-footer-contact" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                <SiInstagram className="contact-icon instagram-icon" aria-hidden="true"/>
                <span><small>Instagram</small>@k2tech</span>
              </a>
            </div>

            <div className="k2-footer-column k2-footer-nav-column">
              <span className="k2-footer-label">NAVEGAÇÃO</span>
              <nav className="k2-footer-nav" aria-label="Navegação do rodapé">
                <a href="#servicos">Serviços <span>↗</span></a>
                <a href="/projetos">Projetos <span>↗</span></a>
                <a href="#contato">Contato <span>↗</span></a>
                <a href="/privacidade">Privacidade <span>↗</span></a>
              </nav>
            </div>
          </div>

          <div className="k2-footer-bottom">
            <small>© {new Date().getFullYear()} K2 Tech. Tecnologia para crescimento real.</small>
            <a className="back-top" href="#inicio">Voltar ao topo ↑</a>
          </div>
        </div>
      </footer>
      <a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <SiWhatsapp className="contact-icon" aria-hidden="true"/><em>Falar sobre um projeto</em>
      </a>
    </>
  );
}
