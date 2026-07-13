import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://sin-weddingku.vercel.app";
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const res = await fetch(
        `${url}/rest/v1/invitations?select=slug&status=eq.published`,
        {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
          next: { revalidate: 600 },
        }
      );
      if (res.ok) {
        const rows = (await res.json()) as Array<{ slug: string }>;
        for (const r of rows) {
          entries.push({
            url: `${base}/i/${r.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch {
    // keep homepage entry
  }
  return entries;
}
