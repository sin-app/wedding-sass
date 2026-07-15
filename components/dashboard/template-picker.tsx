"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { createInvitation } from "@/app/dashboard/actions";
import { TEMPLATE_METAS } from "@/config/templates";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TemplatePicker({ allTemplates }: { allTemplates: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const choose = (slug: string) => {
    setSelected(slug);
    setError(null);
    startTransition(async () => {
      const res = await createInvitation(slug);
      if (res && !res.ok) setError(res.message || "Gagal membuat undangan.");
    });
  };

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPLATE_METAS.map((t) => {
          const locked = t.premium && !allTemplates;
          return (
            <Card key={t.slug} className="overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src={t.preview}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                {t.premium && (
                  <Badge className="absolute right-2 top-2" variant="warning">
                    Premium
                  </Badge>
                )}
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium">{t.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {t.description}
                </p>
                <Button
                  className="mt-4 w-full"
                  variant={locked ? "outline" : "default"}
                  disabled={locked || pending}
                  onClick={() => choose(t.slug)}
                >
                  {locked ? (
                    <>
                      <Lock className="h-4 w-4" /> Khusus Premium
                    </>
                  ) : pending && selected === t.slug ? (
                    "Membuat..."
                  ) : (
                    "Gunakan"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
