import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "./pricing.css";
import "./showcase.css";
import "./matrix-polish.css";
import { siteConfig } from "./site-config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const poppins = Poppins({ weight: ["500", "600", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "K2 Tech",
    "desenvolvimento web",
    "criação de sites",
    "landing pages",
    "sistemas web",
    "aplicações web",
    "web design",
    "UX UI",
    "produtos digitais",
    "soluções digitais",
    "sites personalizados",
    "experiências interativas",
    "convites interativos",
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
    description: "Sites, sistemas e produtos digitais desenvolvidos sob medida pela K2 Tech.",
    url: "/",
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "K2 Tech — sites, sistemas e soluções digitais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "Sites, sistemas e produtos digitais desenvolvidos sob medida pela K2 Tech.",
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
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
