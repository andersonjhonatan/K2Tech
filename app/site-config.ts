const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

/**
 * Dados públicos da TresK Tecnologia. Eles alimentam todos os links e botões do site.
 */
export const siteConfig = {
  name: "TresK Tecnologia",
  title: "TresK Tecnologia | Sistemas, sites e produtos digitais",
  description:
    "A TresK Tecnologia desenvolve sistemas sob medida, sites e produtos digitais, como o Kort, a agenda online para barbearias.",
  siteUrl: configuredSiteUrl || "https://tresktecnologia.com.br",
  instagramUrl: "https://instagram.com/tresktecnologia",
  instagramHandle: "@tresktecnologia",
  contactEmail: "contato@tresktecnologia.com.br",
  phoneDisplay: "+55 87 99110-4152",
  whatsappNumber: "5587991104152",
  whatsappUrl:
    "https://wa.me/5587991104152?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20TresK%20Tecnologia%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
  /** Produto da TresK para barbearias. */
  kortUrl: "https://kort.tresktecnologia.com.br",
  /** Troque para true quando o site do Kort estiver no ar: aí o link para ele aparece. */
  kortLive: true as boolean,
} as const;
