import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Heart,
  Sparkles,
  ArrowRight,
  UserPlus,
  PenLine,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEMPLATE_METAS } from "@/config/templates";
import { PLANS } from "@/config/plans";
import { getTheme } from "@/templates/theme";
import { BotanicalBackground, FloralDivider, LeafSprig } from "@/templates/decorations";

const theme = getTheme("floral");

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-primary" /> WeddingKu
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/i/contoh">
              <Button variant="ghost" size="sm">
                Lihat Contoh
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <BotanicalBackground theme={theme} />
        <div className="container relative py-20 text-center md:py-28">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" /> Undangan Digital Romantis
          </Badge>
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Buktikan Cinta dengan Undangan Pernikahan yang Berkesan
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Pilih dari berbagai template romantis, kelola daftar tamu, terima
            RSVP & ucapan — semua dalam satu platform elegan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button size="lg">
                <UserPlus className="mr-2 h-4 w-4" /> Mulai Gratis
              </Button>
            </Link>
            <Link href="/i/contoh">
              <Button size="lg" variant="outline">
                Lihat Contoh Undangan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="bg-secondary/40 py-20">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-semibold">
            Pilihan Template
          </h2>
          <FloralDivider theme={theme} />
          <p className="mt-2 text-center text-muted-foreground">
            8 desain romantis siap pakai, mudah dikustomisasi.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATE_METAS.map((t) => (
              <Card key={t.slug} className="overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={t.preview}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  {t.premium && (
                    <Badge className="absolute right-2 top-2" variant="warning">
                      Premium
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/i/contoh">
              <Button variant="outline">
                Lihat Contoh Nyata <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <h2 className="text-center font-serif text-3xl font-semibold">
          Cara Kerja
        </h2>
        <FloralDivider theme={theme} />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
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
              title: "Kirim & Terima Ucapan",
              text: "Sebarkan undangan digital, terima doa & ucapan dengan mudah.",
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="text-center">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: theme.accent }}
              >
                <Icon className="h-6 w-6" style={{ color: theme.primary }} />
              </div>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-semibold">
            Harga
          </h2>
          <FloralDivider theme={theme} />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
              const p = PLANS[key];
              const premium = key === "premium";
              return (
                <Card key={key} className={premium ? "border-primary shadow-md" : ""}>
                  <CardContent className="pt-6">
                    <h3 className="font-serif text-xl font-semibold">{p.label}</h3>
                    <p className="mt-2 text-3xl font-bold">
                      {p.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        {premium ? "/event" : ""}
                      </span>
                    </p>
                    <ul className="mt-6 space-y-2 text-sm">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {p.maxInvitations} undangan aktif
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Maks {p.maxGuests} tamu
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {p.maxPhotos} foto galeri
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {p.allTemplates ? "Semua template" : "1 template"}
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {p.removeWatermark ? "Tanpa watermark" : "Dengan watermark"}
                      </li>
                    </ul>
                    <Link href="/register" className="mt-6 block">
                      <Button
                        className="w-full"
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
      <section className="relative overflow-hidden py-20">
        <BotanicalBackground theme={theme} />
        <div className="container relative text-center">
          <LeafSprig theme={theme} className="mx-auto" />
          <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
            Siap Membuat Undangan?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Buat undangan pertamamu secara gratis dalam beberapa menit.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/register">
              <Button size="lg">
                Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Dibuat dengan <Heart className="h-3 w-3 text-primary" /> · WeddingKu ©
          2026
        </p>
      </footer>
    </div>
  );
}
