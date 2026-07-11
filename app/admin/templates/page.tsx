import { createAdminClient } from "@/lib/supabase/admin";
import { TemplateRow } from "@/components/admin/template-row";
import type { TemplateRow as TRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminTemplates() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("templates")
    .select("*")
    .order("created_at", { ascending: true });
  const rows = (data as TRow[]) ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-semibold">Template ({rows.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th className="p-3">Template</th>
              <th className="p-3">Status</th>
              <th className="p-3">Tipe</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <TemplateRow
                key={t.id}
                id={t.id}
                name={t.name}
                slug={t.slug}
                isActive={t.is_active}
                premium={t.premium}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
