import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TemplateMeta } from "@/config/templates";

export function TemplateCard({ meta }: { meta: TemplateMeta }) {
  const previewHref = `/preview/${meta.slug}`;

  return (
    <Link href={previewHref} className="group block">
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={meta.preview}
            alt={meta.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {meta.premium && (
            <Badge
              variant="warning"
              className="absolute right-2 top-2 border-amber-300/40 bg-amber-400/20 text-amber-200 backdrop-blur"
            >
              Premium
            </Badge>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 transition group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-slate-950/70 text-white backdrop-blur">
              <ArrowRight className="h-4 w-4" />
            </span>
          </span>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-medium text-white">{meta.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{meta.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:underline">
            <ArrowRight className="h-3.5 w-3.5" /> Pratinjau
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
