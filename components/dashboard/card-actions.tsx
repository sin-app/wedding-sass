"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/i/${slug}`;
  const item =
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10";

  useEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 232;
    const openUp = r.bottom + menuH > window.innerHeight && r.top - menuH > 0;
    setPos({
      top: openUp ? r.top - menuH - 8 : r.bottom + 8,
      right: window.innerWidth - r.right,
    });
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <Link href={`/dashboard/${id}/edit`}>
        <Button size="sm">
          <Pencil className="h-4 w-4" /> Edit
        </Button>
      </Link>

      <Button
        ref={btnRef}
        size="sm"
        variant="outline"
        aria-label="Lainnya"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed z-50 w-52 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 p-1 shadow-xl backdrop-blur"
              style={{ top: pos?.top ?? 0, right: pos?.right ?? 0 }}
            >
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
              <div className="px-1 py-1" onClick={() => setOpen(false)}>
                <CopyLinkButton url={shareUrl} className="w-full justify-start" />
              </div>
              <div className="px-1 py-1" onClick={() => setOpen(false)}>
                <PublishToggle id={id} published={published} className="w-full justify-start" />
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
