"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  Clock,
  Sun,
} from "@/components/icons";
import TechIcon from "@/components/TechIcon";

const roles = [
  "Automatización de Procesos",
  "Backend",
  "Soluciones con IA",
];

const techStack = [
  { id: "python", name: "Python" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "fastapi", name: "FastAPI" },
  { id: "python", name: "Python" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "fastapi", name: "FastAPI" },
];

const doubledTechStack = [...techStack, ...techStack];

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

function TypingText() {
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
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-zinc-600 dark:text-zinc-400 font-mono text-base sm:text-lg">
      {displayed}
      <span className="animate-pulse text-indigo-500 dark:text-indigo-400">|</span>
    </span>
  );
}

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-sm font-bold tracking-wider text-zinc-800 dark:text-zinc-200">
      {time || "10:04:54 AM"}
    </span>
  );
}

export default function HeroSection() {
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
            className="md:col-span-2 bento-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-zinc-200 dark:bg-[#28282c] flex-shrink-0 border border-zinc-300 dark:border-[#3e3e42] flex items-center justify-center">
              <span className="text-zinc-700 dark:text-zinc-300 text-3xl font-bold">MM</span>
            </div>

            <div className="flex flex-col text-center sm:text-left justify-center h-full pt-1">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
                Miguel Mallqui
              </h1>
              <div className="mt-1">
                <TypingText />
              </div>
            </div>
          </motion.div>

          {/* Time & Location Widget Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card p-6 flex flex-col justify-between gap-3 text-zinc-700 dark:text-zinc-300"
          >
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-zinc-500 dark:text-zinc-400" />
              <LiveClock />
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <Sun size={15} className="text-amber-500 dark:text-amber-400" />
              <span>24°C</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono tracking-wider">
              <MapPin size={14} className="text-zinc-500" />
              <span className="uppercase">LIMA, PE</span>
            </div>
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
              Especialista en automatización de procesos y desarrollo full stack.
              Construyo soluciones que eliminan el trabajo repetitivo, integran
              sistemas y escalan sin esfuerzo. Apasionado por la eficiencia medible
              y la inteligencia artificial.
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
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 flex items-center justify-center hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md fill-current"
                >
                  <Icon size={20} className="w-5 h-5 fill-current text-current" />
                </motion.a>
              ))}
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
