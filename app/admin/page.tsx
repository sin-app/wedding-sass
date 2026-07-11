import { Users, Mail, Crown, Eye } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const admin = createAdminClient();

  const [{ count: users }, { count: invitations }, { count: published }, { count: premium }] =
    await Promise.all([
      admin.from("profiles").select("*", { count: "exact", head: true }),
      admin.from("invitations").select("*", { count: "exact", head: true }),
      admin
        .from("invitations")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
      admin
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("plan", "premium")
        .eq("status", "active"),
    ]);

  const { data: views } = await admin.from("invitations").select("views");
  const totalViews =
    (views as { views: number }[] | null)?.reduce((a, v) => a + v.views, 0) ?? 0;

  const stats = [
    { icon: Users, label: "Total Pengguna", value: users ?? 0 },
    { icon: Mail, label: "Total Undangan", value: invitations ?? 0 },
    { icon: Crown, label: "Premium Aktif", value: premium ?? 0 },
    { icon: Eye, label: "Total Kunjungan", value: totalViews },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Ringkasan</h1>
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
      <p className="mt-6 text-sm text-muted-foreground">
        Terbit: {published ?? 0} undangan.
      </p>
    </div>
  );
}
