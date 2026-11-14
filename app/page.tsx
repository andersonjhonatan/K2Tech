"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FiGlobe, FiMonitor, FiSend, FiShoppingCart, FiSmartphone, FiZap } from "react-icons/fi";
import { SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { siteConfig } from "./site-config";
import { KortIcon, TreskLogo, TreskMark } from "./tresk-logo";

const projects = [
  { category: "Debutante", name: "JULIA 15", image: "/images/projects/debutante-julia-v3.png" },
  { category: "Casamento", name: "MAYA & CAIO", image: "/images/projects/casamento-maya-caio-v2.png" },
  { category: "Infantil", name: "MIGUEL 06", image: "/images/projects/infantil-miguel.png" },
  { category: "Chá revelação", name: "BABY LUNA", image: "/images/projects/cha-revelacao-luna-v2.png" },
  { category: "Evento corporativo", name: "IDEA SUMMIT", image: "/images/projects/idea-summit.png" },
];

const solutions = [
  { icon: FiMonitor, title: "Sistemas web sob medida", text: "Sistemas feitos para o jeito que a sua empresa trabalha, acessados de qualquer lugar.", items: ["Painéis e relatórios", "Cadastros e controles", "Acesso por perfil de usuário"] },
  { icon: FiGlobe, title: "Sites institucionais", text: "Um site rápido e profissional para a sua empresa ser encontrada e passar confiança.", items: ["Visual próprio da marca", "Pronto para o Google", "Funciona bem no celular"] },
  { icon: FiShoppingCart, title: "Lojas e páginas de venda", text: "Páginas pensadas para transformar visitas em pedidos, contatos e clientes.", items: ["Páginas de campanha", "Catálogo de produtos", "Contato direto pelo WhatsApp"] },
  { icon: FiSmartphone, title: "Aplicativos", text: "Aplicativos que instalam no celular do cliente, sem depender das lojas de app.", items: ["Android e iPhone", "Notificações no celular", "Ícone e cores da sua marca"] },
  { icon: FiZap, title: "Automação e integrações", text: "Menos trabalho manual: os seus sistemas conversando entre si e tarefas rodando sozinhas.", items: ["Integração entre sistemas", "Avisos e lembretes automáticos", "Fim das planilhas repetidas"] },
  { icon: FiSend, title: "Convites interativos", text: "Convites digitais para eventos, com confirmação de presença e todas as informações.", items: ["Confirmação de presença", "Mapa e programação", "Visual único para cada evento"] },
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
          <a href="#servicos">Soluções</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu"><span /><span /></summary>
          <div>
            <a href="#sobre">Sobre</a>
            <a href="#produtos">Produtos</a>
            <a href="#servicos">Soluções</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </details>
      </header>

      <section id="inicio" className="hero hero-corp container">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> SOFTWARE, SITES E PRODUTOS DIGITAIS</p>
          <h1>Tecnologia que move<br /><em>o seu negócio.</em></h1>
          <p className="hero-text">A TresK Tecnologia desenvolve sistemas, sites e produtos digitais para empresas que querem crescer com organização, segurança e atendimento próximo.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contato">Solicitar orçamento <Arrow /></a>
            <a className="text-link" href="#servicos">Conhecer as soluções <span>↓</span></a>
          </div>
          <ul className="hero-points">
            <li><b>✓</b> Projetos sob medida</li>
            <li><b>✓</b> Atendimento direto com quem desenvolve</li>
            <li><b>✓</b> Suporte depois da entrega</li>
          </ul>
        </div>
      </section>

      <section className="trust container" aria-label="Por que a TresK">
        <div className="trust-grid">
          <article><span>01</span><h3>Sob medida</h3><p>Cada projeto é desenhado para a rotina e o tamanho da sua empresa.</p></article>
          <article><span>02</span><h3>Atendimento direto</h3><p>Você conversa com quem desenvolve, sem intermediários.</p></article>
          <article><span>03</span><h3>Segurança</h3><p>Conexão protegida, cópias de segurança e cuidado com os dados (LGPD).</p></article>
          <article><span>04</span><h3>Suporte contínuo</h3><p>Acompanhamento depois da entrega, para o sistema seguir funcionando.</p></article>
        </div>
        <div className="segments"><small>SOLUÇÕES PARA</small>{["Comércio", "Serviços", "Saúde e beleza", "Eventos", "Educação", "Indústria"].map((seg) => <span key={seg}>{seg}</span>)}</div>
      </section>

      <section id="sobre" className="about section-space">
        <div className="container">
          <div className="section-label light"><span>01</span><i /> SOBRE A EMPRESA</div>
          <div className="about-grid">
            <div className="about-copy">
              <h2>Uma empresa de tecnologia<br /><em>feita para durar.</em></h2>
              <p className="lead">A TresK Tecnologia desenvolve software para empresas que precisam de tecnologia confiável, sem complicação e com alguém por perto para resolver.</p>
              <p>Trabalhamos do planejamento ao suporte: entendemos a operação, desenhamos a solução, desenvolvemos e continuamos ao lado do cliente depois que o projeto entra no ar. Cada entrega carrega o nosso nome, por isso tratamos o sistema de cada cliente como se fosse nosso.</p>
              <div className="about-founder"><b>Anderson Jhonatan</b><span>Fundador e CEO</span></div>
            </div>
            <aside className="about-symbol">
              <TreskMark className="about-mark" stems="#f5f5f7" />
              <h3>Três hastes, uma só linha.</h3>
              <p>O símbolo da TresK são três hastes do mesmo tamanho, unidas por uma linha que atravessa as três e forma o K. Ele representa união e direção: uma só família, uma só empresa, sempre apontando para frente.</p>
            </aside>
          </div>
          <div className="about-pillars">
            <article><span>MISSÃO</span><p>Colocar tecnologia de qualidade ao alcance de empresas de todos os tamanhos, de forma simples e segura.</p></article>
            <article><span>VISÃO</span><p>Ser a parceira de tecnologia em que os nossos clientes confiam para crescer, ano após ano.</p></article>
            <article><span>VALORES</span><ul><li>Proximidade com o cliente</li><li>Clareza no que é combinado</li><li>Qualidade em cada detalhe</li><li>Compromisso com o prazo</li></ul></article>
          </div>
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

      <section id="servicos" className="solutions container section-space">
        <div className="section-label"><span>03</span><i /> SOLUÇÕES</div>
        <div className="solutions-head">
          <h2>Tudo o que a sua empresa<br />precisa <em>no digital.</em></h2>
          <p>Do primeiro site ao sistema que organiza a operação inteira. Você escolhe por onde começar, e a gente cuida do resto.</p>
        </div>
        <div className="solutions-grid">
          {solutions.map(({ icon: Icon, title, text, items }) => (
            <article className="solution-card" key={title}>
              <span className="solution-icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="solutions-cta">
          <p>Não achou o que procura? Conte o que você precisa e montamos a solução.</p>
          <a className="button button-primary" href="#contato">Falar com um especialista <Arrow /></a>
        </div>
      </section>

      <section id="projetos" className="projects section-space">
        <div className="container">
          <div className="section-heading">
            <div className="section-label light"><span>04</span><i /> PROJETOS</div>
            <h2>Trabalhos que já<br /><em>saíram do papel.</em></h2>
            <p>Um produto próprio em operação e experiências digitais criadas para eventos.</p>
          </div>
          <div className="featured-grid">
            <article className="featured-card">
              <div className="featured-art kort-art" aria-hidden="true"><KortIcon className="featured-kort-icon" /><strong>Kort</strong><span>PRODUTO PRÓPRIO</span></div>
              <div className="featured-body">
                <small>SISTEMA WEB + APLICATIVO</small>
                <h3>Kort, agenda online para barbearias</h3>
                <p>Plataforma completa criada pela TresK: agendamento pelo link, lista de espera, lembretes no celular, galeria de trabalhos e painel de gestão com a marca de cada barbearia.</p>
                <ul className="tags"><li>Várias empresas no mesmo sistema</li><li>Aplicativo instalável</li><li>Notificações</li><li>Painel de gestão</li></ul>
                <a className="project-action" href={siteConfig.kortUrl} target="_blank" rel="noreferrer">Conhecer o Kort <Arrow /></a>
              </div>
            </article>
            <article className="featured-card">
              <div className="featured-art" aria-hidden="true"><video className="project-video" autoPlay loop muted playsInline preload="metadata"><source src="/videos/convite-interativo-preview.mp4" type="video/mp4" /></video><div className="video-badge"><span>●</span> PROJETO REAL</div></div>
              <div className="featured-body">
                <small>EXPERIÊNCIA DIGITAL</small>
                <h3>Convite online interativo</h3>
                <p>Convite digital feito para um evento real, com animações, informações do evento e confirmação de presença direto pelo celular.</p>
                <ul className="tags"><li>Confirmação de presença</li><li>Mapa e programação</li><li>Visual exclusivo</li></ul>
                <a className="project-action" href={whatsappLink("Olá, vim pelo site da TresK Tecnologia e gostaria de um convite online interativo.")} target="_blank" rel="noreferrer">Quero algo assim <Arrow /></a>
              </div>
            </article>
          </div>
          <div className="concepts-head"><h3>Conceitos visuais</h3><p>Estudos de design criados pela TresK para diferentes tipos de evento.</p></div>
          <div className="concept-grid">
            {projects.map((project) => (
              <a className="concept-card" key={project.name} href={whatsappLink(`Olá, vim pelo site da TresK Tecnologia e gostei do conceito ${project.name}. Gostaria de criar algo nesse estilo.`)} target="_blank" rel="noreferrer" aria-label={`Conversar sobre um projeto como ${project.name}`}>
                <div className="concept-art"><Image src={project.image} alt="" fill sizes="(max-width: 760px) 50vw, 20vw" /></div>
                <span>{project.category}</span>
                <strong>{project.name}</strong>
              </a>
            ))}
          </div>
          <a className="button button-primary all-projects" href="#contato">Quero um projeto assim <Arrow /></a>
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
