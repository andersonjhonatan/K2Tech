"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { siteConfig } from "./site-config";

type Project = {
  number: string;
  category: string;
  name: string;
  className: string;
  detail: string;
  video?: string;
  image?: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "Projeto real / Convite interativo",
    name: "CONVITE K2",
    className: "real",
    detail: "Uma prévia real de convite online interativo criada pela K2 Tech.",
    video: "/videos/convite-interativo-k2-preview.mp4",
  },
  {
    number: "02",
    category: "Conceito / Debutante",
    name: "JULIA 15",
    className: "debutante",
    detail: "Uma experiência digital para anunciar a celebração, compartilhar informações e confirmar presenças.",
    image: "/images/projects/debutante-julia-v3.png",
  },
  {
    number: "03",
    category: "Conceito / Casamento",
    name: "MAYA & CAIO",
    className: "wedding",
    detail: "Um convite elegante e interativo para levar a história do casal até cada convidado.",
    image: "/images/projects/casamento-maya-caio-v2.png",
  },
  {
    number: "04",
    category: "Conceito / Infantil",
    name: "MIGUEL 06",
    className: "kids",
    detail: "Um convite divertido para uma festa infantil começar com brincadeira desde o celular.",
    image: "/images/projects/infantil-miguel.png",
  },
  {
    number: "05",
    category: "Conceito / Chá revelação",
    name: "BABY LUNA",
    className: "reveal",
    detail: "Informações, confirmação e expectativa reunidas em uma experiência delicada e especial.",
    image: "/images/projects/cha-revelacao-luna-v2.png",
  },
  {
    number: "06",
    category: "Conceito / Evento corporativo",
    name: "IDEA SUMMIT",
    className: "corporate",
    detail: "Um convite de alto impacto para conectar convidados à energia de um grande evento.",
    image: "/images/projects/idea-summit.png",
  },
];

const services = [
  ["01", "Convites interativos", "Uma experiência feita sob medida com confirmações, localização, cronograma e a personalidade do seu evento."],
  ["02", "Sites que posicionam", "Presenças digitais rápidas, bonitas e estratégicas para o seu negócio ser encontrado e escolhido."],
  ["03", "Soluções sob medida", "Projetos digitais que resolvem o que planilhas e processos manuais já não conseguem acompanhar."],
];

const testimonials = [
  ["Convite de casamento", "O convite ficou lindo no celular e todo mundo conseguiu confirmar presença sem dificuldade.", "Carolina & Rafael", "Avaliação demonstrativa"],
  ["Site institucional", "Finalmente conseguimos apresentar nosso trabalho com uma imagem muito mais profissional.", "Bruno Martins", "Avaliação demonstrativa"],
  ["Convite de debutante", "Ficou do jeito que imaginamos: bonito, organizado e especial para enviar para a família.", "Aline Rocha", "Avaliação demonstrativa"],
  ["Sistema personalizado", "A K2 entendeu nossa rotina e entregou uma solução clara, rápida e muito fácil de usar.", "Marcos Vinícius", "Avaliação demonstrativa"],
  ["Convite infantil", "As crianças e os pais adoraram. Ficou divertido, simples de acessar e cheio de detalhes.", "Lívia Andrade", "Avaliação demonstrativa"],
  ["Landing page", "O processo foi muito organizado e o resultado ficou muito melhor do que imaginávamos.", "Natália & Diego", "Avaliação demonstrativa"],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"}>↗</span>;
}

