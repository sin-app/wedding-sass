"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Shield, ShieldOff, Crown, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setUserRole, setSubscription } from "@/app/admin/actions";
import type { Plan, Role, SubStatus } from "@/lib/types";

export function UserRow({
  id,
  email,
  name,
  role,
  plan,
  status,
}: {
  id: string;
  email: string;
  name: string;
  role: Role;
  plan: Plan;
  status: SubStatus;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const statusVariant =
    status === "active" ? "success" : status === "pending" ? "warning" : "destructive";

  return (
    <tr className="border-t border-border">
      <td className="p-3">
        <p className="font-medium">{name || "-"}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </td>
      <td className="p-3">
        <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge>
      </td>
      <td className="p-3">
        <Badge variant={plan === "premium" ? "default" : "secondary"}>{plan}</Badge>{" "}
        <Badge variant={statusVariant}>{status}</Badge>
      </td>
      <td className="p-3">
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() =>
              start(async () => {
                await setSubscription(id, "premium", "active");
                router.refresh();
              })
            }
          >
            <Crown className="h-4 w-4" /> Premium
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() =>
              start(async () => {
                await setSubscription(id, "free", "active");
                router.refresh();
              })
            }
          >
            <Ban className="h-4 w-4" /> Free
          </Button>
          {role === "admin" ? (
            <Button
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() => start(async () => void (await setUserRole(id, "user")))}
            >
              <ShieldOff className="h-4 w-4" /> Cabut Admin
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() => start(async () => void (await setUserRole(id, "admin")))}
            >
              <Shield className="h-4 w-4" /> Jadikan Admin
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
