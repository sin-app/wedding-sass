import Link from "next/link";
import Image from "next/image";
import { Check, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEMPLATE_METAS } from "@/config/templates";
import { PLANS } from "@/config/plans";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-primary" /> WeddingKu
          </Link>
          <nav className="flex items-center gap-2">
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
      <section className="container py-20 text-center md:py-28">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" /> Undangan Digital Modern
        </Badge>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
          Buat Undangan Pernikahan Digital yang Berkesan
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Pilih dari berbagai template elegan, kelola daftar tamu, terima RSVP
          dan ucapan — semua dalam satu platform.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/register">
            <Button size="lg">Mulai Gratis</Button>
          </Link>
          <Link href="#templates">
            <Button size="lg" variant="outline">
              Lihat Template
            </Button>
          </Link>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="bg-secondary/40 py-20">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-semibold">
            Pilihan Template
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            4 desain siap pakai, mudah dikustomisasi.
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
        </div>
      </section>

      {/* Pricing */}
      <section className="container py-20">
        <h2 className="text-center font-serif text-3xl font-semibold">
          Harga
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
            const p = PLANS[key];
            const premium = key === "premium";
            return (
              <Card
                key={key}
                className={premium ? "border-primary shadow-md" : ""}
              >
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
                    <Button className="w-full" variant={premium ? "default" : "outline"}>
                      {premium ? "Pilih Premium" : "Mulai Gratis"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
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
