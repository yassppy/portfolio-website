"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import profileData from "@/data/profile.json";

// Mapa de íconos de redes sociales para ContactSection
const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

const SOCIAL_COLORS: Record<string, string> = {
  github: "text-zinc-700 dark:text-zinc-300",
  linkedin: "text-blue-500",
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.subject.trim()) newErrors.subject = "El asunto es requerido";
    if (!form.message.trim() || form.message.length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }

    setTimeout(() => setSubmitState("idle"), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? "border-red-400 focus:ring-red-400/30"
        : "border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500/30 focus:border-indigo-400"
    }`;

  const { social, location, available, availableText } = profileData;

  // Construir lista de items de contacto desde profile.json
  const contactItems = [
    ...social.map(({ platform, label, url, username }) => ({
      icon: SOCIAL_ICONS[platform] ?? GithubIcon,
      label,
      value: username,
      href: url,
      color: SOCIAL_COLORS[platform] ?? "text-zinc-500",
    })),
    {
      icon: MapPin,
      label: "Ubicación",
      value: `${location.city}, ${location.country}`,
      href: null as string | null,
      color: "text-indigo-500",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950">
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
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Hablemos
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
            ¿Tienes un proyecto que automatizar o un producto que construir?
            Cuéntame. Respondo en menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactItems.map(({ icon: Icon, label, value, href, color }) => {
              const cardContent = (
                <>
                  <div
                    className={`p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 ${color}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {value}
                    </p>
                  </div>
                </>
              );

              const cardClasses =
                "group flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200";

              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClasses} cursor-pointer hover:shadow-sm`}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={label} className={cardClasses}>
                  {cardContent}
                </div>
              );
            })}

            {available && (
              <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Disponible para proyectos
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-500">
                  {availableText}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={inputClass("name")}
                    disabled={submitState === "loading"}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={inputClass("email")}
                    disabled={submitState === "loading"}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="¿En qué puedo ayudarte?"
                  className={inputClass("subject")}
                  disabled={submitState === "loading"}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  className={`${inputClass("message")} resize-none`}
                  disabled={submitState === "loading"}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={
                  submitState === "loading" || submitState === "success"
                }
                whileHover={{ scale: submitState === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: submitState === "idle" ? 0.98 : 1 }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  submitState === "success"
                    ? "bg-green-600 text-white cursor-default"
                    : submitState === "error"
                      ? "bg-red-600 text-white"
                      : submitState === "loading"
                        ? "bg-indigo-400 text-white cursor-wait"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/30 cursor-pointer"
                }`}
              >
                {submitState === "loading" && (
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {submitState === "success" && <CheckCircle size={16} />}
                {submitState === "error" && <AlertCircle size={16} />}
                {submitState === "idle" && <Send size={16} />}
                {submitState === "loading"
                  ? "Enviando..."
                  : submitState === "success"
                    ? "¡Mensaje enviado!"
                    : submitState === "error"
                      ? "Error — intenta de nuevo"
                      : "Enviar mensaje"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
