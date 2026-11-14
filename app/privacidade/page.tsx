import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site-config";
import { ThemeToggle } from "../theme-toggle";
import { TreskLogo } from "../tresk-logo";

export const metadata: Metadata = {
  title: "Política de privacidade | TresK Tecnologia",
  description: "Como a TresK Tecnologia trata os dados de quem visita este site.",
};

export default function Privacidade() {
  return (
    <main className="legal">
      <header className="site-header container">
        <Link className="brand" href="/" aria-label="TresK Tecnologia, início"><TreskLogo /></Link>
        <div className="header-actions"><Link className="header-cta legal-back" href="/">Voltar ao site</Link><ThemeToggle /></div>
      </header>
      <article className="container legal-body">
        <h1>Política de privacidade</h1>
        <p className="legal-date">Última atualização: novembro de 2026</p>

        <h2>Quem somos</h2>
        <p>Este site é da TresK Tecnologia. Para qualquer assunto sobre os seus dados, escreva para <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>

        <h2>Quais dados este site coleta</h2>
        <p>Este site não tem cadastro, não usa cookies de publicidade e não guarda o que você digita nos formulários. Ao enviar um formulário, a mensagem é aberta no seu WhatsApp e só chega até nós se você a enviar por lá.</p>
        <p>Como em qualquer site, o serviço de hospedagem registra dados técnicos de acesso, como endereço IP, data e hora e tipo de navegador, para manter o site funcionando e seguro.</p>

        <h2>Como usamos o que você nos envia</h2>
        <p>As mensagens que você manda por WhatsApp, e-mail ou Instagram são usadas apenas para responder ao seu contato e preparar propostas. Não vendemos nem repassamos os seus dados a terceiros.</p>

        <h2>Seus direitos</h2>
        <p>Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir para saber quais dados seus temos, corrigir ou apagar esses dados. Basta escrever para o e-mail acima.</p>

        <h2>Produtos da TresK</h2>
        <p>Os produtos da TresK, como o Kort, têm a sua própria política de privacidade, publicada no site de cada produto.</p>
      </article>
    </main>
  );
}
