import { describe, expect, it } from "vitest";
import { getLimits, PLANS } from "./plans";

describe("getLimits", () => {
  it("free = 1 undangan, 50 tamu, tanpa template lain", () => {
    const f = getLimits("free");
    expect(f.maxInvitations).toBe(1);
    expect(f.maxGuests).toBe(50);
    expect(f.allTemplates).toBe(false);
    expect(f.removeWatermark).toBe(false);
  });

  it("premium = 10 undangan, 1000 tamu, semua template", () => {
    const p = getLimits("premium");
    expect(p.maxInvitations).toBe(10);
    expect(p.maxGuests).toBe(1000);
    expect(p.allTemplates).toBe(true);
    expect(p.removeWatermark).toBe(true);
  });

  it("fallback ke free untuk plan tak dikenal", () => {
    // @ts-expect-error pengujian nilai ilegal
    expect(getLimits("whatever")).toBe(PLANS.free);
  });
});
