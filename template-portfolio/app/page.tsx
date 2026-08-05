import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
// import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#fcfcfc] dark:bg-[#121212] text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        {/*<ExperienceSection />*/}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
