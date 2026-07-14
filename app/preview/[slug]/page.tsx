import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TEMPLATE_METAS, getTemplateMeta } from "@/config/templates";
import { TemplatePreview } from "@/components/template/template-preview";

export function generateStaticParams() {
  return TEMPLATE_METAS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getTemplateMeta(slug);
  if (!meta) return { title: "Template tidak ditemukan" };
  const title = `Template ${meta.name} — WeddingKu`;
  return {
    title,
    description: meta.description,
    openGraph: {
      title,
      description: meta.description,
      images: [meta.preview],
      type: "website",
    },
  };
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getTemplateMeta(slug);
  if (!meta) notFound();
  const accent = meta.accent || "#22d3ee";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Futuristic background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 animate-pulse rounded-full blur-[120px]"
          style={{ background: `${accent}40` }}
        />
        <div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[130px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <Link href="/#templates">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              Semua Template
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 text-center md:py-20">
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur"
            style={{
              borderColor: `${accent}66`,
              color: accent,
              background: `${accent}14`,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Template Undangan
          </div>
          <h1
            className="mx-auto max-w-2xl text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: accent }}
          >
            {meta.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">{meta.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {meta.premium && (
              <Badge
                variant="warning"
                className="border-amber-300/40 bg-amber-400/20 text-amber-200 backdrop-blur"
              >
                <Crown className="mr-1 h-3 w-3" /> Premium
              </Badge>
            )}
            <span className="text-sm text-slate-400">Pratinjau langsung di bawah</span>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button
                size="lg"
                className="border text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:shadow-[0_0_45px_rgba(34,211,238,0.5)]"
                style={{
                  borderColor: `${accent}80`,
                  background: `${accent}1f`,
                  color: accent,
                }}
              >
                Gunakan Template Ini <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#preview">
              <Button size="lg" variant="outline" className="border-white/15 text-slate-200">
                Lihat Pratinjau
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live preview */}
      <section id="preview" className="relative px-4 pb-28">
        <div className="mx-auto max-w-2xl">
          <div
            className="overflow-hidden rounded-[2rem] border bg-black/30 shadow-2xl"
            style={{ borderColor: `${accent}55` }}
          >
            <TemplatePreview slug={slug} />
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            Pratinjau menggunakan contoh data. Buat undangan untuk menyesuaikan nama, foto,
            musik, dan detail acara.
          </p>
        </div>
      </section>
    </div>
  );
}
