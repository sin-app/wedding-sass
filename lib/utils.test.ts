import { describe, expect, it } from "vitest";
import { slugify, randomToken } from "./utils";

describe("slugify", () => {
  it("huruf kecil & strip pada spasi", () => {
    expect(slugify("Budi & Siti")).toBe("budi-siti");
  });

  it("membuang karakter aneh", () => {
    expect(slugify("Nama @#$ Anjing!")).toBe("nama-anjing");
  });

  it("membatasi panjang", () => {
    expect(slugify("a".repeat(100)).length).toBeLessThanOrEqual(60);
  });
});

describe("randomToken", () => {
  it("panjang default 8 & hanya karakter aman", () => {
    const t = randomToken();
    expect(t).toHaveLength(8);
    expect(t).toMatch(/^[a-z0-9]+$/);
  });

  it("panjang sesuai argumen", () => {
    expect(randomToken(12)).toHaveLength(12);
  });

  it("hasil berbeda antar panggilan", () => {
    expect(randomToken()).not.toBe(randomToken());
  });
});
