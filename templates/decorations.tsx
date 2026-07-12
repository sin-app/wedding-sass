"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Theme } from "./theme";

/* Latar pola botanik sangat redup di belakang konten */
export function BotanicalBackground({ theme }: { theme: Theme }) {
  const f = theme.floral;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 15% 10%, ${f}22, transparent 60%), radial-gradient(60% 50% at 85% 90%, ${f}1f, transparent 60%)`,
        }}
      />
      <svg
        className="absolute -left-10 -top-10 h-64 w-64 opacity-[0.12]"
        viewBox="0 0 100 100"
        fill="none"
        stroke={f}
        strokeWidth={1.4}
      >
        <path d="M0 0 C30 10 45 35 50 70" />
        <path d="M20 8 C18 20 26 28 38 30 M40 20 C36 32 44 40 56 42 M58 34 C54 46 62 54 74 56" />
        <circle cx="50" cy="74" r="4" fill={f} stroke="none" />
      </svg>
      <svg
        className="absolute -bottom-12 -right-10 h-72 w-72 opacity-[0.12] rotate-180"
        viewBox="0 0 100 100"
        fill="none"
        stroke={f}
        strokeWidth={1.4}
      >
        <path d="M0 0 C30 10 45 35 50 70" />
        <path d="M20 8 C18 20 26 28 38 30 M40 20 C36 32 44 40 56 42 M58 34 C54 46 62 54 74 56" />
        <circle cx="50" cy="74" r="4" fill={f} stroke="none" />
      </svg>
    </div>
  );
}

/* Pembatas section bergaya ranting + bunga di tengah */
export function FloralDivider({ theme }: { theme: Theme }) {
  const c = theme.primary;
  const f = theme.floral;
  return (
    <div className="mx-auto mt-4 flex items-center justify-center gap-3" style={{ color: c }}>
      <span className="h-px w-16 opacity-40 md:w-24" style={{ background: c }} />
      <svg viewBox="0 0 44 26" width="44" height="26" fill="none" stroke={c} strokeWidth={1.3}>
        <path d="M22 24 C14 20 10 13 10 5" />
        <path d="M22 24 C30 20 34 13 34 5" />
        <path d="M22 24 C22 18 22 11 22 6" />
        <circle cx="22" cy="6" r="3.2" fill={f} stroke="none" />
      </svg>
      <span className="h-px w-16 opacity-40 md:w-24" style={{ background: c }} />
    </div>
  );
}

/* Ranting daun kecil sebagai aksen */
export function LeafSprig({
  theme,
  className,
  style,
}: {
  theme: Theme;
  className?: string;
  style?: CSSProperties;
}) {
  const c = theme.floral;
  return (
    <svg
      viewBox="0 0 60 28"
      width="56"
      height="26"
      fill="none"
      stroke={c}
      strokeWidth={1.2}
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M2 26 C2 16 18 8 30 5 C42 8 58 16 58 26" />
      <path d="M30 5 C25 12 25 19 30 26 C35 19 35 12 30 5Z" fill={c} opacity={0.45} stroke="none" />
    </svg>
  );
}

/* Kelopak melayang halus (dimatikan saat reduced-motion) */
export function Petal({
  theme,
  delay = 0,
  left = "10%",
}: {
  theme: Theme;
  delay?: number;
  left?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const c = theme.floral;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute top-0 z-10"
      style={{ left }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: "110vh", opacity: [0, 0.75, 0], rotate: 360 }}
      transition={{ duration: 15, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={c} opacity={0.55}>
        <path d="M12 2 C18 6 18 16 12 22 C6 16 6 6 12 2Z" />
      </svg>
    </motion.span>
  );
}
