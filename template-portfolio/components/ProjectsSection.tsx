"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import projectsData from "@/data/projects.json";

type Project = (typeof projectsData)[number];

const ALL_CATEGORIES = [
  "Todos",
  ...Array.from(new Set(projectsData.map((p) => p.category))),
];

// ─── Placeholder cuando no hay imagen ────────────────────────────────────────
const ProjectPlaceholder = memo(function ProjectPlaceholder({
  title,
}: {
  title: string;
}) {
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
});

// ─── Imagen individual de galería con next/image ──────────────────────────────
const GalleryImage = memo(function GalleryImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const [error, setError] = useState(false);

  // Solo transformar URLs externas de GitHub; rutas locales se dejan tal cual
  const isExternal = src.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90 flex items-center justify-center p-1.5"
    >
      {error ? (
        <div className="w-full aspect-video flex flex-col items-center justify-center gap-2 bg-zinc-900">
          <span className="text-zinc-600 text-xs font-mono">
            imagen no disponible
          </span>
        </div>
      ) : isExternal ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
          onError={() => setError(true)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="relative w-full aspect-video">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 90vw, 448px"
            className="object-contain rounded-lg"
            onError={() => setError(true)}
            loading={index === 0 ? "eager" : "lazy"}
            quality={80}
          />
        </div>
      )}
    </motion.div>
  );
});

// ─── Modal de galería ─────────────────────────────────────────────────────────
const GalleryModal = memo(function GalleryModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images ?? [];

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="w-full sm:max-w-md bg-zinc-950 border border-zinc-800 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80">
          <div>
            <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider mb-0.5">
              galería
            </p>
            <h3 className="text-sm font-semibold text-zinc-100 leading-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar galería"
            className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Stack de imágenes con scroll vertical */}
        <div className="overflow-y-auto max-h-[72vh] p-4 space-y-3">
          {images.length > 0 ? (
            images.map((img, i) => (
              <GalleryImage
                key={i}
                src={img}
                alt={`${project.title} — imagen ${i + 1}`}
                index={i}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full aspect-video rounded-xl border border-zinc-800 overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-zinc-900 to-slate-900 flex flex-col items-center justify-center gap-3">
                  <span className="text-4xl font-mono font-bold text-zinc-100 tracking-widest">
                    {project.title.slice(0, 3).toUpperCase()}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {project.category}
                  </span>
                  <div className="flex gap-1.5 mt-1">
                    {project.techs.slice(0, 3).map((t) => (
                      <TechIcon key={t} tech={t} size={18} />
                    ))}
                  </div>
                </div>
              </motion.div>
              <p className="text-xs text-zinc-600 text-center leading-relaxed">
                Sin imágenes aún. Agrégalas en{" "}
                <code className="text-indigo-400 bg-zinc-800 px-1 py-0.5 rounded text-[10px]">
                  data/projects.json
                </code>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center pb-3 pt-1">
          <div className="w-8 h-1 bg-zinc-700 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Fila de proyecto individual ──────────────────────────────────────────────
const ProjectRow = memo(function ProjectRow({
  project,
  onOpenGallery,
}: {
  project: Project;
  onOpenGallery: (p: Project) => void;
}) {
  const renderDate = () => {
    const { startDate, endDate } = project;
    if (!startDate && !endDate) return null;
    if (!startDate || startDate === endDate) return endDate || startDate;
    return `${startDate} – ${endDate}`;
  };
  const dateText = renderDate();

  return (
    <div className="flex items-start gap-3 py-4 border-b border-zinc-200/80 dark:border-zinc-800/40 last:border-0">      {/* Thumbnail — iniciales del título */}
      <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 dark:bg-[#1c1c1f] border border-zinc-300 dark:border-zinc-800">
        <ProjectPlaceholder title={project.title} />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 lowercase">
            {project.title.toLowerCase()}
          </span>
          {dateText && (
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-wide">
              {dateText}
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-2.5">
          {project.description}
        </p>

        {project.techs && project.techs.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            {project.techs.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-[#1c1c1f] border border-zinc-300/80 dark:border-zinc-800/80 shrink-0"
              >
                <TechIcon tech={tech} size={13} />
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 capitalize tracking-tight whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="shrink-0 flex flex-col gap-1.5 mt-0.5">
        <button
          onClick={() => onOpenGallery(project)}
          aria-label={`Galería de ${project.title}`}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105"
        >
          <ChevronRight size={14} />
        </button>

        <a
          href={project.github || project.demo || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${project.title} en GitHub`}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
});

// ─── Sección principal ────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [filter, setFilter] = useState("Todos");
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);

  const filtered =
    filter === "Todos"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const handleOpenGallery = useCallback((p: Project) => {
    setGalleryProject(p);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setGalleryProject(null);
  }, []);

  return (
    <section
      id="proyectos"
      className="py-24 bg-background text-foreground transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
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

        <div className="border-t border-zinc-200 dark:border-zinc-800/80 mb-2" />

        {/* Lista de proyectos */}
        <div>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <ProjectRow
                  project={project}
                  onOpenGallery={handleOpenGallery}
                />
              </motion.div>
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

      {/* Modal de galería */}
      <AnimatePresence>
        {galleryProject && (
          <GalleryModal
            project={galleryProject}
            onClose={handleCloseGallery}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
