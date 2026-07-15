import Link from "next/link";
import type { Metadata } from "next";
import {
  Check,
  Sparkles,
  ArrowRight,
  UserPlus,
  PenLine,
  Send,
  Hexagon,
  LayoutDashboard,
  Wand2,
  Users,
  BarChart3,
  MessageSquareHeart,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TEMPLATE_METAS } from "@/config/templates";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { PLANS } from "@/config/plans";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "WeddingKu — Undangan Pernikahan Digital Elegan",
  description:
    "Buat undangan pernikahan digital dari 10 template futuristik. Kelola tamu, RSVP, ucapan, & analitik dalam satu platform.",
  keywords: [
    "undangan pernikahan",
    "undangan digital",
    "wedding invitation",
    "WeddingKu",
  ],
  openGraph: {
    title: "WeddingKu — Undangan Pernikahan Digital Elegan",
    description:
      "Platform undangan pernikahan digital dengan 10 template, manajemen tamu, dan RSVP real-time.",
    type: "website",
  },
};

const gradientText =
  "bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent";

const TESTIMONIALS = [
  {
    name: "Pasangan Baru",
    role: "Pengantin · Jakarta",
    quote:
      "Undangan selesai kurang dari 5 menit. Tamu kagum dengan desainnya.",
    initials: "PB",
  },
  {
    name: "N & R",
    role: "Pengantin · Bandung",
    quote:
      "Fitur RSVP real-time sangat membantu saat menyusun tempat duduk.",
    initials: "NR",
  },
  {
    name: "Keluarga Bahagia",
    role: "Orang Tua Pengantin · Surabaya",
    quote:
      "Sangat gampang dibagikan ke keluarga, tinggal kirim tautan.",
    initials: "KB",
  },
];

const FEATURES = [
  {
    Icon: Wand2,
    title: "10 Template Cerdas",
    text: "Koleksi desain futuristik siap pakai. Pilih satu, kustomisasi dalam hitungan menit.",
  },
  {
    Icon: PenLine,
    title: "Editor Visual",
    text: "Ubah teks, foto, musik, dan detail acara secara langsung dengan pratinjau live.",
  },
  {
    Icon: Users,
    title: "Manajemen Tamu",
    text: "Daftar tamu, link undangan personal, hingga import massal dari CSV.",
  },
  {
    Icon: MessageSquareHeart,
    title: "RSVP & Ucapan",
    text: "Tamu konfirmasi kehadiran dan mengirim doa — semua tersimpan otomatis.",
  },
  {
    Icon: BarChart3,
    title: "Analitik Langsung",
    text: "Pantau jumlah view, rasio RSVP, dan tamu yang sudah membuka undangan.",
  },
  {
    Icon: Smartphone,
    title: "Mobile-First",
    text: "Tampilan sempurna di ponsel, tablet, maupun desktop — responsif 100%.",
  },
];

