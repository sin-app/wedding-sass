"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Check,
  MessageCircle,
  Upload,
  Users,
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
          </CardContent>
        </Card>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-medium">
              <Users className="h-4 w-4" /> Daftar Tamu
            </h3>
            <span className="text-sm text-muted-foreground">
              {guests.length} / {maxGuests}
            </span>
          </div>

          {guests.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Belum ada tamu.
            </p>
          ) : (
            <div className="space-y-2">
              {guests.map((g) => (
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
