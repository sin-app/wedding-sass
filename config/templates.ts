export interface TemplateMeta {
  slug: string;
  name: string;
  description: string;
  premium: boolean;
  accent: string;
  preview: string;
}

export const TEMPLATE_METAS: TemplateMeta[] = [
  {
    slug: "classic",
    name: "Classic Elegant",
    description: "Coklat hangat, tipografi serif & script yang timeless.",
    premium: false,
    accent: "#8a5a3b",
    preview:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "floral",
    name: "Floral Romance",
    description: "Nuansa pink lembut dengan sentuhan bunga yang romantis.",
    premium: true,
    accent: "#c96a86",
    preview:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "minimalist",
    name: "Modern Minimalist",
    description: "Bersih, monokrom, dan tipografi tegas untuk kesan modern.",
    premium: true,
    accent: "#1f2937",
    preview:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "luxury",
    name: "Luxury Gold",
    description: "Latar gelap dengan aksen emas yang mewah dan eksklusif.",
    premium: true,
    accent: "#c9a227",
    preview:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
  },
];

export function getTemplateMeta(slug: string) {
  return TEMPLATE_METAS.find((t) => t.slug === slug);
}
