"use client";

import type { CSSProperties } from "react";
import type { Theme } from "./theme";
import { asTemplateSlug, type TemplateSlug } from "./animations";

const POS: Record<string, CSSProperties> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0, transform: "scaleX(-1)" },
  bl: { bottom: 0, left: 0, transform: "scaleY(-1)" },
  br: { bottom: 0, right: 0, transform: "scale(-1, -1)" },
};

function CornerArt({ slug, color }: { slug: TemplateSlug; color: string }) {
  switch (slug) {
    case "floral":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke={color} strokeWidth={1.4}>
          <path d="M2 62 C2 30 30 2 62 2" />
          <path d="M11 62 C11 40 40 11 62 11" opacity={0.5} />
          <path d="M15 15 C9 9 9 2 15 2 C21 2 21 9 15 15Z" fill={color} opacity={0.7} />
          <circle cx="15" cy="15" r="3" fill={color} opacity={0.85} />
        </svg>
      );
    case "luxury":
      return (
        <svg viewBox="0 0 64 64" width="60" height="60" fill="none" stroke={color} strokeWidth={1.6}>
          <path d="M4 60 C4 28 28 4 60 4" />
          <path d="M13 60 C13 36 36 13 60 13" opacity={0.6} />
          <path d="M31 9 C41 9 41 19 31 19 C21 19 21 9 31 9Z" fill={color} opacity={0.9} />
          <circle cx="31" cy="14" r="2.2" fill={color} />
        </svg>
      );
    case "minimalist":
      return (
        <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke={color} strokeWidth={1.5}>
          <path d="M4 26 L4 4 L26 4" />
          <path d="M4 12 L12 12 L12 4" opacity={0.6} />
        </svg>
      );
    case "classic":
    default:
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke={color} strokeWidth={1.3}>
          <path d="M3 61 C3 30 30 3 61 3" />
          <path d="M12 61 C12 38 38 12 61 12" opacity={0.5} />
          <circle cx="14" cy="14" r="3" fill={color} opacity={0.8} />
        </svg>
      );
  }
}

export function TemplateFrame({ slug, theme }: { slug: string; theme: Theme }) {
  const s = asTemplateSlug(slug);
  const color = theme.primary;
  const inset = s === "minimalist" ? "inset-2" : "inset-3 md:inset-4";
  const borderStyle: CSSProperties = {
    borderColor: color,
    borderWidth: s === "luxury" ? 2 : 1,
    borderStyle: "solid",
    opacity: s === "minimalist" ? 0.25 : 0.5,
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <div className={`absolute ${inset} rounded-sm`} style={borderStyle} />
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <div key={p} className="absolute hidden sm:block" style={POS[p]}>
          <CornerArt slug={s} color={color} />
        </div>
      ))}
    </div>
  );
}
