"use server";

import { revalidatePath } from "next/cache";
import { getSessionData } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Plan, Role, SubStatus } from "@/lib/types";

export type Result = { ok: boolean; message?: string };

async function ensureAdmin() {
  const session = await getSessionData();
  if (session?.profile?.role !== "admin") return null;
  return createAdminClient();
}

export async function setUserRole(userId: string, role: Role): Promise<Result> {
  const admin = await ensureAdmin();
  if (!admin) return { ok: false, message: "Tidak diizinkan." };
  const { error } = await admin.from("profiles").update({ role }).eq("id", userId);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function setSubscription(
  userId: string,
  plan: Plan,
  status: SubStatus
): Promise<Result> {
  const admin = await ensureAdmin();
  if (!admin) return { ok: false, message: "Tidak diizinkan." };

  const now = new Date();
  const expires = new Date(now);
  expires.setFullYear(expires.getFullYear() + 1);

  const { error } = await admin
    .from("subscriptions")
    .update({
      plan,
      status,
      starts_at: plan === "premium" ? now.toISOString() : null,
      expires_at: plan === "premium" ? expires.toISOString() : null,
      updated_at: now.toISOString(),
    })
    .eq("user_id", userId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function toggleTemplate(
  id: string,
  field: "is_active" | "premium",
  value: boolean
): Promise<Result> {
  const admin = await ensureAdmin();
  if (!admin) return { ok: false, message: "Tidak diizinkan." };
  const { error } = await admin
    .from("templates")
    .update({ [field]: value })
    .eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/templates");
  return { ok: true };
}

export async function adminDeleteInvitation(id: string): Promise<Result> {
  const admin = await ensureAdmin();
  if (!admin) return { ok: false, message: "Tidak diizinkan." };
  const { error } = await admin.from("invitations").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/invitations");
  return { ok: true };
}
