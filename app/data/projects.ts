import { siteConfig } from "../site-config";

export type ShowcaseProject = {
  number: string;
  name: string;
  category: string;
  eyebrow: string;
  className: string;
  description: string;
  portfolioDescription: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl: string;
};

export type InvitationProject = {
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

const portfolioAsset = (path: string) =>
  `https://raw.githubusercontent.com/andersonjhonatan/Portfolio/main/${path}`;

export const showcaseProjects: ShowcaseProject[] = [
  {
    number: "01",
    name: "Montagem de Móveis",
    category: "Site para negócio local",
    eyebrow: "Projeto para cliente",
    className: "montagem",
    description: "Site desenvolvido para apresentar serviços, fortalecer confiança e transformar visitas em contatos comerciais.",
    portfolioDescription: "Uma presença digital criada para um profissional de montagem de móveis, organizando serviços, diferenciais e contato em uma experiência simples, rápida e pensada para gerar confiança.",
    tags: ["Next.js", "Responsivo", "Conversão"],
    image: portfolioAsset("public/projects/montagem.png"),
    liveUrl: "https://montagem.vercel.app/",
    githubUrl: "https://github.com/andersonjhonatan/Montagem",
  },
  {
    number: "02",
    name: "Convite Roblox",
    category: "Convite interativo",
    eyebrow: "Experiência mobile-first",
    className: "roblox",
    description: "Convite infantil transformado em uma jornada digital com narrativa, interação e confirmação de presença.",
    portfolioDescription: "Uma experiência digital temática construída para celular, com abertura marcante, universo visual próprio e uma jornada que leva o convidado da descoberta até a confirmação de presença.",
    tags: ["Next.js", "Interação", "Storytelling"],
    image: portfolioAsset("public/projects/invitations/convite-roblox-ilhas.png"),
    githubUrl: "https://github.com/andersonjhonatan/ConviteRoblox",
  },
  {
    number: "03",
    name: "Tarefas+",
    category: "Produto web",
    eyebrow: "Aplicação produtiva",
    className: "tasks",
    description: "Aplicação de organização de tarefas e estudos com colaboração e uma interface objetiva para o dia a dia.",
    portfolioDescription: "Produto web voltado à organização pessoal, combinando uma interface direta com recursos para tarefas, estudos e colaboração em uma experiência responsiva.",
    tags: ["React", "Next.js", "Firebase"],
    image: portfolioAsset("public/projects/tarefas.png"),
    liveUrl: "https://tasks-p26e.vercel.app/",
    githubUrl: "https://github.com/andersonjhonatan/Tasks",
  },
  {
    number: "04",
    name: "Convite Minecraft",
    category: "Convite interativo",
    eyebrow: "Universo temático",
    className: "minecraft",
    description: "Experiência temática com narrativa de portal, interação e direção visual inspirada no universo do jogo.",
    portfolioDescription: "Convite infantil pensado como uma entrada para outro mundo: narrativa de portal, elementos temáticos e uma experiência mobile-first criada para tornar o convidado parte da história.",
    tags: ["UX", "Mobile-first", "Animação"],
    githubUrl: "https://github.com/andersonjhonatan/Convite-Minecraft",
  },
  {
    number: "05",
    name: "Aniversário Spider-Man",
    category: "Convite digital",
    eyebrow: "Experiência infantil",
    className: "spiderman",
    description: "Convite digital de alto impacto com entrada marcante, composição visual forte e experiência pensada primeiro para o celular.",
    portfolioDescription: "Uma experiência infantil criada para causar impacto já no primeiro acesso, equilibrando temática, legibilidade e interação sem perder a prioridade mobile-first.",
    tags: ["Next.js", "Mobile-first", "Experiência"],
    image: portfolioAsset("public/projects/invitations/convite-spiderman-hero.jpeg"),
    githubUrl: "https://github.com/andersonjhonatan/aniversario-spiderman",
  },
  {
    number: "06",
    name: "Stella Explorations",
    category: "Experiência visual",
    eyebrow: "Projeto conceitual web",
    className: "stella",
    description: "Projeto web com foco em composição, atmosfera visual e uma navegação simples de alto impacto.",
    portfolioDescription: "Uma exploração visual construída para praticar direção de interface, hierarquia e atmosfera em uma experiência web com forte presença gráfica.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    image: portfolioAsset("public/projects/estella.png"),
    liveUrl: "https://stellar-explorations.onrender.com/",
    githubUrl: "https://github.com/andersonjhonatan/Stellar_Tailwind",
  },
];

export const invitationConcepts: InvitationProject[] = [
  {
    number: "C01",
    name: "CONVITE K2",
    category: "Convite interativo",
    status: "Projeto real",
    className: "real",
    homeDescription: "Uma prévia real de convite online interativo criada pela K2 Tech.",
    portfolioDescription: "Uma experiência real criada pela K2 Tech para mostrar como um convite pode reunir apresentação, informações e interação em uma experiência pensada para o celular.",
    video: "/videos/convite-interativo-k2-preview.mp4",
  },
  {
    number: "C02",
    name: "JULIA 15",
    category: "Debutante",
    status: "Conceito visual",
    className: "debutante",
    homeDescription: "Uma experiência digital para anunciar a celebração, compartilhar informações e confirmar presenças.",
    portfolioDescription: "Conceito de experiência digital para uma festa de 15 anos, com direção visual sofisticada, informações da celebração e espaço para confirmação de presença.",
    image: "/images/projects/debutante-julia-v3.webp",
  },
  {
    number: "C03",
    name: "MAYA & CAIO",
    category: "Casamento",
    status: "Conceito visual",
    className: "wedding",
    homeDescription: "Um convite elegante e interativo para levar a história do casal até cada convidado.",
    portfolioDescription: "Conceito elegante para casamento, pensado para apresentar a celebração de forma emocional, organizada e memorável desde o primeiro acesso.",
    image: "/images/projects/casamento-maya-caio-v2.webp",
  },
  {
    number: "C04",
    name: "MIGUEL 06",
    category: "Infantil",
    status: "Conceito visual",
    className: "kids",
    homeDescription: "Um convite divertido para uma festa infantil começar com brincadeira desde o celular.",
    portfolioDescription: "Conceito infantil com linguagem divertida e visual marcante, mostrando como o convite pode começar a experiência da festa antes mesmo do grande dia.",
    image: "/images/projects/infantil-miguel.webp",
  },
  {
    number: "C05",
    name: "BABY LUNA",
    category: "Chá revelação",
    status: "Conceito visual",
    className: "reveal",
    homeDescription: "Informações, confirmação e expectativa reunidas em uma experiência delicada e especial.",
    portfolioDescription: "Conceito delicado para chá revelação, combinando expectativa, informações essenciais e uma apresentação visual criada para ser compartilhada com facilidade.",
    image: "/images/projects/cha-revelacao-luna-v2.webp",
  },
  {
    number: "C06",
    name: "IDEA SUMMIT",
    category: "Evento corporativo",
    status: "Conceito visual",
    className: "corporate",
    homeDescription: "Um convite de alto impacto para conectar convidados à energia de um grande evento.",
    portfolioDescription: "Conceito de alto impacto para evento corporativo, com estética contemporânea e estrutura preparada para comunicar agenda, local e proposta do encontro.",
    image: "/images/projects/idea-summit.webp",
  },
];

// Compatibilidade com componentes antigos que ainda possam importar `projects`.
export const projects = invitationConcepts;

export function projectStatusLabel(project: InvitationProject) {
  return project.status === "Projeto real"
    ? `Projeto real / ${project.category}`
    : `Conceito / ${project.category}`;
}

export function projectWhatsappUrl(projectName: string, source: "home" | "portfolio" = "home") {
  const message = source === "portfolio"
    ? `Olá, vim pela página de projetos da K2 Tech e gostei do ${projectName}. Quero criar algo nessa direção e gostaria de conversar sobre a minha ideia.`
    : `Olá, vim pelo site da K2 Tech e gostei do projeto ${projectName}. Gostaria de criar algo nessa direção.`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
