import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "K2 Tech | Convites online interativos",
  description:
    "Convites online interativos, sites e experiências digitais criadas pela K2 Tech para momentos que merecem ser lembrados.",
  keywords: ["convite online", "convite interativo", "convite digital", "site para eventos", "K2 Tech"],
  applicationName: "K2 Tech",
  authors: [{ name: "K2 Tech" }],
  creator: "K2 Tech",
  robots: { index: true, follow: true },
  openGraph: {
    title: "K2 Tech | Convites online interativos",
    description: "Seu evento começa no primeiro clique.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K2 Tech | Convites online interativos",
    description: "Seu evento começa no primeiro clique.",
  },
  icons: {
    icon: [
      { url: "/favicons/k2-on-light-v2.png", media: "(prefers-color-scheme: light)", type: "image/png" },
      { url: "/favicons/k2-on-dark-v2.png", media: "(prefers-color-scheme: dark)", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
