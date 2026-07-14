"use client";

import { BaseTemplate, type RenderProps } from "@/templates/base-template";
import { getTheme } from "@/templates/theme";

type Props = Omit<RenderProps, "theme">;

export function ClassicTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("classic")} />;
}
export function FloralTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("floral")} />;
}
export function MinimalistTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("minimalist")} />;
}
export function LuxuryTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("luxury")} />;
}
export function GardenTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("garden")} />;
}
export function BohoTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("boho")} />;
}
export function VintageTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("vintage")} />;
}
export function MeadowTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("meadow")} />;
}

export function MidnightTemplate(p: Props) {
  return <BaseTemplate {...p} theme={getTheme("midnight")} />;
}

export const TEMPLATE_REGISTRY: Record<string, (p: Props) => JSX.Element> = {
  classic: ClassicTemplate,
  floral: FloralTemplate,
  minimalist: MinimalistTemplate,
  luxury: LuxuryTemplate,
  garden: GardenTemplate,
  boho: BohoTemplate,
  vintage: VintageTemplate,
  meadow: MeadowTemplate,
  midnight: MidnightTemplate,
};

export function TemplateRenderer({
  slug,
  ...props
}: Props & { slug: string }) {
  const Cmp = TEMPLATE_REGISTRY[slug] ?? ClassicTemplate;
  return <Cmp {...props} slug={slug} />;
}
