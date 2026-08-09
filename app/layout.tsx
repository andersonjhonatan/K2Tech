import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K2 Tech — Design que faz sua marca avançar",
  description:
    "Sites, identidade e experiências digitais criadas para negócios que querem crescer.",
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
