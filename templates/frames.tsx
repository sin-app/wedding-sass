"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Theme } from "./theme";
import { asTemplateSlug, type TemplateSlug } from "./animations";

const POS: Record<string, CSSProperties> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0, transform: "scaleX(-1)" },
  bl: { bottom: 0, left: 0, transform: "scaleY(-1)" },
  br: { bottom: 0, right: 0, transform: "scale(-1, -1)" },
};

type Motif =
  | "scroll"
  | "vine"
  | "tick"
  | "gem"
  | "rose"
  | "sun"
  | "deco"
  | "meadow";

interface FrameStyle {
  border: "solid" | "double" | "dashed" | "dotted";
  width: number;
  opacity: number;
  radius: string;
  inset: string;
  motif: Motif;
  keyline: boolean;
}

/* Tiap template punya identitas frame tersendiri (2-tone: primary + accent) */
export const FRAME_CONFIG: Record<TemplateSlug, FrameStyle> = {
  classic: { border: "double", width: 3, opacity: 0.7, radius: "rounded-sm", inset: "inset-3 md:inset-4", motif: "scroll", keyline: true },
  floral: { border: "solid", width: 1.5, opacity: 0.7, radius: "rounded-xl", inset: "inset-3 md:inset-4", motif: "vine", keyline: true },
  minimalist: { border: "solid", width: 1, opacity: 0.4, radius: "rounded-none", inset: "inset-2", motif: "tick", keyline: false },
  luxury: { border: "double", width: 3, opacity: 0.85, radius: "rounded-sm", inset: "inset-3 md:inset-4", motif: "gem", keyline: true },
  garden: { border: "solid", width: 1.5, opacity: 0.65, radius: "rounded-2xl", inset: "inset-3 md:inset-4", motif: "rose", keyline: true },
  boho: { border: "dashed", width: 1.5, opacity: 0.65, radius: "rounded-3xl", inset: "inset-3 md:inset-4", motif: "sun", keyline: false },
  vintage: { border: "double", width: 3, opacity: 0.7, radius: "rounded-sm", inset: "inset-3 md:inset-4", motif: "deco", keyline: true },
  meadow: { border: "solid", width: 1.5, opacity: 0.6, radius: "rounded-2xl", inset: "inset-3 md:inset-4", motif: "meadow", keyline: true },
};

