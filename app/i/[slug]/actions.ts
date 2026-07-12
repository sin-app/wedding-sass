"use server";

import { createClient } from "@/lib/supabase/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { parseRsvp, parseWish } from "@/lib/validators";

export type PublicActionResult = { ok: boolean; message: string };

const RATE_LIMIT = 5; // maks submit per IP per 10 menit
const RATE_MSG = "Terlalu banyak permintaan. Coba lagi beberapa menit lagi.";

function isBot(formData: FormData): boolean {
  // Honeypot: field tersembunyi yang diisi bot akan menolak diam-diam.
  return String(formData.get("hp") || "").trim().length > 0;
}

// Pastikan id undangan valid dan sudah dipublikasikan agar form publik
// tidak bisa menyisipkan RSVP/ucapan ke undangan draft atau milik orang lain.
async function isInvitationPublished(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("invitations")
    .select("id")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  return !!data;
}

export async function submitRsvp(
  invitationId: string,
  _prev: PublicActionResult | null,
  formData: FormData
): Promise<PublicActionResult> {
  if (isBot(formData)) return { ok: false, message: "" };

  const ip = await getClientIp();
  if (await isRateLimited(ip, "rsvp", RATE_LIMIT))
    return { ok: false, message: RATE_MSG };

  const parsed = parseRsvp(formData);
  if (!parsed.ok) return { ok: false, message: parsed.error };

  if (!(await isInvitationPublished(invitationId)))
    return { ok: false, message: "Undangan tidak tersedia." };

  const supabase = await createClient();
  const { error } = await supabase.from("rsvps").insert({
    invitation_id: invitationId,
    name: parsed.value.name,
    attendance: parsed.value.attendance,
    guest_count: parsed.value.guest_count,
    message: parsed.value.message,
  });

  if (error) return { ok: false, message: "Gagal menyimpan. Coba lagi." };
  return { ok: true, message: "Terima kasih atas konfirmasinya!" };
}

export async function submitWish(
  invitationId: string,
  _prev: PublicActionResult | null,
  formData: FormData
): Promise<PublicActionResult> {
  if (isBot(formData)) return { ok: false, message: "" };

  const ip = await getClientIp();
  if (await isRateLimited(ip, "wish", RATE_LIMIT))
    return { ok: false, message: RATE_MSG };

  const parsed = parseWish(formData);
  if (!parsed.ok) return { ok: false, message: parsed.error };

  if (!(await isInvitationPublished(invitationId)))
    return { ok: false, message: "Undangan tidak tersedia." };

  const supabase = await createClient();
  const { error } = await supabase.from("wishes").insert({
    invitation_id: invitationId,
    name: parsed.value.name,
    message: parsed.value.message,
  });

  if (error) return { ok: false, message: "Gagal mengirim ucapan." };
  return { ok: true, message: "Ucapan terkirim. Terima kasih!" };
}
