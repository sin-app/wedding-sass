import { createAdminClient } from "@/lib/supabase/admin";
import { UsersTable, type UserRowData } from "@/components/admin/users-table";
import type { Plan, Profile, Role, SubStatus, Subscription } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const admin = createAdminClient();

  const [{ data: profiles }, { data: subs }, { data: authList }] =
    await Promise.all([
      admin.from("profiles").select("*").order("created_at", { ascending: false }),
      admin.from("subscriptions").select("*"),
      admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

  const subMap = new Map(
    (subs as Subscription[] | null)?.map((s) => [s.user_id, s]) ?? []
  );
  const emailMap = new Map(
    authList?.users?.map((u) => [u.id, u.email ?? ""]) ?? []
  );

  const rows: UserRowData[] = ((profiles as Profile[]) ?? []).map((p) => {
    const sub = subMap.get(p.id);
    return {
      id: p.id,
      email: emailMap.get(p.id) || "",
      name: p.full_name || "",
      role: p.role as Role,
      plan: (sub?.plan as Plan) ?? "free",
      status: (sub?.status as SubStatus) ?? "active",
    };
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Pengguna ({rows.length})</h1>
      <UsersTable rows={rows} />
    </div>
  );
}
