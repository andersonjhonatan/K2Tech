import Link from "next/link";
import { SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { siteConfig } from "../../site-config";
import { Arrow, K2Mark } from "./home-ui";

export function SiteHeader() {
  return (
    <header className="site-header container">
      <a className="brand" href="#inicio" aria-label="K2 Tech, início"><K2Mark /></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#avaliacoes">Experiências</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contato</a>
      </nav>
      <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <Arrow /></a>
      <details className="mobile-nav">
        <summary aria-label="Abrir menu"><span/><span/></summary>
        <div>
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#avaliacoes">Experiências</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
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
          <p>Convites e experiências digitais para momentos que merecem ser lembrados.</p>
          <div className="footer-links">
            <a className="contact-link" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"><SiWhatsapp className="contact-icon whatsapp-icon" aria-hidden="true"/>WhatsApp · {siteConfig.phoneDisplay}</a>
            <a className="contact-link" href={`mailto:${siteConfig.contactEmail}`}><SiGmail className="contact-icon gmail-icon" aria-hidden="true"/>{siteConfig.contactEmail}</a>
            <a className="contact-link" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"><SiInstagram className="contact-icon instagram-icon" aria-hidden="true"/>Instagram</a>
            <Link href="/privacidade">Privacidade</Link>
          </div>
          <small>© {new Date().getFullYear()} K2 Tech. Todos os direitos reservados.</small>
          <a className="back-top" href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <SiWhatsapp className="contact-icon" aria-hidden="true"/><em>Falar no WhatsApp</em>
      </a>
    </>
  );
}
