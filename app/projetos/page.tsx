import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../site-config";
import styles from "./projetos.module.css";

export const metadata: Metadata = {
  title: "Projetos | K2 Tech",
  description: "Conheça o portfólio de convites online interativos da K2 Tech, com projeto real e conceitos visuais para diferentes tipos de celebração.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos | K2 Tech",
    description: "Projeto real e conceitos visuais de convites online interativos criados pela K2 Tech.",
    url: "/projetos",
    type: "website",
  },
};

type Project = {
  number: string;
  name: string;
  category: string;
  status: "Projeto real" | "Conceito visual";
  description: string;
  image?: string;
  video?: string;
};

const projects: Project[] = [
  { number: "01", name: "CONVITE K2", category: "Convite interativo", status: "Projeto real", description: "Uma experiência real criada pela K2 Tech para mostrar como um convite pode reunir apresentação, informações e interação em uma experiência pensada para o celular.", video: "/videos/convite-interativo-k2-preview.mp4" },
  { number: "02", name: "JULIA 15", category: "Debutante", status: "Conceito visual", description: "Conceito de experiência digital para uma festa de 15 anos, com direção visual sofisticada, informações da celebração e espaço para confirmação de presença.", image: "/images/projects/debutante-julia-v3.png" },
  { number: "03", name: "MAYA & CAIO", category: "Casamento", status: "Conceito visual", description: "Conceito elegante para casamento, pensado para apresentar a celebração de forma emocional, organizada e memorável desde o primeiro acesso.", image: "/images/projects/casamento-maya-caio-v2.png" },
  { number: "04", name: "MIGUEL 06", category: "Infantil", status: "Conceito visual", description: "Conceito infantil com linguagem divertida e visual marcante, mostrando como o convite pode começar a experiência da festa antes mesmo do grande dia.", image: "/images/projects/infantil-miguel.png" },
  { number: "05", name: "BABY LUNA", category: "Chá revelação", status: "Conceito visual", description: "Conceito delicado para chá revelação, combinando expectativa, informações essenciais e uma apresentação visual criada para ser compartilhada com facilidade.", image: "/images/projects/cha-revelacao-luna-v2.png" },
  { number: "06", name: "IDEA SUMMIT", category: "Evento corporativo", status: "Conceito visual", description: "Conceito de alto impacto para evento corporativo, com estética contemporânea e estrutura preparada para comunicar agenda, local e proposta do encontro.", image: "/images/projects/idea-summit.png" },
];

function whatsappFor(project: string) {
  const message = `Olá, vim pela página de projetos da K2 Tech e gostei do ${project}. Quero um convite nesse estilo e gostaria de conversar sobre a minha ideia.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function ProjetosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="K2 Tech, voltar para a página inicial">
          <Image src="/images/k2-tech-logo-transparent-v2.png" alt="K2 Tech" width={160} height={58} priority />
        </Link>
        <nav className={styles.nav} aria-label="Navegação da página de projetos">
          <Link href="/">Início</Link>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp ↗</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>PORTFÓLIO K2 TECH · 2026</p>
        <h1>Experiências feitas para<br /><em>começar antes do evento.</em></h1>
        <div className={styles.heroBottom}>
          <p>Explore um projeto real da K2 Tech e conceitos visuais criados para demonstrar possibilidades de direção, estilo e experiência.</p>
          <div className={styles.legend} aria-label="Legenda do portfólio"><span><i className={styles.realDot} /> Projeto real</span><span><i /> Conceito visual</span></div>
        </div>
      </section>

      <section className={styles.portfolio} aria-labelledby="portfolio-title">
        <h2 id="portfolio-title" className={styles.srOnly}>Projetos da K2 Tech</h2>
        {projects.map((project) => (
          <article className={styles.project} key={project.name}>
            <div className={styles.visual}>
              {project.video ? (
                <video autoPlay loop muted playsInline preload="metadata" aria-label={`Prévia em vídeo do ${project.name}`}>
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <Image src={project.image!} alt={`Prévia do conceito ${project.name}, categoria ${project.category}`} fill sizes="(max-width: 800px) 100vw, 58vw" />
              )}
              <span className={`${styles.status} ${project.status === "Projeto real" ? styles.statusReal : ""}`}>{project.status}</span>
            </div>
            <div className={styles.info}>
              <div className={styles.meta}><span>{project.number}</span><span>{project.category}</span></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.status === "Conceito visual" && <small>Este é um conceito visual de portfólio e não representa um trabalho realizado para cliente.</small>}
              <a className={styles.projectCta} href={whatsappFor(project.name)} target="_blank" rel="noreferrer">Quero um convite nesse estilo <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.finalCta}>
        <p>SEU TEMA NÃO ESTÁ AQUI?</p>
        <h2>A ideia pode ser diferente.<br /><em>A experiência também.</em></h2>
        <p className={styles.finalText}>Conte para a K2 Tech o tema, a ocasião e o clima que você imagina. O projeto pode nascer do zero para combinar com o seu momento.</p>
        <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Olá, vim pela página de projetos da K2 Tech. Tenho um tema diferente e quero criar um convite online personalizado do zero.")}`} target="_blank" rel="noreferrer">Quero criar um tema diferente ↗</a>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} K2 Tech. Convites e experiências digitais.</p>
        <div><Link href="/">Início</Link><Link href="/privacidade">Privacidade</Link></div>
      </footer>
    </main>
  );
}
