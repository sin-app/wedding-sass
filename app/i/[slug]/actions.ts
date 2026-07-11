"use server";

import { createClient } from "@/lib/supabase/server";

export type PublicActionResult = { ok: boolean; message: string };

export async function submitRsvp(
  invitationId: string,
  _prev: PublicActionResult | null,
  formData: FormData
): Promise<PublicActionResult> {
  const name = String(formData.get("name") || "").trim();
  const attendance = String(formData.get("attendance") || "");
  const guest_count = Number(formData.get("guest_count") || 1);
  const message = String(formData.get("message") || "").trim();

  if (!name) return { ok: false, message: "Nama wajib diisi." };
  if (!["hadir", "tidak", "ragu"].includes(attendance))
    return { ok: false, message: "Pilih status kehadiran." };

  const supabase = createClient();
  const { error } = await supabase.from("rsvps").insert({
    invitation_id: invitationId,
    name,
    attendance,
    guest_count: Number.isFinite(guest_count) ? guest_count : 1,
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
  const name = String(formData.get("name") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !message)
    return { ok: false, message: "Nama dan ucapan wajib diisi." };

  const supabase = createClient();
  const { error } = await supabase.from("wishes").insert({
    invitation_id: invitationId,
    name,
    message,
  });

  if (error) return { ok: false, message: "Gagal mengirim ucapan." };
  return { ok: true, message: "Ucapan terkirim. Terima kasih!" };
}
