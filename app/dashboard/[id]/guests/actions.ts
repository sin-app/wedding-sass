"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionData } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { randomToken } from "@/lib/utils";

export type Result = { ok: boolean; message?: string };

async function assertOwner(invitationId: string) {
  const session = await getSessionData();
  if (!session?.user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("invitations")
    .select("id, user_id")
    .eq("id", invitationId)
    .single();
  if (!data || (data.user_id !== session.user.id && session.profile?.role !== "admin"))
    return null;
  return { session, supabase };
}

export async function addGuests(
  invitationId: string,
  names: string[],
  group?: string
): Promise<Result> {
  const ctx = await assertOwner(invitationId);
  if (!ctx) return { ok: false, message: "Tidak diizinkan." };

  const clean = names
    .map((n) => n.trim())
    .filter(Boolean)
    .slice(0, 2000);
  if (clean.length === 0) return { ok: false, message: "Tidak ada nama valid." };

  const limits = getLimits(ctx.session.subscription?.plan ?? "free");
  const { count } = await ctx.supabase
    .from("guests")
    .select("*", { count: "exact", head: true })
    .eq("invitation_id", invitationId);

  if ((count ?? 0) + clean.length > limits.maxGuests)
    return {
      ok: false,
      message: `Melebihi batas paket (${limits.maxGuests} tamu).`,
    };

  const rows = clean.map((name) => ({
    invitation_id: invitationId,
    name,
    group_name: group?.trim() || null,
    token: randomToken(8),
  }));

  const { error } = await ctx.supabase.from("guests").insert(rows);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/${invitationId}/guests`);
  return { ok: true, message: `${rows.length} tamu ditambahkan.` };
}

export async function deleteGuest(
  invitationId: string,
  guestId: string
): Promise<Result> {
  const ctx = await assertOwner(invitationId);
  if (!ctx) return { ok: false, message: "Tidak diizinkan." };

  const { error } = await ctx.supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
    .eq("invitation_id", invitationId);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/${invitationId}/guests`);
  return { ok: true };
}

export async function clearGuests(invitationId: string): Promise<Result> {
  const ctx = await assertOwner(invitationId);
  if (!ctx) return { ok: false, message: "Tidak diizinkan." };

  const { error } = await ctx.supabase
    .from("guests")
    .delete()
    .eq("invitation_id", invitationId);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/${invitationId}/guests`);
  return { ok: true };
}
