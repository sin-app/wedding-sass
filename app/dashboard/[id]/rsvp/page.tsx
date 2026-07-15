import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Users, Check, MailOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Invitation, Rsvp, Wish } from "@/lib/types";

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function RsvpRecapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await requireUser();
  const supabase = await createClient();

  const { data: inv } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (!inv) notFound();
  const invitation = inv as Invitation;

  const RECAP_LIMIT = 1000;
  const [{ data: rsvps }, { data: wishes }, { count: guestCount }, { count: openedCount }] =
    await Promise.all([
      supabase
        .from("rsvps")
        .select("*")
        .eq("invitation_id", invitation.id)
        .order("created_at", { ascending: false })
        .limit(RECAP_LIMIT),
      supabase
        .from("wishes")
        .select("*")
        .eq("invitation_id", invitation.id)
        .order("created_at", { ascending: false })
        .limit(RECAP_LIMIT),
      supabase
        .from("guests")
        .select("*", { count: "exact", head: true })
        .eq("invitation_id", invitation.id),
      supabase
        .from("guests")
        .select("*", { count: "exact", head: true })
        .eq("invitation_id", invitation.id)
        .eq("opened", true),
    ]);

  const list = (rsvps as Rsvp[]) ?? [];
  const hadir = list.filter((r) => r.attendance === "hadir");
  const ragu = list.filter((r) => r.attendance === "ragu");
  const tidak = list.filter((r) => r.attendance === "tidak");
  const totalRsvp = list.length || 1;
  const pct = (n: number) => Math.round((n / totalRsvp) * 100);
  const totalTamu = hadir.reduce((a, r) => a + (r.guest_count || 0), 0);
  const rate = list.length
    ? Math.round((hadir.length / list.length) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-semibold">Rekap — {invitation.title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Statistik kunjungan, RSVP, dan ucapan.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat icon={Eye} label="Kunjungan" value={invitation.views} />
        <Stat
          icon={MailOpen}
          label="Tamu buka"
          value={`${openedCount ?? 0}/${guestCount ?? 0}`}
        />
        <Stat icon={Check} label={`Hadir (${rate}%)`} value={hadir.length} />
        <Stat icon={Users} label="Estimasi tamu" value={totalTamu} />
      </div>

      <Card className="mt-6">
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-medium">Distribusi Kehadiran</h2>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {hadir.length > 0 && (
              <div className="bg-emerald-500" style={{ width: `${pct(hadir.length)}%` }} />
            )}
            {ragu.length > 0 && (
              <div className="bg-amber-500" style={{ width: `${pct(ragu.length)}%` }} />
            )}
            {tidak.length > 0 && (
              <div className="bg-rose-500" style={{ width: `${pct(tidak.length)}%` }} />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Hadir <b>{hadir.length}</b>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
              Ragu <b>{ragu.length}</b>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
              Tidak <b>{tidak.length}</b>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-3 font-medium">Daftar RSVP ({list.length})</h2>
            <div className="max-h-[420px] space-y-2 overflow-y-auto">
              {list.length === 0 && (
                <p className="text-sm text-muted-foreground">Belum ada RSVP.</p>
              )}
              {list.map((r) => (
                <div key={r.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r.name}</p>
                    <Badge
                      variant={
                        r.attendance === "hadir"
                          ? "success"
                          : r.attendance === "tidak"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {r.attendance} · {r.guest_count}
                    </Badge>
                  </div>
                  {r.message && (
                    <p className="mt-1 text-sm text-muted-foreground">{r.message}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-3 font-medium">
              Ucapan ({(wishes as Wish[])?.length ?? 0})
            </h2>
            <div className="max-h-[420px] space-y-2 overflow-y-auto">
              {(!wishes || wishes.length === 0) && (
                <p className="text-sm text-muted-foreground">Belum ada ucapan.</p>
              )}
              {(wishes as Wish[])?.map((w) => (
                <div key={w.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium text-primary">{w.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
