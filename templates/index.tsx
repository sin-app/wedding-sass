"use client";

import { BaseTemplate, type RenderProps } from "@/templates/base-template";
import { getTheme } from "@/templates/theme";

type Props = Omit<RenderProps, "theme">;

// Satu renderer untuk semua template: tema diambil dari slug via getTheme(),
// dan BaseTemplate sendiri bercabang pada asTemplateSlug(slug) untuk ornament/frame.
// Menghindari registry per-template yang rawan terlupakan (mis. bug midnight).
export function TemplateRenderer({
  slug,
  ...props
}: Props & { slug: string }) {
  return <BaseTemplate {...props} slug={slug} theme={getTheme(slug)} />;
}
