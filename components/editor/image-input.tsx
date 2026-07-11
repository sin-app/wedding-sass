"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { randomToken } from "@/lib/utils";

export function ImageInput({
  value,
  onChange,
  invitationId,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  invitationId: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setErr(null);
    if (file.size > 3 * 1024 * 1024) {
      setErr("Maks 3MB.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${invitationId}/${randomToken(10)}.${ext}`;
      const { error } = await supabase.storage
        .from("invitations")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("invitations").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch {
      setErr("Gagal upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-foreground/80">{label}</p>}
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-border">
            <Image src={value} alt="preview" fill className="object-cover" sizes="64px" />
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-input px-3 text-sm hover:bg-accent"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="atau tempel URL gambar"
        className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
      />
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}
