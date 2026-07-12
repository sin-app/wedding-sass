import { Check } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PLANS } from "@/config/plans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpgradeButton } from "@/components/dashboard/upgrade-button";

export default async function BillingPage() {
  const { subscription } = await requireUser();
  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "active";
  const premium = PLANS.premium;

  const statusBadge =
    status === "active" ? "success" : status === "pending" ? "warning" : "destructive";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">Langganan</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Kelola paket langgananmu.
      </p>

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <div>
            <p className="text-sm text-muted-foreground">Paket saat ini</p>
            <p className="text-xl font-semibold">{PLANS[plan].label}</p>
          </div>
          <Badge variant={statusBadge}>{status}</Badge>
        </CardContent>
      </Card>

      {plan === "free" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">
                Upgrade ke Premium
              </h2>
              <p className="text-lg font-bold">
                {premium.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /event
                </span>
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary" /> {premium.maxInvitations}{" "}
                undangan aktif
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary" /> Maks {premium.maxGuests}{" "}
                tamu per undangan
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary" /> Semua template
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary" /> Tanpa watermark
              </li>
            </ul>

            <div className="mt-6 rounded-lg bg-secondary/60 p-4 text-sm">
              <p className="font-medium">Cara upgrade (aktivasi manual):</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>
                  Transfer {premium.price} ke <b>SeaBank 901526904190</b> a.n.
                  Muhamad Akbar Sinyo.
                </li>
                <li>Klik tombol di bawah untuk meminta aktivasi.</li>
                <li>Admin memverifikasi & mengaktifkan paket Premium Anda.</li>
              </ol>
            </div>

            <div className="mt-4">
              {status === "pending" ? (
                <Badge variant="warning">
                  Menunggu verifikasi admin...
                </Badge>
              ) : (
                <UpgradeButton />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {plan === "premium" && (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Terima kasih! Anda menikmati semua fitur Premium.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
