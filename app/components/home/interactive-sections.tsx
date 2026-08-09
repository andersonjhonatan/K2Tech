import { siteConfig } from "../../site-config";

const testimonials = [
  ["Convite de casamento", "O convite ficou lindo no celular e todo mundo conseguiu confirmar presença sem dificuldade.", "Carolina & Rafael"],
  ["Site institucional", "Finalmente conseguimos apresentar nosso trabalho com uma imagem muito mais profissional.", "Bruno Martins"],
  ["Convite de debutante", "Ficou do jeito que imaginamos: bonito, organizado e especial para enviar para a família.", "Aline Rocha"],
  ["Sistema personalizado", "A K2 entendeu nossa rotina e entregou uma solução clara, rápida e muito fácil de usar.", "Marcos Vinícius"],
  ["Convite infantil", "As crianças e os pais adoraram. Ficou divertido, simples de acessar e cheio de detalhes.", "Lívia Andrade"],
  ["Landing page", "O processo foi muito organizado e o resultado ficou muito melhor do que imaginávamos.", "Natália & Diego"],
] as const;

const testimonialPages = [testimonials.slice(0, 3), testimonials.slice(3, 6)];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function ExperiencesSection() {
  return (
    <section id="avaliacoes" className="reviews section-space">
      <div className="container">
        <div className="reviews-head">
          <div>
            <div className="section-label light"><span>03</span><i/> EXPERIÊNCIAS</div>
            <h2>O que uma boa<br/>experiência <em>precisa entregar.</em></h2>
          </div>
          <p>Clareza, beleza, facilidade e atenção aos detalhes fazem parte do padrão que buscamos em cada projeto.</p>
        </div>

        <div
          className="testimonial-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Referências de experiências e resultados"
          data-testimonial-carousel
        >
          {testimonialPages.map((page, pageIndex) => (
            <div
              className="testimonial-grid"
              data-review-page={pageIndex}
              hidden={pageIndex !== 0}
              key={pageIndex}
            >
              {page.map(([project, quote, name]) => (
                <article className="testimonial-card" key={project}>
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <p>{quote}</p>
                  <footer><strong>{name}</strong><small>{project}</small></footer>
                </article>
              ))}
            </div>
          ))}
          <div className="review-controls">
            <button type="button" data-review-prev aria-label="Ver experiências anteriores">←</button>
            <span data-review-indicator aria-label="Página 1 de 2"><b>01</b> / 02</span>
            <button
              type="button"
              data-review-toggle
              aria-pressed="false"
              aria-label="Pausar rotação automática das experiências"
              title="Pausar"
            >
              Ⅱ
            </button>
            <button type="button" data-review-next aria-label="Ver próximas experiências">→</button>
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
            <label>QUAL FOI O PROJETO?<select name="review-project" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Convite online interativo</option><option>Site institucional</option><option>Sistema personalizado</option><option>Outro projeto</option></select></label>
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
        <p>Você tem um momento.<br/>A gente dá a ele <em>presença.</em></p>
      </div>
      <div className="contact-grid">
        <h2>Vamos fazer seus<br/>convidados dizerem<br/><em>“eu preciso ir”.</em></h2>
        <form
          data-k2-form="contact"
          data-whatsapp={siteConfig.whatsappNumber}
          action={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
        >
          <label>SEU NOME<input name="name" required autoComplete="name" placeholder="Como podemos te chamar?"/></label>
          <label>EMPRESA / MARCA<input name="company" autoComplete="organization" placeholder="Qual é o seu negócio?"/></label>
          <label>ME CONTA UM POUCO<textarea name="message" required placeholder="Qual momento você quer transformar em experiência?" rows={3}/></label>
          <button className="button button-dark" type="submit">Enviar mensagem <Arrow /></button>
          <p className="form-privacy">Ao enviar, você será direcionado ao WhatsApp da K2 Tech. Consulte nossa <a href="/privacidade">Política de Privacidade</a>.</p>
          <p className="form-note" role="status" hidden data-form-status>Abrindo conversa no WhatsApp…</p>
        </form>
      </div>
      <script src="/js/home-interactions.js" defer />
    </section>
  );
}
