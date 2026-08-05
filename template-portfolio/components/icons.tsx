/**
 * Centralized icon exports.
 * - Brand icons (GitHub, LinkedIn) come from thesvg
 * - UI icons come from lucide-react
 *
 * Both are wrapped so they share a consistent `size` prop API.
 */

"use client";

import React from "react";
import github from "thesvg/github";
import linkedin from "thesvg/linkedin";

// ─── Brand icons ─────────────────────────────────────────────────────────────

type BrandProps = {
  size?: number;
  className?: string;
  variant?: "mono" | "default";
};

export function GithubIcon({
  size = 18,
  className = "",
  variant = "mono",
}: BrandProps) {
  const rawSvg =
    variant === "mono" && github.variants?.mono
      ? github.variants.mono
      : github.svg;

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: rawSvg.replace(
          /<svg /i,
          `<svg width="${size}" height="${size}" `
        ),
      }}
    />
  );
}

export function LinkedinIcon({
  size = 18,
  className = "",
  variant = "default",
}: BrandProps) {
  const rawSvg =
    variant === "mono" && linkedin.variants?.mono
      ? linkedin.variants.mono
      : linkedin.svg;

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: rawSvg.replace(
          /<svg /i,
          `<svg width="${size}" height="${size}" `
        ),
      }}
    />
  );
}

// Re-export lucide UI icons for convenience
export {
  Moon,
  Sun,
  Menu,
  X,
  ArrowUp,
  Download,
  Mail,
  MapPin,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
  Users,
  TrendingUp,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
} from "lucide-react";
