"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InvitationRow } from "@/components/admin/invitation-row";

export interface InvitationRowData {
  id: string;
  title: string;
  slug: string;
  status: string;
  owner: string;
  views: number;
}

export function InvitationsTable({ rows }: { rows: InvitationRowData[] }) {
  const [q, setQ] = useState("");
  const f = rows.filter((r) =>
    [r.title, r.slug, r.owner, r.status]
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
            placeholder="Cari judul, slug, pemilik, status..."
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
              <th className="p-3">Undangan</th>
              <th className="p-3">Pemilik</th>
              <th className="p-3">Status</th>
              <th className="p-3">Views</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {f.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  Tidak ada hasil.
                </td>
              </tr>
            ) : (
              f.map((r) => (
                <InvitationRow
                  key={r.id}
                  id={r.id}
                  title={r.title}
                  slug={r.slug}
                  status={r.status}
                  owner={r.owner}
                  views={r.views}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
