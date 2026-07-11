export const NAME_MAX = 80;
export const MESSAGE_MAX = 500;
export const GUEST_COUNT_MAX = 10;
export const ATTENDANCE = ["hadir", "tidak", "ragu"] as const;
export type Attendance = (typeof ATTENDANCE)[number];

export interface RsvpInput {
  name: string;
  attendance: Attendance;
  guest_count: number;
  message: string | null;
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function parseRsvp(formData: FormData): ParseResult<RsvpInput> {
  const name = String(formData.get("name") || "")
    .trim()
    .slice(0, NAME_MAX);
  const attendance = String(formData.get("attendance") || "");
  const rawCount = Number(formData.get("guest_count") || 1);
  const guest_count = Math.min(
    Math.max(Number.isFinite(rawCount) ? rawCount : 1, 1),
    GUEST_COUNT_MAX
  );
  const message = String(formData.get("message") || "")
    .trim()
    .slice(0, MESSAGE_MAX);

  if (!name) return { ok: false, error: "Nama wajib diisi." };
  if (!ATTENDANCE.includes(attendance as Attendance))
    return { ok: false, error: "Pilih status kehadiran." };

  return {
    ok: true,
    value: { name, attendance: attendance as Attendance, guest_count, message: message || null },
  };
}

export interface WishInput {
  name: string;
  message: string;
}

export function parseWish(formData: FormData): ParseResult<WishInput> {
  const name = String(formData.get("name") || "")
    .trim()
    .slice(0, NAME_MAX);
  const message = String(formData.get("message") || "")
    .trim()
    .slice(0, MESSAGE_MAX);

  if (!name || !message)
    return { ok: false, error: "Nama dan ucapan wajib diisi." };

  return { ok: true, value: { name, message } };
}
