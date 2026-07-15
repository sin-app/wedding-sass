"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreVertical, Users, BarChart3, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyLinkButton } from "@/components/copy-link-button";
import { PublishToggle } from "@/components/dashboard/publish-toggle";

export function CardActions({
  id,
  slug,
  published,
}: {
  id: string;
  slug: string;
  published: boolean;
}) {
  const [open, setOpen] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/i/${slug}`;
  const item =
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10";

  return (
    <div className="flex items-center gap-2">
      <Link href={`/dashboard/${id}/edit`}>
        <Button size="sm">
          <Pencil className="h-4 w-4" /> Edit
        </Button>
      </Link>

      <div className="relative">
        <Button
          size="sm"
          variant="outline"
          aria-label="Lainnya"
          onClick={() => setOpen((o) => !o)}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 p-1 shadow-xl backdrop-blur">
              <Link
                href={`/dashboard/${id}/guests`}
                className={item}
                onClick={() => setOpen(false)}
              >
                <Users className="h-4 w-4" /> Kelola Tamu
              </Link>
              <Link
                href={`/dashboard/${id}/rsvp`}
                className={item}
                onClick={() => setOpen(false)}
              >
                <BarChart3 className="h-4 w-4" /> Rekap RSVP
              </Link>
              {published && (
                <Link
                  href={`/i/${slug}`}
                  target="_blank"
                  className={item}
                  onClick={() => setOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" /> Lihat Undangan
                </Link>
              )}
              <div className="my-1 h-px bg-white/10" />
              <div className="px-1 py-1">
                <CopyLinkButton url={shareUrl} className="w-full justify-start" />
              </div>
              <div className="px-1 py-1">
                <PublishToggle id={id} published={published} className="w-full justify-start" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
