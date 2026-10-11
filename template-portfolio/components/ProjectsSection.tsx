"use client";

import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import projectsData from "@/data/projects.json";

type Project = (typeof projectsData)[number];

const ALL_CATEGORIES = [
  "Todos",
  ...Array.from(new Set(projectsData.map((p) => p.category))),
];

// ─── Carrusel de imágenes ─────────────────────────────────────────────────────

const ImageCarousel = memo(function ImageCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  // Sin imágenes — placeholder de gradiente
  if (images.length === 0) {
    const gradients = [
      "from-indigo-900/70 to-slate-900",
      "from-purple-900/70 to-slate-900",
      "from-blue-900/70 to-slate-900",
      "from-emerald-900/70 to-slate-900",
      "from-rose-900/70 to-slate-900",
    ];
    const gradient = gradients[title.length % gradients.length];
    return (
      <div
        className={`w-full aspect-[16/9] bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <span className="text-zinc-100 font-mono text-2xl font-bold tracking-widest opacity-40">
          {title.slice(0, 3).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 group">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} — imagen ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Flechas — siempre visibles en mobile, hover en desktop */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white md:opacity-0 md:group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white md:opacity-0 md:group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Dots indicadores */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

// ─── Card de proyecto ─────────────────────────────────────────────────────────

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const isPrivate = !project.github && !project.demo;
  const link = project.demo || project.github || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="bento-card overflow-hidden flex flex-col"
    >
      {/* Carrusel */}
      <ImageCarousel images={project.images ?? []} title={project.title} />

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
            <span>{project.startDate ?? project.endDate}</span>
            {project.category && (
              <>
                <span className="opacity-40">|</span>
                <span>{project.category}</span>
              </>
            )}
          </div>

          {/* Privado o link */}
          {isPrivate ? (
            <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-0.5">
              <Lock size={10} />
              PRIVADO
            </span>
          ) : (
            link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${project.title}`}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-200"
              >
                <ArrowUpRight size={13} />
              </a>
            )
          )}
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
          {project.title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Separador */}
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
          {/* Tech stack */}
          {project.techs && project.techs.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {project.techs.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60"
                >
                  <TechIcon tech={tech} size={13} />
                  <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 tracking-tight whitespace-nowrap">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

// ─── Sección principal ────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [filter, setFilter] = useState("Todos");

  const filtered =
    filter === "Todos"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      id="proyectos"
      className="py-24 bg-background text-foreground transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Tabs de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                filter === cat
                  ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid de cards */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
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
    </section>
  );
}
