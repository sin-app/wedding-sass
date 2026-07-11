"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleTemplate } from "@/app/admin/actions";

export function TemplateRow({
  id,
  name,
  slug,
  isActive,
  premium,
}: {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  premium: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <tr className="border-t border-border">
      <td className="p-3">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{slug}</p>
      </td>
      <td className="p-3">
        <Badge variant={isActive ? "success" : "secondary"}>
          {isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      </td>
      <td className="p-3">
        <Badge variant={premium ? "warning" : "secondary"}>
          {premium ? "Premium" : "Free"}
        </Badge>
      </td>
      <td className="p-3">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() =>
              start(async () => void (await toggleTemplate(id, "is_active", !isActive)))
            }
          >
            {isActive ? "Nonaktifkan" : "Aktifkan"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() =>
              start(async () => void (await toggleTemplate(id, "premium", !premium)))
            }
          >
            {premium ? "Jadikan Free" : "Jadikan Premium"}
          </Button>
        </div>
      </td>
    </tr>
  );
}
