import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "./showcase.css";
import "./matrix-polish.css";
import { siteConfig } from "./site-config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const poppins = Poppins({ weight: ["500", "600", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", variable: "--font-poppins" });

const shareDescription = "Tecnologia que move o seu negócio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "TresK Tecnologia",
    "desenvolvimento web",
    "criação de sites",
    "sistemas web",
    "sistema sob medida",
    "aplicativos",
    "produtos digitais",
    "Kort",
    "agenda para barbearia",
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
    description: shareDescription,
    url: "/",
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: shareDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
