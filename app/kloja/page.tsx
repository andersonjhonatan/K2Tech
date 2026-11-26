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
  FiHeart,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";
import { siteConfig } from "../site-config";
import { TreskMark } from "../tresk-logo";
import { KlojaTag, KlojaWordmark } from "./kloja-logo";
import s from "./kloja.module.css";

export const metadata: Metadata = {
  title: "KLOJA | Sistema para lojas: vitrine online, caixa, estoque e crediário",
  description:
    "KLOJA, da TresK Tecnologia: vitrine online, caixa (PDV), estoque, crediário e clientes num sistema só. Feito para lojas de roupa e lojas do interior.",
  keywords: ["sistema para loja de roupa", "sistema de crediário", "PDV", "ERP para loja", "CRM para loja", "loja virtual", "KLOJA", "TresK Tecnologia"],
  alternates: { canonical: "/kloja" },
  openGraph: {
    title: "KLOJA: a sua loja inteira num sistema só",
    description: "Vitrine online, caixa, estoque, crediário e clientes. Da TresK Tecnologia.",
    url: "/kloja",
    type: "website",
  },
};

const wa = (msg: string) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
const ctaDemo = wa("Olá! Vi o site do KLOJA e quero ver uma demonstração para a minha loja.");
const ctaOrc = wa("Olá! Quero um orçamento do KLOJA para a minha loja.");

const dores = [
  { t: "O fiado mora num caderno", d: "Página rasgada, letra ilegível, e ninguém sabe ao certo quem está devendo quanto." },
  { t: "O estoque mora na sua cabeça", d: "“Tem o 2 anos em azul?” Só olhando a prateleira, e às vezes nem assim." },
  { t: "O Instagram vira balcão", d: "Toda hora chega “quanto custa?” e “tem no tamanho M?”. Você responde um por um." },
];

const modulos = [
  { i: <FiShoppingBag />, t: "Vitrine online", d: "Sua loja no celular da cliente: fotos, tamanhos, cores e preço, com o link da sua loja para mandar no WhatsApp e no Instagram.", tag: "Vende sozinho" },
  { i: <FiCreditCard />, t: "Caixa (PDV)", d: "Venda no balcão em segundos. Pix, cartão, dinheiro e crediário, tudo registrado na hora.", tag: "No balcão" },
  { i: <FiBox />, t: "Estoque organizado", d: "Cada peça por departamento, categoria, tamanho e cor. Vendeu no balcão ou na vitrine, o estoque baixa sozinho.", tag: "Sem planilha" },
  { i: <FiBookOpen />, t: "Crediário próprio", d: "Parcelas, vencimentos e quem está em dia, com contrato pronto para a cliente assinar. O caderno se aposenta.", tag: "Fim do caderno" },
  { i: <FiUsers />, t: "Clientes", d: "Ficha de cada cliente com o que comprou, quanto deve e o que costuma levar. Você atende como quem conhece.", tag: "Relacionamento" },
  { i: <FiBarChart2 />, t: "Relatórios do dia", d: "Quanto entrou, por forma de pagamento, o que mais vendeu e o que está parado na prateleira.", tag: "Decide melhor" },
];

const breve = [
  { i: <FiFileText />, t: "Nota fiscal (NFC-e)", d: "Emissão direto do caixa." },
  { i: <FiSmartphone />, t: "App Meu Crediário", d: "A cliente acompanha as parcelas no celular." },
];

const publicos = ["Roupa infantil e de bebê", "Moda feminina e masculina", "Calçados", "Moda praia e fitness", "Acessórios e bijuterias", "Presentes e variedades", "Cosméticos", "Enxoval e cama, mesa e banho"];

