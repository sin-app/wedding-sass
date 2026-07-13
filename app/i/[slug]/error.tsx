"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvitationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center text-slate-100">
      <h1 className="text-2xl font-semibold">Undangan tidak dapat dimuat</h1>
      <p className="max-w-md text-sm text-slate-400">
        Terjadi kendala saat menampilkan undangan ini. Coba lagi sebentar.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Coba lagi</Button>
        <Link href="/">
          <Button variant="outline">Ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
