"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LayoutTemplate,
  Mail,
  Shield,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";

const nav = [
  { href: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/admin/users", label: "Pengguna", icon: Users },
  { href: "/admin/templates", label: "Template", icon: LayoutTemplate },
  { href: "/admin/invitations", label: "Undangan", icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-card md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 p-5 font-semibold">
        <Shield className="h-5 w-5 text-primary" /> Admin Panel
      </div>
      <nav className="flex gap-1 px-3 md:flex-col">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
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
      </nav>
      <div className="mt-auto hidden space-y-2 border-t border-border p-4 md:block">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Ke Dashboard
        </Link>
        <form action={logout}>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
