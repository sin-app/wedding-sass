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
  const svg = { fill: "none", stroke, strokeWidth: 1.4 } as const;
  switch (motif) {
    case "vine":
      return (
        <svg viewBox="0 0 64 64" width="54" height="54" {...svg}>
          <path d="M2 62 C2 30 30 2 62 2" />
          <path d="M11 62 C11 40 40 11 62 11" opacity={0.5} />
          <path d="M15 15 C9 9 9 2 15 2 C21 2 21 9 15 15Z" fill={fill} opacity={0.8} />
          <circle cx="15" cy="15" r="3" fill={fill} opacity={0.9} />
        </svg>
      );
    case "tick":
      return (
        <svg viewBox="0 0 64 64" width="36" height="36" {...svg}>
          <path d="M4 26 L4 4 L26 4" />
          <path d="M4 13 L13 13 L13 4" opacity={0.6} />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 64 64" width="58" height="58" {...svg}>
          <path d="M4 60 C4 28 28 4 60 4" />
          <path d="M13 60 C13 36 36 13 60 13" opacity={0.6} />
          <path d="M31 9 C41 9 41 19 31 19 C21 19 21 9 31 9Z" fill={fill} opacity={0.9} />
          <circle cx="31" cy="14" r="2.2" fill={fill} />
        </svg>
      );
    case "rose":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" {...svg}>
          <path d="M8 58 C10 38 26 20 46 14" />
          <path d="M20 48 C13 42 15 33 23 34 C27 39 25 47 20 48Z" fill={fill} opacity={0.5} />
          <path d="M34 30 C40 25 49 27 49 35 C42 38 34 35 34 30Z" fill={fill} opacity={0.5} />
          <circle cx="46" cy="18" r="8" />
          <path d="M46 10 C42 4 47 1 52 4" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" {...svg}>
          <path d="M4 60 C4 28 28 4 60 4" />
          <circle cx="22" cy="22" r="7" />
          <path d="M22 6 V11 M7 22 H12 M11 11 L14 14 M33 11 L30 14 M11 33 L14 30" />
        </svg>
      );
    case "deco":
      return (
        <svg viewBox="0 0 64 64" width="54" height="54" {...svg}>
          <path d="M4 60 C4 28 28 4 60 4" />
          <path d="M12 60 L12 32 L32 32 L32 12 L60 12" />
          <path d="M20 60 L20 40 L40 40 L40 20 L60 20" opacity={0.5} />
          <circle cx="26" cy="26" r="3" fill={fill} stroke="none" />
        </svg>
      );
    case "meadow":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" {...svg}>
          <path d="M4 60 C4 28 28 4 60 4" opacity={0.7} />
          <path d="M14 60 C14 48 14 40 12 30 M14 60 C14 50 20 44 28 42 M14 60 C14 52 8 48 4 46" />
          <circle cx="12" cy="28" r="3" fill={fill} stroke="none" />
          <circle cx="28" cy="41" r="2.5" fill={fill} stroke="none" />
          <circle cx="4" cy="46" r="2.5" fill={fill} stroke="none" />
        </svg>
      );
    case "scroll":
    default:
      return (
        <svg viewBox="0 0 64 64" width="46" height="46" {...svg}>
          <path d="M3 61 C3 30 30 3 61 3" />
          <path d="M12 61 C12 38 38 12 61 12" opacity={0.5} />
          <circle cx="14" cy="14" r="3" fill={fill} opacity={0.85} />
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
