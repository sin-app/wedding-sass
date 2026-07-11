"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminDeleteInvitation } from "@/app/admin/actions";

export function InvitationRow({
  id,
  title,
  slug,
  status,
  owner,
  views,
}: {
  id: string;
  title: string;
  slug: string;
  status: string;
  owner: string;
  views: number;
}) {
  const [pending, start] = useTransition();

  return (
    <tr className="border-t border-border">
      <td className="p-3">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">/{slug}</p>
      </td>
      <td className="p-3 text-sm text-muted-foreground">{owner}</td>
      <td className="p-3">
        <Badge variant={status === "published" ? "success" : "secondary"}>
          {status}
        </Badge>
      </td>
      <td className="p-3">{views}</td>
      <td className="p-3">
        <div className="flex gap-1">
          {status === "published" && (
            <Link href={`/i/${slug}`} target="_blank">
              <Button size="sm" variant="ghost">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <Button
            size="sm"
            variant="ghost"
            disabled={pending}
            onClick={() => {
              if (confirm("Hapus undangan ini?"))
                start(async () => void (await adminDeleteInvitation(id)));
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
