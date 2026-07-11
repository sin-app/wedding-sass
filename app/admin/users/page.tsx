import { createAdminClient } from "@/lib/supabase/admin";
import { UserRow } from "@/components/admin/user-row";
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

  const rows = (profiles as Profile[]) ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Pengguna ({rows.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th className="p-3">Pengguna</th>
              <th className="p-3">Role</th>
              <th className="p-3">Langganan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const sub = subMap.get(p.id);
              return (
                <UserRow
                  key={p.id}
                  id={p.id}
                  email={emailMap.get(p.id) || ""}
                  name={p.full_name || ""}
                  role={p.role as Role}
                  plan={(sub?.plan as Plan) ?? "free"}
                  status={(sub?.status as SubStatus) ?? "active"}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
