import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { invitationConcepts, projectWhatsappUrl, publishedProjects, showcaseProjects } from "../data/projects";
import { siteConfig } from "../site-config";
import styles from "./projetos.module.css";

export const metadata: Metadata = {
  title: "Projetos | K2 Tech",
  description: "Conheça projetos reais publicados, sites, produtos e experiências digitais desenvolvidos pela K2 Tech, além da biblioteca criativa de conceitos.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos | K2 Tech",
    description: "Projetos reais, sites, produtos web e experiências interativas construídos pela K2 Tech.",
    url: "/projetos",
    type: "website",
  },
};

export default function ProjetosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="K2 Tech, voltar para a página inicial">
          <Image src="/images/k2-tech-logo-transparent-v2.webp" alt="K2 Tech" width={160} height={58} priority />
        </Link>
        <nav className={styles.nav} aria-label="Navegação da página de projetos">
          <Link href="/">Início</Link>
          <a href="#cases">Projetos reais</a>
          <a href="#conceitos">Conceitos</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTopline}><span>PORTFÓLIO K2 TECH</span><span>2026</span></div>
        <h1>Projetos que você pode<br /><em>abrir, testar e sentir.</em></h1>
        <div className={styles.heroBottom}>
          <p>Antes de contratar, você pode navegar por experiências reais publicadas pela K2 Tech. Aqui o portfólio mostra o projeto funcionando — não apenas uma imagem estática.</p>
          <div className={styles.heroStats}>
            <div><strong>{String(publishedProjects.length).padStart(2, "0")}</strong><span>projetos publicados</span></div>
            <div><strong>{String(invitationConcepts.length).padStart(2, "0")}</strong><span>direções criativas</span></div>
          </div>
        </div>
      </section>

      <section className={styles.caseSection} id="cases" aria-labelledby="cases-title">
        <div className={styles.sectionIntro}>
          <p>01 · PROJETOS REAIS</p>
          <div><h2 id="cases-title">Trabalhos que já estão<br /><em>no ar.</em></h2><p>Os primeiros cases abaixo têm link direto para a experiência publicada. Abra no celular, interaja e veja como a K2 Tech trabalha na prática.</p></div>
        </div>

        <div className={styles.caseGrid}>
          {showcaseProjects.map((project) => (
            <article className={`${styles.caseCard} ${project.spotlight ? styles.caseFeatured : ""} ${project.spotlight ? styles.caseSpotlight : ""}`} key={project.name}>
              <div
                className={`${styles.caseVisual} ${styles[`visual_${project.className}`] ?? ""}`}
                style={project.image ? { backgroundImage: `url(${project.image})`, backgroundPosition: project.imagePosition } : undefined}
                role="img"
                aria-label={`Prévia do projeto ${project.name}`}
              >
                {!project.image && (
                  <div className={styles.generatedVisual} aria-hidden="true">
                    <span>&lt;/&gt;</span>
                    <strong>{project.name}</strong>
                    <i />
                  </div>
                )}
                {project.secondaryImage && (
                  <div
                    className={styles.secondaryPreview}
                    style={{ backgroundImage: `url(${project.secondaryImage})` }}
                    aria-label="Prévia da interação do projeto"
                    role="img"
                  >
                    <span>MINI-JOGO</span>
                  </div>
                )}
                <div className={styles.visualShade} />
                <span className={styles.caseNumber}>{project.number}</span>
                <span className={`${styles.caseBadge} ${project.published ? styles.caseBadgeLive : ""}`}>
                  {project.spotlight ? "CASE EM DESTAQUE" : project.published ? "PROJETO REAL · ONLINE" : "PROJETO K2 TECH"}
                </span>
              </div>

              <div className={styles.caseInfo}>
                <div className={styles.caseMeta}><span>{project.eyebrow}</span><span>{project.category}</span></div>
                <h3>{project.name}</h3>
                <p>{project.portfolioDescription}</p>
                <div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className={styles.caseLinks}>
                  {project.liveUrl && <a className={styles.liveProjectLink} href={project.liveUrl} target="_blank" rel="noopener noreferrer"><span className={styles.liveDot} /> Abrir projeto ao vivo ↗</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                  <a href={projectWhatsappUrl(project.name, "portfolio")} target="_blank" rel="noopener noreferrer">Quero algo nessa direção ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.conceptSection} id="conceitos" aria-labelledby="concept-title">
        <div className={styles.sectionIntro}>
          <p>02 · BIBLIOTECA CRIATIVA</p>
          <div><h2 id="concept-title">Outras direções<br /><em>que podemos explorar.</em></h2><p>Conceitos visuais para mostrar possibilidades de linguagem, composição e experiência além dos projetos já publicados.</p></div>
        </div>

        <div className={styles.conceptGrid}>
          {invitationConcepts.map((project, index) => (
            <article className={styles.conceptCard} key={project.name}>
              <div className={styles.conceptVisual}>
                {project.video ? (
                  <video loop muted playsInline preload="metadata" controls aria-label={`Prévia em vídeo do ${project.name}`}>
                    <source src={project.video} type="video/mp4" />
                    Seu navegador não suporta a reprodução deste vídeo.
                  </video>
                ) : (
                  <Image
                    src={project.image!}
                    alt={`Prévia do conceito ${project.name}`}
                    fill
                    sizes="(max-width: 760px) 88vw, (max-width: 1200px) 44vw, 360px"
                    quality={74}
                    priority={index === 1}
                  />
                )}
                <span className={`${styles.conceptStatus} ${project.status === "Projeto real" ? styles.statusReal : ""}`}>{project.status}</span>
              </div>
              <div className={styles.conceptInfo}>
                <div><span>{project.number}</span><span>{project.category}</span></div>
                <h3>{project.name}</h3>
                <p>{project.portfolioDescription}</p>
                <a href={projectWhatsappUrl(project.name, "portfolio")} target="_blank" rel="noopener noreferrer">Criar algo nesse estilo ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>SEU PROJETO AINDA NÃO EXISTE?</p>
        <h2>Melhor ainda.<br /><em>A gente começa do zero.</em></h2>
        <p className={styles.finalText}>Conte o que você quer construir e a K2 Tech transforma a ideia em uma experiência digital pensada para o seu contexto, sua marca e seu público.</p>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar com a K2 Tech ↗</a>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} K2 Tech. Tecnologia para crescimento real.</p>
        <div><Link href="/">Início</Link><Link href="/privacidade">Privacidade</Link></div>
      </footer>
    </main>
  );
}
