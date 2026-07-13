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
  meadow: { border: "solid", width: 1.5, opacity: 0.7, radius: "rounded-2xl", inset: "inset-3 md:inset-4", motif: "meadow", keyline: true },
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
    /* Meadow: rumpun bunga liar lebat + rerumputan + kupu-kupu */
    case "meadow":
      return (
        <svg viewBox="0 0 64 64" width="60" height="60" {...svg}>
          {/* rerumputan */}
          <path d="M4 60 C2 42 6 26 14 18" />
          <path d="M12 60 C12 44 18 30 28 24" />
          <path d="M20 60 C22 46 30 36 40 30" />
          <path d="M28 60 C32 48 40 40 50 36" />
          <path d="M6 60 C4 50 8 44 14 44" opacity={0.5} />
          {/* daun */}
          <path d="M14 18 C8 14 8 8 14 8 C20 8 20 14 14 18Z" fill={fill} opacity={0.5} />
          <path d="M28 24 C34 20 40 22 40 28 C34 32 28 30 28 24Z" fill={fill} opacity={0.5} />
          <path d="M40 30 C46 26 52 28 52 34 C46 38 40 36 40 30Z" fill={fill} opacity={0.5} />
          {/* daisy besar */}
          <circle cx="14" cy="8" r="2.2" fill={fill} />
          <circle cx="14" cy="3" r="2.4" fill={fill} />
          <circle cx="18" cy="6" r="2.4" fill={fill} />
          <circle cx="17" cy="12" r="2.4" fill={fill} />
          <circle cx="11" cy="12" r="2.4" fill={fill} />
          <circle cx="10" cy="6" r="2.4" fill={fill} />
          <circle cx="14" cy="8" r="2" fill={stroke} />
          {/* daisy sedang 1 */}
          <circle cx="28" cy="18" r="2" fill={fill} />
          <circle cx="28" cy="14" r="2" fill={fill} />
          <circle cx="31" cy="16" r="2" fill={fill} />
          <circle cx="30" cy="21" r="2" fill={fill} />
          <circle cx="26" cy="21" r="2" fill={fill} />
          <circle cx="25" cy="16" r="2" fill={fill} />
          <circle cx="28" cy="18" r="1.6" fill={stroke} />
          {/* daisy sedang 2 */}
          <circle cx="40" cy="28" r="2" fill={fill} />
          <circle cx="40" cy="24" r="2" fill={fill} />
          <circle cx="43" cy="26" r="2" fill={fill} />
          <circle cx="42" cy="31" r="2" fill={fill} />
          <circle cx="38" cy="31" r="2" fill={fill} />
          <circle cx="37" cy="26" r="2" fill={fill} />
          <circle cx="40" cy="28" r="1.6" fill={stroke} />
          {/* daisy kecil 1 */}
          <circle cx="50" cy="38" r="1.6" fill={fill} />
          <circle cx="50" cy="35" r="1.6" fill={fill} />
          <circle cx="52" cy="37" r="1.6" fill={fill} />
          <circle cx="51" cy="41" r="1.6" fill={fill} />
          <circle cx="48" cy="41" r="1.6" fill={fill} />
          <circle cx="50" cy="38" r="1.2" fill={stroke} />
          {/* daisy kecil 2 */}
          <circle cx="8" cy="32" r="1.6" fill={fill} />
          <circle cx="8" cy="29" r="1.6" fill={fill} />
          <circle cx="10" cy="31" r="1.6" fill={fill} />
          <circle cx="9" cy="35" r="1.6" fill={fill} />
          <circle cx="6" cy="35" r="1.6" fill={fill} />
          <circle cx="8" cy="32" r="1.2" fill={stroke} />
          {/* kupu-kupu */}
          <ellipse cx="44" cy="11" rx="3" ry="2" fill={fill} opacity={0.6} />
          <ellipse cx="50" cy="11" rx="3" ry="2" fill={fill} opacity={0.6} />
          <ellipse cx="44" cy="15" rx="2.4" ry="1.8" fill={fill} opacity={0.6} />
          <ellipse cx="50" cy="15" rx="2.4" ry="1.8" fill={fill} opacity={0.6} />
          <path d="M47 9 L47 17" />
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

/* Motif tengah (centered) dipakai bersama oleh divider & aksen judul */
function CenterMotif({ slug, stroke, fill }: { slug: TemplateSlug; stroke: string; fill: string }) {
  const motif = FRAME_CONFIG[slug].motif;
  const svg = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motif) {
    case "vine":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...svg}>
          <circle cx="24" cy="14" r="3" fill={fill} />
          <circle cx="32" cy="19" r="3" fill={fill} />
          <circle cx="29" cy="29" r="3" fill={fill} />
          <circle cx="19" cy="29" r="3" fill={fill} />
          <circle cx="16" cy="19" r="3" fill={fill} />
          <circle cx="24" cy="22" r="2" fill={stroke} />
        </svg>
      );
    case "tick":
      return (
        <svg viewBox="0 0 48 48" width="34" height="34" {...svg}>
          <path d="M24 12 L34 24 L24 36 L14 24 Z" />
          <path d="M24 17 L29 24 L24 31 L19 24 Z" opacity={0.4} />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...svg}>
          <path d="M24 8 L34 20 L28 38 L20 38 L14 20 Z" />
          <path d="M14 20 L34 20 M20 38 L24 20 L28 38" />
          <circle cx="24" cy="28" r="2" fill={fill} />
        </svg>
      );
    case "rose":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...svg}>
          <circle cx="24" cy="20" r="8" />
          <path d="M24 20 C24 16 28 16 28 20 C28 25 20 25 20 20 C20 13 29 13 29 21" />
          <path d="M24 30 C26 26 30 26 30 30 C30 34 24 34 24 30Z" fill={fill} stroke="none" opacity={0.45} />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...svg}>
          <circle cx="24" cy="24" r="7" />
          <path d="M24 10 V15 M24 33 V38 M10 24 H15 M33 24 H38 M14 14 L17 17 M34 14 L31 17 M14 34 L17 31 M34 34 L31 31" />
        </svg>
      );
    case "deco":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...svg}>
          <path d="M12 36 L12 24 L24 24 L24 12 L36 12" />
          <path d="M12 30 L18 30 L18 36" opacity={0.5} />
          <path d="M24 24 L30 30 L36 30" opacity={0.5} />
          <circle cx="24" cy="24" r="2" fill={fill} stroke="none" />
        </svg>
      );
    case "meadow":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" {...svg}>
          {/* rerumputan */}
          <path d="M24 46 L24 28 M16 46 C14 38 16 32 24 28 M32 46 C34 38 32 32 24 28" />
          <path d="M24 28 C19 23 19 16 24 16 C29 16 29 23 24 28Z" fill={fill} opacity={0.5} />
          {/* daisy tengah besar */}
          <circle cx="24" cy="13" r="3.4" fill={fill} />
          <circle cx="24" cy="6" r="2.8" fill={fill} />
          <circle cx="29" cy="9" r="2.8" fill={fill} />
          <circle cx="28" cy="17" r="2.8" fill={fill} />
          <circle cx="20" cy="17" r="2.8" fill={fill} />
          <circle cx="19" cy="9" r="2.8" fill={fill} />
          <circle cx="24" cy="13" r="2.4" fill={stroke} />
          {/* daisy kiri */}
          <circle cx="11" cy="24" r="2.4" fill={fill} />
          <circle cx="11" cy="19" r="1.8" fill={fill} />
          <circle cx="14" cy="22" r="1.8" fill={fill} />
          <circle cx="13" cy="27" r="1.8" fill={fill} />
          <circle cx="9" cy="27" r="1.8" fill={fill} />
          <circle cx="8" cy="22" r="1.8" fill={fill} />
          <circle cx="11" cy="24" r="1.4" fill={stroke} />
          {/* daisy kanan */}
          <circle cx="37" cy="24" r="2.4" fill={fill} />
          <circle cx="37" cy="19" r="1.8" fill={fill} />
          <circle cx="40" cy="22" r="1.8" fill={fill} />
          <circle cx="39" cy="27" r="1.8" fill={fill} />
          <circle cx="35" cy="27" r="1.8" fill={fill} />
          <circle cx="34" cy="22" r="1.8" fill={fill} />
          <circle cx="37" cy="24" r="1.4" fill={stroke} />
          {/* kupu-kupu di atas */}
          <ellipse cx="21" cy="6" rx="2.4" ry="1.6" fill={fill} opacity={0.6} />
          <ellipse cx="27" cy="6" rx="2.4" ry="1.6" fill={fill} opacity={0.6} />
          <ellipse cx="21" cy="9" rx="2" ry="1.4" fill={fill} opacity={0.6} />
          <ellipse cx="27" cy="9" rx="2" ry="1.4" fill={fill} opacity={0.6} />
          <path d="M24 4 L24 11" />
        </svg>
      );
    case "scroll":
    default:
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...svg}>
          <path d="M14 32 C14 20 24 14 34 16 C40 17 39 24 34 23 C30 22 31 17 36 18" />
          <path d="M14 32 C14 40 24 42 30 38" opacity={0.5} />
          <circle cx="14" cy="28" r="2" fill={fill} />
        </svg>
      );
  }
}

