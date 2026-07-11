import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Subscription } from "@/lib/types";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSessionData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("subscriptions").select("*").eq("user_id", user.id).single(),
  ]);

  return {
    user,
    profile: profile as Profile | null,
    subscription: subscription as Subscription | null,
  };
}

export async function requireUser() {
  const data = await getSessionData();
  if (!data?.user) redirect("/login");
  return data;
}

export async function requireAdmin() {
  const data = await getSessionData();
  if (!data?.user) redirect("/login");
  if (data.profile?.role !== "admin") redirect("/dashboard");
  return data;
}
