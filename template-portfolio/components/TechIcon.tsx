"use client";

import React from "react";

// 1. Definimos la interfaz del objeto real que exporta 'thesvg'
interface SvgIconData {
  svg: string;
  title: string;
  hex: string;
  variants?: {
    default?: string;
    mono?: string;
  };
}

// 2. Importaciones desde 'thesvg'
import python from "thesvg/python";
import nodejs from "thesvg/nodejs";
import react from "thesvg/react";
import nextjs from "thesvg/nextjs";
import typescript from "thesvg/typescript";
import tailwindcss from "thesvg/tailwindcss";
import docker from "thesvg/docker";
import postgresql from "thesvg/postgresql";
import redis from "thesvg/redis";
import aws from "thesvg/aws";
import vercel from "thesvg/vercel";
import n8n from "thesvg/n8n";
import make from "thesvg/make";
import zapier from "thesvg/zapier";
import fastapi from "thesvg/fastapi";
import mongodb from "thesvg/mongodb";
import mysql from "thesvg/mysql";
import graphql from "thesvg/graphql";
import javascript from "thesvg/javascript";
import github from "thesvg/github";
import linux from "thesvg/linux";
import nginx from "thesvg/nginx";
import framer from "thesvg/framer";
import figma from "thesvg/figma";
import firebase from "thesvg/firebase";
import prisma from "thesvg/prisma";
import supabase from "thesvg/supabase";
import stripe from "thesvg/stripe";
import openai from "thesvg/openai";
import whatsapp from "thesvg/whatsapp";
import vite from "thesvg/vite";
import git from "thesvg/git";
import cloudflare from "thesvg/cloudflare";
import railway from "thesvg/railway";

// Mapa de los objetos de los iconos
const ICON_MAP: Record<string, SvgIconData> = {
  python,
  nodejs,
  react,
  nextjs,
  typescript,
  tailwindcss,
  docker,
  postgresql,
  redis,
  aws,
  vercel,
  n8n,
  make,
  zapier,
  fastapi,
  mongodb,
  mysql,
  graphql,
  javascript,
  "github-actions": github,
  linux,
  nginx,
  framer,
  figma,
  firebase,
  prisma,
  supabase,
  stripe,
  openai,
  whatsapp,
  vite,
  git,
  cloudflare,
  railway,
};

// Human-readable labels
const TECH_LABELS: Record<string, string> = {
  nodejs: "Node.js",
  nextjs: "Next.js",
  tailwindcss: "Tailwind",
  "github-actions": "GitHub Actions",
  postgresql: "PostgreSQL",
  fastapi: "FastAPI",
  openai: "OpenAI",
  whatsapp: "WhatsApp",
};

function label(tech: string): string {
  return TECH_LABELS[tech] ?? tech.charAt(0).toUpperCase() + tech.slice(1);
}

type Props = {
  tech: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
  useMono?: boolean; // Opción para usar la variante mono si existe
};

export default function TechIcon({
  tech,
  size = 16,
  showLabel = false,
  className = "",
  useMono = false,
}: Props) {
  const key = tech.toLowerCase();
  const iconData = ICON_MAP[key];

  // Elegimos el string SVG adecuado (mono o default/raw)
  const rawSvg = iconData
    ? (useMono && iconData.variants?.mono) || iconData.svg
    : null;

  const iconNode = rawSvg ? (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={label(key)}
      dangerouslySetInnerHTML={{
        __html: rawSvg.replace(
          /<svg /i,
          `<svg width="${size}" height="${size}" `,
        ),
      }}
    />
  ) : (
    // Fallback: initials badge
    <span
      className="inline-flex items-center justify-center rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
      style={{ width: size, height: size }}
      aria-label={label(key)}
    >
      {key.slice(0, 2).toUpperCase()}
    </span>
  );

  if (!showLabel) return iconNode;

  return (
    <span className="inline-flex items-center gap-1.5">
      {iconNode}
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {label(key)}
      </span>
    </span>
  );
}
