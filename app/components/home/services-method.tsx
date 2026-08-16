import { Arrow } from "./home-ui";

const services = [
  ["01", "Sites & Landing Pages", "Sites institucionais, páginas de venda e presenças digitais rápidas, responsivas e pensadas para posicionar seu negócio.", "A partir de R$ 299,90"],
  ["02", "Sistemas & Aplicações Web", "Painéis, áreas restritas, ferramentas internas e aplicações feitas para organizar processos e resolver problemas reais.", "Sob orçamento"],
  ["03", "Web Design & Interfaces", "Direção visual, UX/UI e interfaces com identidade para produtos que precisam parecer profissionais antes mesmo da primeira linha de código.", "Sob orçamento"],
  ["04", "Experiências Interativas", "Projetos digitais que usam narrativa, animação e interação para criar experiências memoráveis — incluindo nossa linha de convites digitais.", "Convites a partir de R$ 49,90"],
] as const;

export function ServicesSection() {
  return (
    <section id="servicos" className="services container section-space">
      <div className="section-label"><span>02</span><i/> O QUE CONSTRUÍMOS</div>
      <div className="services-head">
        <h2>Do site ao sistema.<br/><em>Do design à experiência.</em></h2>
        <p>A K2 Tech combina tecnologia, interface e visão de produto para construir a solução certa para cada contexto.</p>
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
          <div className="section-label light"><span>05</span><i/> COMO TRABALHAMOS</div>
          <h2>Boa solução<br/>tem <em>processo.</em></h2>
        </div>
        <div className="steps">
          <article><span>01</span><div><h3>Entender o problema</h3><p>Começamos pelo objetivo, público, contexto e pelo que o projeto precisa resolver — não pela tecnologia da moda.</p></div></article>
          <article><span>02</span><div><h3>Desenhar a solução</h3><p>Organizamos estrutura, experiência, identidade visual e arquitetura técnica antes de transformar a ideia em produto.</p></div></article>
          <article><span>03</span><div><h3>Construir, testar e publicar</h3><p>Desenvolvemos, refinamos e colocamos o projeto no ar com foco em responsividade, clareza, desempenho e evolução futura.</p></div></article>
        </div>
      </div>
    </section>
  );
}
