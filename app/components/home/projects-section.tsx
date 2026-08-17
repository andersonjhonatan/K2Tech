import { showcaseProjects } from "../../data/projects";
import { weatherProject } from "../../data/weather-project";
import { siteConfig } from "../../site-config";
import { BoostifySitePreview, WeatherAppPreview } from "../project-coded-previews";
import { MontagemSitePreview } from "../project-previews";
import { Arrow } from "./home-ui";

export function ProjectsSection() {
  const featured = [showcaseProjects[0], showcaseProjects[1], weatherProject, showcaseProjects[2]];

  return (
    <section id="projetos" className="projects section-space">
      <div className="container">
        <div className="section-heading">
          <div className="section-label light"><span>03</span><i/> PROJETOS EM DESTAQUE</div>
          <h2>Uma empresa.<br/><em>Vários tipos de solução.</em></h2>
          <p>Sites para negócios, aplicações web e experiências interativas. Projetos diferentes para mostrar que a K2 Tech não trabalha com uma única fórmula.</p>
        </div>

        <div className="project-grid showcase-home-grid">
          {featured.map((project) => {
            const isMontagemPreview = project.previewType === "montagem-site" && project.image;
            const isBoostifyPreview = project.className === "boostify";
            const isWeatherPreview = project.className === "weather";
            const hasCodedPreview = Boolean(isMontagemPreview || isBoostifyPreview || isWeatherPreview);

            return (
              <article className={`project-card showcase-home-card ${project.className} ${project.spotlight ? "showcase-home-spotlight" : ""}`} key={project.name}>
                <div
                  className={`project-art showcase-project-art ${project.image ? "has-image" : "no-image"}`}
                  style={!hasCodedPreview && project.image ? { backgroundImage: `url(${project.image})`, backgroundPosition: project.imagePosition } : undefined}
                  role="img"
                  aria-label={`Prévia do projeto ${project.name}`}
                >
                  {isMontagemPreview ? (
                    <MontagemSitePreview imageUrl={project.image!} />
                  ) : isBoostifyPreview ? (
                    <BoostifySitePreview />
                  ) : isWeatherPreview ? (
                    <WeatherAppPreview />
                  ) : !project.image ? (
                    <div className="generated-project-visual" aria-hidden="true">
                      <span>&lt;/&gt;</span>
                      <strong>{project.name}</strong>
                    </div>
                  ) : null}

                  <div className="showcase-art-overlay" />
                  <div className={`video-badge ${project.published ? "live-project-badge" : ""}`}>
                    <span aria-hidden="true">●</span> {project.spotlight ? "CASE CRIATIVO EM DESTAQUE" : project.published ? "PROJETO REAL · ONLINE" : "PROJETO K2 TECH"}
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
            );
          })}
        </div>

        <div className="hero-actions">
          <a className="button button-light all-projects" href="/projetos">Explorar todos os projetos <Arrow/></a>
          <a className="button button-light all-projects" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Fale sobre sua ideia <Arrow/></a>
        </div>
      </div>
    </section>
  );
}
