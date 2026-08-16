import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MontagemSitePreview } from "../components/project-previews";
import { invitationConcepts, projectWhatsappUrl, publishedProjects, showcaseProjects } from "../data/projects";
import { siteConfig } from "../site-config";
import styles from "./projetos.module.css";
import realStyles from "./real-projects.module.css";

export const metadata: Metadata = {
  title: "Projetos | K2 Tech",
  description: "Conheça sites, aplicações web, interfaces e experiências interativas desenvolvidas pela K2 Tech, além do laboratório criativo que dará origem à vertical K2 Convites.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos | K2 Tech",
    description: "Sites, sistemas, produtos web e experiências digitais construídos pela K2 Tech.",
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
          <a href="#cases">Projetos</a>
          <a href="#conceitos">K2 Convites</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTopline}><span>PORTFÓLIO · K2 TECH</span><span>2026</span></div>
        <h1>Projetos diferentes.<br /><em>Uma mesma capacidade de construir.</em></h1>
        <div className={styles.heroBottom}>
          <p>Sites para negócios, aplicações web e experiências interativas convivem no mesmo portfólio porque a K2 Tech não nasce presa a um único tipo de entrega. A solução muda conforme o problema.</p>
          <div className={styles.heroStats}>
            <div><strong>{String(publishedProjects.length).padStart(2, "0")}</strong><span>projetos publicados</span></div>
            <div><strong>{String(invitationConcepts.length).padStart(2, "0")}</strong><span>conceitos da vertical criativa</span></div>
          </div>
        </div>
      </section>

      <section className={styles.caseSection} id="cases" aria-labelledby="cases-title">
        <div className={styles.sectionIntro}>
          <p>01 · PROJETOS K2 TECH</p>
          <div><h2 id="cases-title">Código, design e<br /><em>problemas diferentes.</em></h2><p>Projetos que mostram amplitude: presença digital para negócios, aplicações web e experiências criativas que podem ser abertas e testadas.</p></div>
        </div>

        <div className={styles.caseGrid}>
          {showcaseProjects.map((project) => {
            const isMontagemPreview = project.previewType === "montagem-site" && project.image;

            return (
              <article className={`${styles.caseCard} ${project.spotlight ? styles.caseFeatured : ""} ${project.spotlight ? realStyles.caseSpotlight : ""}`} key={project.name}>
                <div
                  className={`${styles.caseVisual} ${styles[`visual_${project.className}`] ?? ""}`}
                  style={!isMontagemPreview && project.image ? { backgroundImage: `url(${project.image})`, backgroundPosition: project.imagePosition } : undefined}
                  role="img"
                  aria-label={`Prévia do projeto ${project.name}`}
                >
                  {isMontagemPreview ? (
                    <MontagemSitePreview imageUrl={project.image!} />
                  ) : !project.image ? (
                    <div className={styles.generatedVisual} aria-hidden="true">
                      <span>&lt;/&gt;</span>
                      <strong>{project.name}</strong>
                      <i />
                    </div>
                  ) : null}

                  {project.secondaryImage && (
                    <div
                      className={realStyles.secondaryPreview}
                      style={{ backgroundImage: `url(${project.secondaryImage})` }}
                      aria-label="Prévia da interação do projeto"
                      role="img"
                    >
                      <span>INTERAÇÃO</span>
                    </div>
                  )}
                  <div className={styles.visualShade} />
                  <span className={styles.caseNumber}>{project.number}</span>
                  <span className={`${styles.caseBadge} ${project.published ? realStyles.caseBadgeLive : ""}`}>
                    {project.spotlight ? "CASE CRIATIVO EM DESTAQUE" : project.published ? "PROJETO REAL · ONLINE" : "PROJETO K2 TECH"}
                  </span>
                </div>

                <div className={styles.caseInfo}>
                  <div className={styles.caseMeta}><span>{project.eyebrow}</span><span>{project.category}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.portfolioDescription}</p>
                  <div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className={styles.caseLinks}>
                    {project.liveUrl && <a className={realStyles.liveProjectLink} href={project.liveUrl} target="_blank" rel="noopener noreferrer"><span className={realStyles.liveDot} /> Abrir projeto ao vivo ↗</a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                    <a href={projectWhatsappUrl(project.name, "portfolio")} target="_blank" rel="noopener noreferrer">Quero algo nessa direção ↗</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.conceptSection} id="conceitos" aria-labelledby="concept-title">
        <div className={styles.sectionIntro}>
          <p>02 · VERTICAL CRIATIVA</p>
          <div><h2 id="concept-title">K2 Convites.<br /><em>Uma especialidade dentro da K2.</em></h2><p>Os convites interativos são uma frente forte da empresa e estão sendo tratados como uma vertical própria. Futuramente, essa biblioteca poderá viver em um produto e repositório dedicados, com a assinatura “by K2 Tech”.</p></div>
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
        <p className={styles.finalText}>Conte o problema, a ideia ou o objetivo. A K2 Tech ajuda a definir a melhor solução — seja um site, sistema, interface ou experiência digital.</p>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar com a K2 Tech ↗</a>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} K2 Tech. Tecnologia para crescimento real.</p>
        <div><Link href="/">Início</Link><Link href="/privacidade">Privacidade</Link></div>
      </footer>
    </main>
  );
}
