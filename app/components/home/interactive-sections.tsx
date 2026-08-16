import { siteConfig } from "../../site-config";

const principles = [
  ["Experiência", "Uma pessoa precisa entender o que fazer, onde clicar e por que aquele produto existe sem enfrentar uma interface confusa.", "Clareza"],
  ["Engenharia", "A experiência visual precisa vir acompanhada de carregamento rápido, responsividade e uma base técnica que aguente evoluir.", "Performance"],
  ["Design", "Cada tela deve carregar a personalidade do negócio sem sacrificar leitura, hierarquia e facilidade de uso.", "Identidade"],
  ["Produto", "Um bom projeto não termina no visual: ele precisa resolver uma necessidade e ajudar o negócio a avançar.", "Propósito"],
  ["Mobile-first", "Celular não é uma adaptação de última hora. Em muitos projetos, é onde a experiência realmente começa.", "Responsividade"],
  ["Negócio", "Sites e sistemas precisam conduzir pessoas para uma próxima ação: entender, confiar, entrar em contato, comprar ou operar melhor.", "Conversão"],
] as const;

const principlePages = [principles.slice(0, 3), principles.slice(3, 6)];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function ExperiencesSection() {
  return (
    <section id="avaliacoes" className="reviews section-space">
      <div className="container">
        <div className="reviews-head">
          <div>
            <div className="section-label light"><span>04</span><i/> PADRÃO K2</div>
            <h2>Bonito é pouco.<br/>Precisa <em>funcionar.</em></h2>
          </div>
          <p>Independentemente de ser um site, sistema ou experiência interativa, estes são alguns dos critérios que orientam cada entrega da K2 Tech.</p>
        </div>

        <div
          className="testimonial-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Princípios de qualidade da K2 Tech"
          data-testimonial-carousel
        >
          {principlePages.map((page, pageIndex) => (
            <div
              className="testimonial-grid"
              data-review-page={pageIndex}
              hidden={pageIndex !== 0}
              key={pageIndex}
            >
              {page.map(([area, text, principle]) => (
                <article className="testimonial-card" key={principle}>
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <p>{text}</p>
                  <footer><strong>{principle}</strong><small>{area}</small></footer>
                </article>
              ))}
            </div>
          ))}
          <div className="review-controls">
            <button type="button" data-review-prev aria-label="Ver princípios anteriores">←</button>
            <span data-review-indicator aria-label="Página 1 de 2"><b>01</b> / 02</span>
            <button
              type="button"
              data-review-toggle
              aria-pressed="false"
              aria-label="Pausar rotação automática dos princípios"
              title="Pausar"
            >
              Ⅱ
            </button>
            <button type="button" data-review-next aria-label="Ver próximos princípios">→</button>
          </div>
        </div>

        <div className="review-form-wrap">
          <div>
            <span className="review-kicker">JÁ FOI CLIENTE?</span>
            <h3>Conta como foi<br/>o seu <em>projeto.</em></h3>
            <p>Se você já fez um projeto com a K2 Tech, envie sua avaliação. Ela chega direto pelo WhatsApp para conferência antes da publicação.</p>
          </div>
          <form
            className="review-form"
            data-k2-form="review"
            data-whatsapp={siteConfig.whatsappNumber}
            action={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
          >
            <label>SEU NOME<input name="reviewer" required autoComplete="name" placeholder="Como podemos identificar você?"/></label>
            <label>QUAL FOI O PROJETO?<select name="review-project" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Site ou landing page</option><option>Sistema ou aplicação web</option><option>Web design / interface</option><option>Experiência interativa / convite</option><option>Outro projeto</option></select></label>
            <label>COMO FOI A EXPERIÊNCIA?<textarea name="review" required rows={4} placeholder="Escreva sua avaliação para a K2 Tech"/></label>
            <button className="button button-outline" type="submit">Enviar avaliação <Arrow /></button>
            <p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da K2 Tech.</p>
            <p className="form-note" role="status" hidden data-form-status>Abrindo conversa no WhatsApp…</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contato" className="contact container section-space">
      <div className="contact-top">
        <div className="section-label"><span>06</span><i/> VAMOS COMEÇAR</div>
        <p>Você tem uma ideia.<br/>A gente dá a ela <em>estrutura.</em></p>
      </div>
      <div className="contact-grid">
        <h2>Vamos transformar<br/>seu próximo projeto<br/><em>em algo real.</em></h2>
        <form
          data-k2-form="contact"
          data-whatsapp={siteConfig.whatsappNumber}
          action={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
        >
          <label>SEU NOME<input name="name" required autoComplete="name" placeholder="Como podemos te chamar?"/></label>
          <label>EMPRESA / MARCA<input name="company" autoComplete="organization" placeholder="Qual é o seu negócio?"/></label>
          <label>ME CONTA UM POUCO<textarea name="message" required placeholder="O que você quer construir e o que esse projeto precisa resolver?" rows={3}/></label>
          <button className="button button-dark" type="submit">Falar sobre o projeto <Arrow /></button>
          <p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da K2 Tech. Consulte nossa <a href="/privacidade">Política de Privacidade</a>.</p>
          <p className="form-note" role="status" hidden data-form-status>Abrindo conversa no WhatsApp…</p>
        </form>
      </div>
      <script src="/js/home-interactions.js" defer />
    </section>
  );
}
