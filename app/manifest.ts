import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TresK Tecnologia",
    short_name: "TresK",
    description: "Sistemas, sites e produtos digitais desenvolvidos pela TresK Tecnologia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    lang: "pt-BR",
    icons: [
      { src: "/favicons/tresk-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicons/tresk-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicons/tresk-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