function CornerArt({ slug, stroke, fill }: { slug: TemplateSlug; stroke: string; fill: string }) {
  const motif = FRAME_CONFIG[slug].motif;
  const svg = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motif) {
    /* Floral: ranting berbunga 5 kelopak */
    case "vine":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <path d="M6 60 C12 42 30 24 56 16" />
          <path d="M20 44 C14 40 14 32 22 34 C26 38 24 46 20 44Z" fill={fill} opacity={0.6} />
          <circle cx="52" cy="9" r="3" fill={fill} />
          <circle cx="59" cy="14" r="3" fill={fill} />
          <circle cx="55" cy="21" r="3" fill={fill} />
          <circle cx="47" cy="21" r="3" fill={fill} />
          <circle cx="44" cy="14" r="3" fill={fill} />
          <circle cx="51" cy="15" r="1.8" fill={stroke} />
        </svg>
      );
    /* Minimalist: sudut bersarang bersih */
    case "tick":
      return (
        <svg viewBox="0 0 64 64" width="34" height="34" {...svg}>
          <path d="M5 24 L5 5 L24 5" />
          <path d="M5 13 L13 13 L13 5" opacity={0.55} />
        </svg>
      );
    /* Luxury: berlian faceting */
    case "gem":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <path d="M32 8 L47 24 L38 54 L26 54 L17 24 Z" />
          <path d="M17 24 L47 24 M26 54 L32 24 L38 54" />
          <circle cx="32" cy="40" r="2.4" fill={fill} />
        </svg>
      );
    /* Garden: kuncup mawar + daun */
    case "rose":
      return (
        <svg viewBox="0 0 64 64" width="54" height="54" {...svg}>
          <path d="M10 60 C16 46 26 34 42 28" />
          <path d="M22 46 C16 42 16 34 24 36 C28 40 26 48 22 46Z" fill={fill} opacity={0.5} />
          <path d="M30 38 C38 36 43 30 37 26 C31 22 26 30 30 38Z" fill={fill} opacity={0.5} />
          <circle cx="43" cy="22" r="9" />
          <path d="M43 22 C43 17 48 17 48 22 C48 28 38 28 38 22 C38 14 49 14 49 23" />
        </svg>
      );
    /* Boho: matahari ber sinar + lengkungan */
    case "sun":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" {...svg}>
          <circle cx="24" cy="24" r="8" />
          <path d="M24 8 V13 M24 35 V40 M8 24 H13 M35 24 H40 M13 13 L16 16 M35 13 L32 16 M13 35 L16 32 M35 35 L32 32" />
          <path d="M6 58 C6 30 30 8 58 6" opacity={0.45} />
        </svg>
      );
    /* Vintage: tangga art-deco + semburan */
    case "deco":
      return (
        <svg viewBox="0 0 64 64" width="54" height="54" {...svg}>
          <path d="M6 60 L6 30 L30 30 L30 6 L60 6" />
          <path d="M14 60 L14 38 L38 38 L38 14 L60 14" opacity={0.45} />
          <path d="M6 30 L20 20 M30 30 L44 20" opacity={0.7} />
          <circle cx="22" cy="22" r="2.4" fill={fill} stroke="none" />
        </svg>
      );
    /* Meadow: 3 bunga liar ber tangkai */
    case "meadow":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" {...svg}>
          <path d="M14 60 L14 42 M14 52 C10 48 10 42 14 42 C18 42 18 48 14 52Z" />
          <circle cx="14" cy="38" r="3" fill={fill} stroke="none" />
          <path d="M30 60 L30 32 M30 46 C26 42 26 36 30 36 C34 36 34 42 30 46Z" />
          <circle cx="30" cy="28" r="3.2" fill={fill} stroke="none" />
          <path d="M46 60 L46 24 M46 40 C42 36 42 30 46 30 C50 30 50 36 46 40Z" />
          <circle cx="46" cy="20" r="3.4" fill={fill} stroke="none" />
        </svg>
      );
    /* Classic: gulungan scroll + daun */
    case "scroll":
    default:
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" {...svg}>
          <path d="M4 60 C4 34 24 18 44 14" />
          <path d="M44 14 C55 12 59 19 54 25 C49 31 43 26 46 19" />
          <path d="M14 60 C14 46 28 32 44 28" opacity={0.45} />
          <circle cx="12" cy="12" r="2.4" fill={fill} opacity={0.85} />
        </svg>
      );
  }
}

export function TemplateFrame({ slug, theme }: { slug: string; theme: Theme }) {
  const s = asTemplateSlug(slug);
  const cfg = FRAME_CONFIG[s];
  const borderStyle: CSSProperties = {
    borderColor: theme.primary,
    borderWidth: cfg.width,
    borderStyle: cfg.border,
    opacity: cfg.opacity,
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <div className={`absolute ${cfg.inset} ${cfg.radius}`} style={borderStyle} />
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <div key={p} className="absolute hidden sm:block" style={POS[p]}>
          <CornerArt slug={s} stroke={theme.primary} fill={theme.accent} />
        </div>
      ))}
    </div>
  );
}

/* Bingkai per-section yang menyatu dengan identitas frame template */
export function FrameCard({
  slug,
  theme,
  className = "",
  children,
}: {
  slug: string;
  theme: Theme;
  className?: string;
  children: ReactNode;
}) {
  const s = asTemplateSlug(slug);
  const cfg = FRAME_CONFIG[s];
  const color = theme.primary;
  const elevation = "0 10px 30px -12px rgba(0,0,0,0.22)";
  const isDouble = cfg.border === "double";

  let boxShadow = elevation;
  if (isDouble) boxShadow = `inset 0 0 0 3px ${color}22, ${elevation}`;
  if (cfg.keyline) boxShadow = `inset 0 0 0 1px ${theme.accent}, ${boxShadow}`;

  const style: CSSProperties = {
    borderColor: color,
    borderWidth: isDouble ? 1 : Math.max(1, cfg.width - 1),
    borderStyle: isDouble ? "solid" : cfg.border,
    background: theme.surface,
    boxShadow,
  };
  return (
    <div className={`relative border ${cfg.radius} ${className}`} style={style}>
      {children}
    </div>
  );
}
