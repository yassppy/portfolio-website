"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, ChevronDown } from "lucide-react";

type TimelineItem = {
  type: "work" | "edu" | "award";
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tags: string[];
  current?: boolean;
};

const timeline: TimelineItem[] = [
  {
    type: "work",
    title: "Desarrollador de Automatizaciones",
    company: "Empresa / Freelance",
    period: "2024 – Presente",
    location: "Remoto",
    description:
      "Diseño e implementación de flujos de automatización para pymes, integrando CRMs, ERPs y APIs externas.",
    achievements: [
      "Automaticé +50 procesos empresariales reduciendo costos operativos en un 40%",
      "Integré +15 plataformas distintas usando n8n y Make",
      "Desarrollé bots de WhatsApp con IA para atención al cliente",
    ],
    tags: ["n8n", "Python", "APIs", "WhatsApp Business"],
    current: true,
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Startup / Agencia",
    period: "2023 – 2024",
    location: "Ciudad, País",
    description:
      "Desarrollo de aplicaciones web completas con Next.js, Node.js y bases de datos relacionales.",
    achievements: [
      "Construí 10+ aplicaciones web de principio a fin",
      "Redujo el tiempo de entrega en 30% con arquitecturas reutilizables",
      "Implementé CI/CD con GitHub Actions en todos los proyectos",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    current: false,
  },
  {
    type: "edu",
    title: "Ingeniería en Sistemas / Informática",
    company: "Universidad",
    period: "2020 – 2024",
    location: "Ciudad, País",
    description:
      "Carrera de Ingeniería con énfasis en desarrollo de software, bases de datos y arquitectura de sistemas.",
    achievements: [
      "Graduado con honores — promedio 9.2/10",
      "Proyecto final: Sistema de automatización empresarial",
      "Participación en hackathons nacionales — 2do lugar",
    ],
    tags: ["Algoritmos", "Bases de Datos", "Redes", "POO"],
    current: false,
  },
  {
    type: "award",
    title: "Certificación n8n & Automatización",
    company: "n8n / Udemy",
    period: "2023",
    location: "Online",
    description: "Certificación avanzada en automatización de flujos de trabajo con n8n.",
    achievements: [
      "Completé 40+ horas de entrenamiento práctico",
      "Implementé proyectos reales durante la certificación",
    ],
    tags: ["n8n", "Automatización", "APIs"],
    current: false,
  },
  {
    type: "award",
    title: "AWS Cloud Practitioner",
    company: "Amazon Web Services",
    period: "2023",
    location: "Online",
    description: "Certificación en fundamentos de cloud computing con AWS.",
    achievements: [
      "Comprendí arquitecturas cloud escalables",
      "Trabajé con EC2, S3, Lambda y RDS",
    ],
    tags: ["AWS", "Cloud", "DevOps"],
    current: false,
  },
];

const icons = {
  work: Briefcase,
  edu: GraduationCap,
  award: Award,
};

const colors = {
  work: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  edu: "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  award: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
};

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-indigo-500 dark:text-indigo-400 text-sm font-mono mb-2">
            // experiencia
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Experiencia & Formación
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
            Trayectoria profesional con resultados medibles y aprendizaje continuo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden sm:block" />

          <div className="space-y-4">
            {timeline.map((item, i) => {
              const Icon = icons[item.type];
              const isOpen = expanded === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative sm:pl-16"
                >
                  {/* Icon dot */}
                  <div
                    className={`hidden sm:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center border ${colors[item.type]} z-10`}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Card */}
                  <div
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                              {item.title}
                            </h3>
                            {item.current && (
                              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800 font-medium">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                ACTUAL
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {item.company} · {item.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono hidden sm:block">
                            {item.period}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} className="text-zinc-400" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Period mobile */}
                      <span className="text-xs text-zinc-400 font-mono sm:hidden block mt-1">
                        {item.period}
                      </span>

                      {/* Tags always visible */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                              {item.description}
                            </p>
                            <ul className="space-y-2">
                              {item.achievements.map((ach, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.08 }}
                                  className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                  <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
                                  {ach}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
