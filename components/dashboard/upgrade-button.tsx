"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { requestUpgrade } from "@/app/dashboard/billing/actions";

export function UpgradeButton() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div>
      <Button
        onClick={() => start(async () => setMsg((await requestUpgrade()).message || null))}
        disabled={pending}
      >
        {pending ? "Mengirim..." : "Saya sudah bayar — Minta Aktivasi"}
      </Button>
      {msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
    </div>
  );
}
