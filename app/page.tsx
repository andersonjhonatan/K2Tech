"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { FiGlobe, FiMail, FiMonitor, FiSend, FiShoppingCart, FiSmartphone, FiZap } from "react-icons/fi";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { BoostifySitePreview, WeatherAppPreview } from "./components/project-coded-previews";
import { MontagemSitePreview } from "./components/project-previews";
import { showcaseProjects } from "./data/projects";
import { weatherProject } from "./data/weather-project";
import { siteConfig } from "./site-config";
import { ThemeToggle } from "./theme-toggle";
import { KortIcon, TreskLogo, TreskMark } from "./tresk-logo";

const featuredProjects = [
  showcaseProjects[0], // Montagem de Móveis
  showcaseProjects[1], // Boostify
  weatherProject,
];

const solutions = [
  { icon: FiMonitor, title: "Sistemas web sob medida", text: "Sistemas feitos para o jeito que a sua empresa trabalha, acessados de qualquer lugar.", items: ["Painéis e relatórios", "Cadastros e controles", "Acesso por perfil de usuário"] },
  { icon: FiGlobe, title: "Sites institucionais", text: "Um site rápido e profissional para a sua empresa ser encontrada e passar confiança.", items: ["Visual próprio da marca", "Pronto para o Google", "Funciona bem no celular"] },
  { icon: FiShoppingCart, title: "Lojas e páginas de venda", text: "Páginas pensadas para transformar visitas em pedidos, contatos e clientes.", items: ["Páginas de campanha", "Catálogo de produtos", "Contato direto pelo WhatsApp"] },
  { icon: FiSmartphone, title: "Aplicativos", text: "Aplicativos que instalam no celular do cliente, sem depender das lojas de app.", items: ["Android e iPhone", "Notificações no celular", "Ícone e cores da sua marca"] },
  { icon: FiZap, title: "Automação e integrações", text: "Menos trabalho manual: os seus sistemas conversando entre si e tarefas rodando sozinhas.", items: ["Integração entre sistemas", "Avisos e lembretes automáticos", "Fim das planilhas repetidas"] },
  { icon: FiSend, title: "Convites interativos", text: "Convites digitais para eventos, com confirmação de presença e todas as informações.", items: ["Confirmação de presença", "Mapa e programação", "Visual único para cada evento"] },
];

const steps = [
  ["Conversa inicial", "Entendemos a sua empresa, a rotina e o problema que precisa ser resolvido."],
  ["Proposta e escopo", "Definimos o que será feito, o prazo e o valor, tudo por escrito."],
  ["Design e aprovação", "Desenhamos as telas e você aprova o visual antes de qualquer programação."],
  ["Desenvolvimento", "Construímos em etapas e mostramos o andamento, para você acompanhar e ajustar."],
  ["Entrega e suporte", "Colocamos no ar, orientamos o uso e seguimos por perto depois da entrega."],
];

const faqs = [
  ["Quanto custa um projeto?", "Depende do que precisa ser feito. Depois da primeira conversa, enviamos uma proposta com o valor fechado, sem compromisso. Você só decide depois de saber exatamente quanto vai investir."],
  ["Quanto tempo leva para ficar pronto?", "O prazo varia com o tamanho do projeto e vai escrito na proposta. Durante o desenvolvimento, você acompanha o andamento por etapas."],
  ["Não entendo de tecnologia. Vou conseguir usar?", "Sim. Fazemos sistemas e sites simples de usar e orientamos você e a sua equipe na entrega."],
  ["O site ou sistema fica no meu nome?", "Sim. O domínio e os dados do seu negócio são seus."],
  ["E depois que o projeto é entregue?", "Seguimos por perto. Oferecemos suporte para dúvidas e ajustes, e podemos evoluir o projeto conforme a sua empresa cresce."],
  ["Os meus dados e os dos meus clientes ficam seguros?", "Sim. Todo site e sistema entregue funciona com conexão protegida (HTTPS), cada pessoa entra com o próprio acesso e os dados são tratados conforme a Lei Geral de Proteção de Dados (LGPD)."],
  ["E se der algum problema e os dados se perderem?", "Os sistemas têm cópia de segurança, para que os dados possam ser recuperados."],
  ["Vocês atendem a minha cidade?", "Sim. Atendemos online, em todo o Brasil."],
  ["Já tenho um site ou sistema. Dá para melhorar?", "Dá. Avaliamos o que já existe e indicamos se vale mais a pena melhorar ou refazer."],
];

const menuLinks = [
  ["#produtos", "Kort para barbearias"],
  ["#sobre", "Sobre a empresa"],
  ["#servicos", "Soluções"],
  ["#projetos", "Projetos"],
  ["#processo", "Como trabalhamos"],
  ["#duvidas", "Perguntas frequentes"],
  ["#contato", "Contato"],
];

const kortFeatures = [
  "Agendamento online 24h pelo link da barbearia",
  "Lista de espera que avisa o cliente quando abre uma vaga",
  "Lembretes no celular, sem custo por mensagem",
  "Painel do dono com equipe, horários e faturamento",
];

