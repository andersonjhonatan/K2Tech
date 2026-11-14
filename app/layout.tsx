import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tresktecnologia.com.br";

const title = "TresK Tecnologia | Sistemas, sites e produtos digitais";
const description =
  "A TresK Tecnologia cria sistemas sob medida, sites e produtos digitais, como o Kort, a agenda online para barbearias.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["TresK Tecnologia", "sistema sob medida", "criação de sites", "Kort", "agenda para barbearia", "convite interativo"],
  applicationName: "TresK Tecnologia",
  authors: [{ name: "TresK Tecnologia" }],
  creator: "TresK Tecnologia",
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description: "Tecnologia que trabalha pelo seu negócio.",
    locale: "pt_BR",
    type: "website",
    siteName: "TresK Tecnologia",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Tecnologia que trabalha pelo seu negócio.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
