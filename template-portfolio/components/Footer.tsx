"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    {
      icon: GithubIcon,
      href: "https://github.com/yassppy",
      label: "GitHub",
    },
    {
      icon: LinkedinIcon,
      href: "https://linkedin.com/in/miguel-mallqui",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-zinc-200 dark:border-zinc-800/50 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <span className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
              &lt;yassppy /&gt;
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 font-medium tracking-wide">
              © {new Date().getFullYear()} Miguel Mallqui, template para portafolios
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3.5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-sm fill-current"
              >
                <Icon size={16} className="w-4 h-4 fill-current text-current transition-colors duration-300" />
              </motion.a>
            ))}

            {/* Separador visual */}
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700/50 mx-1" />

            {/* Back to top */}
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
        </div>
      </div>
    </footer>
  );
}
