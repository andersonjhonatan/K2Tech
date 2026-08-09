import { siteConfig } from "../site-config";

export type Project = {
  number: string;
  name: string;
  category: string;
  status: "Projeto real" | "Conceito visual";
  className: string;
  homeDescription: string;
  portfolioDescription: string;
  image?: string;
  video?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "CONVITE K2",
    category: "Convite interativo",
    status: "Projeto real",
    className: "real",
    homeDescription: "Uma prévia real de convite online interativo criada pela K2 Tech.",
    portfolioDescription: "Uma experiência real criada pela K2 Tech para mostrar como um convite pode reunir apresentação, informações e interação em uma experiência pensada para o celular.",
    video: "/videos/convite-interativo-k2-preview.mp4",
  },
  {
    number: "02",
    name: "JULIA 15",
    category: "Debutante",
    status: "Conceito visual",
    className: "debutante",
    homeDescription: "Uma experiência digital para anunciar a celebração, compartilhar informações e confirmar presenças.",
    portfolioDescription: "Conceito de experiência digital para uma festa de 15 anos, com direção visual sofisticada, informações da celebração e espaço para confirmação de presença.",
    image: "/images/projects/debutante-julia-v3.webp",
  },
  {
    number: "03",
    name: "MAYA & CAIO",
    category: "Casamento",
    status: "Conceito visual",
    className: "wedding",
    homeDescription: "Um convite elegante e interativo para levar a história do casal até cada convidado.",
    portfolioDescription: "Conceito elegante para casamento, pensado para apresentar a celebração de forma emocional, organizada e memorável desde o primeiro acesso.",
    image: "/images/projects/casamento-maya-caio-v2.webp",
  },
  {
    number: "04",
    name: "MIGUEL 06",
    category: "Infantil",
    status: "Conceito visual",
    className: "kids",
    homeDescription: "Um convite divertido para uma festa infantil começar com brincadeira desde o celular.",
    portfolioDescription: "Conceito infantil com linguagem divertida e visual marcante, mostrando como o convite pode começar a experiência da festa antes mesmo do grande dia.",
    image: "/images/projects/infantil-miguel.webp",
  },
  {
    number: "05",
    name: "BABY LUNA",
    category: "Chá revelação",
    status: "Conceito visual",
    className: "reveal",
    homeDescription: "Informações, confirmação e expectativa reunidas em uma experiência delicada e especial.",
    portfolioDescription: "Conceito delicado para chá revelação, combinando expectativa, informações essenciais e uma apresentação visual criada para ser compartilhada com facilidade.",
    image: "/images/projects/cha-revelacao-luna-v2.webp",
  },
  {
    number: "06",
    name: "IDEA SUMMIT",
    category: "Evento corporativo",
    status: "Conceito visual",
    className: "corporate",
    homeDescription: "Um convite de alto impacto para conectar convidados à energia de um grande evento.",
    portfolioDescription: "Conceito de alto impacto para evento corporativo, com estética contemporânea e estrutura preparada para comunicar agenda, local e proposta do encontro.",
    image: "/images/projects/idea-summit.webp",
  },
];

export function projectStatusLabel(project: Project) {
  return project.status === "Projeto real"
    ? `Projeto real / ${project.category}`
    : `Conceito / ${project.category}`;
}

export function projectWhatsappUrl(projectName: string, source: "home" | "portfolio" = "home") {
  const message = source === "portfolio"
    ? `Olá, vim pela página de projetos da K2 Tech e gostei do ${projectName}. Quero um convite nesse estilo e gostaria de conversar sobre a minha ideia.`
    : `Olá, vim pelo site da K2 Tech e gostei do projeto ${projectName}. Gostaria de criar algo nesse estilo.`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
