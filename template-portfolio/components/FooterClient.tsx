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
    <div className="flex items-center gap-3.5">
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
            className="group p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-sm fill-current"
          >
            <Icon
              size={16}
              className="w-4 h-4 fill-current text-current transition-colors duration-300"
            />
          </motion.a>
        );
      })}

      <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700/50 mx-1" />

      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Volver arriba"
        className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-300 cursor-pointer shadow-lg shadow-indigo-500/20"
      >
        <ArrowUp size={16} />
      </motion.button>
    </div>
  );
}
