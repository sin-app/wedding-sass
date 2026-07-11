"use server";

import { createClient } from "@/lib/supabase/server";

export type PublicActionResult = { ok: boolean; message: string };

const NAME_MAX = 80;
const MESSAGE_MAX = 500;
const GUEST_COUNT_MAX = 10;

export async function submitRsvp(
  invitationId: string,
  _prev: PublicActionResult | null,
  formData: FormData
): Promise<PublicActionResult> {
  // Honeypot: bot yang mengisi field tersembunyi ini akan ditolak diam-diam.
  if (String(formData.get("hp") || "").trim()) return { ok: false, message: "" };

  const name = String(formData.get("name") || "").trim().slice(0, NAME_MAX);
  const attendance = String(formData.get("attendance") || "");
  const rawCount = Number(formData.get("guest_count") || 1);
  const guest_count = Math.min(
    Math.max(Number.isFinite(rawCount) ? rawCount : 1, 1),
    GUEST_COUNT_MAX
  );
  const message = String(formData.get("message") || "").trim().slice(0, MESSAGE_MAX);

  if (!name) return { ok: false, message: "Nama wajib diisi." };
  if (!["hadir", "tidak", "ragu"].includes(attendance))
    return { ok: false, message: "Pilih status kehadiran." };

  const supabase = await createClient();
  const { error } = await supabase.from("rsvps").insert({
    invitation_id: invitationId,
    name,
    attendance,
    guest_count,
    message: message || null,
  });

  if (error) return { ok: false, message: "Gagal menyimpan. Coba lagi." };
  return { ok: true, message: "Terima kasih atas konfirmasinya!" };
}

export async function submitWish(
  invitationId: string,
  _prev: PublicActionResult | null,
  formData: FormData
): Promise<PublicActionResult> {
  if (String(formData.get("hp") || "").trim()) return { ok: false, message: "" };

  const name = String(formData.get("name") || "").trim().slice(0, NAME_MAX);
  const message = String(formData.get("message") || "").trim().slice(0, MESSAGE_MAX);

  if (!name || !message)
    return { ok: false, message: "Nama dan ucapan wajib diisi." };

  const supabase = await createClient();
  const { error } = await supabase.from("wishes").insert({
    invitation_id: invitationId,
    name,
    message,
  });

  if (error) return { ok: false, message: "Gagal mengirim ucapan." };
  return { ok: true, message: "Ucapan terkirim. Terima kasih!" };
}
