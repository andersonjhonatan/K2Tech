import { AboutSection, HeroSection } from "./components/home/hero-about";
import { ExperiencesSection, ContactSection } from "./components/home/interactive-sections";
import { InvitationIntro } from "./components/home/invitation-intro";
import { ProjectsSection } from "./components/home/projects-section";
import { ServicesSection, MethodSection } from "./components/home/services-method";
import { SiteFooter, SiteHeader } from "./components/home/site-chrome";
import "./components/home/invitation-intro.css";
import "./components/home/home-performance.css";

export default function Home() {
  return (
    <main>
      <InvitationIntro />
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperiencesSection />
      <ServicesSection />
      <MethodSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
