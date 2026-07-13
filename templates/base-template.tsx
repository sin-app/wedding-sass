"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  Users,
  MessageCircle,
  Gift,
  X,
} from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import type { InvitationData } from "@/lib/types";
import type { Theme } from "@/templates/theme";
import { TemplateFrame, FrameCard } from "@/templates/frames";
import { defaultInvitationData } from "@/config/defaults";

function extractYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}
import {
  BotanicalBackground,
  FloralDivider,
  LeafSprig,
  Petal,
} from "@/templates/decorations";
import {
  asTemplateSlug,
  heroVariants,
  revealVariants,
} from "@/templates/animations";

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
  slug?: string;
  submitRsvp?: FormAction;
  submitWish?: FormAction;
  initialWishes?: { name: string; message: string }[];
}

/* ───────────────── helpers ───────────────── */

function Reveal({
  children,
  delay = 0,
  slug = "classic",
}: {
  children: ReactNode;
  delay?: number;
  slug?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants[asTemplateSlug(slug)]}
      transition={{ delay }}
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
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {["Hari", "Jam", "Menit", "Detik"].map((k) => (
        <div
          key={k}
          className="flex h-[64px] w-14 flex-col items-center justify-center rounded-xl border backdrop-blur-sm sm:h-[70px] sm:w-16"
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
      <FloralDivider theme={theme} />
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

/* Navbar bawah: navigasi antar-section, warnanya mengikuti tema */
function BottomNav({ theme }: { theme: Theme }) {
  const go = (id: string) => {
    if (typeof document !== "undefined") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const items: { id: string; label: string; Icon: typeof Heart }[] = [
    { id: "top", label: "Atas", Icon: Heart },
    { id: "couple", label: "Mempelai", Icon: Users },
    { id: "event", label: "Acara", Icon: CalendarDays },
    { id: "rsvp", label: "RSVP", Icon: Check },
    { id: "wishes", label: "Ucapan", Icon: MessageCircle },
    { id: "gift", label: "Hadiah", Icon: Gift },
  ];
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t"
      style={{ background: theme.primary, color: theme.onPrimary, borderColor: theme.onPrimary }}
      aria-label="Navigasi undangan"
    >
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => go(id)}
          aria-label={label}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px]"
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ───────────────── main ───────────────── */

export function BaseTemplate({
  data,
  theme,
  guestName = "Tamu Undangan",
  preview = false,
  watermark = false,
  slug = "classic",
  submitRsvp,
  submitWish,
  initialWishes = [],
}: RenderProps) {
  const tSlug = asTemplateSlug(slug);
  const reduce = useReducedMotion();
  const heroAnim = heroVariants[tSlug];

  const [opened, setOpened] = useState(preview);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytRef = useRef<HTMLIFrameElement | null>(null);
  const musicSrc = (data.music?.src ?? "").trim() || defaultInvitationData.music.src;
  const ytId = extractYouTubeId(musicSrc);
  const isYt = ytId !== null;

  const playYoutube = (on: boolean) => {
    const el = ytRef.current;
    if (!el || !ytId) return;
    el.src = on
      ? `https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1`
      : "about:blank";
  };

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

  const startAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay blocked despite the gesture — retry on the next interaction.
        const resume = () => {
          a.play()
            .then(() => setPlaying(true))
            .catch(() => {});
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("keydown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("keydown", resume, { once: true });
      });
  };

  const openIt = () => {
    setOpened(true);
    if (isYt) playYoutube(true);
    else startAudio();
    window.scrollTo({ top: 0 });
  };
  const toggleMusic = () => {
    if (isYt) {
      const next = !playing;
      playYoutube(next);
      setPlaying(next);
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else startAudio();
  };

  const { couple, events } = data;
  const groom = couple.groom;
  const bride = couple.bride;

  return (
    <div
      style={{ background: theme.bg, color: theme.text, fontFamily: theme.fontBody }}
      className={preview ? "relative" : "relative min-h-screen pb-24"}
    >
      <TemplateFrame slug={tSlug} theme={theme} />
      <BotanicalBackground theme={theme} />
      <Petal theme={theme} delay={0} left="12%" />
      <Petal theme={theme} delay={4} left="38%" />
      <Petal theme={theme} delay={8} left="64%" />
      <Petal theme={theme} delay={11} left="86%" />
      {isYt ? (
        <iframe
          ref={ytRef}
          title="Musik latar"
          aria-hidden
          tabIndex={-1}
          allow="autoplay; encrypted-media; clipboard-write"
          className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        />
      ) : (
        musicSrc && <audio ref={audioRef} src={musicSrc} loop preload="auto" />
      )}

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-center justify-center bg-cover bg-center px-6 text-center text-white"
        style={{ backgroundImage: `url(${data.hero.background})` }}
      >
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        {tSlug === "luxury" && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.16) 50%, transparent 70%)",
              backgroundSize: "220% 220%",
            }}
            animate={{ backgroundPositionX: ["0%", "220%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.div
          className="relative z-10"
          variants={heroAnim}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
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
        </motion.div>
      </section>

      {/* GREETING + COUPLE */}
      <section id="couple" className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-3xl">
          <SectionTitle overline="Bismillah" title="Mempelai" theme={theme} />
          <p className="mx-auto mb-12 max-w-xl text-center text-sm" style={{ color: theme.muted }}>
            {data.greeting}
          </p>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_auto_1fr]">
            {[groom, bride].map((p, idx) => (
              <div key={idx} className={idx === 1 ? "contents" : ""}>
                {idx === 1 && (
                  <div className="hidden flex-col items-center justify-center md:flex">
                    <LeafSprig theme={theme} className="mb-2" />
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
                    <div
                      className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white shadow-md"
                      style={{ boxShadow: `0 0 0 4px ${theme.primary}33, 0 4px 14px rgba(0,0,0,0.2)` }}
                    >
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
        <section id="story" className="px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <SectionTitle overline="Perjalanan Kami" title="Love Story" theme={theme} />
            <div className="space-y-8">
              {data.story.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <FrameCard slug={tSlug} theme={theme} className="p-5">
                    <p className="text-sm font-semibold" style={{ color: theme.primary }}>
                      {s.date}
                    </p>
                    <h3 className="mt-1 text-xl" style={{ fontFamily: theme.fontHeading }}>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: theme.muted }}>
                      {s.description}
                    </p>
                  </FrameCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT */}
      <section id="event" className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-3xl">
          <SectionTitle overline="Save The Date" title="Acara" theme={theme} />
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <FrameCard
                  slug={tSlug}
                  theme={theme}
                  className="flex h-full flex-col items-center p-6 text-center"
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
                </FrameCard>
              </Reveal>
            ))}
          </div>
          {data.maps.embed && (
            <FrameCard slug={tSlug} theme={theme} className="mt-8 overflow-hidden">
              <iframe src={data.maps.embed} title="Lokasi" className="h-60 w-full" loading="lazy" />
            </FrameCard>
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
        <section id="gallery" className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle overline="Momen Kami" title="Galeri" theme={theme} />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {data.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="relative aspect-square overflow-hidden rounded-xl border-2"
                  style={{ borderColor: theme.primary }}
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
      <section id="rsvp" className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-lg">
          <SectionTitle overline="Konfirmasi Kehadiran" title="RSVP" theme={theme} />
          {submitRsvp ? (
            <FrameCard slug={tSlug} theme={theme} className="p-6">
            <form action={rsvpAction} className="space-y-4">
              <input type="hidden" name="guest_name_default" value={guestName} />
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
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
            </FrameCard>
          ) : (
            <p className="text-center text-sm" style={{ color: theme.muted }}>
              Form RSVP aktif setelah undangan dipublikasikan.
            </p>
          )}
        </div>
      </section>

      {/* WISHES */}
      <section id="wishes" className="px-6 py-20">
        <div className="mx-auto max-w-lg">
          <SectionTitle overline="Doa & Ucapan" title="Ucapan" theme={theme} />
          {submitWish ? (
            <FrameCard slug={tSlug} theme={theme} className="p-6">
            <form action={wishAction} className="space-y-3">
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
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
            </FrameCard>
          ) : (
            <p className="text-center text-sm" style={{ color: theme.muted }}>
              Buku ucapan aktif setelah undangan dipublikasikan.
            </p>
          )}
          <div className="mt-8 max-h-96 space-y-3 overflow-y-auto pr-1">
            {wishes.map((w, i) => (
              <FrameCard key={i} slug={tSlug} theme={theme} className="p-4">
                <p className="font-medium" style={{ color: theme.primary }}>
                  {w.name}
                </p>
                <p className="mt-1 text-sm" style={{ color: theme.muted }}>
                  {w.message}
                </p>
              </FrameCard>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section id="gift" className="px-6 py-20" style={{ background: theme.surface }}>
        <div className="mx-auto max-w-2xl">
          <SectionTitle overline="Tanda Kasih" title="Amplop Digital" theme={theme} />
          <div className="grid gap-4 md:grid-cols-2">
            {data.gift.banks.map((b, i) => (
              <FrameCard key={i} slug={tSlug} theme={theme} className="space-y-2 p-5">
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
              </FrameCard>
            ))}
          </div>
          {data.gift.address.value && (
            <FrameCard slug={tSlug} theme={theme} className="mt-4 space-y-2 p-5">
              <p className="font-semibold" style={{ color: theme.primary }}>
                {data.gift.address.label}
              </p>
              <p className="text-sm" style={{ color: theme.muted }}>
                {data.gift.address.value}
              </p>
              <CopyBtn value={data.gift.address.value} theme={theme} />
            </FrameCard>
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
      {opened && musicSrc && !preview && (
        <button
          onClick={toggleMusic}
          aria-label="Musik"
          className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:right-5"
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
                <motion.div
                  className="relative z-10"
                  variants={heroAnim}
                  initial={reduce ? "show" : "hidden"}
                  animate="show"
                >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {preview && (
         <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
           <Heart className="mr-1 inline h-3 w-3" /> Pratinjau
         </div>
       )}
      <BottomNav theme={theme} />
    </div>
  );
}
