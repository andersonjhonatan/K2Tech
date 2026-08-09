import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "K2 Tech — Convites online interativos",
    short_name: "K2 Tech",
    description: "Convites online interativos e experiências digitais para momentos especiais.",
    start_url: "/",
    display: "standalone",
    background_color: "#080b12",
    theme_color: "#080b12",
    lang: "pt-BR",
    icons: [
      { src: "/favicons/k2-on-dark-v2.png", sizes: "any", type: "image/png" },
    ],
  };
}
