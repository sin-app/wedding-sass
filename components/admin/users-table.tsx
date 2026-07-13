"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserRow } from "@/components/admin/user-row";
import type { Plan, Role, SubStatus } from "@/lib/types";

export interface UserRowData {
  id: string;
  email: string;
  name: string;
  role: Role;
  plan: Plan;
  status: SubStatus;
}

export function UsersTable({ rows }: { rows: UserRowData[] }) {
  const [q, setQ] = useState("");
  const f = rows.filter((r) =>
    [r.name, r.email, r.role, r.plan, r.status]
      .join(" ")
      .toLowerCase()
      .includes(q.trim().toLowerCase())
  );

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama, email, role, paket..."
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {f.length} / {rows.length}
        </span>
      </div>
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
            {f.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  Tidak ada hasil.
                </td>
              </tr>
            ) : (
              f.map((r) => (
                <UserRow
                  key={r.id}
                  id={r.id}
                  email={r.email}
                  name={r.name}
                  role={r.role}
                  plan={r.plan}
                  status={r.status}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
