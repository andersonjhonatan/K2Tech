import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade | K2 Tech",
  description: "Saiba como a K2 Tech trata os dados informados ao entrar em contato pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px", lineHeight: 1.7 }}>
      <Link href="/" style={{ textDecoration: "none" }}>← Voltar para a K2 Tech</Link>
      <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", margin: "48px 0 24px", lineHeight: 1 }}>Política de Privacidade</h1>
      <p>Última atualização: 9 de agosto de 2026.</p>

      <h2>1. Sobre esta política</h2>
      <p>Esta página explica de forma simples como a K2 Tech trata as informações fornecidas por pessoas que entram em contato pelo site.</p>

      <h2>2. Dados informados por você</h2>
      <p>Os formulários do site podem solicitar nome, empresa ou marca, tipo de projeto e a mensagem que você deseja enviar. Esses dados são usados exclusivamente para iniciar e dar continuidade ao atendimento solicitado.</p>

      <h2>3. Envio pelo WhatsApp</h2>
      <p>Ao enviar os formulários atuais, o site prepara uma mensagem e direciona você para o WhatsApp. O envio só é concluído quando você decide enviar a mensagem no próprio WhatsApp. A K2 Tech não mantém, por meio destes formulários, um banco de dados próprio com essas informações.</p>

      <h2>4. Avaliações</h2>
      <p>Quando uma avaliação é enviada, ela também é direcionada ao WhatsApp. Uma avaliação somente deverá ser publicada no site após análise e autorização para uso do depoimento.</p>

      <h2>5. Serviços de terceiros</h2>
      <p>Ao acessar links para WhatsApp, Instagram ou e-mail, passam a valer também as políticas e práticas de privacidade dos respectivos serviços.</p>

      <h2>6. Seus direitos</h2>
      <p>Você pode solicitar informações, correção ou exclusão de dados pessoais eventualmente mantidos pela K2 Tech, além de retirar uma autorização concedida anteriormente, quando aplicável.</p>

      <h2>7. Contato</h2>
      <p>Para dúvidas relacionadas à privacidade, entre em contato pelo e-mail <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> ou pelo WhatsApp informado no site.</p>

      <p style={{ marginTop: 48 }}><Link href="/">Voltar para a página inicial</Link></p>
    </main>
  );
}
