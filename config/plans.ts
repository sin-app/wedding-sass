import type { Plan } from "@/lib/types";

export interface PlanLimits {
  label: string;
  maxInvitations: number;
  maxGuests: number;
  maxPhotos: number;
  allTemplates: boolean;
  removeWatermark: boolean;
  price: string;
}

export const PLANS: Record<Plan, PlanLimits> = {
  free: {
    label: "Free",
    maxInvitations: 1,
    maxGuests: 50,
    maxPhotos: 3,
    allTemplates: false,
    removeWatermark: false,
    price: "Rp0",
  },
  premium: {
    label: "Premium",
    maxInvitations: 10,
    maxGuests: 1000,
    maxPhotos: 20,
    allTemplates: true,
    removeWatermark: true,
    price: "Rp149.000",
  },
};

export function getLimits(plan: Plan): PlanLimits {
  return PLANS[plan] ?? PLANS.free;
}
