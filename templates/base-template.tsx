"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Music,
  Pause,
  MapPin,
  CalendarDays,
  Clock,
  Instagram,
  Copy,
  Check,
  Heart,
  X,
} from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import type { InvitationData } from "@/lib/types";
import type { Theme } from "@/templates/theme";

export type PublicActionResult = { ok: boolean; message: string };
type FormAction = (
  prev: PublicActionResult | null,
  fd: FormData
) => Promise<PublicActionResult>;

export interface RenderProps {
  data: InvitationData;
  theme: Theme;
  guestName?: string;
  preview?: boolean;
  watermark?: boolean;
  submitRsvp?: FormAction;
  submitWish?: FormAction;
  initialWishes?: { name: string; message: string }[];
}

/* ───────────────── helpers ───────────────── */

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Countdown({ target, theme }: { target: string; theme: Theme }) {
  const calc = () => {
    const ms = Math.max(new Date(target).getTime() - Date.now(), 0);
    return {
      Hari: Math.floor(ms / 86400000),
      Jam: Math.floor((ms / 3600000) % 24),
      Menit: Math.floor((ms / 60000) % 60),
      Detik: Math.floor((ms / 1000) % 60),
    };
  };
  const [t, setT] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className="flex items-center justify-center gap-3">
      {["Hari", "Jam", "Menit", "Detik"].map((k) => (
        <div
          key={k}
          className="flex h-[70px] w-16 flex-col items-center justify-center rounded-xl border backdrop-blur-sm"
          style={{ borderColor: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.12)" }}
        >
          <span className="text-2xl" style={{ fontFamily: theme.fontHeading }}>
            {t ? String(t[k]).padStart(2, "0") : "--"}
          </span>
          <span className="text-[10px] uppercase tracking-wider opacity-80">{k}</span>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ overline, title, theme }: { overline?: string; title: string; theme: Theme }) {
  return (
    <div className="mb-10 text-center">
      {overline && (
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
          {overline}
        </p>
      )}
      <h2
        className="mt-2 text-4xl md:text-5xl"
        style={{ fontFamily: theme.useScript ? theme.fontScript : theme.fontHeading, color: theme.primary }}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-24" style={{ background: theme.primary, opacity: 0.4 }} />
    </div>
  );
}

function CopyBtn({ value, theme }: { value: string; theme: Theme }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs"
      style={{ borderColor: theme.primary, color: theme.primary }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Tersalin" : "Salin"}
    </button>
  );
}

function SubmitBtn({ label, theme }: { label: string; theme: Theme }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 rounded-full px-6 text-sm font-medium disabled:opacity-60"
      style={{ background: theme.primary, color: theme.onPrimary }}
    >
      {pending ? "Mengirim..." : label}
    </button>
  );
}

/* ───────────────── main ───────────────── */

export function BaseTemplate({
  data,
  theme,
  guestName = "Tamu Undangan",
  preview = false,
  watermark = false,
  submitRsvp,
  submitWish,
  initialWishes = [],
}: RenderProps) {
  const [opened, setOpened] = useState(preview);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (preview) return;
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened, preview]);

  const [rsvpState, rsvpAction] = useFormState<PublicActionResult | null, FormData>(
    submitRsvp ?? (async () => ({ ok: false, message: "" })),
    null
  );
  const [wishState, wishAction] = useFormState<PublicActionResult | null, FormData>(
    submitWish ?? (async () => ({ ok: false, message: "" })),
    null
  );
  const [wishes, setWishes] = useState(initialWishes);
  useEffect(() => {
    if (wishState?.ok) {
      const name = wishState.message; // not used; keep simple
      void name;
    }
  }, [wishState]);

  const openIt = () => {
    setOpened(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    window.scrollTo({ top: 0 });
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else a.play().then(() => setPlaying(true)).catch(() => {});
  };

  const { couple, events } = data;
  const groom = couple.groom;
  const bride = couple.bride;

  return (
    <div
      style={{ background: theme.bg, color: theme.text, fontFamily: theme.fontBody }}
      className={preview ? "relative" : "relative min-h-screen"}
    >
      {data.music.src && <audio ref={audioRef} src={data.music.src} loop preload="auto" />}

      {/* HERO */}
      <section
        className="relative flex min-h-[100svh] items-center justify-center bg-cover bg-center px-6 text-center text-white"
        style={{ backgroundImage: `url(${data.hero.background})` }}
      >
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">The Wedding Of</p>
          <h1
            className="mt-4 text-6xl md:text-8xl"
            style={{ fontFamily: theme.useScript ? theme.fontScript : theme.fontHeading }}
          >
            {groom.shortName} {theme.ampersand} {bride.shortName}
          </h1>
          <p className="mt-6 text-white/90">{events[0]?.date}</p>
          <div className="mt-10">
            <Countdown target={data.date} theme={theme} />
          </div>
        </div>
      </section>

      {/* GREETING + COUPLE */}
      <section className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-3xl">
          <SectionTitle overline="Bismillah" title="Mempelai" theme={theme} />
          <p className="mx-auto mb-12 max-w-xl text-center text-sm" style={{ color: theme.muted }}>
            {data.greeting}
          </p>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_auto_1fr]">
            {[groom, bride].map((p, idx) => (
              <div key={idx} className={idx === 1 ? "contents" : ""}>
                {idx === 1 && (
                  <div className="hidden items-center justify-center md:flex">
                    <span
                      className="text-5xl"
                      style={{ fontFamily: theme.fontScript, color: theme.primary }}
                    >
                      {theme.ampersand}
                    </span>
                  </div>
                )}
                <Reveal delay={idx * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white shadow-md">
                      <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="208px" />
                    </div>
                    <h3 className="mt-6 text-2xl" style={{ fontFamily: theme.fontHeading }}>
                      {p.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm" style={{ color: theme.muted }}>
                      {p.parents}
                    </p>
                    {p.instagram && (
                      <a
                        href={p.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm"
                        style={{ color: theme.primary }}
                      >
                        <Instagram className="h-4 w-4" /> Instagram
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      {data.story.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <SectionTitle overline="Perjalanan Kami" title="Love Story" theme={theme} />
            <div className="space-y-8">
              {data.story.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="rounded-xl p-5" style={{ background: theme.surface }}>
                    <p className="text-sm font-semibold" style={{ color: theme.primary }}>
                      {s.date}
                    </p>
                    <h3 className="mt-1 text-xl" style={{ fontFamily: theme.fontHeading }}>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: theme.muted }}>
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT */}
      <section className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-3xl">
          <SectionTitle overline="Save The Date" title="Acara" theme={theme} />
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="flex h-full flex-col items-center rounded-xl border p-6 text-center"
                  style={{ borderColor: theme.accent }}
                >
                  <h3 className="text-2xl" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>
                    {e.name}
                  </h3>
                  <div className="my-3 h-px w-16" style={{ background: theme.primary, opacity: 0.4 }} />
                  <ul className="space-y-2 text-sm" style={{ color: theme.muted }}>
                    <li className="flex items-center justify-center gap-2">
                      <CalendarDays className="h-4 w-4" style={{ color: theme.primary }} /> {e.date}
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" style={{ color: theme.primary }} /> {e.time}
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" style={{ color: theme.primary }} /> {e.venue}
                    </li>
                  </ul>
                  <p className="mt-2 text-xs" style={{ color: theme.muted }}>
                    {e.address}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {data.maps.embed && (
            <div className="mt-8 overflow-hidden rounded-xl border" style={{ borderColor: theme.accent }}>
              <iframe src={data.maps.embed} title="Lokasi" className="h-60 w-full" loading="lazy" />
            </div>
          )}
          {data.maps.url && (
            <div className="mt-5 text-center">
              <a href={data.maps.url} target="_blank" rel="noreferrer">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  <MapPin className="h-4 w-4" /> Buka Google Maps
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {data.gallery.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle overline="Momen Kami" title="Galeri" theme={theme} />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {data.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={`Galeri ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      <section className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-lg">
          <SectionTitle overline="Konfirmasi Kehadiran" title="RSVP" theme={theme} />
          {submitRsvp ? (
            <form action={rsvpAction} className="space-y-4">
              <input type="hidden" name="guest_name_default" value={guestName} />
              <input
                name="name"
                required
                placeholder="Nama"
                defaultValue={guestName !== "Tamu Undangan" ? guestName : ""}
                className="h-11 w-full rounded-lg border px-4 text-sm"
                style={{ borderColor: theme.accent, background: theme.bg, color: theme.text }}
              />
              <select
                name="attendance"
                required
                defaultValue=""
                className="h-11 w-full rounded-lg border px-4 text-sm"
                style={{ borderColor: theme.accent, background: theme.bg, color: theme.text }}
              >
                <option value="" disabled>
                  Pilih kehadiran...
                </option>
                <option value="hadir">Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak">Tidak Hadir</option>
              </select>
              <input
                name="guest_count"
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                className="h-11 w-full rounded-lg border px-4 text-sm"
                style={{ borderColor: theme.accent, background: theme.bg, color: theme.text }}
              />
              <textarea
                name="message"
                placeholder="Pesan (opsional)"
                className="min-h-[80px] w-full rounded-lg border px-4 py-2 text-sm"
                style={{ borderColor: theme.accent, background: theme.bg, color: theme.text }}
              />
              {rsvpState && (
                <p className="text-sm" style={{ color: rsvpState.ok ? "#16a34a" : "#dc2626" }}>
                  {rsvpState.message}
                </p>
              )}
              <SubmitBtn label="Kirim Konfirmasi" theme={theme} />
            </form>
          ) : (
            <p className="text-center text-sm" style={{ color: theme.muted }}>
              Form RSVP aktif setelah undangan dipublikasikan.
            </p>
          )}
        </div>
      </section>

      {/* WISHES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-lg">
          <SectionTitle overline="Doa & Ucapan" title="Ucapan" theme={theme} />
          {submitWish ? (
            <form action={wishAction} className="space-y-3">
              <input
                name="name"
                required
                placeholder="Nama Anda"
                className="h-11 w-full rounded-lg border px-4 text-sm"
                style={{ borderColor: theme.accent, background: theme.surface, color: theme.text }}
              />
              <textarea
                name="message"
                required
                placeholder="Tulis ucapan..."
                className="min-h-[80px] w-full rounded-lg border px-4 py-2 text-sm"
                style={{ borderColor: theme.accent, background: theme.surface, color: theme.text }}
              />
              <div className="flex items-center justify-between gap-3">
                {wishState && (
                  <span className="text-sm" style={{ color: wishState.ok ? "#16a34a" : "#dc2626" }}>
                    {wishState.message}
                  </span>
                )}
                <div className="ml-auto">
                  <SubmitBtn label="Kirim Ucapan" theme={theme} />
                </div>
              </div>
            </form>
          ) : (
            <p className="text-center text-sm" style={{ color: theme.muted }}>
              Buku ucapan aktif setelah undangan dipublikasikan.
            </p>
          )}
          <div className="mt-8 max-h-96 space-y-3 overflow-y-auto pr-1">
            {wishes.map((w, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ borderColor: theme.accent, background: theme.surface }}>
                <p className="font-medium" style={{ color: theme.primary }}>
                  {w.name}
                </p>
                <p className="mt-1 text-sm" style={{ color: theme.muted }}>
                  {w.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-2xl">
          <SectionTitle overline="Tanda Kasih" title="Amplop Digital" theme={theme} />
          <div className="grid gap-4 md:grid-cols-2">
            {data.gift.banks.map((b, i) => (
              <div key={i} className="space-y-2 rounded-xl border p-5" style={{ borderColor: theme.accent }}>
                <p className="font-semibold" style={{ color: theme.primary }}>
                  {b.bank}
                </p>
                <p className="text-xl tracking-wider" style={{ fontFamily: theme.fontHeading }}>
                  {b.number}
                </p>
                <p className="text-sm" style={{ color: theme.muted }}>
                  a.n. {b.holder}
                </p>
                <CopyBtn value={b.number} theme={theme} />
              </div>
            ))}
          </div>
          {data.gift.address.value && (
            <div className="mt-4 space-y-2 rounded-xl border p-5" style={{ borderColor: theme.accent }}>
              <p className="font-semibold" style={{ color: theme.primary }}>
                {data.gift.address.label}
              </p>
              <p className="text-sm" style={{ color: theme.muted }}>
                {data.gift.address.value}
              </p>
              <CopyBtn value={data.gift.address.value} theme={theme} />
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center" style={{ background: theme.primary, color: theme.onPrimary }}>
        <p className="text-xs uppercase tracking-[0.3em] opacity-70">Terima Kasih</p>
        <h2 className="mt-4 text-5xl" style={{ fontFamily: theme.useScript ? theme.fontScript : theme.fontHeading }}>
          {groom.shortName} {theme.ampersand} {bride.shortName}
        </h2>
        {watermark && (
          <p className="mt-8 text-xs opacity-70">
            Dibuat dengan WeddingKu
          </p>
        )}
      </footer>

      {/* Music toggle */}
      {opened && data.music.src && !preview && (
        <button
          onClick={toggleMusic}
          aria-label="Musik"
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
          style={{ background: theme.primary, color: theme.onPrimary }}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5 animate-pulse" />}
        </button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <button className="absolute right-5 top-5 text-white" aria-label="Tutup">
              <X className="h-7 w-7" />
            </button>
            <div className="relative h-[80vh] w-full max-w-3xl">
              <Image src={lightbox} alt="Foto" fill className="object-contain" sizes="100vw" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover gate */}
      {!preview && (
        <AnimatePresence>
          {!opened && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center px-6 text-center text-white"
              style={{ backgroundImage: `url(${data.hero.background})` }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em]">The Wedding Of</p>
                <h1
                  className="mt-4 text-5xl md:text-7xl"
                  style={{ fontFamily: theme.useScript ? theme.fontScript : theme.fontHeading }}
                >
                  {groom.shortName} {theme.ampersand} {bride.shortName}
                </h1>
                <p className="mt-8 text-sm text-white/80">Kepada Yth.</p>
                <p className="mt-1 text-lg font-medium">{guestName}</p>
                <button
                  onClick={openIt}
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                  style={{ background: theme.primary, color: theme.onPrimary }}
                >
                  <Mail className="h-4 w-4" /> Buka Undangan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {preview && (
        <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          <Heart className="mr-1 inline h-3 w-3" /> Pratinjau
        </div>
      )}
    </div>
  );
}
