import { showcaseProjects } from "../../data/projects";
import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";

export function ProjectsSection() {
  const featured = showcaseProjects.slice(0, 4);

  return (
    <section id="projetos" className="projects section-space">
      <div className="container">
        <div className="section-heading">
          <div className="section-label light"><span>02</span><i/> PROJETOS REAIS EM DESTAQUE</div>
          <h2>Não precisa imaginar.<br/><em>Você pode testar.</em></h2>
          <p>Experiências publicadas pela K2 Tech para você abrir no celular, navegar e sentir como cada projeto funciona de verdade.</p>
        </div>

        <div className="project-grid showcase-home-grid">
          {featured.map((project) => (
            <article className={`project-card showcase-home-card ${project.className} ${project.spotlight ? "showcase-home-spotlight" : ""}`} key={project.name}>
              <div
                className={`project-art showcase-project-art ${project.image ? "has-image" : "no-image"}`}
                style={project.image ? { backgroundImage: `url(${project.image})`, backgroundPosition: project.imagePosition } : undefined}
                role="img"
                aria-label={`Prévia do projeto ${project.name}`}
              >
                {!project.image && (
                  <div className="generated-project-visual" aria-hidden="true">
                    <span>&lt;/&gt;</span>
                    <strong>{project.name}</strong>
                  </div>
                )}
                <div className="showcase-art-overlay" />
                <div className={`video-badge ${project.published ? "live-project-badge" : ""}`}>
                  <span aria-hidden="true">●</span> {project.spotlight ? "CASE EM DESTAQUE" : "PROJETO REAL · ONLINE"}
                </div>
              </div>

              <div className="project-meta"><span>{project.number} — {project.category}</span><Arrow diagonal/></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="showcase-tags" aria-label="Tecnologias e características">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="showcase-home-actions">
                {project.liveUrl && <a className="project-action project-action-live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Abrir projeto ao vivo <Arrow/></a>}
                <a className="project-action" href="/projetos">Ver case completo <Arrow/></a>
              </div>
            </article>
          ))}
        </div>

        <div className="hero-actions">
          <a className="button button-light all-projects" href="/projetos">Ver portfólio da K2 Tech <Arrow/></a>
          <a className="button button-light all-projects" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Fale sobre seu projeto <Arrow/></a>
        </div>
      </div>
    </section>
  );
}
