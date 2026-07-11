import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { TemplatePicker } from "@/components/dashboard/template-picker";

export default async function NewInvitationPage() {
  const { subscription } = await requireUser();
  const limits = getLimits(subscription?.plan ?? "free");

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-semibold">Pilih Template</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {limits.allTemplates
          ? "Semua template tersedia untuk paketmu."
          : "Paket Free hanya bisa memakai template Classic. Upgrade untuk membuka semua."}
      </p>
      <TemplatePicker allTemplates={limits.allTemplates} />
    </div>
  );
}
