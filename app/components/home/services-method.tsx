import { Arrow } from "./home-ui";
import styles from "./services-section.module.css";

const services = [
  {
    number: "01",
    category: "Presença & conversão",
    title: "Sites & Landing Pages",
    text: "Sites institucionais, páginas de venda e experiências de marca pensadas para apresentar seu negócio com clareza, gerar confiança e conduzir o visitante para a próxima ação.",
    price: "Projetos a partir de R$ 299,90",
    featured: true,
  },
  {
    number: "02",
    category: "Operação & produto",
    title: "Sistemas & Aplicações Web",
    text: "Painéis, áreas restritas, plataformas e ferramentas internas desenvolvidas para organizar processos, centralizar informações e resolver necessidades reais da operação.",
    price: "Sob orçamento",
    featured: false,
  },
  {
    number: "03",
    category: "Interface & UX",
    title: "Web Design & Interfaces",
    text: "Direção visual, arquitetura de informação e interfaces responsivas para produtos que precisam transmitir profissionalismo, identidade e facilidade de uso desde o primeiro contato.",
    price: "Sob orçamento",
    featured: false,
  },
  {
    number: "04",
    category: "Interação & storytelling",
    title: "Experiências Interativas",
    text: "Projetos digitais com narrativa, animação e interação para criar experiências memoráveis. Aqui entram ativações, páginas especiais e também a vertical de convites digitais da K2 Tech.",
    price: "Convites a partir de R$ 49,90",
    featured: true,
  },
] as const;

export function ServicesSection() {
  return (
    <section id="servicos" className={`services container ${styles.section}`}>
      <div className="section-label"><span>02</span><i/> SOLUÇÕES K2 TECH</div>

      <div className={styles.intro}>
        <h2 className={styles.title}>
          Do primeiro site ao sistema que move a operação.
          <em>Construímos o que o negócio precisa.</em>
        </h2>
        <p className={styles.introCopy}>
          Design, desenvolvimento e visão de produto trabalhando juntos. A solução muda de acordo com o problema — o padrão de qualidade, não.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <article
            className={`${styles.card} ${service.featured ? styles.featured : ""}`}
            key={service.number}
          >
            <div className={styles.cardTop}>
              <span className={styles.number}>{service.number}</span>
              <span className={styles.category}>{service.category}</span>
            </div>

            <h3>{service.title}</h3>
            <p className={styles.description}>{service.text}</p>

            <div className={styles.cardFooter}>
              <div className={styles.investment}>
                <small>Faixa de investimento</small>
                <strong>{service.price}</strong>
              </div>
              <a className={styles.action} href="#contato">
                Falar sobre este serviço <span aria-hidden="true">↗</span>
              </a>
            </div>
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
