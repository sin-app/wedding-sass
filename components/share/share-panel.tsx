"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SharePanel({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const wa = `https://wa.me/?text=${encodeURIComponent(
    "Lihat undangan pernikahan kami: " + url
  )}`;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Tersalin" : "Salin Link"}
        </Button>
        <a href={wa} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </Button>
        </a>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="rounded-lg border border-white/10 bg-white p-1.5">
          <QRCodeSVG
            value={url}
            size={112}
            bgColor="#ffffff"
            fgColor="#0f172a"
            level="M"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Pindai QR ini untuk membuka undangan.
        </p>
      </div>
    </div>
  );
}
