import { createAdminClient } from "@/lib/supabase/admin";
import { InvitationRow } from "@/components/admin/invitation-row";
import type { Invitation, Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminInvitations() {
  const admin = createAdminClient();

  const [{ data: invs }, { data: profiles }, { data: authList }] =
    await Promise.all([
      admin
        .from("invitations")
        .select("*")
        .order("created_at", { ascending: false }),
      admin.from("profiles").select("id, full_name"),
      admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

  const nameMap = new Map(
    (profiles as Pick<Profile, "id" | "full_name">[] | null)?.map((p) => [
      p.id,
      p.full_name,
    ]) ?? []
  );
  const emailMap = new Map(authList?.users?.map((u) => [u.id, u.email ?? ""]) ?? []);
  const rows = (invs as Invitation[]) ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Undangan ({rows.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th className="p-3">Undangan</th>
              <th className="p-3">Pemilik</th>
              <th className="p-3">Status</th>
              <th className="p-3">Views</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((inv) => (
              <InvitationRow
                key={inv.id}
                id={inv.id}
                title={inv.title}
                slug={inv.slug}
                status={inv.status}
                owner={
                  nameMap.get(inv.user_id) ||
                  emailMap.get(inv.user_id) ||
                  "-"
                }
                views={inv.views}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
