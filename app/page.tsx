"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { siteConfig } from "./site-config";
import { KortIcon, TreskLogo } from "./tresk-logo";

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
    name: "CONVITE INTERATIVO",
    className: "real",
    detail: "Uma prévia real de convite online interativo criado pela TresK Tecnologia.",
    video: "/videos/convite-interativo-preview.mp4",
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
  ["01", "Sistemas sob medida", "Agendas, painéis e controles que resolvem o que planilhas e processos manuais já não conseguem acompanhar."],
  ["02", "Sites que posicionam", "Presenças digitais rápidas, bonitas e estratégicas para o seu negócio ser encontrado e escolhido."],
  ["03", "Convites interativos", "Experiências feitas sob medida com confirmação de presença, localização, cronograma e a personalidade do seu evento."],
];

const kortFeatures = [
  "Agendamento online 24h pelo link da barbearia",
  "Lista de espera que avisa o cliente quando abre uma vaga",
  "Lembretes no celular, sem custo por mensagem",
  "Painel do dono com equipe, horários e faturamento",
];

/** Avaliações reais de clientes. Só aparecem quando houver pelo menos uma. */
const testimonials: { project: string; quote: string; name: string }[] = [];

function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"}>↗</span>;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const reviewPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (reviewPages < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setReviewPage((page) => (page + 1) % reviewPages);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [reviewPages]);

  function changeReviewPage(direction: number) {
    setReviewPage((page) => (page + direction + reviewPages) % reviewPages);
  }

  function openWhatsapp(message: string) {
    const url = whatsappLink(message);
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = url;
  }

  function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString() || "";
    const company = form.get("company")?.toString() || "";
    const message = form.get("message")?.toString() || "";
    setSent(true);
    openWhatsapp(`Olá, vim pelo site da TresK Tecnologia.\n\nNome: ${name || "Não informado"}\nEmpresa ou marca: ${company || "Não informada"}\n\nSobre o projeto:\n${message}`);
  }

  function sendReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("reviewer")?.toString() || "";
    const project = form.get("review-project")?.toString() || "";
    const review = form.get("review")?.toString() || "";
    setReviewSent(true);
    openWhatsapp(`Nova avaliação recebida pelo site da TresK Tecnologia.\n\nCliente: ${name || "Não informado"}\nProjeto: ${project || "Não informado"}\n\nAvaliação:\n${review}`);
  }

  return (
    <main>
      <header className="site-header container">
        <a className="brand" href="#inicio" aria-label="TresK Tecnologia, início"><TreskLogo /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#servicos">Serviços</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu"><span /><span /></summary>
          <div>
            <a href="#sobre">Sobre</a>
            <a href="#produtos">Produtos</a>
            <a href="#servicos">Serviços</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </details>
      </header>

      <section id="inicio" className="hero container">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> PRODUTOS E SOLUÇÕES DIGITAIS</p>
          <h1>Tecnologia que<br />trabalha pelo<br /><em>seu negócio.</em></h1>
          <p className="hero-text">A TresK Tecnologia cria sistemas, sites e produtos digitais para quem quer crescer com organização, sem complicação.</p>
          <div className="hero-actions">
            <a className="button button-whatsapp" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
            <a className="text-link" href="#produtos">Conhecer o Kort <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual reveal" aria-label="Exemplo do Kort, a agenda online da TresK para barbearias">
          <div className="visual-note"><span>DESIGN + TECNOLOGIA</span><i /></div>
          <div className="tech-ring ring-one" /><div className="tech-ring ring-two" />
          <div className="network-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="invite-device">
            <div className="device-top"><span>KORT</span><i>●</i></div>
            <div className="device-content">
              <p>AGENDAMENTO ONLINE</p>
              <h3>CORTE<br /><em>&amp; BARBA</em></h3>
              <div className="device-date">SEXTA · 14:30</div>
              <span className="device-button">CONFIRMAR HORÁRIO <Arrow /></span>
            </div>
            <div className="device-footer"><span>⌁</span><b>KORT, POR TRESK TECNOLOGIA</b></div>
          </div>
          <div className="floating-tag tag-one">sistemas<br />sob medida</div>
          <div className="floating-tag tag-two">TresK®</div>
        </div>
      </section>

      <section id="sobre" className="intro container section-space">
        <div className="section-label"><span>01</span><i /> SOBRE A TRESK</div>
        <div className="intro-grid">
          <h2>Uma família,<br /><em>uma empresa.</em></h2>
          <div className="intro-content">
            <p className="lead">A TresK Tecnologia transforma rotinas e ideias em produtos digitais que funcionam no dia a dia.</p>
            <p>O nome vem do símbolo: três hastes lado a lado, do mesmo tamanho, unidas por uma só linha e formando o K. É assim que trabalhamos: perto de quem usa, cuidando de cada detalhe e entregando tecnologia que qualquer pessoa consegue usar.</p>
            <a className="text-link" href="#servicos">Veja o que fazemos <Arrow /></a>
          </div>
        </div>
        <div className="values-row">
          <span>FEITO SOB MEDIDA</span><b>✳</b><span>DESIGN COM PROPÓSITO</span><b>✳</b><span>TECNOLOGIA SEM COMPLICAÇÃO</span>
        </div>
      </section>

      <section id="produtos" className="products container">
        <div className="section-label"><span>02</span><i /> NOSSOS PRODUTOS</div>
        <article className="kort-card">
          <div className="kort-copy">
            <span className="kort-name"><KortIcon />Kort</span>
            <h2>A agenda online<br /><em>da sua barbearia.</em></h2>
            <p>Seus clientes marcam pelo link a qualquer hora, recebem lembrete no celular e entram na lista de espera quando a agenda está cheia. Você acompanha tudo pelo painel.</p>
            <a className="button button-light" href={siteConfig.kortUrl} target="_blank" rel="noreferrer">Conhecer o Kort <Arrow /></a>
          </div>
          <ul className="kort-features">
            {kortFeatures.map((feature) => <li key={feature}><b>✓</b>{feature}</li>)}
          </ul>
        </article>
      </section>

      <section id="servicos" className="services container section-space">
        <div className="section-label"><span>03</span><i /> O QUE FAZEMOS</div>
        <div className="services-head"><h2>Sua ideia.<br /><em>Do seu jeito.</em></h2><p>Do sistema que organiza a sua empresa ao convite do seu evento, construímos soluções que aproximam pessoas.</p></div>
        <div className="service-list">
          {services.map(([number, title, text]) => <article className="service-item" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><Arrow diagonal /></article>)}
        </div>
      </section>

      <section id="projetos" className="projects section-space">
        <div className="container">
          <div className="section-heading">
            <div className="section-label light"><span>04</span><i /> PROJETOS EM DESTAQUE</div>
            <h2>Feitos para<br /><em>ser lembrados.</em></h2>
            <p>Convites interativos que criam expectativa antes mesmo de a celebração começar.</p>
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
                <a className="project-action" href={whatsappLink(`Olá, vim pelo site da TresK Tecnologia e gostei do projeto ${project.name}. Gostaria de criar algo nesse estilo.`)} target="_blank" rel="noreferrer" aria-label={`Conversar sobre um projeto como ${project.name}`}>Quero algo assim <Arrow /></a>
              </article>
            ))}
          </div>
          <a className="button button-light all-projects" href="#contato">Fale com a TresK <Arrow /></a>
        </div>
      </section>

      <section id="avaliacoes" className="reviews section-space">
        <div className="container">
          <div className="reviews-head">
            <div><div className="section-label light"><span>05</span><i /> AVALIAÇÕES</div><h2>O que fica<br />depois da <em>entrega.</em></h2></div>
            <p>Uma boa entrega precisa ser sentida por quem usa. Aqui entram as avaliações de quem já trabalhou com a gente.</p>
          </div>
          {testimonials.length > 0 && (
            <div className="testimonial-carousel" aria-live="polite">
              <div className="testimonial-grid" key={reviewPage}>
                {testimonials.slice(reviewPage * 3, reviewPage * 3 + 3).map((t) => <article className="testimonial-card" key={t.name + t.project}><span className="quote-mark">“</span><p>{t.quote}</p><footer><strong>{t.name}</strong><small>{t.project}</small></footer></article>)}
              </div>
              {reviewPages > 1 && (
                <div className="review-controls">
                  <button type="button" onClick={() => changeReviewPage(-1)} aria-label="Ver avaliações anteriores">←</button>
                  <span><b>{String(reviewPage + 1).padStart(2, "0")}</b> / {String(reviewPages).padStart(2, "0")}</span>
                  <button type="button" onClick={() => changeReviewPage(1)} aria-label="Ver próximas avaliações">→</button>
                </div>
              )}
            </div>
          )}
          <div className="review-form-wrap">
            <div><span className="review-kicker">JÁ FOI CLIENTE?</span><h3>Conta como foi<br />o seu <em>projeto.</em></h3><p>Sua avaliação chega direto para a TresK Tecnologia e pode ser publicada aqui depois, com a sua autorização.</p></div>
            <form className="review-form" onSubmit={sendReview}>
              <label>SEU NOME<input name="reviewer" required placeholder="Como podemos identificar você?" /></label>
              <label>QUAL FOI O PROJETO?<select name="review-project" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Kort (agenda para barbearia)</option><option>Sistema personalizado</option><option>Site institucional</option><option>Convite online interativo</option><option>Outro projeto</option></select></label>
              <label>COMO FOI A EXPERIÊNCIA?<textarea name="review" required rows={4} placeholder="Escreva sua avaliação para a TresK Tecnologia" /></label>
              <button className="button button-outline" type="submit">Enviar avaliação <Arrow /></button>
              <p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da TresK Tecnologia.</p>
              {reviewSent && <p className="form-note">Abrindo conversa no WhatsApp…</p>}
            </form>
          </div>
        </div>
      </section>

      <section className="method section-space">
        <div className="container method-grid">
          <div>
            <div className="section-label light"><span>06</span><i /> COMO FUNCIONA</div>
            <h2>Boa parceria<br />tem <em>processo.</em></h2>
          </div>
          <div className="steps">
            <article><span>01</span><div><h3>Conversa</h3><p>Entendemos a sua rotina, o seu público e o problema que precisa ser resolvido.</p></div></article>
            <article><span>02</span><div><h3>Proposta e design</h3><p>Transformamos a ideia em uma proposta clara, com o visual e as telas do que vai ser construído.</p></div></article>
            <article><span>03</span><div><h3>No ar e com suporte</h3><p>Construímos, testamos com você e entregamos funcionando, com acompanhamento depois da entrega.</p></div></article>
          </div>
        </div>
      </section>

      <section id="contato" className="contact container section-space">
        <div className="contact-top"><div className="section-label"><span>07</span><i /> VAMOS COMEÇAR</div><p>Você tem uma ideia.<br />A gente coloca ela <em>no ar.</em></p></div>
        <div className="contact-grid">
          <h2>Vamos tirar o seu<br />projeto do papel<br /><em>juntos.</em></h2>
          <form onSubmit={sendBrief}>
            <label>SEU NOME<input name="name" required placeholder="Como podemos te chamar?" /></label>
            <label>EMPRESA / MARCA<input name="company" placeholder="Qual é o seu negócio?" /></label>
            <label>ME CONTA UM POUCO<textarea name="message" required placeholder="O que você precisa: sistema, site, convite?" rows={3} /></label>
            <button className="button button-dark" type="submit">Enviar mensagem <Arrow /></button>
            <p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da TresK Tecnologia.</p>
            {sent && <p className="form-note">Abrindo conversa no WhatsApp…</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <a className="brand footer-brand" href="#inicio" aria-label="TresK Tecnologia, início"><TreskLogo /></a>
          <p>Produtos e soluções digitais para negócios que querem crescer.</p>
          <div className="footer-links"><a className="contact-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><SiWhatsapp className="contact-icon whatsapp-icon" aria-hidden="true" />WhatsApp · {siteConfig.phoneDisplay}</a><a className="contact-link" href={`mailto:${siteConfig.contactEmail}`}><SiGmail className="contact-icon gmail-icon" aria-hidden="true" />{siteConfig.contactEmail}</a><a className="contact-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><SiInstagram className="contact-icon instagram-icon" aria-hidden="true" />{siteConfig.instagramHandle}</a></div>
          <small>© {new Date().getFullYear()} TresK Tecnologia. Todos os direitos reservados.</small>
          <a className="back-top" href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><SiWhatsapp className="contact-icon" aria-hidden="true" /><em>Falar no WhatsApp</em></a>
    </main>
  );
}
