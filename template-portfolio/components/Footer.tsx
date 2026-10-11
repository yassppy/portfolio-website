// Server Component — sin estado, sin eventos de cliente
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import profileData from "@/data/profile.json";
import FooterClient from "@/components/FooterClient";

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export default function Footer() {
  const { name, social } = profileData;

  return (
    <footer className="bg-background text-foreground border-t border-zinc-200 dark:border-zinc-800/50 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright — estático, se renderiza en el servidor */}
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
              © {new Date().getFullYear()} creado por {name.toLowerCase()}, template para portafolio personal
            </p>
          </div>

          {/* Parte interactiva (links + botón scroll-top) en cliente */}
          <FooterClient social={social} socialIcons={SOCIAL_ICONS} />
        </div>
      </div>
    </footer>
  );
}