function K2Mark() {
  return (
    <span className="official-logo">
      <Image src="/images/k2-tech-logo-light.png" alt="K2 Tech" fill sizes="160px" />
    </span>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const reviewPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReviewPage((page) => (page + 1) % reviewPages);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [reviewPages]);

  function changeReviewPage(direction: number) {
    setReviewPage((page) => (page + direction + reviewPages) % reviewPages);
  }

  function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString() || "";
    const company = form.get("company")?.toString() || "";
    const message = form.get("message")?.toString() || "";
    const subject = encodeURIComponent(`Novo projeto — ${name || "Contato pelo site"}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmpresa: ${company}\n\nSobre o projeto:\n${message}`);
    setSent(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    }, 450);
  }

  function sendReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("reviewer")?.toString() || "";
    const project = form.get("review-project")?.toString() || "";
    const review = form.get("review")?.toString() || "";
    const subject = encodeURIComponent(`Nova avaliação — ${project || "Projeto K2 Tech"}`);
    const body = encodeURIComponent(`Cliente: ${name}\nProjeto: ${project}\n\nAvaliação:\n${review}`);
    setReviewSent(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    }, 450);
  }

  return (
    <main>
      <header className="site-header container">
        <a className="brand" href="#inicio" aria-label="K2 Tech, início"><K2Mark /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#servicos">Serviços</a>
        </nav>
        <a className="header-cta" href="#contato">Iniciar projeto <Arrow /></a>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu"><span /><span /></summary>
          <div>
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#servicos">Serviços</a>
            <a href="#contato">Iniciar projeto</a>
          </div>
        </details>
      </header>

      <section id="inicio" className="hero container">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> EXPERIÊNCIAS DIGITAIS QUE MARCAM</p>
          <h1>Seu evento<br />começa no<br /><em>primeiro clique.</em></h1>
          <p className="hero-text">Convites online interativos que encantam seus convidados, organizam cada detalhe e transformam expectativa em experiência.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contato">Vamos conversar <Arrow /></a>
            <a className="text-link" href="#projetos">Ver experiências <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual reveal" aria-label="Exemplo de convite digital interativo">
          <div className="visual-note"><span>DESIGN + TECNOLOGIA</span><i /></div>
          <div className="tech-ring ring-one" /><div className="tech-ring ring-two" />
          <div className="network-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="invite-device">
            <div className="device-top"><span>K2 TECH</span><i>●</i></div>
            <div className="device-content">
              <p>VOCÊ ESTÁ CONVIDADO</p>
              <h3>LIA<br /><em>&amp; CAIO</em></h3>
              <div className="device-date">23 · AGOSTO · 2026</div>
              <button type="button">CONFIRMAR PRESENÇA <Arrow /></button>
            </div>
            <div className="device-footer"><span>⌁</span><b>EXPERIÊNCIA DIGITAL INTERATIVA</b></div>
          </div>
          <div className="floating-tag tag-one">convites<br />interativos</div>
          <div className="floating-tag tag-two">K2®</div>
        </div>
      </section>

      <section id="sobre" className="intro container section-space">
        <div className="section-label"><span>01</span><i /> SOBRE A K2 TECH</div>
        <div className="intro-grid">
          <h2>Um convite pode ser<br /><em>muito mais.</em></h2>
          <div className="intro-content">
            <p className="lead">A K2 Tech transforma momentos importantes em experiências digitais memoráveis.</p>
            <p>Com design, tecnologia e cuidado com os detalhes, criamos espaços onde seus convidados encontram tudo o que precisam — e sentem a energia do que está por vir.</p>
            <a className="text-link" href="#servicos">Conheça as possibilidades <Arrow /></a>
          </div>
        </div>
        <div className="values-row">
          <span>DETALHE EM CADA TELA</span><b>✳</b><span>DESIGN COM EMOÇÃO</span><b>✳</b><span>TECNOLOGIA SEM COMPLICAÇÃO</span>
        </div>
      </section>

      <section id="projetos" className="projects section-space">
        <div className="container">
          <div className="section-heading">
            <div className="section-label light"><span>02</span><i /> CONVITES EM DESTAQUE</div>
            <h2>Feitos para<br /><em>ser lembrados.</em></h2>
            <p>Convites que criam expectativa antes mesmo de a celebração começar.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.name}>
                <div className="project-art" aria-hidden="true">
                  {project.video ? <><video className="project-video" autoPlay loop muted playsInline preload="metadata"><source src={project.video} type="video/mp4" /></video><div className="video-badge"><span>●</span> PROJETO REAL</div></> : null}
                  {project.image ? <><Image className="project-preview" src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><div className="concept-badge">CONCEITO VISUAL</div></> : null}
                </div>
                <div className="project-meta"><span>{project.number} — {project.category}</span><Arrow diagonal /></div>
                <h3>{project.name}</h3>
                <p>{project.detail}</p>
              </article>
            ))}
          </div>
          <a className="button button-light all-projects" href="#contato">Crie seu convite com a K2 <Arrow /></a>
        </div>
      </section>

      <section id="avaliacoes" className="reviews section-space">
        <div className="container">
          <div className="reviews-head">
            <div><div className="section-label light"><span>03</span><i /> AVALIAÇÕES</div><h2>O que fica<br />depois da <em>entrega.</em></h2></div>
            <p>Uma experiência boa precisa ser sentida por quem recebe. Aqui entram as avaliações de cada projeto.</p>
          </div>
          <p className="review-disclaimer">Depoimentos demonstrativos — substitua-os pelas avaliações recebidas dos seus clientes.</p>
          <div className="testimonial-carousel" aria-live="polite">
            <div className="testimonial-grid" key={reviewPage}>
              {testimonials.slice(reviewPage * 3, reviewPage * 3 + 3).map(([project, quote, name, note]) => <article className="testimonial-card" key={project}><span className="quote-mark">“</span><p>{quote}</p><footer><strong>{name}</strong><small>{project} · {note}</small></footer></article>)}
            </div>
            <div className="review-controls">
              <button type="button" onClick={() => changeReviewPage(-1)} aria-label="Ver avaliações anteriores">←</button>
              <span><b>{String(reviewPage + 1).padStart(2, "0")}</b> / {String(reviewPages).padStart(2, "0")}</span>
              <button type="button" onClick={() => changeReviewPage(1)} aria-label="Ver próximas avaliações">→</button>
            </div>
          </div>
          <div className="review-form-wrap">
            <div><span className="review-kicker">JÁ FOI CLIENTE?</span><h3>Conta como foi<br />o seu <em>projeto.</em></h3><p>Sua avaliação chega direto para a K2 Tech e pode ser adicionada aqui depois.</p></div>
            <form className="review-form" onSubmit={sendReview}>
              <label>SEU NOME<input name="reviewer" required placeholder="Como podemos identificar você?" /></label>
              <label>QUAL FOI O PROJETO?<select name="review-project" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Convite online interativo</option><option>Site institucional</option><option>Sistema personalizado</option><option>Outro projeto</option></select></label>
              <label>COMO FOI A EXPERIÊNCIA?<textarea name="review" required rows={4} placeholder="Escreva sua avaliação para a K2 Tech" /></label>
              <button className="button button-outline" type="submit">Enviar avaliação <Arrow /></button>
              {reviewSent && <p className="form-note">Abrindo seu aplicativo de e-mail…</p>}
            </form>
          </div>
        </div>
      </section>

      <section id="servicos" className="services container section-space">
        <div className="section-label"><span>04</span><i /> O QUE FAZEMOS</div>
        <div className="services-head"><h2>Seu momento.<br /><em>Do seu jeito.</em></h2><p>Do convite à presença digital do seu negócio, construímos experiências que aproximam pessoas.</p></div>
        <div className="service-list">
          {services.map(([number, title, text]) => <article className="service-item" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><Arrow diagonal /></article>)}
        </div>
      </section>

      <section className="method section-space">
        <div className="container method-grid">
          <div>
            <div className="section-label light"><span>05</span><i /> COMO FUNCIONA</div>
            <h2>Boa parceria<br />tem <em>processo.</em></h2>
          </div>
          <div className="steps">
            <article><span>01</span><div><h3>Seu momento</h3><p>Entendemos a história, o estilo e tudo o que os convidados precisam viver antes do evento.</p></div></article>
            <article><span>02</span><div><h3>Direção criativa</h3><p>Transformamos a sua ideia em uma proposta visual única, feita para despertar expectativa.</p></div></article>
            <article><span>03</span><div><h3>Convite no ar</h3><p>Construímos, refinamos e entregamos seu convite pronto para ser compartilhado com quem importa.</p></div></article>
          </div>
        </div>
      </section>

      <section id="contato" className="contact container section-space">
        <div className="contact-top"><div className="section-label"><span>06</span><i /> VAMOS COMEÇAR</div><p>Você tem um momento.<br />A gente dá a ele <em>presença.</em></p></div>
        <div className="contact-grid">
          <h2>Vamos fazer seus<br />convidados dizerem<br /><em>“eu preciso ir”.</em></h2>
          <form onSubmit={sendBrief}>
            <label>SEU NOME<input name="name" required placeholder="Como podemos te chamar?" /></label>
            <label>EMPRESA / MARCA<input name="company" placeholder="Qual é o seu negócio?" /></label>
            <label>ME CONTA UM POUCO<textarea name="message" required placeholder="Qual momento você quer transformar em experiência?" rows={3} /></label>
            <button className="button button-dark" type="submit">Enviar mensagem <Arrow /></button>
            {sent && <p className="form-note">Abrindo seu aplicativo de e-mail…</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <a className="brand footer-brand" href="#inicio"><K2Mark /></a>
          <p>Convites e experiências digitais para momentos que merecem ser lembrados.</p>
          <div className="footer-links"><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></div>
          <small>© {new Date().getFullYear()} K2 Tech. Todos os direitos reservados.</small>
          <a className="back-top" href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}
