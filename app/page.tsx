import { AboutSection, HeroSection } from "./components/home/hero-about";
import { ExperiencesSection, ContactSection } from "./components/home/interactive-sections";
import { ProjectsSection } from "./components/home/projects-section";
import { ServicesSection, MethodSection } from "./components/home/services-method";
import { SiteFooter, SiteHeader } from "./components/home/site-chrome";
import "./components/home/home-performance.css";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperiencesSection />
      <MethodSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