const faq = [
  { q: "KLOJA é ERP ou CRM?", a: "Os dois. A parte de dentro da loja (caixa, estoque, financeiro) é o que se chama de ERP. A parte do relacionamento com a cliente (cadastro, histórico, crediário, cobrança) é o que se chama de CRM. No KLOJA as duas conversam: a venda do caixa já cai na ficha da cliente e no estoque." },
  { q: "Preciso entender de tecnologia?", a: "Não. A TresK entrega o sistema configurado com as suas peças, mostra como usar e fica por perto no começo." },
  { q: "Tenho tudo num caderno. Dá para passar para o sistema?", a: "Dá. A gente ajuda a cadastrar as clientes do crediário e as parcelas que já estão em aberto, para você começar sem perder nada." },
  { q: "Funciona no celular?", a: "Sim. A vitrine foi pensada para o celular da cliente, e o painel abre no computador, no tablet ou no celular." },
  { q: "Quanto custa?", a: "Uma implantação e uma mensalidade, com preço pensado para loja de cidade do interior. Chame no WhatsApp e mande o tamanho da sua loja: o orçamento sai sem compromisso." },
  { q: "Atende fora de Ibimirim?", a: "Sim. A implantação e o suporte podem ser todos online." },
];

function Vitrine() {
  const pecas = [
    { n: "Body manga longa", p: "39,90", c: "#F7C9D4" },
    { n: "Macacão plush", p: "69,90", c: "#BFE3DC" },
    { n: "Conjunto 2 peças", p: "54,90", c: "#FFE1A8" },
    { n: "Vestido florido", p: "59,90", c: "#D8D3F5" },
  ];
  return (
    <div className={s.phone} aria-hidden="true">
      <div className={s.phoneNotch} />
      <div className={s.vHead}>
        <span className={s.vLogo}>Sua Loja</span>
        <span className={s.vBag}><FiShoppingBag /> 2</span>
      </div>
      <div className={s.vChips}><b>Bebê</b><span>Menina</span><span>Menino</span><span>Promo</span></div>
      <div className={s.vGrid}>
        {pecas.map((x) => (
          <div key={x.n} className={s.vItem}>
            <div className={s.vImg} style={{ background: x.c }}>
              <svg viewBox="0 0 60 60" width="46" height="46"><path d="M20 10h20l10 8-6 8-4-3v25H20V23l-4 3-6-8Z" fill="#fff" opacity=".9" /></svg>
            </div>
            <span className={s.vName}>{x.n}</span>
            <span className={s.vPrice}>R$ {x.p}</span>
            <span className={s.vSizes}><i>P</i><i>M</i><i>G</i></span>
          </div>
        ))}
      </div>
      <div className={s.vBtn}>Finalizar compra</div>
    </div>
  );
}

