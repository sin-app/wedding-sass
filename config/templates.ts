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
  {
    slug: "garden",
    name: "Garden Rose",
    description: "Sentuhan sage & blush dengan rangkaian mawar taman yang lembut.",
    premium: true,
    accent: "#7c8a6b",
    preview:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "boho",
    name: "Bohemian Bloom",
    description: "Terakota hangat & krem dengan bunga bohemian yang santai.",
    premium: true,
    accent: "#c2724e",
    preview:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "vintage",
    name: "Vintage Bloom",
    description: "Dusty blue & rose gold bernuansa klasik yang penuh kenangan.",
    premium: true,
    accent: "#7d8ca3",
    preview:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "meadow",
    name: "Spring Meadow",
    description: "Lavender & mint segar dengan bunga padang rumput yang cerah.",
    premium: true,
    accent: "#9b8fc4",
    preview:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "midnight",
    name: "Midnight Romance",
    description: "Hitam elegan dengan aksen emas & bunga floral yang romantis.",
    premium: true,
    accent: "#d4af37",
    preview:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "javanese",
    name: "Tradisional Jawa",
    description: "Ivory & indigo dengan ornamen batik kawung, gunungan, & tumpal beraksen emas.",
    premium: true,
    accent: "#c8a24a",
    preview:
      "https://images.pexels.com/photos/37831526/pexels-photo-37831526.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function getTemplateMeta(slug: string) {
  return TEMPLATE_METAS.find((t) => t.slug === slug);
}
