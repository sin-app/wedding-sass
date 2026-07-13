"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <h2 className="text-xl font-semibold text-slate-100">Terjadi kendala</h2>
      <p className="mt-2 text-sm text-slate-400">
        Halaman tidak dapat dimuat. Coba lagi sebentar.
      </p>
      <div className="mt-4 flex justify-center gap-3">
        <Button onClick={reset}>Coba lagi</Button>
        <Link href="/dashboard">
          <Button variant="outline">Ke Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
