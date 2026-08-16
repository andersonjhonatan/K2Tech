import { Arrow } from "./home-ui";

const services = [
  ["01", "Convites interativos", "Uma experiência feita sob medida com confirmações, localização, cronograma e a personalidade do seu evento.", "A partir de R$ 49,90"],
  ["02", "Sites que posicionam", "Presenças digitais rápidas, bonitas e estratégicas para o seu negócio ser encontrado e escolhido.", "A partir de R$ 299,90"],
  ["03", "Soluções sob medida", "Projetos digitais que resolvem o que planilhas e processos manuais já não conseguem acompanhar.", "Sob orçamento"],
] as const;

export function ServicesSection() {
  return (
    <section id="servicos" className="services container section-space">
      <div className="section-label"><span>04</span><i/> O QUE FAZEMOS</div>
      <div className="services-head">
        <h2>Seu momento.<br/><em>Do seu jeito.</em></h2>
        <p>Do convite à presença digital do seu negócio, construímos experiências que aproximam pessoas.</p>
      </div>
      <div className="service-list">
        {services.map(([number, title, text, price]) => (
          <article className="service-item" key={number}>
            <span className="service-number">{number}</span>
            <h3>{title}</h3>
            <div className="service-copy"><p>{text}</p><strong>{price}</strong></div>
            <Arrow diagonal/>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MethodSection() {
  return (
    <section className="method section-space">
      <div className="container method-grid">
        <div>
          <div className="section-label light"><span>05</span><i/> COMO FUNCIONA</div>
          <h2>Boa parceria<br/>tem <em>processo.</em></h2>
        </div>
        <div className="steps">
          <article><span>01</span><div><h3>Seu momento</h3><p>Entendemos a história, o estilo e tudo o que os convidados precisam viver antes do evento.</p></div></article>
          <article><span>02</span><div><h3>Direção criativa</h3><p>Transformamos a sua ideia em uma proposta visual única, feita para despertar expectativa.</p></div></article>
          <article><span>03</span><div><h3>Convite no ar</h3><p>Construímos, refinamos e entregamos seu convite pronto para ser compartilhado com quem importa.</p></div></article>
        </div>
      </div>
    </section>
  );
}
