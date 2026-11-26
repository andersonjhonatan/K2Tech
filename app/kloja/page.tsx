import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiCheck,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiDatabase,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";
import { siteConfig } from "../site-config";
import { TreskMark } from "../tresk-logo";
import { KlojaTag, KlojaWordmark } from "./kloja-logo";
import Hero3D from "./hero-3d";
import { CadernoSlider, DayStory, PageFx } from "./fx";
import s from "./kloja.module.css";

export const metadata: Metadata = {
  title: "KLOJA | Sistema para lojas: vitrine online, caixa, estoque e crediário",
  description:
    "KLOJA, da TresK Tecnologia: vitrine online, caixa (PDV), estoque, crediário e clientes num sistema só. ERP e CRM para lojas de roupa e lojas do interior.",
  keywords: ["sistema para loja de roupa", "sistema de crediário", "PDV", "ERP para loja", "CRM para loja", "loja virtual", "KLOJA", "TresK Tecnologia"],
  alternates: { canonical: "/kloja" },
  openGraph: {
    title: "KLOJA: a loja inteira num sistema só",
    description: "Vitrine online, caixa, estoque, crediário e clientes. Da TresK Tecnologia.",
    url: "/kloja",
    type: "website",
  },
};

const wa = (msg: string) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
const ctaDemo = wa("Olá! Vi o site do KLOJA e quero ver uma demonstração para a minha loja.");
const ctaOrc = wa("Olá! Quero um orçamento do KLOJA para a minha loja.");

