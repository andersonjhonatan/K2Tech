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
      <footer className="footer">
        <div className="container footer-grid">
          <a className="brand footer-brand" href="#inicio" aria-label="K2 Tech, voltar ao início"><K2Mark /></a>
          <p>Sites, sistemas, interfaces e experiências digitais para negócios e ideias que querem crescer.</p>
          <div className="footer-links">
            <a className="contact-link" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"><SiWhatsapp className="contact-icon whatsapp-icon" aria-hidden="true"/>WhatsApp · {siteConfig.phoneDisplay}</a>
            <a className="contact-link" href={`mailto:${siteConfig.contactEmail}`}><SiGmail className="contact-icon gmail-icon" aria-hidden="true"/>{siteConfig.contactEmail}</a>
            <a className="contact-link" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"><SiInstagram className="contact-icon instagram-icon" aria-hidden="true"/>Instagram</a>
            <a href="/projetos">Projetos</a>
            <a href="/privacidade">Privacidade</a>
          </div>
          <small>© {new Date().getFullYear()} K2 Tech. Tecnologia para crescimento real.</small>
          <a className="back-top" href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <SiWhatsapp className="contact-icon" aria-hidden="true"/><em>Falar sobre um projeto</em>
      </a>
    </>
  );
}
