"use client";

import { useRef, useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Check,
  MessageCircle,
  Upload,
  Users,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addGuests, deleteGuest } from "@/app/dashboard/[id]/guests/actions";
import type { Guest } from "@/lib/types";

export function GuestManager({
  invitationId,
  slug,
  siteUrl,
  guests,
  maxGuests,
}: {
  invitationId: string;
  slug: string;
  siteUrl: string;
  guests: Guest[];
  maxGuests: number;
}) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [single, setSingle] = useState("");
  const [bulk, setBulk] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "opened" | "unopened">("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const linkFor = (g: Guest) =>
    `${siteUrl}/i/${slug}?g=${g.token}`;

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const waLink = (g: Guest) => {
    const text = `Kepada Yth. ${g.name},\n\nKami mengundang Anda. Buka undangan:\n${linkFor(g)}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const submitSingle = () =>
    startTransition(async () => {
      const res = await addGuests(invitationId, [single]);
      setMsg(res.message || null);
      if (res.ok) setSingle("");
    });

  const submitBulk = () =>
    startTransition(async () => {
      const names = bulk.split(/[\n,]+/);
      const res = await addGuests(invitationId, names);
      setMsg(res.message || null);
      if (res.ok) setBulk("");
    });

  const remove = (id: string) =>
    startTransition(async () => {
      await deleteGuest(invitationId, id);
    });

  const filtered = guests.filter((g) => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter === "opened" && !g.opened) return false;
    if (statusFilter === "unopened" && g.opened) return false;
    return true;
  });

  const exportCsv = () => {
    const rows = [["Nama", "Status", "Token"]];
    guests.forEach((g) =>
      rows.push([g.name, g.opened ? "Dibuka" : "Belum", g.token])
    );
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tamu.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const text = String(reader.result || "");
      const names: string[] = [];
      for (const line of text.split(/\r?\n/)) {
        const first = (line.split(",")[0] || "").trim();
        if (!first || first.toLowerCase().startsWith("nama")) continue;
        names.push(first);
      }
      if (!names.length) {
        setMsg("Tidak ada nama valid di CSV.");
        return;
      }
      const res = await addGuests(invitationId, names);
      setMsg(res.message || `Impor ${names.length} nama`);
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <h3 className="font-medium">Tambah Tamu</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Nama tamu"
                value={single}
                onChange={(e) => setSingle(e.target.value)}
              />
              <Button onClick={submitSingle} disabled={pending || !single.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <h3 className="flex items-center gap-2 font-medium">
              <Upload className="h-4 w-4" /> Import Massal
            </h3>
            <div className="space-y-1.5">
              <Label>Satu nama per baris (atau pisah koma)</Label>
              <Textarea
                rows={6}
                placeholder={"Budi Santoso\nSiti Aminah\nAndi & Keluarga"}
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={submitBulk}
              disabled={pending || !bulk.trim()}
            >
              Import Daftar
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importCsv(f);
                e.target.value = "";
              }}
            />
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => fileRef.current?.click()}
              disabled={pending}
            >
              <Upload className="h-4 w-4" /> Impor dari CSV
            </Button>
          </CardContent>
        </Card>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Users className="h-4 w-4" /> Daftar Tamu
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filtered.length} / {guests.length}
              </span>
              <Button size="sm" variant="outline" onClick={exportCsv} disabled={!guests.length}>
                <Download className="h-4 w-4" /> CSV
              </Button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama tamu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1">
              {([
                ["all", "Semua"],
                ["opened", "Dibuka"],
                ["unopened", "Belum"],
              ] as const).map(([val, label]) => (
                <Button
                  key={val}
                  size="sm"
                  variant={statusFilter === val ? "default" : "outline"}
                  onClick={() => setStatusFilter(val)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {guests.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Belum ada tamu.
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Tidak ada tamu yang cocok.
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((g) => (
                <div
                  key={g.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{g.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.opened ? (
                        <Badge variant="success">Dibuka</Badge>
                      ) : (
                        <Badge variant="secondary">Belum dibuka</Badge>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copy(g.id, linkFor(g))}
                    >
                      {copied === g.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <a href={waLink(g)} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => remove(g.id)}
                      disabled={pending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
