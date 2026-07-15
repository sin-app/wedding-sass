"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { TemplateCard } from "@/components/landing/template-card";
import { cn } from "@/lib/utils";
import type { TemplateMeta } from "@/config/templates";

type Filter = "all" | "premium";

export function TemplateShowcase({ metas }: { metas: TemplateMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "premium" ? metas.filter((m) => m.premium) : metas;
  const premiumCount = metas.filter((m) => m.premium).length;

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
          {(
            [
              { key: "all", label: "Semua" },
              { key: "premium", label: `Premium · ${premiumCount}` },
            ] as const
          ).map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {tab.key === "premium" && <Sparkles className="h-3.5 w-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((t) => (
          <TemplateCard key={t.slug} meta={t} />
        ))}
      </div>
    </div>
  );
}
