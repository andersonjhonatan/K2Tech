import { showcaseProjects } from "../../data/projects";
import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";

export function ProjectsSection() {
  const featured = showcaseProjects.slice(0, 4);

  return (
    <section id="projetos" className="projects section-space">
      <div className="container">
        <div className="section-heading">
          <div className="section-label light"><span>02</span><i/> PROJETOS EM DESTAQUE</div>
          <h2>Projetos que<br/><em>saíram da ideia.</em></h2>
          <p>Sites, produtos e experiências digitais construídos para mostrar o que a K2 Tech consegue transformar em presença.</p>
        </div>

        <div className="project-grid showcase-home-grid">
          {featured.map((project) => (
            <article className={`project-card showcase-home-card ${project.className}`} key={project.name}>
              <div
                className={`project-art showcase-project-art ${project.image ? "has-image" : "no-image"}`}
                style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
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
                <div className="video-badge"><span aria-hidden="true">●</span> PROJETO K2 TECH</div>
              </div>

              <div className="project-meta"><span>{project.number} — {project.category}</span><Arrow diagonal/></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="showcase-tags" aria-label="Tecnologias e características">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="project-action" href="/projetos">Ver case completo <Arrow/></a>
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
