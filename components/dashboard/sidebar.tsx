"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  Heart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";
import { Badge } from "@/components/ui/badge";

const nav = [
  { href: "/dashboard", label: "Undangan", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Langganan", icon: CreditCard },
];

export function Sidebar({
  isAdmin,
  planLabel,
  userName,
}: {
  isAdmin: boolean;
  planLabel: string;
  userName: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-card md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 p-5 font-semibold">
        <Heart className="h-5 w-5 text-primary" /> WeddingKu
      </div>

      <nav className="flex gap-1 px-3 md:flex-col">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        )}
      </nav>

      <div className="mt-auto hidden border-t border-border p-4 md:block">
        <p className="text-sm font-medium">{userName}</p>
        <Badge variant={planLabel === "Premium" ? "default" : "secondary"} className="mt-1">
          {planLabel}
        </Badge>
        <form action={logout} className="mt-3">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
