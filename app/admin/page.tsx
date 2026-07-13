import Link from "next/link";
import { Users, Mail, Crown, Eye, LayoutTemplate, AlertTriangle, ArrowRight } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const PREMIUM_PRICE = 149000;

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminOverview() {
  const admin = createAdminClient();

  const [
    { count: users },
    { count: invitations },
    { count: published },
    { count: premium },
    { count: pending },
    { data: recentUsers },
    { data: recentInv },
  ] = await Promise.all([
    admin.from("profiles").select("*", { count: "exact", head: true }),
    admin.from("invitations").select("*", { count: "exact", head: true }),
    admin.from("invitations").select("*", { count: "exact", head: true }).eq("status", "published"),
    admin
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("plan", "premium")
      .eq("status", "active"),
    admin.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin
      .from("profiles")
      .select("id, full_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    admin
      .from("invitations")
      .select("id, title, slug, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const { data: views } = await admin.from("invitations").select("views");
  const totalViews =
    (views as { views: number }[] | null)?.reduce((a, v) => a + v.views, 0) ?? 0;
  const revenue = (premium ?? 0) * PREMIUM_PRICE;

  const stats = [
    { icon: Users, label: "Total Pengguna", value: users ?? 0 },
    { icon: Mail, label: "Total Undangan", value: invitations ?? 0 },
    { icon: Crown, label: "Premium Aktif", value: premium ?? 0 },
    { icon: Eye, label: "Total Kunjungan", value: totalViews },
  ];

  const quickLinks = [
    { href: "/admin/users", icon: Users, label: "Pengguna", text: "Kelola akun, peran, & langganan." },
    { href: "/admin/templates", icon: LayoutTemplate, label: "Template", text: "Aktifkan & tentukan akses Premium." },
    { href: "/admin/invitations", icon: Mail, label: "Undangan", text: "Lihat & hapus undangan terbit." },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Ringkasan</h1>

      {pending ? (
        <Link
          href="/admin/users"
          className="mb-6 flex items-center gap-3 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 transition hover:bg-amber-400/20"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>
            <strong>{pending}</strong> permintaan upgrade Premium menunggu verifikasi pembayaran.
          </span>
          <ArrowRight className="ml-auto h-4 w-4" />
        </Link>
      ) : null}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Terbit: {published ?? 0} undangan · Estimasi revenue Premium:{" "}
        <span className="font-medium text-foreground">
          Rp{revenue.toLocaleString("id-ID")}
        </span>
      </p>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {quickLinks.map((q) => (
          <Link key={q.href} href={q.href}>
            <Card className="h-full border-white/10 bg-white/5 transition hover:border-cyan-400/40">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                  <q.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="mt-3 font-medium text-white">{q.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{q.text}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <h3 className="mb-3 font-medium text-white">Signup Terbaru</h3>
            <ul className="space-y-3 text-sm">
              {(recentUsers as { id: string; full_name: string | null; created_at: string }[] | null)?.map(
                (u) => (
                  <li key={u.id} className="flex items-center justify-between">
                    <span className="text-slate-200">{u.full_name || "Tanpa nama"}</span>
                    <span className="text-xs text-muted-foreground">{fmtDate(u.created_at)}</span>
                  </li>
                )
              ) ?? <li className="text-muted-foreground">Belum ada.</li>}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <h3 className="mb-3 font-medium text-white">Undangan Terbaru</h3>
            <ul className="space-y-3 text-sm">
              {(recentInv as { id: string; title: string; slug: string; status: string; created_at: string }[] | null)?.map(
                (inv) => (
                  <li key={inv.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-slate-200">
                      {inv.title}{" "}
                      <span className="text-muted-foreground">· /{inv.slug}</span>
                    </span>
                    <Badge variant={inv.status === "published" ? "success" : "secondary"}>
                      {inv.status === "published" ? "Terbit" : "Draft"}
                    </Badge>
                  </li>
                )
              ) ?? <li className="text-muted-foreground">Belum ada.</li>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
