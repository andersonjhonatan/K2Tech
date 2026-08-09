import Image from "next/image";
import Link from "next/link";
import { projectStatusLabel, projects, projectWhatsappUrl } from "../../data/projects";
import { siteConfig } from "../../site-config";
import { Arrow } from "./home-ui";

export function ProjectsSection() {
  return (
    <section id="projetos" className="projects section-space">
      <div className="container">
        <div className="section-heading">
          <div className="section-label light"><span>02</span><i/> CONVITES EM DESTAQUE</div>
          <h2>Feitos para<br/><em>ser lembrados.</em></h2>
          <p>Convites que criam expectativa antes mesmo de a celebração começar.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.className}`} key={project.name}>
              <div className="project-art">
                {project.video && (
                  <>
                    <video className="project-video" loop muted playsInline preload="none" controls aria-label={`Prévia do projeto ${project.name}`}>
                      <source src={project.video} type="video/mp4" />
                      Seu navegador não suporta vídeo HTML5.
                    </video>
                    <div className="video-badge"><span aria-hidden="true">●</span> PROJETO REAL</div>
                  </>
                )}
                {project.image && (
                  <>
                    <Image
                      className="project-preview"
                      src={project.image}
                      alt={`Prévia do conceito ${project.name}`}
                      fill
                      sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1200px) 50vw, 390px"
                      quality={72}
                    />
                    <div className="concept-badge">CONCEITO VISUAL</div>
                  </>
                )}
              </div>
              <div className="project-meta"><span>{project.number} — {projectStatusLabel(project)}</span><Arrow diagonal/></div>
              <h3>{project.name}</h3>
              <p>{project.homeDescription}</p>
              <a className="project-action" href={projectWhatsappUrl(project.name)} target="_blank" rel="noopener noreferrer">Quero algo assim <Arrow/></a>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="button button-light all-projects" href="/projetos">Ver todos os projetos <Arrow/></Link>
          <a className="button button-light all-projects" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Crie seu convite com a K2 <Arrow/></a>
        </div>
      </div>
    </section>
  );
}