/** Mostra a abertura só na primeira visita da sessão e nunca para quem pediu menos movimento. */
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('kl-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('kl-seen')}sessionStorage.setItem('kl-intro','1')}catch(e){}`;

const dores = [
  { n: "001", t: "Fiado no caderno", d: "Página rasgada, letra apagada, e ninguém sabe ao certo quem deve quanto.", v: "R$ ???" },
  { n: "002", t: "Estoque na cabeça", d: "“Tem o 2 anos em azul?” Só olhando a prateleira, e às vezes nem assim.", v: "?? un." },
  { n: "003", t: "Instagram virou balcão", d: "“Quanto custa?”, “tem no M?”. Você responde uma por uma, o dia inteiro.", v: "∞ msg" },
];

const passos = [
  { hora: "08:00", titulo: "Abre a loja", texto: "O painel já mostra o que vence hoje no crediário e o que está acabando no estoque." },
  { hora: "10:30", titulo: "Venda no balcão", texto: "Pix, cartão, dinheiro ou crediário. O estoque baixa sozinho na hora." },
  { hora: "14:00", titulo: "A cliente na vitrine", texto: "Ela abre o link da sua loja e vê o macacão no tamanho certo, sem precisar perguntar." },
  { hora: "16:20", titulo: "Parcela paga", texto: "A ficha da cliente atualiza e o crediário mostra quem está em dia." },
  { hora: "18:00", titulo: "Fecha o caixa", texto: "Quanto entrou no dia, por forma de pagamento, e o que mais vendeu." },
];

function Screens() {
  return [
    <div key="a" className={s.scr}>
      <small className={s.scrLbl}>Bom dia, loja</small>
      <b className={s.scrBig}>3 parcelas vencem hoje</b>
      <ul className={s.scrList}>
        <li><span>Ana Paula</span><em className={s.tWarn}>R$ 45,00</em></li>
        <li><span>Cícera L.</span><em className={s.tWarn}>R$ 60,00</em></li>
        <li><span>Joana M.</span><em className={s.tWarn}>R$ 32,50</em></li>
      </ul>
      <div className={s.scrAlert}><FiBox /> Body manga longa · tam. M acabando</div>
    </div>,
    <div key="b" className={s.scr}>
      <small className={s.scrLbl}>Caixa</small>
      <ul className={s.scrList}>
        <li><span>Macacão plush · G</span><em>69,90</em></li>
        <li><span>Meia kit 3 pares</span><em>19,90</em></li>
      </ul>
      <div className={s.scrTotal}><span>Total</span><b>R$ 89,80</b></div>
      <div className={s.scrPays}><i className={s.payOn}>Pix</i><i>Cartão</i><i>Dinheiro</i><i>Crediário</i></div>
      <div className={s.scrBtn}>Finalizar venda</div>
    </div>,
    <div key="c" className={s.scr}>
      <small className={s.scrLbl}>sualoja.kloja · vitrine</small>
      <div className={s.scrGrid}>
        {["#E9D7B0", "#2A2C33", "#C9D6F7", "#F1E6CF"].map((c, i) => (
          <div key={c} className={s.scrPiece}>
            <i style={{ background: c }}><svg viewBox="0 0 60 60" width="34" height="34"><path d="M20 10h20l10 8-6 8-4-3v25H20V23l-4 3-6-8Z" fill={i === 1 ? "#C8A96A" : "#fff"} opacity=".92" /></svg></i>
            <span>{["Macacão", "Conjunto", "Body", "Vestido"][i]}</span>
            <b>R$ {["69,90", "54,90", "39,90", "59,90"][i]}</b>
          </div>
        ))}
      </div>
    </div>,
    <div key="d" className={s.scr}>
      <small className={s.scrLbl}>Cliente</small>
      <b className={s.scrBig}>Ana Paula</b>
      <div className={s.scrBar}><i style={{ width: "66%" }} /></div>
      <small className={s.scrMuted}>4 de 6 parcelas pagas</small>
      <div className={s.scrOk}><FiCheck /> Parcela 4 paga no Pix · 16:20</div>
      <ul className={s.scrList}>
        <li><span>Última compra</span><em>Conjunto · 2 anos</em></li>
      </ul>
    </div>,
    <div key="e" className={s.scr}>
      <small className={s.scrLbl}>Fechamento do dia</small>
      <b className={s.scrBig}>R$ 1.284,00</b>
      <div className={s.scrBars}>
        {[["Pix", 48], ["Cartão", 24], ["Crediário", 30], ["Dinheiro", 12]].map(([n, h]) => (
          <div key={n}><i style={{ height: `${Number(h) * 1.6}px` }} /><span>{n}</span></div>
        ))}
      </div>
      <small className={s.scrMuted}>Mais vendido: Macacão plush</small>
    </div>,
  ];
}

const mcPassos = [
  { hora: "1 de 7", titulo: "O app com a marca da sua loja", texto: "A cliente abre o Meu Crediário com o nome e as cores da sua loja e vê na hora quanto está em aberto." },
  { hora: "2 de 7", titulo: "Todas as parcelas num lugar", texto: "O que já foi pago, o que está em aberto e o que vence nos próximos meses, sem precisar perguntar." },
  { hora: "3 de 7", titulo: "Paga a parcela no Pix", texto: "QR Code ou Pix copia e cola, direto do celular. Sem ir até a loja e sem esperar o fim do mês." },
  { hora: "4 de 7", titulo: "Parcela paga na hora", texto: "Assim que o Pix cai, a parcela fica paga sozinha, no app da cliente e no painel da loja." },
  { hora: "5 de 7", titulo: "Histórico de compras", texto: "Cada compra no crediário com a data, as parcelas e o que já foi quitado." },
  { hora: "6 de 7", titulo: "Contrato e comprovantes", texto: "O contrato do crediário e os comprovantes ficam guardados no app, sempre à mão." },
  { hora: "7 de 7", titulo: "E você vê tudo no painel", texto: "Quem pagou, quem vence esta semana e quem está atrasada, numa tela só da sua loja." },
];

function McTop({ title, tag }: { title: string; tag: string }) {
  return <div className={s.mcTop}><span className={s.mcStore}><KlojaTag size={16} id={`mt-${tag}`} /> {title}</span><small>{tag}</small></div>;
}

function McScreens() {
  return [
    <div key="1" className={s.mcIn}>
      <McTop title="Sua Loja" tag="Início" />
      <small className={s.mcHi}>Olá, Ana Paula</small>
      <div className={s.mcCard}><small>Em aberto</small><b>R$ 90,00</b><div className={s.mcProg}><i style={{ width: "66%" }} /></div><small>4 de 6 parcelas pagas</small></div>
      <div className={s.mcNext}><div><small>Próxima parcela</small><b>R$ 45,00</b><span>vence 05/12</span></div><em>Pagar com Pix</em></div>
    </div>,
    <div key="2" className={s.mcIn}>
      <McTop title="Parcelas" tag="Conjunto" />
      <ul className={s.mcList}>
        {[["1/6 · 05/07", "Paga", s.tOk], ["2/6 · 05/08", "Paga", s.tOk], ["3/6 · 05/09", "Paga", s.tOk], ["4/6 · 05/11", "Paga", s.tOk], ["5/6 · 05/12", "Em aberto", s.tWarn], ["6/6 · 05/01", "A vencer", ""]].map(([n, st, c]) => (
          <li key={n}><span>Parcela {n}</span><i className={c}>{st}</i></li>
        ))}
      </ul>
    </div>,
    <div key="3" className={s.mcIn}>
      <McTop title="Pagar parcela" tag="5 de 6" />
      <b className={s.mcVal}>R$ 45,00</b>
      <svg className={s.mcQr} viewBox="0 0 25 25" aria-hidden="true">
        <rect width="25" height="25" fill="#f5f5f7" />
        {qrCells().map(([x, y]) => <rect key={`${x}-${y}`} x={x + 2} y={y + 2} width="1" height="1" fill="#0b0b0c" />)}
      </svg>
      <div className={s.mcCopy}>Pix copia e cola</div>
    </div>,
    <div key="4" className={s.mcIn}>
      <McTop title="Pagamento" tag="Pix" />
      <div className={s.mcDone}><span><FiCheck /></span><b>Parcela paga!</b><small>Parcela 5 de 6 · R$ 45,00</small></div>
      <div className={s.mcCard}><small>Em aberto agora</small><b>R$ 45,00</b><div className={s.mcProg}><i style={{ width: "83%" }} /></div><small>5 de 6 parcelas pagas</small></div>
    </div>,
    <div key="5" className={s.mcIn}>
      <McTop title="Minhas compras" tag="Histórico" />
      <ul className={s.mcList}>
        <li><span>Conjunto · 2 anos<small>12/10 · 6x de R$ 45,00</small></span><i className={s.tWarn}>1 aberta</i></li>
        <li><span>Macacão plush<small>03/08 · 3x de R$ 23,30</small></span><i className={s.tOk}>Quitada</i></li>
        <li><span>Kit body 3 peças<small>15/05 · 2x de R$ 39,90</small></span><i className={s.tOk}>Quitada</i></li>
      </ul>
    </div>,
    <div key="6" className={s.mcIn}>
      <McTop title="Documentos" tag="Seus papéis" />
      <div className={s.mcDocs}>
        <span><FiFileText /> Contrato do crediário</span>
        <span><FiFileText /> Comprovante · Conjunto 2 anos</span>
        <span><FiFileText /> Comprovante · Macacão plush</span>
        <span><FiFileText /> Recibo · Parcela 5 de 6</span>
      </div>
    </div>,
    <div key="7" className={s.mcIn}>
      <small className={s.scrLbl}>Painel da loja · Crediário</small>
      <b className={s.scrBig}>Esta semana</b>
      <ul className={s.scrList}>
        <li><span>Ana Paula</span><em className={s.tOk}>Pagou no Pix</em></li>
        <li><span>Cícera L.</span><em className={s.tWarn}>Vence sex</em></li>
        <li><span>Maria José</span><em className={s.tLate}>2 dias</em></li>
        <li><span>Joana M.</span><em className={s.tOk}>Em dia</em></li>
      </ul>
    </div>,
  ];
}

const modulos = [
  { i: <FiShoppingBag />, t: "Vitrine online", d: "A sua loja no celular da cliente, com foto, tamanho, cor e preço. Um link para mandar no WhatsApp e no Instagram.", big: true },
  { i: <FiCreditCard />, t: "Caixa (PDV)", d: "Venda no balcão em segundos, com Pix, cartão, dinheiro e crediário." },
  { i: <FiBox />, t: "Estoque", d: "Cada peça por departamento, tamanho e cor. Vendeu, baixou." },
  { i: <FiBookOpen />, t: "Crediário próprio", d: "Parcelas, vencimentos e contrato pronto para a cliente assinar. E a sua cliente acompanha tudo pelo app Meu Crediário.", big: true },
  { i: <FiUsers />, t: "Clientes", d: "O que cada uma comprou, quanto deve e o que costuma levar." },
  { i: <FiBarChart2 />, t: "Relatórios", d: "O que entrou, o que mais vendeu e o que está parado." },
];

const publicos = ["Roupa infantil e de bebê", "Moda feminina", "Moda masculina", "Calçados", "Moda praia", "Fitness", "Acessórios", "Bijuterias", "Presentes", "Cosméticos", "Enxoval", "Cama, mesa e banho"];

const faq = [
  { q: "O KLOJA é ERP ou CRM?", a: "Os dois. A parte de dentro da loja (caixa, estoque, financeiro) é o que se chama de ERP. A parte do relacionamento com a cliente (cadastro, histórico, crediário, cobrança) é o que se chama de CRM. No KLOJA as duas são um sistema só." },
  { q: "Preciso entender de tecnologia?", a: "Não. A TresK entrega o sistema configurado com as suas peças, mostra como usar e fica por perto no começo." },
  { q: "Tenho tudo num caderno. Dá para passar para o sistema?", a: "Dá. A gente ajuda a cadastrar as clientes do crediário e as parcelas que estão em aberto, para você começar sem perder nada." },
  { q: "A minha cliente consegue ver as parcelas?", a: "Consegue. Pelo Meu Crediário, com a marca da sua loja, ela vê o que está em aberto, quando vence, paga a parcela no Pix e guarda o contrato e os comprovantes." },
  { q: "Funciona no celular?", a: "Sim. A vitrine foi feita para o celular da cliente, e o painel abre no computador, no tablet ou no celular." },
  { q: "Quanto custa?", a: "Uma implantação e uma mensalidade, com preço pensado para loja de cidade do interior. Chame no WhatsApp e conte como é a sua loja: o orçamento sai sem compromisso." },
  { q: "Atende fora de Ibimirim?", a: "Sim. A implantação e o suporte podem ser todos online." },
];


/** Desenho de QR Code ilustrativo (não é um Pix de verdade): três quadrados-guia e um miolo fixo. */
function qrCells() {
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => {
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const edge = i === 0 || j === 0 || i === 6 || j === 6;
      const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (edge || core) cells.push([x + i, y + j]);
    }
  };
  finder(0, 0);
  finder(14, 0);
  finder(0, 14);
  for (let x = 0; x < 21; x++) for (let y = 0; y < 21; y++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    if (!inFinder && ((x * 7 + y * 13 + x * y) % 5 === 0 || (x * 3 + y * 5) % 7 === 1)) cells.push([x, y]);
  }
  return cells;
}

