import Link from "next/link";
import { Plus, Pencil, ExternalLink, Users, Eye, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { getTemplateMeta } from "@/config/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Invitation, TemplateRow } from "@/lib/types";

export default async function DashboardHome() {
  const { user, subscription } = await requireUser();
  const supabase = createClient();

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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Undangan Saya</h1>
          <p className="text-sm text-muted-foreground">
            {list.length} dari {limits.maxInvitations} undangan terpakai.
          </p>
        </div>
        {canCreate ? (
          <Link href="/dashboard/new">
            <Button>
              <Plus className="h-4 w-4" /> Buat Undangan
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/billing">
            <Button variant="outline">Upgrade untuk tambah</Button>
          </Link>
        )}
      </div>

      {list.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <p className="text-muted-foreground">
              Belum ada undangan. Buat undangan pertamamu.
            </p>
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
            return (
              <Card key={inv.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{inv.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {meta?.name ?? "Template"} · /{inv.slug}
                      </p>
                    </div>
                    <Badge
                      variant={inv.status === "published" ? "success" : "secondary"}
                    >
                      {inv.status === "published" ? "Terbit" : "Draft"}
                    </Badge>
                  </div>

                  <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {inv.views}
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
                    {inv.status === "published" && (
                      <Link href={`/i/${inv.slug}`} target="_blank">
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" /> Lihat
                        </Button>
                      </Link>
                    )}
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
