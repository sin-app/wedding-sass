import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { GuestManager } from "@/components/dashboard/guest-manager";
import type { Guest, Invitation } from "@/lib/types";

export default async function GuestsPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, subscription } = await requireUser();
  const supabase = createClient();

  const { data: inv } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();
  if (!inv) notFound();
  const invitation = inv as Invitation;

  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("created_at", { ascending: false });

  const limits = getLimits(subscription?.plan ?? "free");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-semibold">Tamu — {invitation.title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Tambah tamu lalu bagikan link personal via WhatsApp.
      </p>
      <GuestManager
        invitationId={invitation.id}
        slug={invitation.slug}
        siteUrl={siteUrl}
        guests={(guests as Guest[]) ?? []}
        maxGuests={limits.maxGuests}
      />
    </div>
  );
}
