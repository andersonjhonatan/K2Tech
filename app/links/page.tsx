import type { Metadata } from "next";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight, FiGlobe, FiGrid, FiMail, FiScissors } from "react-icons/fi";
import { siteConfig } from "../site-config";
import { TreskMark } from "../tresk-logo";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Links | TresK Tecnologia",
  description: "Fale com a TresK Tecnologia, veja nossos projetos e conheça o Kort, a agenda online para barbearias.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "TresK Tecnologia",
    description: "Sites, sistemas e aplicativos sob medida. Peça seu orçamento.",
    url: "/links",
    type: "website",
  },
};

function whatsapp(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const orcamentoUrl = whatsapp("Olá! Vim pelo Instagram da TresK Tecnologia e quero um orçamento.");
const kortInteresseUrl = whatsapp("Olá! Vim pelo Instagram da TresK e quero conhecer o Kort para a minha barbearia.");

export default function LinksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <section className={styles.card}>
        <TreskMark className={styles.mark} stems="#f5f5f7" />
        <h1 className={styles.title}>
          TresK <span>Tecnologia</span>
        </h1>
        <p className={styles.tagline}>Sites, sistemas e aplicativos sob medida. Do Sertão de Pernambuco para todo o Brasil.</p>

        <nav className={styles.links} aria-label="Links da TresK Tecnologia">
          <a className={`${styles.link} ${styles.primary}`} href={orcamentoUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden="true" />
            <span>
              <strong>Peça seu orçamento</strong>
              <small>Resposta pelo WhatsApp</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </a>

          <a
            className={styles.link}
            href={siteConfig.kortLive ? siteConfig.kortUrl : kortInteresseUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiScissors aria-hidden="true" />
            <span>
              <strong>Kort: agenda para barbearias</strong>
              <small>{siteConfig.kortLive ? "Conheça e teste" : "Quero conhecer o Kort"}</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </a>

          <Link className={styles.link} href="/projetos">
            <FiGrid aria-hidden="true" />
            <span>
              <strong>Nossos projetos</strong>
              <small>Sites, sistemas e produtos digitais</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>

          <Link className={styles.link} href="/">
            <FiGlobe aria-hidden="true" />
            <span>
              <strong>Site da TresK</strong>
              <small>tresktecnologia.com.br</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>

          <a className={styles.link} href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
            <FaInstagram aria-hidden="true" />
            <span>
              <strong>Instagram</strong>
              <small>{siteConfig.instagramHandle}</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </a>

          <a className={styles.link} href={`mailto:${siteConfig.contactEmail}`}>
            <FiMail aria-hidden="true" />
            <span>
              <strong>E-mail</strong>
              <small>{siteConfig.contactEmail}</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </nav>

        <footer className={styles.footer}>
          <span>Ibimirim · PE</span>
          <Link href="/privacidade">Privacidade</Link>
        </footer>
      </section>
    </main>
  );
}
