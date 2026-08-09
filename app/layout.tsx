import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "convite online",
    "convite interativo",
    "convite digital",
    "convite de casamento online",
    "convite infantil online",
    "site para eventos",
    "K2 Tech",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: siteConfig.title,
    description: "Seu evento começa no primeiro clique.",
    url: "/",
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "K2 Tech — experiências digitais que marcam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "Seu evento começa no primeiro clique.",
    images: ["/opengraph-image"],
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