function Painel() {
  return (
    <div className={s.desk} aria-hidden="true">
      <div className={s.dBar}><i /><i /><i /><span>painel.kloja</span></div>
      <div className={s.dBody}>
        <aside className={s.dSide}>
          <KlojaTag size={26} />
          <span className={s.on}>Caixa</span><span>Estoque</span><span>Crediário</span><span>Clientes</span><span>Relatórios</span>
        </aside>
        <div className={s.dMain}>
          <div className={s.kpis}>
            <div><small>Vendas hoje</small><b>R$ 1.284</b></div>
            <div><small>Pix</small><b>R$ 612</b></div>
            <div><small>Crediário</small><b>R$ 390</b></div>
          </div>
          <div className={s.dCols}>
            <div className={s.dCard}>
              <small>Parcelas desta semana</small>
              <ul>
                <li><span>Maria J.</span><em className={s.ok}>Pago</em></li>
                <li><span>Ana Paula</span><em className={s.due}>Vence sex</em></li>
                <li><span>Cícera L.</span><em className={s.late}>2 dias</em></li>
              </ul>
            </div>
            <div className={s.dCard}>
              <small>Mais vendidos</small>
              <div className={s.bars}><i style={{ height: "82%" }} /><i style={{ height: "64%" }} /><i style={{ height: "48%" }} /><i style={{ height: "36%" }} /><i style={{ height: "22%" }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KlojaPage() {
  return (
    <main className={s.page}>
      <header className={s.nav}>
        <div className={s.wrap}>
          <KlojaWordmark />
          <nav className={s.navLinks} aria-label="Seções">
            <a href="#o-que-faz">O que faz</a>
            <a href="#erp-crm">ERP ou CRM?</a>
            <a href="#divina-baby">Case</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className={s.navCta} href={ctaDemo} target="_blank" rel="noopener noreferrer">Ver demonstração</a>
        </div>
      </header>

      {/* HERO */}
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div className={s.heroText}>
            <span className={s.eyebrow}><KlojaTag size={18} /> Sistema para lojas · TresK Tecnologia</span>
            <h1 className={s.h1}>
              A sua loja inteira <span className={s.hl}>num sistema só.</span>
            </h1>
            <p className={s.lead}>
              Vitrine online, caixa, estoque, crediário e clientes conversando entre si. Vendeu no balcão, baixa o estoque, cai na ficha da cliente e
              aparece no relatório do dia.
            </p>
            <div className={s.ctas}>
              <a className={s.btnPri} href={ctaDemo} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Quero ver funcionando</a>
              <a className={s.btnSec} href="#o-que-faz">Conhecer o KLOJA <FiArrowRight /></a>
            </div>
            <ul className={s.ticks}>
              <li><FiCheck /> Feito numa loja de verdade</li>
              <li><FiCheck /> Implantação e suporte da TresK</li>
              <li><FiCheck /> Preço de cidade do interior</li>
            </ul>
          </div>
          <div className={s.heroArt}>
            <Painel />
            <Vitrine />
            <div className={s.floatTag}><FiBookOpen /> Parcela da Ana Paula paga no Pix</div>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className={s.section}>
        <div className={s.wrap}>
          <span className={s.kicker}>Soa familiar?</span>
          <h2 className={s.h2}>Loja boa, controle no improviso.</h2>
          <div className={s.dores}>
            {dores.map((d) => (
              <article key={d.t} className={s.dor}>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="o-que-faz" className={`${s.section} ${s.tint}`}>
        <div className={s.wrap}>
          <span className={s.kicker}>O que o KLOJA faz</span>
          <h2 className={s.h2}>Seis partes da loja, <span className={s.hl}>um lugar só.</span></h2>
          <div className={s.mods}>
            {modulos.map((m) => (
              <article key={m.t} className={s.mod}>
                <div className={s.modTop}><span className={s.modIcon}>{m.i}</span><span className={s.modTag}>{m.tag}</span></div>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </article>
            ))}
          </div>
          <div className={s.breve}>
            <span className={s.breveLbl}>Em breve</span>
            {breve.map((b) => (
              <div key={b.t} className={s.breveItem}><span>{b.i}</span><div><b>{b.t}</b><small>{b.d}</small></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ERP x CRM */}
      <section id="erp-crm" className={s.section}>
        <div className={s.wrap}>
          <span className={s.kicker}>ERP ou CRM?</span>
          <h2 className={s.h2}>Os dois. E você não precisa decorar essas siglas.</h2>
          <div className={s.duo}>
            <div className={s.duoCard}>
              <span className={s.duoSig}>ERP</span>
              <h3>A parte de dentro da loja</h3>
              <p>Tudo o que faz a loja funcionar: o caixa, o estoque, o dinheiro que entra e o que sai.</p>
              <ul><li><FiCheck /> Caixa (PDV) e formas de pagamento</li><li><FiCheck /> Estoque por tamanho e cor</li><li><FiCheck /> Relatórios de venda</li></ul>
            </div>
            <div className={s.duoPlus} aria-hidden="true">+</div>
            <div className={`${s.duoCard} ${s.duoCrm}`}>
              <span className={s.duoSig}>CRM</span>
              <h3>A parte da cliente</h3>
              <p>Tudo o que faz a cliente voltar: quem ela é, o que comprou, o que deve e quando vence.</p>
              <ul><li><FiCheck /> Ficha e histórico da cliente</li><li><FiCheck /> Crediário com parcelas e contrato</li><li><FiCheck /> Vitrine para ela comprar de novo</li></ul>
            </div>
          </div>
          <p className={s.duoNote}>No KLOJA as duas partes são uma só: a venda do balcão já baixa o estoque e já aparece na ficha da cliente.</p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className={`${s.section} ${s.tint}`}>
        <div className={s.wrap}>
          <span className={s.kicker}>Como funciona no dia a dia</span>
          <h2 className={s.h2}>De um lado a cliente. Do outro, você.</h2>
          <div className={s.lado}>
            <div className={s.ladoCol}>
              <h3><FiHeart /> A cliente</h3>
              <ol>
                <li>Recebe o link da sua loja no WhatsApp ou no Instagram.</li>
                <li>Vê as peças com foto, tamanho e preço, sem precisar perguntar.</li>
                <li>Escolhe e finaliza a compra.</li>
                <li>No crediário, sabe o que paga e quando vence.</li>
              </ol>
            </div>
            <div className={s.ladoCol}>
              <h3><FiShoppingBag /> Você, dono da loja</h3>
              <ol>
                <li>Cadastra a peça uma vez, com tamanhos e cores.</li>
                <li>Vende no caixa em segundos, com Pix, cartão ou crediário.</li>
                <li>Vê quem está devendo e quem pagou, sem abrir caderno.</li>
                <li>Fecha o dia sabendo quanto entrou e o que está parado.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CASE */}
      <section id="divina-baby" className={s.case}>
        <div className={`${s.wrap} ${s.caseGrid}`}>
          <div>
            <span className={s.kickerLight}>Nasceu numa loja de verdade</span>
            <h2 className={s.h2Light}>O KLOJA nasce dentro da Divina Baby, em Ibimirim.</h2>
            <p className={s.caseText}>
              A Divina Baby é uma loja de roupa de bebê no Sertão de Pernambuco. É lá que a TresK constrói o KLOJA: vitrine, caixa, estoque e o
              crediário que antes vivia no caderno. Cada função é testada no balcão da Divina Baby antes de chegar na sua loja.
            </p>
            <a className={s.btnLight} href={ctaDemo} target="_blank" rel="noopener noreferrer">Quero o mesmo na minha loja <FiArrowRight /></a>
          </div>
          <div className={s.caseCard}>
            <span className={s.caseLbl}>Loja-piloto</span>
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
      </section>

      {/* PARA QUEM */}
      <section className={s.section}>
        <div className={s.wrap}>
          <span className={s.kicker}>Para quem é</span>
          <h2 className={s.h2}>Para a loja que vende peça por peça e conhece a cliente pelo nome.</h2>
          <div className={s.pubs}>{publicos.map((p) => <span key={p}>{p}</span>)}</div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className={`${s.section} ${s.tint}`}>
        <div className={`${s.wrap} ${s.seg}`}>
          <span className={s.segIcon}><FiShield /></span>
          <div>
            <h2 className={s.h3big}>Os dados da sua loja ficam protegidos.</h2>
            <p>Cada loja só enxerga os próprios dados, as regras ficam no servidor e o banco de dados tem cópia de segurança. Os dados das clientes são tratados conforme a LGPD.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className={s.section}>
        <div className={`${s.wrap} ${s.faqWrap}`}>
          <div>
            <span className={s.kicker}>Dúvidas</span>
            <h2 className={s.h2}>Perguntas que todo lojista faz.</h2>
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
        <div className={s.wrap}>
          <span className={s.finalMark}><KlojaTag size={52} /></span>
          <h2 className={s.h2Light}>Bora tirar a sua loja do caderno?</h2>
          <p className={s.caseText}>Mostramos o KLOJA funcionando, com peças parecidas com as suas. Sem compromisso.</p>
          <div className={s.ctas} style={{ justifyContent: "center" }}>
            <a className={s.btnPri} href={ctaOrc} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Pedir orçamento</a>
            <a className={s.btnLight} href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /> {siteConfig.instagramHandle}</a>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <div className={s.wrap}>
          <Link href="/" className={s.footBrand}><TreskMark className={s.footMark} stems="#101418" /> Desenvolvido pela TresK Tecnologia</Link>
          <span>KORT · KFOOD · KFit · KLOJA</span>
        </div>
      </footer>
    </main>
  );
}
