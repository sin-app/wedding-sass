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
  | "meadow"
  | "midnight"
  | "kawung";

interface FrameStyle {
  border: "solid" | "double" | "dashed" | "dotted";
  width: number;
  opacity: number;
  radius: string;
  inset: string;
  motif: Motif;
  keyline: boolean;
  innerDots?: boolean;
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
  meadow: { border: "solid", width: 1.5, opacity: 0.7, radius: "rounded-2xl", inset: "inset-3 md:inset-4", motif: "meadow", keyline: true, innerDots: true },
  midnight: { border: "double", width: 2, opacity: 0.85, radius: "rounded-md", inset: "inset-3 md:inset-4", motif: "midnight", keyline: true },
  javanese: { border: "double", width: 3, opacity: 0.85, radius: "rounded-sm", inset: "inset-3 md:inset-4", motif: "kawung", keyline: true },
};

function CornerArt({ slug, stroke, fill }: { slug: TemplateSlug; stroke: string; fill: string }) {
  const motif = FRAME_CONFIG[slug].motif;
  const svg = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motif) {
    /* Floral: ranting berbunga mekar + kuncup */
    case "vine":
      return (
        <svg viewBox="0 0 64 64" width="58" height="58" {...svg}>
          <path d="M6 60 C12 42 30 24 56 16" />
          <path d="M20 44 C14 40 14 32 22 34 C26 38 24 46 20 44Z" fill={fill} opacity={0.6} />
          <path d="M34 36 C28 32 28 24 36 26 C40 30 38 38 34 36Z" fill={fill} opacity={0.5} />
          {/* blossom besar */}
          <circle cx="52" cy="9" r="3" fill={fill} />
          <circle cx="59" cy="14" r="3" fill={fill} />
          <circle cx="55" cy="21" r="3" fill={fill} />
          <circle cx="47" cy="21" r="3" fill={fill} />
          <circle cx="44" cy="14" r="3" fill={fill} />
          <circle cx="51" cy="15" r="2" fill={stroke} />
          {/* blossom kecil */}
          <circle cx="40" cy="28" r="2" fill={fill} />
          <circle cx="45" cy="31" r="2" fill={fill} />
          <circle cx="42" cy="34" r="2" fill={fill} />
          <circle cx="37" cy="33" r="2" fill={fill} />
          <circle cx="42" cy="31" r="1.4" fill={stroke} />
          {/* kuncup */}
          <circle cx="26" cy="40" r="1.8" fill={fill} opacity={0.8} />
        </svg>
      );
    /* Minimalist: sudut bersarang + diamond + sparkle halus */
    case "tick":
      return (
        <svg viewBox="0 0 64 64" width="42" height="42" {...svg}>
          <path d="M5 30 L5 5 L30 5" />
          <path d="M5 15 L15 15 L15 5" opacity={0.5} />
          <path d="M15 15 L19 19 L15 23 L11 19 Z" opacity={0.45} />
          <path d="M5 30 L15 30 M30 5 L30 15" opacity={0.3} />
          <circle cx="23" cy="23" r="1.6" fill={fill} opacity={0.6} />
          <path d="M40 14 L41 17 L44 18 L41 19 L40 22 L39 19 L36 18 L39 17 Z" fill={fill} stroke="none" opacity={0.5} />
        </svg>
      );
    /* Luxury: berlian + sparkle + laurel */
    case "gem":
      return (
        <svg viewBox="0 0 64 64" width="58" height="58" {...svg}>
          <path d="M32 8 L47 24 L38 54 L26 54 L17 24 Z" />
          <path d="M17 24 L47 24 M26 54 L32 24 L38 54" />
          <circle cx="32" cy="40" r="2.4" fill={fill} />
          {/* gem kecil */}
          <path d="M12 44 L18 52 L14 58 L8 52 Z" opacity={0.6} />
          {/* sparkle */}
          <path d="M52 14 L53 18 L57 19 L53 20 L52 24 L51 20 L47 19 L51 18 Z" fill={fill} stroke="none" opacity={0.85} />
          <path d="M22 12 L22.6 14.4 L25 15 L22.6 15.6 L22 18 L21.4 15.6 L19 15 L21.4 14.4 Z" fill={fill} stroke="none" opacity={0.7} />
          {/* laurel */}
          <path d="M44 40 C50 38 54 42 54 48 C48 48 44 44 44 40Z" fill={fill} opacity={0.4} />
        </svg>
      );
    /* Garden: mawar + kuncup + daun */
    case "rose":
      return (
        <svg viewBox="0 0 64 64" width="58" height="58" {...svg}>
          <path d="M10 60 C16 46 26 34 42 28" />
          <path d="M22 46 C16 42 16 34 24 36 C28 40 26 48 22 46Z" fill={fill} opacity={0.5} />
          <path d="M30 38 C38 36 43 30 37 26 C31 22 26 30 30 38Z" fill={fill} opacity={0.5} />
          {/* mawar besar */}
          <circle cx="43" cy="22" r="9" />
          <path d="M43 22 C43 17 48 17 48 22 C48 28 38 28 38 22 C38 14 49 14 49 23" />
          {/* mawar kecil */}
          <circle cx="20" cy="30" r="5" />
          <path d="M20 30 C20 27 23 27 23 30 C23 33 17 33 17 30 C17 25 24 25 24 31" opacity={0.7} />
          {/* kuncup */}
          <circle cx="33" cy="44" r="2.4" fill={fill} opacity={0.6} />
          {/* daun tambahan */}
          <path d="M40 36 C46 34 50 38 50 44 C44 44 40 40 40 36Z" fill={fill} opacity={0.4} />
        </svg>
      );
    /* Boho: matahari + sinar + bintik */
    case "sun":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <circle cx="24" cy="24" r="8" />
          <path d="M24 8 V13 M24 35 V40 M8 24 H13 M35 24 H40 M13 13 L16 16 M35 13 L32 16 M13 35 L16 32 M35 35 L32 32 M24 4 V6 M24 42 V44 M4 24 H6 M42 24 H44" />
          <path d="M6 58 C6 30 30 8 58 6" opacity={0.45} />
          {/* matahari kecil */}
          <circle cx="46" cy="44" r="4" />
          <path d="M46 38 V40 M46 48 V50 M40 44 H42 M50 44 H52" opacity={0.7} />
          {/* bintik */}
          <circle cx="36" cy="50" r="1.4" fill={fill} opacity={0.7} />
          <circle cx="52" cy="26" r="1.4" fill={fill} opacity={0.7} />
          <circle cx="54" cy="36" r="1.2" fill={fill} opacity={0.6} />
        </svg>
      );
    /* Vintage: tangga art-deco + semburan + diamond */
    case "deco":
      return (
        <svg viewBox="0 0 64 64" width="58" height="58" {...svg}>
          <path d="M6 60 L6 30 L30 30 L30 6 L60 6" />
          <path d="M14 60 L14 38 L38 38 L38 14 L60 14" opacity={0.45} />
          <path d="M6 30 L20 20 M30 30 L44 20 M6 44 L18 34 M14 38 L26 30" opacity={0.7} />
          {/* semburan deco */}
          <path d="M6 6 L14 14 M6 14 L14 6" opacity={0.7} />
          <circle cx="22" cy="22" r="2.4" fill={fill} stroke="none" />
          {/* diamond kecil */}
          <path d="M48 48 L52 52 L48 56 L44 52 Z" fill={fill} opacity={0.5} />
          {/* chevron */}
          <path d="M40 40 L46 46 L52 40" opacity={0.6} />
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
          <ellipse cx="44" cy="15" rx="2.4" ry={1.8} fill={fill} opacity={0.6} />
          <ellipse cx="50" cy="15" rx="2.4" ry={1.8} fill={fill} opacity={0.6} />
          <path d="M47 9 L47 17" />
          {/* wheat */}
          <path d="M56 60 C56 52 57 46 58 42" />
          <path d="M58 42 C56 40 56 38 58 38 C60 38 60 40 58 42Z" fill={fill} opacity={0.7} />
          <path d="M57 47 C55 45 55 43 57 43 C59 43 59 45 57 47Z" fill={fill} opacity={0.7} />
          <path d="M55 52 C53 50 53 48 55 48 C57 48 57 50 55 52Z" fill={fill} opacity={0.7} />
          {/* lebah */}
          <g opacity={0.75}>
            <ellipse cx="46" cy="52" rx="3" ry="2" fill={fill} />
            <path d="M44 51 H48 M44 53 H48" stroke={stroke} strokeWidth={0.6} />
            <ellipse cx="44" cy="49" rx="2" ry={1.3} fill={stroke} opacity={0.25} />
            <ellipse cx="48" cy="49" rx="2" ry={1.3} fill={stroke} opacity={0.25} />
          </g>
        </svg>
      );
    /* Midnight: emas floral (gold foil) */
    case "midnight":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <path d="M6 6 C6 28 16 44 44 48" />
          <path d="M6 6 C18 6 32 10 44 24" />
          <path d="M44 48 C54 48 60 42 60 34 C60 28 54 28 52 32 C50 36 54 42 58 40" />
          <path d="M20 22 C14 16 14 10 22 12 C28 16 24 28 20 22Z" fill={fill} opacity={0.5} />
          <path d="M32 36 C26 32 26 26 32 28 C38 32 34 40 32 36Z" fill={fill} opacity={0.5} />
          <circle cx="46" cy="40" r="3" fill={fill} />
          <circle cx="46" cy="33" r="3" fill={fill} />
          <circle cx="52" cy="37" r="3" fill={fill} />
          <circle cx="49" cy="45" r="3" fill={fill} />
          <circle cx="41" cy="45" r="3" fill={fill} />
          <circle cx="47" cy="40" r="2" fill={stroke} />
          <circle cx="10" cy="10" r="2" fill={fill} opacity={0.8} />
        </svg>
      );
    /* Javanese: Kawung (4 lingkaran beririsan) — sudut */
    case "kawung":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <circle cx="24" cy="12" r="12" />
          <circle cx="36" cy="24" r="12" />
          <circle cx="24" cy="36" r="12" />
          <circle cx="12" cy="24" r="12" />
          <circle cx="24" cy="24" r="5" fill={fill} opacity={0.6} stroke="none" />
          <circle cx="24" cy="2" r="2" fill={fill} stroke="none" />
          <circle cx="46" cy="24" r="2" fill={fill} stroke="none" />
          <circle cx="24" cy="46" r="2" fill={fill} stroke="none" />
          <circle cx="2" cy="24" r="2" fill={fill} stroke="none" />
        </svg>
      );
    /* Classic: gulungan scroll + daun + beri + seal */
    case "scroll":
    default:
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" {...svg}>
          <path d="M4 60 C4 34 24 18 44 14" />
          <path d="M44 14 C55 12 59 19 54 25 C49 31 43 26 46 19" />
          <path d="M14 60 C14 46 28 32 44 28" opacity={0.45} />
          {/* daun kecil */}
          <path d="M22 40 C18 36 18 30 24 31 C27 34 25 41 22 40Z" fill={fill} opacity={0.5} />
          <path d="M34 30 C30 26 30 20 36 21 C39 24 37 31 34 30Z" fill={fill} opacity={0.5} />
          {/* beri */}
          <circle cx="30" cy="22" r="2" fill={fill} />
          <circle cx="36" cy="18" r="1.6" fill={fill} opacity={0.8} />
          {/* seal */}
          <circle cx="12" cy="12" r="2.8" fill={fill} opacity={0.85} />
          <circle cx="12" cy="12" r="1.2" stroke={stroke} strokeWidth={0.6} />
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

  // Midnight Romance: bingkai emas 4 sisi dari ornament SVG + garis tepi.
  // Sisi kiri/kanan memakai tile berulang (repeat-y) → lebar tetap di segala tinggi.
  if (cfg.motif === "midnight") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <div className={`absolute ${cfg.inset} ${cfg.radius}`} style={borderStyle} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ornaments/top.svg" alt="" className="absolute left-0 top-0 w-full" style={{ opacity: cfg.opacity }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ornaments/bottom.svg" alt="" className="absolute bottom-0 left-0 w-full" style={{ opacity: cfg.opacity }} />
        <div
          className="absolute left-0 top-0 h-full w-12 bg-[length:48px_240px] md:w-14 md:bg-[length:56px_280px]"
          style={{
            backgroundImage: "url(/ornaments/left.svg)",
            backgroundRepeat: "repeat-y",
            opacity: cfg.opacity,
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-12 bg-[length:48px_240px] md:w-14 md:bg-[length:56px_280px]"
          style={{
            backgroundImage: "url(/ornaments/right.svg)",
            backgroundRepeat: "repeat-y",
            opacity: cfg.opacity,
          }}
        />
      </div>
    );
  }

  // Tradisional Jawa: bingkai 4 sisi dari ornament SVG (tumpal + kawung + gunungan).
  if (s === "javanese") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <div className={`absolute ${cfg.inset} ${cfg.radius}`} style={borderStyle} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ornaments/javanese/top.svg" alt="" className="absolute left-0 top-0 w-full" style={{ opacity: cfg.opacity }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ornaments/javanese/bottom.svg" alt="" className="absolute bottom-0 left-0 w-full" style={{ opacity: cfg.opacity }} />
        <div
          className="absolute left-0 top-0 h-full w-12 bg-[length:48px_240px] md:w-14 md:bg-[length:56px_280px]"
          style={{
            backgroundImage: "url(/ornaments/javanese/left.svg)",
            backgroundRepeat: "repeat-y",
            opacity: cfg.opacity,
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-12 bg-[length:48px_240px] md:w-14 md:bg-[length:56px_280px]"
          style={{
            backgroundImage: "url(/ornaments/javanese/right.svg)",
            backgroundRepeat: "repeat-y",
            opacity: cfg.opacity,
          }}
        />
      </div>
    );
  }

  // Template non-midnight: bingkai 4 sisi seperti Midnight Romance,
  // memakai motif khas tiap template (CornerArt di sudut + CenterMotif di tepi).
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <div className={`absolute ${cfg.inset} ${cfg.radius}`} style={borderStyle} />
      {cfg.innerDots && (
        <div
          className={`absolute inset-4 md:inset-5 ${cfg.radius}`}
          style={{ borderColor: theme.accent, borderWidth: 1, borderStyle: "dotted", opacity: 0.45 }}
        />
      )}

      {/* Keempat sudut */}
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <div key={p} className="absolute hidden sm:block" style={POS[p]}>
          <CornerArt slug={s} stroke={theme.primary} fill={theme.accent} />
        </div>
      ))}

      {/* Tepian atas & bawah: motif tengah di garis tepi */}
      <div
        className="absolute left-0 right-0 top-1 flex justify-center"
        style={{ opacity: cfg.opacity }}
      >
        <CenterMotif slug={s} stroke={theme.primary} fill={theme.accent} />
      </div>
      <div
        className="absolute bottom-1 left-0 right-0 flex rotate-180 justify-center"
        style={{ opacity: cfg.opacity }}
      >
        <CenterMotif slug={s} stroke={theme.primary} fill={theme.accent} />
      </div>

      {/* Rel tepi kiri & kanan: motif kecil berulang sepanjang sisi */}
      <div
        className="absolute bottom-16 left-1 top-16 flex flex-col items-center justify-around"
        style={{ opacity: cfg.opacity }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="scale-75">
            <CenterMotif slug={s} stroke={theme.primary} fill={theme.accent} />
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-16 right-1 top-16 flex flex-col items-center justify-around"
        style={{ opacity: cfg.opacity }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="scale-75">
            <CenterMotif slug={s} stroke={theme.primary} fill={theme.accent} />
          </div>
        ))}
      </div>
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
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <circle cx="24" cy="14" r="3" fill={fill} />
          <circle cx="32" cy="19" r="3" fill={fill} />
          <circle cx="29" cy="29" r="3" fill={fill} />
          <circle cx="19" cy="29" r="3" fill={fill} />
          <circle cx="16" cy="19" r="3" fill={fill} />
          <circle cx="24" cy="22" r="2" fill={stroke} />
          {/* kuncup samping */}
          <circle cx="11" cy="33" r="1.8" fill={fill} />
          <circle cx="37" cy="33" r="1.8" fill={fill} />
          {/* daun */}
          <path d="M24 33 C20 30 20 25 24 25 C28 25 28 30 24 33Z" fill={fill} opacity={0.45} />
        </svg>
      );
    case "tick":
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...svg}>
          <path d="M24 12 L34 24 L24 36 L14 24 Z" />
          <path d="M24 17 L29 24 L24 31 L19 24 Z" opacity={0.4} />
          <circle cx="24" cy="24" r="1.6" fill={fill} />
          <path d="M40 10 L41 13 L44 14 L41 15 L40 18 L39 15 L36 14 L39 13 Z" fill={fill} stroke="none" opacity={0.5} />
          <path d="M8 38 L9 41 L12 42 L9 43 L8 46 L7 43 L4 42 L7 41 Z" fill={fill} stroke="none" opacity={0.4} />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <path d="M24 8 L34 20 L28 38 L20 38 L14 20 Z" />
          <path d="M14 20 L34 20 M20 38 L24 20 L28 38" />
          <circle cx="24" cy="28" r="2" fill={fill} />
          {/* sparkles */}
          <path d="M40 10 L41 13 L44 14 L41 15 L40 18 L39 15 L36 14 L39 13 Z" fill={fill} stroke="none" opacity={0.8} />
          <path d="M9 34 L9.8 36.6 L12.4 37.4 L9.8 38.2 L9 41 L8.2 38.2 L5.6 37.4 L8.2 36.6 Z" fill={fill} stroke="none" opacity={0.7} />
        </svg>
      );
    case "rose":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <circle cx="24" cy="20" r="8" />
          <path d="M24 20 C24 16 28 16 28 20 C28 25 20 25 20 20 C20 13 29 13 29 21" />
          <path d="M24 30 C26 26 30 26 30 30 C30 34 24 34 24 30Z" fill={fill} stroke="none" opacity={0.45} />
          {/* mawar kecil samping */}
          <circle cx="13" cy="32" r="4" />
          <path d="M13 32 C13 30 15 30 15 32 C15 34 11 34 11 32 C11 29 15 29 15 33" opacity={0.7} />
          <circle cx="35" cy="32" r="4" />
          <path d="M35 32 C35 30 37 30 37 32 C37 34 33 34 33 32 C33 29 37 29 37 33" opacity={0.7} />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <circle cx="24" cy="24" r="7" />
          <path d="M24 10 V15 M24 33 V38 M10 24 H15 M33 24 H38 M14 14 L17 17 M34 14 L31 17 M14 34 L17 31 M34 34 L31 31 M24 6 V9 M24 39 V42 M6 24 H9 M39 24 H42" />
          <circle cx="38" cy="38" r="1.6" fill={fill} opacity={0.7} />
          <circle cx="10" cy="38" r="1.6" fill={fill} opacity={0.7} />
          <circle cx="38" cy="10" r="1.4" fill={fill} opacity={0.6} />
        </svg>
      );
    case "deco":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <path d="M12 36 L12 24 L24 24 L24 12 L36 12" />
          <path d="M12 30 L18 30 L18 36" opacity={0.5} />
          <path d="M24 24 L30 30 L36 30" opacity={0.5} />
          <circle cx="24" cy="24" r="2" fill={fill} stroke="none" />
          {/* semburan */}
          <path d="M24 6 L27 10 M24 6 L21 10 M24 6 L24 11" opacity={0.6} />
          <path d="M12 12 L16 16 M12 16 L16 12" opacity={0.6} />
          <path d="M36 12 L40 16 M36 16 L40 12" opacity={0.6} />
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
          <ellipse cx="21" cy="9" rx="2" ry={1.4} fill={fill} opacity={0.6} />
          <ellipse cx="27" cy="9" rx="2" ry={1.4} fill={fill} opacity={0.6} />
          <path d="M24 4 L24 11" />
          {/* lebah */}
          <g opacity={0.75}>
            <ellipse cx="24" cy="38" rx="2.6" ry={1.8} fill={fill} />
            <path d="M22 37 H26 M22 39 H26" stroke={stroke} strokeWidth={0.6} />
            <ellipse cx="22" cy="35.5" rx={1.8} ry={1.2} fill={stroke} opacity={0.25} />
            <ellipse cx="26" cy="35.5" rx={1.8} ry={1.2} fill={stroke} opacity={0.25} />
          </g>
        </svg>
      );
    case "midnight":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <circle cx="24" cy="14" r="3" fill={fill} />
          <circle cx="32" cy="19" r="3" fill={fill} />
          <circle cx="29" cy="29" r="3" fill={fill} />
          <circle cx="19" cy="29" r="3" fill={fill} />
          <circle cx="16" cy="19" r="3" fill={fill} />
          <circle cx="24" cy="22" r="2" fill={stroke} />
          <path d="M24 33 C20 30 20 25 24 25 C28 25 28 30 24 33Z" fill={fill} opacity={0.5} />
          <circle cx="11" cy="33" r="1.8" fill={fill} />
          <circle cx="37" cy="33" r="1.8" fill={fill} />
        </svg>
      );
    /* Javanese: Gunungan (gunungan wayang) — motif tengah */
    case "kawung":
      return (
        <svg viewBox="0 0 48 48" width="46" height="46" {...svg}>
          <path d="M24 44 C10 40 8 22 24 4 C40 22 38 40 24 44 Z" />
          <path d="M24 38 C14 35 13 22 24 10 C35 22 34 35 24 38 Z" fill={fill} fillOpacity={0.25} strokeWidth={1} />
          <path d="M24 32 C18 30 17 22 24 16 C31 22 30 30 24 32 Z" fill={fill} fillOpacity={0.5} strokeWidth={0.8} />
          <circle cx="24" cy="24" r="2.2" fill={fill} stroke="none" />
          <circle cx="24" cy="6" r="1.6" fill={fill} stroke="none" />
        </svg>
      );
    case "scroll":
    default:
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...svg}>
          <path d="M14 32 C14 20 24 14 34 16 C40 17 39 24 34 23 C30 22 31 17 36 18" />
          <path d="M14 32 C14 40 24 42 30 38" opacity="0.5" />
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
