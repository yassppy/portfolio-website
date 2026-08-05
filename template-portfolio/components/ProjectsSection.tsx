"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import projectsData from "@/data/projects.json";

type Project = (typeof projectsData)[number] & {
  startDate?: string;
  endDate?: string;
};

const ALL_CATEGORIES = [
  "Todos",
  ...Array.from(new Set(projectsData.map((p) => p.category))),
];

function ProjectPlaceholder({ title }: { title: string }) {
  const gradients = [
    "from-indigo-900/60 to-slate-900",
    "from-purple-900/60 to-slate-900",
    "from-blue-900/60 to-slate-900",
    "from-emerald-900/60 to-slate-900",
    "from-rose-900/60 to-slate-900",
  ];
  const gradient = gradients[title.length % gradients.length];

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center border border-zinc-300 dark:border-zinc-700/50`}
    >
      <span className="text-zinc-100 font-mono text-xs font-bold tracking-wider uppercase">
        {title.slice(0, 3)}
      </span>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [imageError, setImageError] = useState(false);

  const renderDate = () => {
    const { startDate, endDate } = project;
    if (!startDate && !endDate) return null;
    if (!startDate || startDate === endDate) {
      return endDate || startDate;
    }
    return `${startDate} - ${endDate}`;
  };

  const dateText = renderDate();

  return (
    <motion.a
      href={project.github || project.demo || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group flex items-start sm:items-center gap-4 px-4 py-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors duration-150 cursor-pointer"
      aria-label={`Ver ${project.title}`}
    >
      {/* Container de Imagen / Placeholder */}
      <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-zinc-200 dark:bg-[#1c1c1f] border border-zinc-300 dark:border-zinc-800 flex items-center justify-center mt-1 sm:mt-0">
        {project.image && !imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5 flex-wrap mb-1">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors lowercase">
            {project.title.toLowerCase()}
          </span>

          {dateText && (
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-wide truncate">
              {dateText}
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-2.5">
          {project.description}
        </p>

        {/* Tech Badges (Icono + Nombre) */}
        {project.techs && project.techs.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {project.techs.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-[#1c1c1f] border border-zinc-300/80 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
              >
                <TechIcon tech={tech} size={13} />
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 capitalize tracking-tight">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Arrow icon */}
      <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:border-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1 sm:mt-0">
        <ArrowUpRight size={14} />
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("Todos");

  const filtered =
    filter === "Todos"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header en Español */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-1 h-6 bg-indigo-500 rounded-full block" />
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Proyectos
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-1 pl-4">
              // proyectos destacados
            </p>
          </div>
          <span className="text-sm font-mono text-zinc-500 mt-1 uppercase">
            {String(filtered.length).padStart(2, "0")} CREADOS
          </span>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 mb-2" />

        {/* Project list */}
        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/40">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-500 text-sm py-12"
            >
              No hay proyectos en esta categoría.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
