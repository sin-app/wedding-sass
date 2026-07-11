"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionData } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { defaultInvitationData } from "@/config/defaults";
import { slugify, randomToken } from "@/lib/utils";
import type { InvitationData, TemplateRow } from "@/lib/types";

export type Result = { ok: boolean; message?: string; id?: string };

export async function createInvitation(templateSlug: string): Promise<Result> {
  const session = await getSessionData();
  if (!session?.user) return { ok: false, message: "Tidak diizinkan." };

  const supabase = await createClient();
  const plan = session.subscription?.plan ?? "free";
  const limits = getLimits(plan);

  const { count } = await supabase
    .from("invitations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", session.user.id);

  if ((count ?? 0) >= limits.maxInvitations)
    return {
      ok: false,
      message: `Batas paket tercapai (${limits.maxInvitations} undangan). Upgrade untuk menambah.`,
    };

  const { data: template } = await supabase
    .from("templates")
    .select("*")
    .eq("slug", templateSlug)
    .single();

  const tpl = template as TemplateRow | null;
  if (!tpl || !tpl.is_active)
    return { ok: false, message: "Template tidak tersedia." };
  if (tpl.premium && !limits.allTemplates)
    return { ok: false, message: "Template ini khusus paket Premium." };

  const base = slugify(
    `${defaultInvitationData.couple.groom.shortName}-${defaultInvitationData.couple.bride.shortName}`
  );
  const slug = `${base}-${randomToken(5)}`;

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      user_id: session.user.id,
      template_id: tpl.id,
      slug,
      title: "Undangan Baru",
      status: "draft",
      data: defaultInvitationData,
    })
    .select("id")
    .single();

  if (error) return { ok: false, message: error.message };
  redirect(`/dashboard/${data.id}/edit`);
}

export async function saveInvitation(
  id: string,
  payload: { title: string; slug: string; data: InvitationData }
): Promise<Result> {
  const session = await getSessionData();
  if (!session?.user) return { ok: false, message: "Tidak diizinkan." };

  const supabase = await createClient();
  const cleanSlug = slugify(payload.slug) || `undangan-${randomToken(5)}`;

  const { error } = await supabase
    .from("invitations")
    .update({ title: payload.title, slug: cleanSlug, data: payload.data })
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    if (error.code === "23505")
      return { ok: false, message: "Slug sudah dipakai, ganti yang lain." };
    return { ok: false, message: error.message };
  }
  revalidatePath("/dashboard");
  return { ok: true, message: "Tersimpan." };
}

export async function setPublishStatus(
  id: string,
  publish: boolean
): Promise<Result> {
  const session = await getSessionData();
  if (!session?.user) return { ok: false, message: "Tidak diizinkan." };

  if (publish) {
    const status = session.subscription?.status;
    // free plan boleh publish 1 undangan; batas jumlah sudah dijaga saat create
    if (status !== "active")
      return { ok: false, message: "Langganan tidak aktif." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("invitations")
    .update({ status: publish ? "published" : "draft" })
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard");
  return { ok: true, message: publish ? "Undangan terbit." : "Undangan disembunyikan." };
}

export async function deleteInvitation(id: string): Promise<Result> {
  const session = await getSessionData();
  if (!session?.user) return { ok: false, message: "Tidak diizinkan." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) return { ok: false, message: error.message };
  redirect("/dashboard");
}