function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const kortWhatsappUrl = whatsappLink("Olá, vim pelo site da TresK Tecnologia e quero conhecer o Kort para a minha barbearia.");

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"}>↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen]);

  const [sent, setSent] = useState(false);
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
    const need = form.get("need")?.toString() || "";
    const message = form.get("message")?.toString() || "";
    setSent(true);
    openWhatsapp(`Olá, vim pelo site da TresK Tecnologia.\n\nNome: ${name || "Não informado"}\nEmpresa: ${company || "Não informada"}\nPreciso de: ${need || "Não informado"}\n\nSobre o projeto:\n${message}`);
  }

  return (
    <main>
      <header className="site-header container">
        <a className="brand" href="#inicio" aria-label="TresK Tecnologia, início"><TreskLogo /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#produtos">Kort</a>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Soluções</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
          <ThemeToggle />
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-expanded={menuOpen} aria-controls="menu-mobile"><span /><span /><span /></button>
        </div>
      </header>

      <div id="menu-mobile" className={menuOpen ? "menu-panel open" : "menu-panel"} aria-hidden={!menuOpen}>
        <div className="menu-panel-top container">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="TresK Tecnologia, início"><TreskLogo /></a>
          <button className="menu-close" type="button" onClick={closeMenu} aria-label="Fechar menu">✕</button>
        </div>
        <nav className="menu-links container" aria-label="Menu">
          {menuLinks.map(([href, label], i) => (
            <a key={href} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}><small>{String(i + 1).padStart(2, "0")}</small>{label}<Arrow /></a>
          ))}
        </nav>
        <div className="menu-panel-bottom container">
          <a className="button button-primary" href="#contato" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>Solicitar orçamento <Arrow /></a>
          <a className="menu-whatsapp" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}><SiWhatsapp aria-hidden="true" /> Falar no WhatsApp</a>
          <p>{siteConfig.contactEmail}</p>
        </div>
      </div>

      <section id="inicio" className="hero hero-corp container">
        <div className="hero-copy reveal">
          <a className="hero-chip" href="#produtos"><b>KORT</b> Agenda online para barbearias <Arrow /></a>
          <h1>Tecnologia que move<br /><em>o seu negócio.</em></h1>
          <p className="hero-text">A TresK Tecnologia desenvolve sistemas, sites e produtos digitais para empresas que querem crescer com organização, segurança e atendimento próximo.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contato">Solicitar orçamento <Arrow /></a>
            <a className="text-link" href="#produtos">Conhecer o Kort <span>↓</span></a>
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

      <section id="produtos" className="products container">
        <div className="section-label"><span>01</span><i /> KORT · PRODUTO DA TRESK</div>
        <article className="kort-card">
          <div className="kort-copy">
            <span className="kort-name"><KortIcon />Kort</span>
            <h2>A agenda online<br /><em>da sua barbearia.</em></h2>
            <p>Seus clientes marcam pelo link a qualquer hora, recebem lembrete no celular e entram na lista de espera quando a agenda está cheia. Você acompanha tudo pelo painel, com a marca da sua barbearia.</p>
            <div className="kort-actions">
              <a className="button button-light" href={kortWhatsappUrl} target="_blank" rel="noreferrer">Quero o Kort na minha barbearia <Arrow /></a>
              {siteConfig.kortLive && <a className="kort-site-link" href={siteConfig.kortUrl} target="_blank" rel="noreferrer">Ver o site do Kort <Arrow /></a>}
            </div>
            <small className="kort-note"><b>10 dias grátis</b> para testar · <b>Implantação grátis</b>: a gente configura tudo para você.</small>
          </div>
          <ul className="kort-features">
            {kortFeatures.map((feature) => <li key={feature}><b>✓</b>{feature}</li>)}
          </ul>
        </article>
      </section>

      <section id="sobre" className="about section-space">
        <div className="container">
          <div className="section-label light"><span>02</span><i /> SOBRE A EMPRESA</div>
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
        </div>
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
            <p>Sites e aplicações entregues, que estão no ar e podem ser abertos agora.</p>
          </div>
          <div className="project-grid showcase-home-grid">
            {featuredProjects.map((project) => {
              const isMontagemPreview = project.previewType === "montagem-site" && project.image;
              const isBoostifyPreview = project.className === "boostify";
              const isWeatherPreview = project.className === "weather";
              const hasCodedPreview = Boolean(isMontagemPreview || isBoostifyPreview || isWeatherPreview);
              return (
                <article className={`project-card showcase-home-card ${project.className}`} key={project.name}>
                  <div
                    className={`project-art showcase-project-art ${project.image ? "has-image" : "no-image"}`}
                    style={!hasCodedPreview && project.image ? { backgroundImage: `url(${project.image})`, backgroundPosition: project.imagePosition } : undefined}
                    role="img"
                    aria-label={`Prévia do projeto ${project.name}`}
                  >
                    {isMontagemPreview ? <MontagemSitePreview imageUrl={project.image!} /> : isBoostifyPreview ? <BoostifySitePreview /> : isWeatherPreview ? <WeatherAppPreview /> : null}
                    <div className="showcase-art-overlay" />
                    <div className="video-badge live-project-badge"><span aria-hidden="true">●</span> PROJETO REAL · ONLINE</div>
                  </div>
                  <div className="project-meta"><span>{project.category}</span><Arrow diagonal /></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="showcase-tags" aria-label="Tecnologias e características">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="showcase-home-actions">
                    {project.liveUrl && <a className="project-action project-action-live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Abrir projeto ao vivo <Arrow /></a>}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="projects-actions">
            <Link className="button button-primary" href="/projetos">Ver todos os projetos <Arrow /></Link>
            <a className="text-link" href="#contato">Quero um projeto assim <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="processo" className="process section-space">
        <div className="container">
          <div className="section-label light"><span>05</span><i /> COMO TRABALHAMOS</div>
          <div className="process-head">
            <h2>Um processo claro,<br /><em>do início ao fim.</em></h2>
            <p>Você sabe o que vai ser entregue, quando e por quanto antes de o projeto começar, e acompanha cada etapa.</p>
          </div>
          <ol className="process-steps">
            {steps.map(([title, text], i) => (
              <li key={title}>
                <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="duvidas" className="faq section-space">
        <div className="container faq-grid">
          <div>
            <div className="section-label light"><span>06</span><i /> PERGUNTAS FREQUENTES</div>
            <h2>Dúvidas<br /><em>comuns.</em></h2>
            <p>Não achou a sua resposta? Fale com a gente pelo WhatsApp.</p>
            <a className="text-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Tirar uma dúvida <Arrow /></a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="reach section-space">
        <div className="container reach-grid">
          <div className="reach-info">
            <div className="section-label light"><span>07</span><i /> CONTATO</div>
            <h2>Vamos conversar sobre<br /><em>o seu projeto.</em></h2>
            <p>Conte o que você precisa. A primeira conversa e o orçamento são sem compromisso.</p>
            <ul className="reach-channels">
              <li><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><span><SiWhatsapp aria-hidden="true" /></span><div><small>WHATSAPP</small><b>{siteConfig.phoneDisplay}</b></div></a></li>
              <li><a href={`mailto:${siteConfig.contactEmail}`}><span><FiMail aria-hidden="true" /></span><div><small>E-MAIL</small><b>{siteConfig.contactEmail}</b></div></a></li>
              <li><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><span><SiInstagram aria-hidden="true" /></span><div><small>INSTAGRAM</small><b>{siteConfig.instagramHandle}</b></div></a></li>
            </ul>
          </div>
          <form className="review-form reach-form" onSubmit={sendBrief}>
            <h3>Solicite um orçamento</h3>
            <label>SEU NOME<input name="name" required placeholder="Como podemos te chamar?" /></label>
            <label>EMPRESA<input name="company" placeholder="Nome da sua empresa ou marca" /></label>
            <label>O QUE VOCÊ PRECISA?<select name="need" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Sistema sob medida</option><option>Site institucional</option><option>Loja ou página de venda</option><option>Aplicativo</option><option>Automação ou integração</option><option>Convite interativo</option><option>Kort (agenda para barbearia)</option><option>Ainda não sei</option></select></label>
            <label>CONTE UM POUCO<textarea name="message" required placeholder="Descreva o que você quer resolver" rows={4} /></label>
            <button className="button button-primary" type="submit">Enviar pelo WhatsApp <Arrow /></button>
            <p className="form-privacy">Ao enviar, a mensagem abre no seu WhatsApp, pronta para mandar à TresK Tecnologia.</p>
            {sent && <p className="form-note">Abrindo conversa no WhatsApp…</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <a className="brand" href="#inicio" aria-label="TresK Tecnologia, início"><TreskLogo /></a>
              <p>Sistemas, sites e produtos digitais para empresas que querem crescer com organização e segurança.</p>
            </div>
            <nav aria-label="Empresa"><h4>Empresa</h4><a href="#sobre">Sobre</a><a href="#processo">Como trabalhamos</a><a href="#duvidas">Perguntas frequentes</a></nav>
            <nav aria-label="Soluções"><h4>Soluções</h4><a href="#servicos">Serviços</a><a href="#produtos">Kort</a><a href="#projetos">Projetos</a><a href="#contato">Orçamento</a></nav>
            <nav aria-label="Contato"><h4>Contato</h4><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">{siteConfig.phoneDisplay}</a><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramHandle}</a></nav>
          </div>
          <div className="site-footer-bottom">
            <small>© {new Date().getFullYear()} TresK Tecnologia. Todos os direitos reservados.</small>
            <div><Link href="/projetos">Todos os projetos</Link><Link href="/privacidade">Política de privacidade</Link><a href="#inicio">Voltar ao topo ↑</a></div>
          </div>
        </div>
      </footer>
      <a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><SiWhatsapp className="contact-icon" aria-hidden="true" /><em>Falar no WhatsApp</em></a>
    </main>
  );
}
