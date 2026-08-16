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
  secondaryImage?: string;
  imagePosition?: string;
  liveUrl?: string;
  githubUrl?: string;
  published?: boolean;
  spotlight?: boolean;
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

const bobAsset = (path: string) =>
  `https://raw.githubusercontent.com/andersonjhonatan/Convite-BobEsponja/main/${path}`;

export const showcaseProjects: ShowcaseProject[] = [
  {
    number: "01",
    name: "Montagem de Móveis",
    category: "Site para negócio local",
    eyebrow: "Presença digital · projeto real",
    className: "montagem",
    description: "Site desenvolvido para apresentar serviços, fortalecer confiança e transformar visitas em contatos comerciais.",
    portfolioDescription: "Uma presença digital criada para um profissional de montagem de móveis, organizando serviços, diferenciais e contato em uma experiência simples, rápida e pensada para gerar confiança e oportunidades comerciais.",
    tags: ["Next.js", "Responsivo", "Conversão"],
    image: portfolioAsset("public/projects/montagem.png"),
    liveUrl: "https://montagem.vercel.app/",
    githubUrl: "https://github.com/andersonjhonatan/Montagem",
    published: true,
  },
  {
    number: "02",
    name: "Tarefas+",
    category: "Aplicação web",
    eyebrow: "Produto digital · projeto real",
    className: "tasks",
    description: "Aplicação de organização de tarefas e estudos com colaboração e uma interface objetiva para o dia a dia.",
    portfolioDescription: "Produto web voltado à organização pessoal, combinando uma interface direta com recursos para tarefas, estudos e colaboração em uma experiência responsiva. Um exemplo de como a K2 Tech também atua na construção de aplicações e não apenas em páginas institucionais.",
    tags: ["React", "Next.js", "Firebase"],
    image: portfolioAsset("public/projects/tarefas.png"),
    liveUrl: "https://tasks-p26e.vercel.app/",
    githubUrl: "https://github.com/andersonjhonatan/Tasks",
    published: true,
  },
  {
    number: "03",
    name: "Convite Bob Esponja",
    category: "Experiência interativa",
    eyebrow: "Case criativo · projeto real",
    className: "bob",
    description: "Uma experiência completa que transforma um convite em produto interativo: entrada temática, informações, confirmação de presença e mini-jogo.",
    portfolioDescription: "Um dos cases criativos mais completos da K2 Tech. O convite começa com uma entrada inspirada no Siri Cascudo, apresenta a celebração com forte identidade visual e leva o convidado até um mini-jogo interativo no qual é preciso montar o hambúrguer de siri na ordem correta. O projeto mostra como narrativa, interação e utilidade podem coexistir em uma experiência mobile-first.",
    tags: ["Next.js", "Mini-jogo", "RSVP", "Mobile-first"],
    image: bobAsset("public/assets/hero-siri-cascudo.png"),
    secondaryImage: bobAsset("public/assets/siri-kitchen-game.png"),
    imagePosition: "center",
    liveUrl: "https://convite-bob-esponja.vercel.app",
    githubUrl: "https://github.com/andersonjhonatan/Convite-BobEsponja",
    published: true,
    spotlight: true,
  },
  {
    number: "04",
    name: "Helena & Gabriel",
    category: "Experiência editorial",
    eyebrow: "Casamento · projeto real",
    className: "helenaGabriel",
    description: "Experiência editorial de casamento com abertura cinematográfica, história do casal, agenda, RSVP e lista de presentes.",
    portfolioDescription: "Experiência editorial de casamento construída com uma estética sofisticada e acolhedora. O projeto reúne abertura imersiva, narrativa do casal, cronologia da história, cerimônia e recepção, agenda completa, confirmação de presença e lista de presentes em uma jornada elegante e responsiva.",
    tags: ["Editorial", "Storytelling", "RSVP", "Responsivo"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=86",
    imagePosition: "65% 42%",
    liveUrl: "https://helena-gabriel-editorial-luxo-87k6pd4tx.vercel.app/",
    published: true,
  },
  {
    number: "05",
    name: "A Cavalgada de Benício",
    category: "Experiência interativa",
    eyebrow: "Vaqueiro · projeto real",
    className: "vaqueiro",
    description: "Experiência infantil com clima de sertão, abertura imersiva, narrativa afetiva, missão interativa e confirmação de presença.",
    portfolioDescription: "Uma experiência infantil inspirada no universo do pequeno vaqueiro. A entrada apresenta a aventura de Benício, o projeto organiza data, local e contagem regressiva e inclui uma missão na qual o convidado ajuda a encontrar ferraduras pela fazendinha. Tudo pensado para funcionar primeiro no celular.",
    tags: ["Next.js", "Interação", "Storytelling", "Mobile-first"],
    image: "https://images.pexels.com/photos/19087935/pexels-photo-19087935.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imagePosition: "center 35%",
    liveUrl: "https://convite-vaqueiro.vercel.app/#aventura",
    githubUrl: "https://github.com/andersonjhonatan/Convite-Vaqueiro",
    published: true,
  },
  {
    number: "06",
    name: "A Fazendinha da Helena",
    category: "Experiência interativa",
    eyebrow: "Vaqueira · projeto real",
    className: "vaqueira",
    description: "Experiência infantil delicada com universo de fazendinha, abertura visual, contagem regressiva, interação e RSVP.",
    portfolioDescription: "Uma versão feminina e delicada do universo da fazenda, construída com direção visual floral, personagens ilustrados e uma pequena missão interativa para encontrar lacinhos. O projeto equilibra fantasia, legibilidade e experiência mobile-first.",
    tags: ["Next.js", "Fazendinha", "Interação", "RSVP"],
    image: "https://cdn.pixabay.com/photo/2024/02/20/22/29/ai-generated-8586295_1280.jpg",
    imagePosition: "center 28%",
    liveUrl: "https://convite-vaqueira.vercel.app/#inicio",
    githubUrl: "https://github.com/andersonjhonatan/Convite-Vaqueira",
    published: true,
  },
  {
    number: "07",
    name: "Stella Explorations",
    category: "Experiência visual web",
    eyebrow: "Interface conceitual · projeto publicado",
    className: "stella",
    description: "Projeto web com foco em composição, atmosfera visual e uma navegação simples de alto impacto.",
    portfolioDescription: "Uma exploração visual construída para praticar direção de interface, hierarquia e atmosfera em uma experiência web com forte presença gráfica.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    image: portfolioAsset("public/projects/estella.png"),
    liveUrl: "https://stellar-explorations.onrender.com/",
    githubUrl: "https://github.com/andersonjhonatan/Stellar_Tailwind",
    published: true,
  },
  {
    number: "08",
    name: "Convite Roblox",
    category: "Experiência interativa",
    eyebrow: "Experiência mobile-first",
    className: "roblox",
    description: "Experiência infantil transformada em uma jornada digital com narrativa, interação e confirmação de presença.",
    portfolioDescription: "Uma experiência digital temática construída para celular, com abertura marcante, universo visual próprio e uma jornada que leva o convidado da descoberta até a confirmação de presença.",
    tags: ["Next.js", "Interação", "Storytelling"],
    image: portfolioAsset("public/projects/invitations/convite-roblox-ilhas.png"),
    githubUrl: "https://github.com/andersonjhonatan/ConviteRoblox",
  },
  {
    number: "09",
    name: "Convite Minecraft",
    category: "Experiência interativa",
    eyebrow: "Universo temático",
    className: "minecraft",
    description: "Experiência temática com narrativa de portal, interação e direção visual inspirada no universo do jogo.",
    portfolioDescription: "Experiência infantil pensada como uma entrada para outro mundo: narrativa de portal, elementos temáticos e uma experiência mobile-first criada para tornar o convidado parte da história.",
    tags: ["UX", "Mobile-first", "Animação"],
    githubUrl: "https://github.com/andersonjhonatan/Convite-Minecraft",
  },
  {
    number: "10",
    name: "Aniversário Spider-Man",
    category: "Experiência digital",
    eyebrow: "Experiência infantil",
    className: "spiderman",
    description: "Experiência digital de alto impacto com entrada marcante, composição visual forte e prioridade total para o celular.",
    portfolioDescription: "Uma experiência infantil criada para causar impacto já no primeiro acesso, equilibrando temática, legibilidade e interação sem perder a prioridade mobile-first.",
    tags: ["Next.js", "Mobile-first", "Experiência"],
    image: portfolioAsset("public/projects/invitations/convite-spiderman-hero.jpeg"),
    githubUrl: "https://github.com/andersonjhonatan/aniversario-spiderman",
  },
];

export const publishedProjects = showcaseProjects.filter((project) => project.published);

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
