import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MS = 10 * 60 * 1000; // 10 menit
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // simpan maks 1 hari

export async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return h.get("x-real-ip") || "unknown";
}

/**
 * Hitung jumlah submit per IP dalam jendela waktu.
 * Fail-open: bila gagal baca, izinkan (jangan blokir situs).
 * Mengembalikan true bila sudah melewati batas.
 */
export async function isRateLimited(
  ip: string,
  action: string,
  max: number
): Promise<boolean> {
  const supabase = createAdminClient();
  const since = new Date(Date.now() - WINDOW_MS).toISOString();

  const { count, error } = await supabase
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("action", action)
    .gte("created_at", since);

  if (error) return false;

  if ((count ?? 0) >= max) return true;

  await supabase.from("rate_limits").insert({ ip, action });
  // Bersihkan entri kadaluarsa agar tabel tidak membesar.
  await supabase
    .from("rate_limits")
    .delete()
    .lt("created_at", new Date(Date.now() - MAX_AGE_MS).toISOString());

  return false;
}
