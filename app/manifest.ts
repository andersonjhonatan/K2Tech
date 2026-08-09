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
      { src: "/favicons/k2-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicons/k2-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicons/k2-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
