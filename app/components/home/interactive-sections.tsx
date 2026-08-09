"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { siteConfig } from "../../site-config";

const testimonials = [
  ["Convite de casamento", "O convite ficou lindo no celular e todo mundo conseguiu confirmar presença sem dificuldade.", "Carolina & Rafael"],
  ["Site institucional", "Finalmente conseguimos apresentar nosso trabalho com uma imagem muito mais profissional.", "Bruno Martins"],
  ["Convite de debutante", "Ficou do jeito que imaginamos: bonito, organizado e especial para enviar para a família.", "Aline Rocha"],
  ["Sistema personalizado", "A K2 entendeu nossa rotina e entregou uma solução clara, rápida e muito fácil de usar.", "Marcos Vinícius"],
  ["Convite infantil", "As crianças e os pais adoraram. Ficou divertido, simples de acessar e cheio de detalhes.", "Lívia Andrade"],
  ["Landing page", "O processo foi muito organizado e o resultado ficou muito melhor do que imaginávamos.", "Natália & Diego"],
];

function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function Arrow() { return <span className="arrow">↗</span>; }

export function ExperiencesSection() {
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const reviewPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setReviewPage((page) => (page + 1) % reviewPages), 9000);
    return () => window.clearInterval(timer);
  }, [reviewPages]);

  function changeReviewPage(direction: number) {
    setReviewPage((page) => (page + direction + reviewPages) % reviewPages);
  }

  function sendReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("reviewer")?.toString() || "";
    const project = form.get("review-project")?.toString() || "";
    const review = form.get("review")?.toString() || "";
    setReviewSent(true);
    const url = whatsappLink(`Nova avaliação recebida pelo site da K2 Tech.\n\nCliente: ${name || "Não informado"}\nProjeto: ${project || "Não informado"}\n\nAvaliação:\n${review}`);
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) window.location.href = url;
  }

  return <section id="avaliacoes" className="reviews section-space"><div className="container"><div className="reviews-head"><div><div className="section-label light"><span>03</span><i/> EXPERIÊNCIAS</div><h2>O que uma boa<br/>experiência <em>precisa entregar.</em></h2></div><p>Clareza, beleza, facilidade e atenção aos detalhes fazem parte do padrão que buscamos em cada projeto.</p></div><div className="testimonial-carousel" aria-label="Referências de experiências e resultados" aria-live="polite"><div className="testimonial-grid" key={reviewPage}>{testimonials.slice(reviewPage * 3, reviewPage * 3 + 3).map(([project, quote, name]) => <article className="testimonial-card" key={project}><span className="quote-mark" aria-hidden="true">“</span><p>{quote}</p><footer><strong>{name}</strong><small>{project}</small></footer></article>)}</div><div className="review-controls"><button type="button" onClick={() => changeReviewPage(-1)} aria-label="Ver experiências anteriores">←</button><span><b>{String(reviewPage + 1).padStart(2, "0")}</b> / {String(reviewPages).padStart(2, "0")}</span><button type="button" onClick={() => changeReviewPage(1)} aria-label="Ver próximas experiências">→</button></div></div><div className="review-form-wrap"><div><span className="review-kicker">JÁ FOI CLIENTE?</span><h3>Conta como foi<br/>o seu <em>projeto.</em></h3><p>Se você já fez um projeto com a K2 Tech, envie sua avaliação. Ela chega direto pelo WhatsApp para conferência antes da publicação.</p></div><form className="review-form" onSubmit={sendReview}><label>SEU NOME<input name="reviewer" required autoComplete="name" placeholder="Como podemos identificar você?"/></label><label>QUAL FOI O PROJETO?<select name="review-project" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Convite online interativo</option><option>Site institucional</option><option>Sistema personalizado</option><option>Outro projeto</option></select></label><label>COMO FOI A EXPERIÊNCIA?<textarea name="review" required rows={4} placeholder="Escreva sua avaliação para a K2 Tech"/></label><button className="button button-outline" type="submit">Enviar avaliação <Arrow /></button><p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da K2 Tech.</p>{reviewSent && <p className="form-note" role="status">Abrindo conversa no WhatsApp…</p>}</form></div></div></section>;
}

export function ContactSection() {
  const [sent, setSent] = useState(false);
  function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString() || "";
    const company = form.get("company")?.toString() || "";
    const message = form.get("message")?.toString() || "";
    setSent(true);
    const url = whatsappLink(`Olá, vim pelo site da K2 Tech.\n\nNome: ${name || "Não informado"}\nEmpresa ou marca: ${company || "Não informada"}\n\nSobre o projeto:\n${message}`);
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) window.location.href = url;
  }
  return <section id="contato" className="contact container section-space"><div className="contact-top"><div className="section-label"><span>06</span><i/> VAMOS COMEÇAR</div><p>Você tem um momento.<br/>A gente dá a ele <em>presença.</em></p></div><div className="contact-grid"><h2>Vamos fazer seus<br/>convidados dizerem<br/><em>“eu preciso ir”.</em></h2><form onSubmit={sendBrief}><label>SEU NOME<input name="name" required autoComplete="name" placeholder="Como podemos te chamar?"/></label><label>EMPRESA / MARCA<input name="company" autoComplete="organization" placeholder="Qual é o seu projeto ou marca?"/></label><label>CONTE UM POUCO<textarea name="message" required rows={4} placeholder="Evento, data, estilo, ideia ou o que você já tem em mente"/></label><button className="button button-dark" type="submit">Enviar briefing <Arrow /></button><p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp. Veja nossa <Link href="/privacidade">Política de Privacidade</Link>.</p>{sent && <p className="form-note" role="status">Abrindo conversa no WhatsApp…</p>}</form></div></section>;
}
