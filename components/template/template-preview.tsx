"use client";

import { TemplateRenderer } from "@/templates";
import { defaultInvitationData } from "@/config/defaults";

export function TemplatePreview({ slug }: { slug: string }) {
  return (
    <TemplateRenderer
      slug={slug}
      data={defaultInvitationData}
      guestName="Tamu Undangan"
      preview
      watermark={false}
    />
  );
}