export default async function LandingPage() {
  const user = await getUser();
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ── Futuristic background: grid + glow orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 left-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="absolute top-10 right-1/4 h-96 w-96 animate-pulse rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[130px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <Hexagon className="h-4 w-4 text-slate-950" />
            </span>
            <span className="text-lg">
              <span className="font-script text-2xl">Wedding<span className={gradientText}>Ku</span></span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="border border-cyan-400/40 bg-cyan-500/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.35)] hover:bg-cyan-500/20"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="border border-cyan-400/40 bg-cyan-500/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.35)] hover:bg-cyan-500/20"
                  >
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-24 text-center md:py-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 font-script text-base text-cyan-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Platform Undangan Digital
          </div>
          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Ciptakan Undangan Pernikahan
            <br />
            <span className={gradientText}>Masa Depan</span> yang Berkesan
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-300">
            Engine template cerdas, manajemen tamu otomatis, dan RSVP real-time —
            semua dalam satu platform yang elegan, cepat, dan tanpa ribet.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={user ? "/dashboard" : "/register"}>
              <Button
                size="lg"
                className="border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.45)] transition hover:shadow-[0_0_45px_rgba(139,92,246,0.55)]"
              >
                {user ? (
                  <>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Ke Dashboard
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Mulai Gratis
                  </>
                )}
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { v: "10", l: "Template Premium" },
              { v: "100%", l: "Responsif" },
              { v: "<2m", l: "Buat Undangan" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur"
              >
                <div className={`text-2xl font-bold md:text-3xl ${gradientText}`}>
                  {s.v}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="relative border-y border-white/10 bg-white/[0.02] py-10">
        <div className="container grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: "1.200+", label: "Undangan terbit" },
            { value: "50rb+", label: "Tamu diundang" },
            { value: "4.8/5", label: "Kepuasan pasangan" },
            { value: "10", label: "Template desain" },
          ].map((s) => (
            <div key={s.label}>
              <div className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {s.value}
              </div>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative border-y border-white/10 bg-white/[0.02] py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-cyan-300/90">
              Fitur Unggulan
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Semua yang Kamu Butuhkan, <span className={gradientText}>Terangkum</span>
            </h2>
            <p className="mt-3 text-slate-400">
              Dari desain hingga konfirmasi kehadiran — dibangun agar kamu fokus
              menikmati hari spesial.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="relative py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-cyan-300/90">
              Koleksi
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Pilihan <span className={gradientText}>Template</span>
            </h2>
            <p className="mt-3 text-slate-400">
              10 desain futuristik siap pakai. Klik mana saja untuk melihat contoh
              undangan langsung.
            </p>
          </div>
              <TemplateShowcase metas={TEMPLATE_METAS} />
         </div>
       </section>

      {/* How it works */}
      <section className="relative border-t border-white/10 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-violet-300/90">
              Alur
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Cara <span className={gradientText}>Kerja</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                Icon: PenLine,
                title: "Pilih & Edit",
                text: "Ambil template, ubah nama, foto, dan detail acara sesuai selera.",
              },
              {
                Icon: UserPlus,
                title: "Kelola Tamu",
                text: "Tambah daftar tamu, bagikan tautan, dan pantau RSVP masuk.",
              },
              {
                Icon: Send,
                title: "Kirim & Terima",
                text: "Sebarkan undangan digital, terima doa & ucapan dengan mudah.",
              },
            ].map(({ Icon, title, text }, i) => (
              <div
                key={title}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/40">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-cyan-300/90">
              Paket
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Harga <span className={gradientText}>Transparan</span>
            </h2>
            <p className="mt-3 text-slate-400">
              Mulai gratis, tingkatkan hanya saat kamu butuh lebih banyak.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
              const p = PLANS[key];
              const premium = key === "premium";
              return (
                <Card
                  key={key}
                  className={
                    premium
                      ? "relative border-cyan-400/40 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.18)] backdrop-blur"
                      : "border-white/10 bg-white/5 backdrop-blur"
                  }
                >
                  {premium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      Populer
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-white">{p.label}</h3>
                    <p className="mt-2 text-3xl font-bold">
                      <span className={gradientText}>{p.price}</span>
                      <span className="text-sm font-normal text-slate-400">
                        {premium ? "/event" : ""}
                      </span>
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        {p.maxInvitations} undangan aktif
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        Maks {p.maxGuests} tamu
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        {p.maxPhotos} foto galeri
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        {p.allTemplates ? "Semua template" : "1 template"}
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        {p.removeWatermark ? "Tanpa watermark" : "Dengan watermark"}
                      </li>
                    </ul>
                    <Link href="/register" className="mt-6 block">
                      <Button
                        className={
                          premium
                            ? "w-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                            : "w-full border-white/15 bg-white/5 text-slate-200 backdrop-blur hover:bg-white/10"
                        }
                        variant={premium ? "default" : "outline"}
                      >
                        {premium ? "Pilih Premium" : "Mulai Gratis"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="relative border-t border-white/10 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-cyan-300/90">Kata Mereka</div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Dipercaya <span className={gradientText}>Pasangan</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <blockquote className="text-sm leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-semibold text-slate-950">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">
                      {t.name}
                    </span>
                    <span className="block text-xs text-slate-400">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        </div>
        <div className="container text-center">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold tracking-tight md:text-5xl">
            Siap Membangun Undangan
            <span className={gradientText}> Masa Depanmu?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-400">
            Buat undangan pertamamu secara gratis dalam beberapa menit.
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.45)] transition hover:shadow-[0_0_45px_rgba(139,92,246,0.55)]"
              >
                Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative border-t border-white/10 py-24">
        <div className="container max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-script text-lg text-cyan-300/90">
              Bantuan
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Pertanyaan <span className={gradientText}>Umum</span>
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "Apakah benar-benar gratis?",
                a: "Ya. Paket Free memuat 1 undangan aktif tanpa biaya dan tanpa kartu kredit. Upgrade ke Premium hanya saat kamu butuh lebih banyak undangan, tamu, atau foto.",
              },
              {
                q: "Bagaimana cara upgrade ke Premium?",
                a: "Klik 'Upgrade Premium', transfer Rp149.000 ke rekening SeaBank kami, lalu kirim bukti via menu Langganan. Tim kami mengaktifkan dalam hitungan menit.",
              },
              {
                q: "Apakah tamu perlu install aplikasi?",
                a: "Tidak. Undangan berupa tautan web yang langsung terbuka di HP atau laptop tamu, lengkap dengan RSVP dan buku tamu digital.",
              },
              {
                q: "Bisa ganti template setelah dibuat?",
                a: "Bisa. Kamu bebas mengganti desain kapan saja dari dashboard, tanpa kehilangan data tamu dan ucapan yang sudah masuk.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition open:border-cyan-400/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                  {item.q}
                  <span className="text-cyan-300 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/60 py-12 text-sm text-slate-400 backdrop-blur">
        <div className="container grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-semibold tracking-tight text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500">
                <Hexagon className="h-4 w-4 text-slate-950" />
              </span>
              <span className="font-script text-xl">Wedding<span className="text-cyan-300">Ku</span></span>
            </div>
            <p className="mt-3 text-slate-500">
              Undangan digital futuristik untuk hari paling berkesan.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white">Produk</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/#templates" className="hover:text-cyan-300">Template</Link></li>
              <li><Link href="/#pricing" className="hover:text-cyan-300">Harga</Link></li>
              <li><Link href="/preview/classic" className="hover:text-cyan-300">Pratinjau</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white">Bantuan</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/#faq" className="hover:text-cyan-300">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-300">Dashboard</Link></li>
              <li><a href="mailto:akbarsinyotahe@gmail.com" className="hover:text-cyan-300">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="text-slate-500">Kebijakan Privasi</span></li>
              <li><span className="text-slate-500">Syarat Layanan</span></li>
            </ul>
          </div>
        </div>
        <div className="container mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-slate-500 md:flex-row">
          <p className="flex items-center gap-2">
            Dibuat dengan <Hexagon className="h-3.5 w-3.5 text-cyan-400" /> · WeddingKu © 2026
          </p>
          <p>Pembayaran aman via SeaBank</p>
        </div>
      </footer>
    </div>
  );
}
