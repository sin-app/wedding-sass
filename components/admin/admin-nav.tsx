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
    <aside className="glass relative z-10 flex w-full shrink-0 flex-col border-b border-white/10 bg-white/5 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 p-5 font-semibold tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_16px_rgba(34,211,238,0.45)]">
          <Shield className="h-4 w-4 text-slate-950" />
        </span>
        <span className="gradient-text">Admin</span> Panel
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
                  ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-white/10 p-4 md:mt-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" /> Ke Dashboard
        </Link>
        <form action={logout}>
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
