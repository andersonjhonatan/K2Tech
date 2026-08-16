const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const siteConfig = {
  name: "K2 Tech",
  title: "K2 Tech | Sites, Sistemas e Soluções Digitais",
  description:
    "A K2 Tech cria sites, sistemas web, interfaces, produtos digitais e experiências interativas sob medida para negócios, marcas e projetos que querem crescer.",
  siteUrl: configuredSiteUrl || "https://k2tech.vercel.app",
  instagramUrl: "https://instagram.com/k2tech.oficial",
  contactEmail: "k2techempresa@gmail.com",
  instagramHandle: "@k2tech.oficial",
  phoneDisplay: "+55 87 99110-4152",
  whatsappNumber: "5587991104152",
  whatsappUrl:
    "https://wa.me/5587991104152?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20K2%20Tech%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
} as const;
