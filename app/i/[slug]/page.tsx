import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { TemplateRenderer } from "@/templates";
import { submitRsvp, submitWish } from "./actions";
import type { Invitation, TemplateRow } from "@/lib/types";

async function fetchInvitation(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Invitation | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = await fetchInvitation(slug);
  if (!inv) return { title: "Undangan tidak ditemukan" };
  const g = inv.data?.couple?.groom?.shortName ?? "Mempelai";
  const b = inv.data?.couple?.bride?.shortName ?? "Pria";
  const title = `Undangan Pernikahan ${g} & ${b}`;
  return {
    title,
    description: inv.data?.greeting ?? "",
    openGraph: {
      title,
      description: inv.data?.greeting ?? "",
      images: inv.data?.hero?.background ? [inv.data.hero.background] : [],
      type: "website",
    },
  };
}

export default async function PublicInvitation({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string; g?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const invitation = await fetchInvitation(slug);
  if (!invitation) notFound();

  const supabase = await createClient();

  // Tentukan nama tamu (dari token guest atau query ?to)
  let guestName = "Tamu Undangan";
  if (sp.to) {
    try {
      guestName = decodeURIComponent(sp.to);
    } catch {
      guestName = "Tamu Undangan";
    }
  }

  if (sp.g) {
    const { data: guest } = await supabase
      .from("guests")
      .select("id, name")
      .eq("invitation_id", invitation.id)
      .eq("token", sp.g)
      .single();
    if (guest) {
      guestName = guest.name;
      // tandai sudah dibuka (butuh privilege → admin client)
      try {
        const admin = createAdminClient();
        await admin.from("guests").update({ opened: true }).eq("id", guest.id);
      } catch {}
    }
  }

  // Hitung view + ambil ucapan
  const [{ data: wishes }] = await Promise.all([
    supabase
      .from("wishes")
      .select("name, message")
      .eq("invitation_id", invitation.id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.rpc("increment_views", { inv_id: invitation.id }),
  ]);

  const { data: tpl } = await supabase
    .from("templates")
    .select("slug")
    .eq("id", invitation.template_id)
    .single();
  const templateSlug = (tpl as Pick<TemplateRow, "slug"> | null)?.slug ?? "classic";

  // Watermark tampil untuk pemilik paket Free (butuh admin client utk baca subscription lintas user)
  let watermark = true;
  try {
    const admin = createAdminClient();
    const { data: sub } = await admin
      .from("subscriptions")
      .select("plan, status")
      .eq("user_id", invitation.user_id)
      .single();
    watermark = !(sub?.plan === "premium" && sub?.status === "active");
  } catch {}

  return (
    <TemplateRenderer
      slug={templateSlug}
      data={invitation.data}
      guestName={guestName}
      watermark={watermark}
      submitRsvp={submitRsvp.bind(null, invitation.id)}
      submitWish={submitWish.bind(null, invitation.id)}
      initialWishes={(wishes as { name: string; message: string }[]) ?? []}
    />
  );
}