/* Pembatas antar-section, bertema tiap template (menggantikan FloralDivider) */
export function OrnamentDivider({ slug, theme }: { slug: string; theme: Theme }) {
  const s = asTemplateSlug(slug);
  const c = theme.primary;
  return (
    <div className="mx-auto mt-4 flex items-center justify-center gap-3" style={{ color: c }}>
      <span className="h-px w-16 opacity-40 md:w-24" style={{ background: c }} />
      <CenterMotif slug={s} stroke={c} fill={theme.accent} />
      <span className="h-px w-16 opacity-40 md:w-24" style={{ background: c }} />
    </div>
  );
}

/* Aksen kecil di atas judul section */
export function TitleOrnament({ slug, theme }: { slug: string; theme: Theme }) {
  const s = asTemplateSlug(slug);
  return (
    <div className="mb-3 flex justify-center opacity-90">
      <CenterMotif slug={s} stroke={theme.primary} fill={theme.accent} />
    </div>
  );
}

/* Ornamen latar sangat redup di sudut section, mengikuti template */
export function BackgroundFloat({ slug, theme }: { slug: string; theme: Theme }) {
  const s = asTemplateSlug(slug);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-12 -top-12 opacity-[0.10]">
        <CornerArt slug={s} stroke={theme.primary} fill={theme.accent} />
      </div>
      <div className="absolute -bottom-12 -right-12 rotate-180 opacity-[0.10]">
        <CornerArt slug={s} stroke={theme.primary} fill={theme.accent} />
      </div>
    </div>
  );
}
