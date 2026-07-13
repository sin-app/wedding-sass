import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ExternalLink, Users, Eye, BarChart3, MessageSquareHeart, Crown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { getTemplateMeta } from "@/config/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyLinkButton } from "@/components/copy-link-button";
import { PublishToggle } from "@/components/dashboard/publish-toggle";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
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
        .from("rsvp")
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
              {!isPremium && " · maks " + limits.maxGuests + " tamu, " + limits.maxPhotos + " foto"}
            </p>
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
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <p className="text-muted-foreground">Belum ada undangan. Buat undangan pertamamu.</p>
            <Link href="/dashboard/new" className="mt-4">
              <Button>
                <Plus className="h-4 w-4" /> Buat Undangan
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((inv) => {
            const meta = getTemplateMeta(templateName(inv.template_id) || "");
            const cover = inv.data?.hero?.background;
            const shareUrl = `${siteUrl}/i/${inv.slug}`;
            const published = inv.status === "published";
            return (
              <Card key={inv.id} className="overflow-hidden border-white/10 bg-white/5">
                <div className="relative aspect-[16/7] w-full overflow-hidden">
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
                    <Link href={`/dashboard/${inv.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4" /> Edit
                      </Button>
                    </Link>
                    <Link href={`/dashboard/${inv.id}/guests`}>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4" /> Tamu
                      </Button>
                    </Link>
                    <Link href={`/dashboard/${inv.id}/rsvp`}>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4" /> Rekap
                      </Button>
                    </Link>
                    {published && (
                      <Link href={`/i/${inv.slug}`} target="_blank">
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" /> Lihat
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <CopyLinkButton url={shareUrl} />
                    <PublishToggle id={inv.id} published={published} />
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
