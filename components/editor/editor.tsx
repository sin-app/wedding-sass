"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Save,
  Globe,
  EyeOff,
  Eye,
  Pencil,
  Share2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageInput } from "@/components/editor/image-input";
import { TemplateRenderer } from "@/templates";
import {
  saveInvitation,
  setPublishStatus,
  deleteInvitation,
} from "@/app/dashboard/actions";
import type { Invitation, InvitationData } from "@/lib/types";
import { SharePanel } from "@/components/share/share-panel";

type Tab = "edit" | "preview";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 font-medium">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function Editor({
  invitation,
  templateSlug,
  siteUrl,
  watermark,
}: {
  invitation: Invitation;
  templateSlug: string;
  siteUrl: string;
  watermark: boolean;
}) {
  const [tab, setTab] = useState<Tab>("edit");
  const [title, setTitle] = useState(invitation.title);
  const [slug, setSlug] = useState(invitation.slug);
  const [data, setData] = useState<InvitationData>(invitation.data);
  const [status, setStatus] = useState(invitation.status);
  const [msg, setMsg] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const publicUrl = `${siteUrl}/i/${slug}`;
  const [pending, startTransition] = useTransition();

  const set = (patch: Partial<InvitationData>) =>
    setData((d) => ({ ...d, ...patch }));

  const save = () =>
    startTransition(async () => {
      const res = await saveInvitation(invitation.id, { title, slug, data });
      setMsg(res.message || null);
    });

  const togglePublish = () =>
    startTransition(async () => {
      const next = status === "published" ? false : true;
      const res = await setPublishStatus(invitation.id, next);
      if (res.ok) setStatus(next ? "published" : "draft");
      setMsg(res.message || null);
    });

  const remove = () => {
    if (!confirm("Hapus undangan ini? Tindakan tidak bisa dibatalkan.")) return;
    startTransition(async () => {
      await deleteInvitation(invitation.id);
    });
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      saveInvitation(invitation.id, { title, slug, data }).then((res) => {
        if (res.ok) setMsg("Tersimpan otomatis");
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [data, title, slug, invitation.id]);

  const moveItem = <K extends "events" | "story" | "gallery">(
    key: K,
    i: number,
    dir: -1 | 1
  ) =>
    setData((d) => {
      const arr = [...(d[key] as unknown as unknown[])];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return d;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...d, [key]: arr } as InvitationData;
    });

  const confirmRemove = (fn: () => void) => {
    if (confirm("Hapus item ini? Tindakan tidak bisa dibatalkan.")) fn();
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Top bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>
        <div className="flex items-center gap-2">
          {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
          <Badge variant={status === "published" ? "success" : "secondary"}>
            {status === "published" ? "Terbit" : "Draft"}
          </Badge>
          <Button size="sm" variant="outline" onClick={togglePublish} disabled={pending}>
            {status === "published" ? (
              <>
                <EyeOff className="h-4 w-4" /> Sembunyikan
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" /> Publikasikan
              </>
            )}
          </Button>
          <Button size="sm" onClick={save} disabled={pending}>
            <Save className="h-4 w-4" /> {pending ? "Menyimpan..." : "Simpan"}
          </Button>
          <div className="relative">
            <Button size="sm" variant="outline" onClick={() => setShareOpen((v) => !v)}>
              <Share2 className="h-4 w-4" /> Bagikan
            </Button>
            {shareOpen && (
              <div className="absolute right-0 z-50 mt-2 w-[260px] rounded-xl border border-border bg-card p-4 shadow-xl">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Bagikan</span>
                  <button
                    onClick={() => setShareOpen(false)}
                    aria-label="Tutup"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <SharePanel url={publicUrl} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="mb-4 flex gap-2 lg:hidden">
        <Button
          size="sm"
          variant={tab === "edit" ? "default" : "outline"}
          onClick={() => setTab("edit")}
        >
          <Pencil className="h-4 w-4" /> Edit
        </Button>
        <Button
          size="sm"
          variant={tab === "preview" ? "default" : "outline"}
          onClick={() => setTab("preview")}
        >
          <Eye className="h-4 w-4" /> Pratinjau
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <div className={`space-y-4 ${tab === "preview" ? "hidden lg:block" : ""}`}>
          <Group title="Umum">
            <Field label="Judul (internal)" value={title} onChange={setTitle} />
            <div className="space-y-1.5">
              <Label>Slug URL</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                {siteUrl}/i/{slug}
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Kata Sambutan</Label>
              <Textarea
                value={data.greeting}
                onChange={(e) => set({ greeting: e.target.value })}
              />
            </div>
            <Field
              label="Tanggal & Waktu Acara (ISO)"
              value={data.date}
              onChange={(v) => set({ date: v })}
            />
            <ImageInput
              label="Foto Latar Cover"
              value={data.hero.background}
              onChange={(url) => set({ hero: { background: url } })}
              invitationId={invitation.id}
            />
            <Field
              label="URL Musik (mp3)"
              value={data.music.src}
              onChange={(v) => set({ music: { ...data.music, src: v } })}
            />
          </Group>

          <Group title="Mempelai Pria">
            <Field
              label="Nama Lengkap"
              value={data.couple.groom.name}
              onChange={(v) =>
                set({ couple: { ...data.couple, groom: { ...data.couple.groom, name: v } } })
              }
            />
            <Field
              label="Nama Panggilan"
              value={data.couple.groom.shortName}
              onChange={(v) =>
                set({ couple: { ...data.couple, groom: { ...data.couple.groom, shortName: v } } })
              }
            />
            <Field
              label="Orang Tua"
              value={data.couple.groom.parents}
              onChange={(v) =>
                set({ couple: { ...data.couple, groom: { ...data.couple.groom, parents: v } } })
              }
            />
            <Field
              label="Instagram"
              value={data.couple.groom.instagram}
              onChange={(v) =>
                set({ couple: { ...data.couple, groom: { ...data.couple.groom, instagram: v } } })
              }
            />
            <ImageInput
              label="Foto"
              value={data.couple.groom.photo}
              onChange={(url) =>
                set({ couple: { ...data.couple, groom: { ...data.couple.groom, photo: url } } })
              }
              invitationId={invitation.id}
            />
          </Group>

          <Group title="Mempelai Wanita">
            <Field
              label="Nama Lengkap"
              value={data.couple.bride.name}
              onChange={(v) =>
                set({ couple: { ...data.couple, bride: { ...data.couple.bride, name: v } } })
              }
            />
            <Field
              label="Nama Panggilan"
              value={data.couple.bride.shortName}
              onChange={(v) =>
                set({ couple: { ...data.couple, bride: { ...data.couple.bride, shortName: v } } })
              }
            />
            <Field
              label="Orang Tua"
              value={data.couple.bride.parents}
              onChange={(v) =>
                set({ couple: { ...data.couple, bride: { ...data.couple.bride, parents: v } } })
              }
            />
            <Field
              label="Instagram"
              value={data.couple.bride.instagram}
              onChange={(v) =>
                set({ couple: { ...data.couple, bride: { ...data.couple.bride, instagram: v } } })
              }
            />
            <ImageInput
              label="Foto"
              value={data.couple.bride.photo}
              onChange={(url) =>
                set({ couple: { ...data.couple, bride: { ...data.couple.bride, photo: url } } })
              }
              invitationId={invitation.id}
            />
          </Group>

          {/* Events */}
          <Group title="Acara">
            {data.events.map((ev, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Acara {i + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem("events", i, -1)}
                      disabled={i === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Atur ke atas"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveItem("events", i, 1)}
                      disabled={i === data.events.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Atur ke bawah"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        confirmRemove(() =>
                          set({ events: data.events.filter((_, x) => x !== i) })
                        )
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {(["name", "date", "time", "venue", "address"] as const).map((k) => (
                  <Input
                    key={k}
                    placeholder={k}
                    value={ev[k]}
                    onChange={(e) => {
                      const events = [...data.events];
                      events[i] = { ...events[i], [k]: e.target.value };
                      set({ events });
                    }}
                  />
                ))}
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                set({
                  events: [
                    ...data.events,
                    { name: "", date: "", time: "", venue: "", address: "" },
                  ],
                })
              }
            >
              <Plus className="h-4 w-4" /> Tambah Acara
            </Button>
            <Field
              label="Link Google Maps"
              value={data.maps.url}
              onChange={(v) => set({ maps: { ...data.maps, url: v } })}
            />
            <Field
              label="Embed Maps URL"
              value={data.maps.embed}
              onChange={(v) => set({ maps: { ...data.maps, embed: v } })}
            />
          </Group>

          {/* Story */}
          <Group title="Love Story">
            {data.story.map((s, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Momen {i + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem("story", i, -1)}
                      disabled={i === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Atur ke atas"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveItem("story", i, 1)}
                      disabled={i === data.story.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Atur ke bawah"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        confirmRemove(() =>
                          set({ story: data.story.filter((_, x) => x !== i) })
                        )
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Input
                  placeholder="tahun / tanggal"
                  value={s.date}
                  onChange={(e) => {
                    const story = [...data.story];
                    story[i] = { ...story[i], date: e.target.value };
                    set({ story });
                  }}
                />
                <Input
                  placeholder="judul"
                  value={s.title}
                  onChange={(e) => {
                    const story = [...data.story];
                    story[i] = { ...story[i], title: e.target.value };
                    set({ story });
                  }}
                />
                <Textarea
                  placeholder="deskripsi"
                  value={s.description}
                  onChange={(e) => {
                    const story = [...data.story];
                    story[i] = { ...story[i], description: e.target.value };
                    set({ story });
                  }}
                />
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                set({ story: [...data.story, { date: "", title: "", description: "" }] })
              }
            >
              <Plus className="h-4 w-4" /> Tambah Momen
            </Button>
          </Group>

          {/* Gallery */}
          <Group title="Galeri Foto">
            {data.gallery.map((g, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex flex-col gap-1 pt-2">
                  <button
                    onClick={() => moveItem("gallery", i, -1)}
                    disabled={i === 0}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Atur ke atas"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveItem("gallery", i, 1)}
                    disabled={i === data.gallery.length - 1}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Atur ke bawah"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <ImageInput
                    value={g}
                    onChange={(url) => {
                      const gallery = [...data.gallery];
                      gallery[i] = url;
                      set({ gallery });
                    }}
                    invitationId={invitation.id}
                  />
                </div>
                <button
                  onClick={() =>
                    confirmRemove(() =>
                      set({ gallery: data.gallery.filter((_, x) => x !== i) })
                    )
                  }
                  className="mt-2 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => set({ gallery: [...data.gallery, ""] })}
            >
              <Plus className="h-4 w-4" /> Tambah Foto
            </Button>
          </Group>

          {/* Gift */}
          <Group title="Amplop Digital">
            {data.gift.banks.map((b, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rekening {i + 1}</span>
                  <button
                    onClick={() =>
                      confirmRemove(() =>
                        set({
                          gift: {
                            ...data.gift,
                            banks: data.gift.banks.filter((_, x) => x !== i),
                          },
                        })
                      )
                    }
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {(["bank", "number", "holder"] as const).map((k) => (
                  <Input
                    key={k}
                    placeholder={k}
                    value={b[k]}
                    onChange={(e) => {
                      const banks = [...data.gift.banks];
                      banks[i] = { ...banks[i], [k]: e.target.value };
                      set({ gift: { ...data.gift, banks } });
                    }}
                  />
                ))}
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                set({
                  gift: {
                    ...data.gift,
                    banks: [...data.gift.banks, { bank: "", number: "", holder: "" }],
                  },
                })
              }
            >
              <Plus className="h-4 w-4" /> Tambah Rekening
            </Button>
            <Field
              label="Label Alamat Kado"
              value={data.gift.address.label}
              onChange={(v) =>
                set({ gift: { ...data.gift, address: { ...data.gift.address, label: v } } })
              }
            />
            <div className="space-y-1.5">
              <Label>Alamat Kado</Label>
              <Textarea
                value={data.gift.address.value}
                onChange={(e) =>
                  set({
                    gift: { ...data.gift, address: { ...data.gift.address, value: e.target.value } },
                  })
                }
              />
            </div>
          </Group>

          <Button variant="destructive" onClick={remove} disabled={pending}>
            <Trash2 className="h-4 w-4" /> Hapus Undangan
          </Button>
        </div>

        {/* PREVIEW */}
        <div className={`${tab === "edit" ? "hidden lg:block" : ""}`}>
          <div className="sticky top-4 overflow-hidden rounded-xl border border-border shadow-sm">
            <div className="h-[80vh] overflow-y-auto">
              <TemplateRenderer
                slug={templateSlug}
                data={data}
                guestName="Nama Tamu"
                preview
                watermark={watermark}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
