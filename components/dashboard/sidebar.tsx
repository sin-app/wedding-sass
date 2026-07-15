"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  Heart,
  LogOut,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <aside className="glass relative z-10 flex w-full shrink-0 flex-col border-b border-white/10 bg-white/5 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 p-3 font-semibold tracking-tight md:p-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_16px_rgba(34,211,238,0.45)]">
          <Heart className="h-4 w-4 text-slate-950" />
        </span>
        <span className="font-script text-2xl">Wedding<span className="gradient-text">Ku</span></span>
      </div>

      <Link href="/dashboard/new" className="px-3 md:px-3">
        <Button className="w-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_24px_rgba(34,211,238,0.35)]">
          <Plus className="h-4 w-4" /> Buat Undangan
        </Button>
      </Link>

      <nav className="flex gap-1 px-2 md:flex-col md:px-3">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:flex-none md:justify-start",
                active
                  ? "text-cyan-200"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              )}
            >
              {active && (
                <motion.span
                  layoutId="navActive"
                  className="absolute inset-0 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10 hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            title="Admin"
            className={cn(
              "relative flex flex-1 items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:flex-none md:justify-start",
              pathname.startsWith("/admin")
                ? "text-cyan-200"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
            )}
          >
            {pathname.startsWith("/admin") && (
              <motion.span
                layoutId="navActive"
                className="absolute inset-0 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/30"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Shield className="relative z-10 h-4 w-4" />
            <span className="relative z-10 hidden md:inline">Admin</span>
          </Link>
        )}
      </nav>

      <div className="border-t border-white/10 p-4 md:mt-auto">
        <p className="text-sm font-medium text-slate-200">{userName}</p>
        <Badge
          variant={planLabel === "Premium" ? "default" : "secondary"}
          className="mt-1"
        >
          {planLabel}
        </Badge>
        <form action={logout} className="mt-3">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
