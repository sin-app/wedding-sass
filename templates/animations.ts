import type { Variants } from "framer-motion";

export type TemplateSlug =
  | "classic"
  | "floral"
  | "minimalist"
  | "luxury"
  | "garden"
  | "boho"
  | "vintage"
  | "meadow";

const EASE_OUT = "easeOut";
const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

// Entrance untuk hero / cover gate — halus, sesuai karakter tiap template.
export const heroVariants: Record<TemplateSlug, Variants> = {
  classic: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  },
  floral: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE_OUT } },
  },
  minimalist: {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
  luxury: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_LUXURY } },
  },
  garden: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  },
  boho: {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
  vintage: {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
  },
  meadow: {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE_OUT } },
  },
};

// Reveal per-section (digunakan oleh <Reveal>).
export const revealVariants: Record<TemplateSlug, Variants> = {
  classic: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  },
  floral: {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
  },
  minimalist: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  },
  luxury: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
  },
  garden: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
  boho: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  },
  vintage: {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
  },
  meadow: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
};

export function asTemplateSlug(slug: string | undefined): TemplateSlug {
  return (
    slug === "floral" ||
      slug === "minimalist" ||
      slug === "luxury" ||
      slug === "classic" ||
      slug === "garden" ||
      slug === "boho" ||
      slug === "vintage" ||
      slug === "meadow"
      ? slug
      : "classic"
  ) as TemplateSlug;
}
