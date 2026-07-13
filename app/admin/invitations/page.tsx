import { createAdminClient } from "@/lib/supabase/admin";
import {
  InvitationsTable,
  type InvitationRowData,
} from "@/components/admin/invitations-table";
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

  const rows: InvitationRowData[] = ((invs as Invitation[]) ?? []).map((inv) => ({
    id: inv.id,
    title: inv.title,
    slug: inv.slug,
    status: inv.status,
    owner: nameMap.get(inv.user_id) || emailMap.get(inv.user_id) || "-",
    views: inv.views,
  }));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Undangan ({rows.length})</h1>
      <InvitationsTable rows={rows} />
    </div>
  );
}
