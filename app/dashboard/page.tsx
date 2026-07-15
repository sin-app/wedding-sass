import Link from "next/link";
import Image from "next/image";
import { Plus, Users, Eye, MessageSquareHeart, Crown, PenLine, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { getTemplateMeta } from "@/config/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardActions } from "@/components/dashboard/card-actions";
import type { Invitation, TemplateRow } from "@/lib/types";

export default async function DashboardHome() {
  const { user, subscription } = await requireUser();
  const supabase = await createClient();

  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: templates } = await supabase.from("templates").select("*");
  const templateName = (id: string | null) =>
    (templates as TemplateRow[] | null)?.find((t) => t.id === id)?.slug;

  const list = (invitations as Invitation[]) ?? [];
  const limits = getLimits(subscription?.plan ?? "free");
  const canCreate = list.length < limits.maxInvitations;
  const used = list.length;
  const pct = limits.maxInvitations
    ? Math.min(100, Math.round((used / limits.maxInvitations) * 100))
    : 0;
  const isPremium = subscription?.plan === "premium" && subscription?.status === "active";

  // Metrik ringkas per undangan (agregat, bukan N query per kartu).
  const ids = list.map((i) => i.id);
  const rsvpCounts: Record<string, number> = {};
  const wishCounts: Record<string, number> = {};
  if (ids.length) {
    const [{ data: rsvpRows }, { data: wishRows }] = await Promise.all([
      supabase
        .from("rsvps")
        .select("invitation_id, attendance")
        .in("invitation_id", ids),
      supabase.from("wishes").select("invitation_id").in("invitation_id", ids),
    ]);
    for (const r of (rsvpRows as { invitation_id: string; attendance: string }[] | null) ?? []) {
      if (r.attendance === "hadir") rsvpCounts[r.invitation_id] = (rsvpCounts[r.invitation_id] ?? 0) + 1;
    }
    for (const w of (wishRows as { invitation_id: string }[] | null) ?? []) {
      wishCounts[w.invitation_id] = (wishCounts[w.invitation_id] ?? 0) + 1;
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-4 text-2xl font-semibold">Undangan Saya</h1>
      {/* Plan usage */}
      <Card className="mb-6 border-white/10 bg-white/5">
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Paket {limits.label}</span>
              {isPremium ? (
                <Badge variant="success" className="gap-1">
                  <Crown className="h-3 w-3" /> Aktif
                </Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {used} dari {limits.maxInvitations} undangan terpakai
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                Tamu maks {limits.maxGuests}
              </span>
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                Foto maks {limits.maxPhotos}
              </span>
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                {isPremium ? "Tanpa watermark" : "Dengan watermark"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canCreate ? (
              <Link href="/dashboard/new">
                <Button>
                  <Plus className="h-4 w-4" /> Buat Undangan
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard/billing">
                <Button className="border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  Upgrade Premium
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {list.length === 0 ? (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="flex flex-col items-center py-14 text-center">
            <h2 className="text-xl font-semibold">Mulai buat undangan pertamamu</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Tiga langkah mudah untuk undangan digital yang elegan.
            </p>
            <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
              {[
                { Icon: PenLine, title: "Pilih & Isi", text: "Ambil template, ubah nama, foto, & detail acara." },
                { Icon: Users, title: "Kelola Tamu", text: "Tambah daftar tamu & pantau RSVP yang masuk." },
                { Icon: Send, title: "Bagikan", text: "Sebarkan tautan, terima doa & ucapan." },
              ].map(({ Icon, title, text }, i) => (
                <div
                  key={title}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
                >
                  <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                    <Icon className="h-6 w-6 text-cyan-300" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/40">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-medium text-white">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard/new" className="mt-8">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" /> Buat Undangan Sekarang
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((inv) => {
            const meta = getTemplateMeta(templateName(inv.template_id) || "");
            const cover = inv.data?.hero?.background;
            const published = inv.status === "published";
            return (
              <Card key={inv.id} className="overflow-hidden border-white/10 bg-white/5">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={inv.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
                  )}
                  <div className="absolute right-2 top-2">
                    <Badge variant={published ? "success" : "secondary"}>
                      {published ? "Terbit" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium">{inv.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {meta?.name ?? "Template"} · /{inv.slug}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {inv.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {rsvpCounts[inv.id] ?? 0} hadir
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquareHeart className="h-4 w-4" /> {wishCounts[inv.id] ?? 0} ucapan
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <CardActions id={inv.id} slug={inv.slug} published={published} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
