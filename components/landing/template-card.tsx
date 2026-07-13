"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TemplateMeta } from "@/config/templates";

export function TemplateCard({
  meta,
  demo,
}: {
  meta: TemplateMeta;
  demo?: string;
}) {
  const [open, setOpen] = useState(false);
  const demoUrl = demo ? `/i/${demo}` : undefined;

  return (
    <>
      <Card className="group overflow-hidden border-white/10 bg-white/5 backdrop-blur transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
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
          {demo && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 transition group-hover:opacity-100"
            >
              <span className="rounded-full border border-white/30 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                Lihat Contoh <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </span>
            </button>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-medium text-white">{meta.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{meta.description}</p>
          {demo ? (
            <button
              onClick={() => setOpen(true)}
              className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 hover:underline"
            >
              Lihat Contoh <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="mt-3 inline-block text-sm text-slate-500">
              Segera hadir
            </span>
          )}
        </CardContent>
      </Card>

      {open && demoUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-medium text-white">{meta.name}</span>
              <div className="flex items-center gap-3">
                <Link
                  href={demoUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" /> Buka tab baru
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Tutup"
                  className="rounded-full p-1 text-slate-300 hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <iframe
              src={demoUrl}
              title={`Pratinjau ${meta.name}`}
              className="h-[calc(100%-49px)] w-full bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
