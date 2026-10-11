"use client";

import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import TechIcon from "@/components/TechIcon";
import profileData from "@/data/profile.json";

// ─── Typing effect ────────────────────────────────────────────────────────────

const TypingText = memo(function TypingText() {
  const roles = profileData.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = deleting
      ? setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
          if (displayed.length === 1) {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }, 50)
      : setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
          if (displayed.length === current.length) {
            setTimeout(() => setDeleting(true), 1800);
          }
        }, 80);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  return (
    <span className="text-zinc-600 dark:text-zinc-400 font-mono text-base sm:text-lg">
      {displayed}
      <span className="animate-pulse text-indigo-500 dark:text-indigo-400">|</span>
    </span>
  );
});

// ─── Mapa de íconos sociales ──────────────────────────────────────────────────

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

// ─── Carrusel infinito — duplicado para bucle continuo ────────────────────────
// Se calcula una sola vez fuera del componente (no recalcula en cada render)

const doubledTechStack = [...profileData.techStack, ...profileData.techStack];

// ─── Main section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { name, initials, bio, social } = profileData;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-12 bg-background text-foreground relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col gap-4">

        {/* Top Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Main Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bento-card p-6 flex flex-col sm:flex-row items-center gap-5"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-zinc-200 dark:bg-[#28282c] flex-shrink-0 border border-zinc-300 dark:border-[#3e3e42] flex items-center justify-center">
              <span className="text-zinc-700 dark:text-zinc-300 text-3xl font-bold">
                {initials}
              </span>
            </div>

            <div className="flex flex-col text-center sm:text-left justify-center h-full">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
                {name}
              </h1>
              <div className="mt-1">
                <TypingText />
              </div>
              {/* Badge disponible */}
              <div className="mt-3 flex justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[11px] font-mono tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  disponible para nuevos proyectos
                </span>
              </div>
            </div>
          </motion.div>

          {/* AI Flow GIF Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card overflow-hidden flex items-center justify-center"
            style={{ minHeight: "160px" }}
          >
            <Image
              src="/clawd-typing.gif"
              alt="AI SDD flow"
              width={200}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
              loading="eager"
              priority
            />
          </motion.div>
        </div>

        {/* Middle Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Bio Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 bento-card p-6 sm:p-7 flex items-center"
          >
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {bio}
            </p>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bento-card p-6 flex items-center justify-center"
          >
            <div className="flex items-center gap-3">
              {social.map(({ platform, label, url }) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 flex items-center justify-center hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md fill-current"
                  >
                    <Icon size={20} className="w-5 h-5 fill-current text-current" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Auto Infinite Scroll Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full overflow-hidden py-3 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {doubledTechStack.map(({ id, name }, index) => (
              <div
                key={`${id}-${index}`}
                className="flex items-center gap-2.5 px-3.5 py-2 bento-card hover:border-zinc-400 dark:hover:border-zinc-500 transition-all cursor-pointer hover:scale-105 shrink-0"
              >
                <TechIcon tech={id} size={20} />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
