import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Sparkles,
  ArrowRight,
  UserPlus,
  PenLine,
  Send,
  Hexagon,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEMPLATE_METAS } from "@/config/templates";
import { PLANS } from "@/config/plans";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

const ADMIN_ID = "f5e9944c-47c8-4934-ab9a-0dccffc43844";

// Petakan setiap template -> slug undangan contoh milik admin (published).
async function getDemoMap(): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("invitations")
      .select("slug, templates(slug)")
      .eq("user_id", ADMIN_ID)
      .eq("status", "published");
    const map: Record<string, string> = {};
    (
      data as
        | Array<{ slug: string; templates?: { slug: string } | null }>
        | null
    )?.forEach((row) => {
      const tSlug = row.templates?.slug;
      if (tSlug && !map[tSlug]) map[tSlug] = row.slug;
    });
    return map;
  } catch {
    return {};
  }
}

const gradientText =
  "bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent";

export default async function LandingPage() {
  const demoMap = await getDemoMap();
  const demoSlug =
    demoMap["floral"] ??
    Object.values(demoMap)[0] ??
    "floral-romance";
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
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />
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
              Wedding<span className={gradientText}>Ku</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href={`/i/${demoSlug}`}>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                Lihat Contoh
              </Button>
            </Link>
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
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Platform Undangan Digital
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Ciptakan Undangan Pernikahan
            <br />
            <span className={gradientText}>Masa Depan</span> yang Berkesan
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-400">
            Engine template cerdas, manajemen tamu otomatis, dan RSVP real-time —
            semua dalam satu platform yang elegan dan cepat.
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
            <Link href={`/i/${demoSlug}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 text-slate-200 backdrop-blur hover:bg-white/10"
              >
                Lihat Contoh Undangan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { v: "8", l: "Template Premium" },
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

      {/* Templates */}
      <section id="templates" className="relative py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">
              Koleksi
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Pilihan <span className={gradientText}>Template</span>
            </h2>
            <p className="mt-3 text-slate-400">
              8 desain futuristik siap pakai, dikustomisasi hanya dalam hitungan
              menit.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATE_METAS.map((t) => (
              <Card
                key={t.slug}
                className="group overflow-hidden border-white/10 bg-white/5 backdrop-blur transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={t.preview}
                    alt={t.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  {t.premium && (
                    <Badge
                      variant="warning"
                      className="absolute right-2 top-2 border-amber-300/40 bg-amber-400/20 text-amber-200 backdrop-blur"
                    >
                      Premium
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-white">{t.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{t.description}</p>
                  {demoMap[t.slug] && (
                    <Link
                      href={`/i/${demoMap[t.slug]}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 hover:underline"
                    >
                      Lihat Contoh <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={`/i/${demoSlug}`}>
              <Button
                variant="outline"
                className="border-white/15 bg-white/5 text-slate-200 backdrop-blur hover:bg-white/10"
              >
                Lihat Contoh Nyata <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-violet-300/80">
              Alur
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
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
      <section className="relative py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">
              Paket
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Harga <span className={gradientText}>Transparan</span>
            </h2>
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

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        </div>
        <div className="container text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
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

      <footer className="border-t border-white/10 bg-slate-950/60 py-10 text-center text-sm text-slate-500 backdrop-blur">
        <p className="flex items-center justify-center gap-2">
          Dibuat dengan <Hexagon className="h-3.5 w-3.5 text-cyan-400" /> · WeddingKu
          © 2026
        </p>
      </footer>
    </div>
  );
}