export default function KlojaPage() {
  return (
    <main className={s.page}>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <PageFx />

      {/* ABERTURA: a porta de enrolar da loja subindo */}
      <div id="kl-intro" className={s.intro} aria-hidden="true">
        <div className={s.introLight} />
        <div className={s.door}>
          <div className={s.doorCenter}>
            <span className={s.introTag}><KlojaTag size={92} id="kli" /></span>
            <span className={s.introWord}>{"KLOJA".split("").map((c, i) => <i key={i} style={{ animationDelay: `${0.35 + i * 0.09}s` }}>{c}</i>)}</span>
            <small className={s.introSub}>08:00 · abrindo a loja</small>
          </div>
          <div className={s.doorHandle} />
        </div>
        <button id="kl-skip" type="button" className={s.skip}>Pular</button>
      </div>

      <header className={s.nav}>
        <div className={s.wrap}>
          <KlojaWordmark size={32} />
          <nav className={s.navLinks} aria-label="Seções">
            <a href="#um-dia">Um dia na loja</a>
            <a href="#o-que-faz">O que faz</a>
            <a href="#meu-crediario">Meu Crediário</a>
            <a href="#erp-crm">ERP ou CRM?</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className={s.navCta} href={ctaDemo} target="_blank" rel="noopener noreferrer">Ver demonstração</a>
        </div>
      </header>

      {/* HERO */}
      <section className={s.hero}>
        <Hero3D className={s.canvas} />
        <div className={s.heroScrim} aria-hidden="true" />
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={`${s.wrap} ${s.heroIn}`}>
          <span className={s.eyebrow}><i className={s.blueDot} /> Sistema para lojas · por TresK Tecnologia</span>
          <h1 className={s.h1}>
            <span className={s.line}><span>A loja inteira</span></span>
            <span className={s.line}><span className={s.goldText}>num sistema só.</span></span>
          </h1>
          <p className={s.lead}>Vitrine online, caixa, estoque, crediário e clientes falando a mesma língua. Vendeu no balcão: baixa o estoque, cai na ficha da cliente e aparece no fechamento do dia.</p>
          <div className={s.ctas}>
            <a className={s.btnGold} href={ctaDemo} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Quero ver funcionando</a>
            <a className={s.btnGhost} href="#um-dia">Ver um dia na loja <FiArrowRight /></a>
          </div>
          <dl className={s.facts}>
            <div><dt>6</dt><dd>partes da loja</dd></div>
            <div><dt>1</dt><dd>sistema só</dd></div>
            <div><dt>0</dt><dd>caderno</dd></div>
          </dl>
        </div>
        <a href="#dores" className={s.scrollHint} aria-label="Rolar para baixo"><span /></a>
      </section>

      {/* MARQUEE */}
      <div className={s.marquee} aria-label="Tipos de loja atendidos">
        <div className={s.marqueeTrack}>
          {[...publicos, ...publicos].map((p, i) => <span key={i} aria-hidden={i >= publicos.length}>{p}<KlojaTag size={18} id={`mq${i}`} /></span>)}
        </div>
      </div>

      {/* DORES: cupons */}
      <section id="dores" className={s.section}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Soa familiar?</span>
            <h2 className={s.h2}>Loja boa, <span className={s.goldText}>controle no improviso.</span></h2>
          </div>
          <div className={s.receipts}>
            {dores.map((d, i) => (
              <article key={d.n} className={s.receipt} data-rv style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className={s.rcHead}><span>CUPOM Nº {d.n}</span><span>LOJA SEM SISTEMA</span></div>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
                <div className={s.rcTotal}><span>PREJUÍZO</span><b>{d.v}</b></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UM DIA NA LOJA */}
      <section id="um-dia" className={`${s.section} ${s.sectionDark}`}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Um dia na loja com o KLOJA</span>
            <h2 className={s.h2}>Das 8h às 18h, <span className={s.goldText}>tudo no lugar.</span></h2>
          </div>
          <DayStory steps={passos} screens={Screens()} classes={s} />
        </div>
      </section>

      {/* MÓDULOS: bento */}
      <section id="o-que-faz" className={s.section}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>O que o KLOJA faz</span>
            <h2 className={s.h2}>Seis partes da loja. <span className={s.goldText}>Um lugar só.</span></h2>
          </div>
          <div className={s.bento}>
            {modulos.map((m, i) => (
              <article key={m.t} className={`${s.tile} ${m.big ? s.tileBig : ""}`} data-spot data-rv style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <span className={s.tileIcon}>{m.i}</span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
                {m.big && i === 0 && (
                  <div className={s.tileArt} aria-hidden="true">
                    {["#E9D7B0", "#C9D6F7", "#2A2C33"].map((c) => <i key={c} style={{ background: c }} />)}
                  </div>
                )}
                {m.big && i === 3 && (
                  <div className={s.tileInst} aria-hidden="true">
                    {[1, 2, 3, 4, 5, 6].map((n) => <i key={n} className={n <= 4 ? s.paid : ""}>{n}</i>)}
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className={s.soon} data-rv>
            <span className={s.soonLbl}>Em breve</span>
            <span><FiFileText /> Nota fiscal (NFC-e) direto do caixa</span>
          </div>
        </div>
      </section>

      {/* ERP + CRM */}
      <section id="erp-crm" className={`${s.section} ${s.sectionDark}`}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>ERP ou CRM?</span>
            <h2 className={s.h2}>Os dois. <span className={s.goldText}>Juntos, viram KLOJA.</span></h2>
          </div>
          <div className={s.merge} data-rv>
            <div className={`${s.half} ${s.halfL}`}>
              <span className={s.sig}>ERP</span>
              <h3>A parte de dentro da loja</h3>
              <p>O que faz a loja funcionar.</p>
              <ul><li><FiCheck /> Caixa e formas de pagamento</li><li><FiCheck /> Estoque por tamanho e cor</li><li><FiCheck /> Relatórios de venda</li></ul>
            </div>
            <div className={s.mergeCore}><KlojaTag size={64} id="klm" /><b>KLOJA</b></div>
            <div className={`${s.half} ${s.halfR}`}>
              <span className={s.sig}>CRM</span>
              <h3>A parte da cliente</h3>
              <p>O que faz a cliente voltar.</p>
              <ul><li><FiCheck /> Ficha e histórico da cliente</li><li><FiCheck /> Crediário com parcelas e contrato</li><li><FiCheck /> Vitrine para comprar de novo</li></ul>
            </div>
          </div>
          <p className={s.mergeNote} data-rv>A venda do balcão já baixa o estoque <i>e</i> já aparece na ficha da cliente. Sem digitar duas vezes.</p>
        </div>
      </section>

      {/* CREDIÁRIO: antes e depois */}
      <section className={s.section}>
        <div className={`${s.wrap} ${s.credGrid}`}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Crediário</span>
            <h2 className={s.h2}>O caderno se <span className={s.goldText}>aposenta.</span></h2>
            <p className={s.sub}>Arraste e compare. O mesmo crediário, do jeito que está hoje e do jeito que fica no KLOJA: quem pagou, quem vence esta semana e quem está atrasada.</p>
          </div>
          <div data-rv>
            <CadernoSlider
              classes={s}
              before={
                <div className={s.paper}>
                  <b>Fiado · Novembro</b>
                  <p>Ana Paula ...... 45,00 <s>pg?</s></p>
                  <p>Cícera ........ 60 (2x?)</p>
                  <p>Joana M ...... 32,50 ✓</p>
                  <p>Maria José ... ~~ 80,00</p>
                  <p>Dona Lia ..... ver c/ ela</p>
                </div>
              }
              after={
                <div className={s.ledger}>
                  <b>Crediário · esta semana</b>
                  {[["Ana Paula", "Pago", s.tOk], ["Cícera L.", "Vence sex", s.tWarn], ["Joana M.", "Pago", s.tOk], ["Maria José", "2 dias", s.tLate], ["Lia S.", "Vence seg", s.tWarn]].map(([n, st, c]) => (
                    <div key={n} className={s.ledgerRow}><span>{n}</span><em className={c}>{st}</em></div>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* MEU CREDIÁRIO: celular fixo + checklist que troca a tela */}
      <section id="meu-crediario" className={`${s.section} ${s.sectionDark}`}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Meu Crediário</span>
            <h2 className={s.h2}>O crediário da sua loja <span className={s.goldText}>no celular da sua cliente.</span></h2>
            <p className={s.sub}>Toda loja que usa o KLOJA ganha o Meu Crediário com a sua marca. Role a lista e veja, tela por tela, o que a sua cliente tem e o que você vê do outro lado.</p>
          </div>
          <DayStory steps={mcPassos} screens={McScreens()} classes={s} />
        </div>
      </section>

      {/* CASE */}
      <section id="divina-baby" className={`${s.section} ${s.case}`}>
        <div className={s.wrap}>
          <div className={s.caseBox} data-rv>
            <div>
              <span className={s.kicker}>Nasceu numa loja de verdade</span>
              <h2 className={s.h2}>O KLOJA nasce dentro da <span className={s.goldText}>Divina Baby</span>, em Ibimirim.</h2>
              <p className={s.sub}>A Divina Baby é uma loja de roupa de bebê no Sertão de Pernambuco. É lá que a TresK constrói o KLOJA, e cada função passa pelo balcão da Divina Baby antes de chegar na sua loja.</p>
              <a className={s.btnGhost} href={ctaDemo} target="_blank" rel="noopener noreferrer">Quero o mesmo na minha loja <FiArrowRight /></a>
            </div>
            <div className={s.pilot}>
              <span className={s.pilotLbl}>Loja-piloto</span>
              <b>Divina Baby</b>
              <small>Roupa de bebê · Ibimirim-PE</small>
              <ul>
                <li><FiCheck /> Vitrine online</li>
                <li><FiCheck /> Caixa (PDV)</li>
                <li><FiCheck /> Estoque por departamento, tamanho e cor</li>
                <li><FiCheck /> Crediário próprio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className={`${s.section} ${s.sectionDark}`}>
        <div className={s.wrap}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Segurança</span>
            <h2 className={s.h2}>Os dados da sua loja <span className={s.goldText}>só com você.</span></h2>
          </div>
          <div className={s.safe}>
            {[
              [<FiLock key="l" />, "Cada loja no seu canto", "Uma loja nunca enxerga os dados de outra."],
              [<FiShield key="s" />, "Regras no servidor", "Plano, preço e permissões são conferidos no servidor, não só na tela."],
              [<FiDatabase key="d" />, "Cópia de segurança", "O banco de dados tem cópia, e os dados das clientes seguem a LGPD."],
            ].map(([i, t, d], k) => (
              <div key={k} className={s.safeItem} data-rv style={{ transitionDelay: `${k * 0.1}s` }}>
                <span>{i}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className={s.section}>
        <div className={`${s.wrap} ${s.faqWrap}`}>
          <div className={s.head} data-rv>
            <span className={s.kicker}>Dúvidas</span>
            <h2 className={s.h2}>Perguntas que todo <span className={s.goldText}>lojista faz.</span></h2>
          </div>
          <div className={s.faq}>
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.final}>
        <div className={s.finalDoor} aria-hidden="true" />
        <div className={`${s.wrap} ${s.finalIn}`} data-rv>
          <KlojaTag size={72} id="klf" />
          <h2 className={s.h2}>Bora tirar a sua loja <span className={s.goldText}>do caderno?</span></h2>
          <p className={s.sub}>A gente mostra o KLOJA funcionando, com peças parecidas com as suas. Sem compromisso.</p>
          <div className={s.ctas}>
            <a className={s.btnGold} href={ctaOrc} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Pedir orçamento</a>
            <a className={s.btnGhost} href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /> {siteConfig.instagramHandle}</a>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <div className={`${s.wrap} ${s.footTop}`}>
          <div className={s.footAbout}>
            <KlojaWordmark size={30} />
            <p>Sistema para lojas: vitrine online, caixa, estoque, crediário e clientes num lugar só.</p>
            <a className={s.btnGold} href={ctaOrc} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Falar com um especialista</a>
          </div>
          <nav className={s.footCol} aria-label="KLOJA">
            <h4>KLOJA</h4>
            <a href="#um-dia">Um dia na loja</a>
            <a href="#o-que-faz">O que faz</a>
            <a href="#meu-crediario">Meu Crediário</a>
            <a href="#erp-crm">ERP ou CRM?</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div className={s.footCol}>
            <h4>Atendimento</h4>
            <a href={ctaDemo} target="_blank" rel="noopener noreferrer">WhatsApp · {siteConfig.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {siteConfig.instagramHandle}</a>
            <span>Implantação e suporte online para todo o Brasil</span>
          </div>
          <div className={s.footCol}>
            <h4>Empresa</h4>
            <Link href="/">TresK Tecnologia</Link>
            <Link href="/privacidade">Política de privacidade</Link>
            <span>Ibimirim · Sertão de Pernambuco</span>
          </div>
        </div>
        <div className={`${s.wrap} ${s.footBottom}`}>
          <span>© {new Date().getFullYear()} TresK Tecnologia. Todos os direitos reservados.</span>
          <Link href="/" className={s.footBrand}><TreskMark className={s.footMark} stems="#f5f5f7" /> Um produto TresK Tecnologia</Link>
        </div>
      </footer>
    </main>
  );
}
