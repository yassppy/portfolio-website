"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

type SocialItem = {
  platform: string;
  label: string;
  url: string;
};

type Props = {
  social: SocialItem[];
  socialIcons: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  >;
};

export default function FooterClient({ social, socialIcons }: Props) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="flex items-center gap-3">
      {social.map(({ platform, label, url }) => {
        const Icon = socialIcons[platform];
        if (!Icon) return null;
        return (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-300 cursor-pointer shadow-md"
          >
            <Icon size={18} className="fill-current" />
          </motion.a>
        );
      })}

      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Volver arriba"
        className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-300 cursor-pointer shadow-lg shadow-indigo-500/30"
      >
        <ArrowUp size={18} />
      </motion.button>
    </div>
  );
}
