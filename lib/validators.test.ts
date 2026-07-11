import { describe, expect, it } from "vitest";
import { parseRsvp, parseWish, NAME_MAX, MESSAGE_MAX, GUEST_COUNT_MAX } from "./validators";

function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

describe("parseRsvp", () => {
  it("menolak bila nama kosong", () => {
    const r = parseRsvp(fd({ attendance: "hadir", guest_count: "1" }));
    expect(r.ok).toBe(false);
  });

  it("menolak attendance di luar nilai valid", () => {
    const r = parseRsvp(fd({ name: "Budi", attendance: "makan", guest_count: "1" }));
    expect(r.ok).toBe(false);
  });

  it("memvalidasi input lengkap & benar", () => {
    const r = parseRsvp(fd({ name: "Budi", attendance: "hadir", guest_count: "3", message: "Salam" }));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.name).toBe("Budi");
      expect(r.value.attendance).toBe("hadir");
      expect(r.value.guest_count).toBe(3);
      expect(r.value.message).toBe("Salam");
    }
  });

  it("membatasi guest_count ke rentang 1..GUEST_COUNT_MAX", () => {
    const tooLow = parseRsvp(fd({ name: "A", attendance: "hadir", guest_count: "-5" }));
    if (tooLow.ok) expect(tooLow.value.guest_count).toBe(1);

    const tooHigh = parseRsvp(fd({ name: "A", attendance: "hadir", guest_count: "999" }));
    if (tooHigh.ok) expect(tooHigh.value.guest_count).toBe(GUEST_COUNT_MAX);
  });

  it("memotong nama & pesan yang terlalu panjang", () => {
    const longName = "x".repeat(200);
    const longMsg = "y".repeat(999);
    const r = parseRsvp(fd({ name: longName, attendance: "ragu", guest_count: "1", message: longMsg }));
    if (r.ok) {
      expect(r.value.name.length).toBeLessThanOrEqual(NAME_MAX);
      expect(r.value.message!.length).toBeLessThanOrEqual(MESSAGE_MAX);
    }
  });
});

describe("parseWish", () => {
  it("menolak bila pesan kosong", () => {
    const r = parseWish(fd({ name: "Siti" }));
    expect(r.ok).toBe(false);
  });

  it("menerima nama & pesan valid", () => {
    const r = parseWish(fd({ name: "Siti", message: "Barakallah" }));
    expect(r.ok).toBe(true);
  });

  it("memotong pesan terlalu panjang", () => {
    const r = parseWish(fd({ name: "Siti", message: "z".repeat(999) }));
    if (r.ok) expect(r.value.message.length).toBeLessThanOrEqual(MESSAGE_MAX);
  });
});
