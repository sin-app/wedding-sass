import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { Editor } from "@/components/editor/editor";
import type { Invitation, TemplateRow } from "@/lib/types";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, subscription } = await requireUser();
  const supabase = await createClient();

  const { data: inv } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!inv) notFound();
  const invitation = inv as Invitation;

  const { data: tpl } = await supabase
    .from("templates")
    .select("*")
    .eq("id", invitation.template_id)
    .single();

  const templateSlug = (tpl as TemplateRow | null)?.slug ?? "classic";
  const limits = getLimits(subscription?.plan ?? "free");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <Editor
      invitation={invitation}
      templateSlug={templateSlug}
      siteUrl={siteUrl}
      watermark={!limits.removeWatermark}
    />
  );
}
