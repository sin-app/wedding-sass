"use server";

import { revalidatePath } from "next/cache";
import { getSessionData } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type Result = { ok: boolean; message?: string };

export async function requestUpgrade(): Promise<Result> {
  const session = await getSessionData();
  if (!session?.user) return { ok: false, message: "Tidak diizinkan." };

  const admin = createAdminClient();
  const { error } = await admin
    .from("subscriptions")
    .upsert(
      {
        user_id: session.user.id,
        status: "pending",
        note: `Permintaan upgrade Premium pada ${new Date().toISOString()}`,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/billing");
  return {
    ok: true,
    message: "Permintaan dikirim. Admin akan memverifikasi pembayaran Anda.",
  };
}
