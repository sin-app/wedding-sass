"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { Hexagon } from "lucide-react";
import { register, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_24px_rgba(34,211,238,0.4)] transition hover:shadow-[0_0_36px_rgba(139,92,246,0.5)]"
      disabled={pending}
    >
      {pending ? "Memproses..." : "Daftar"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, action] = useFormState<AuthState, FormData>(register, null);

  return (
    <div className="theme-future relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6 text-slate-100">
      <div className="future-grid" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="relative w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_18px_rgba(34,211,238,0.5)]">
            <Hexagon className="h-4 w-4 text-slate-950" />
          </span>
          <span className="font-script text-2xl">Wedding<span className="gradient-text">Ku</span></span>
        </Link>
        <div className="glass rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          <h1 className="text-xl font-semibold">Buat Akun</h1>
          <p className="mb-4 text-sm text-slate-300">
            Gratis, mulai buat undangan pertamamu.
          </p>
          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="text-slate-300">
                Nama Lengkap
              </Label>
              <Input
                id="full_name"
                name="full_name"
                required
                className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={6}
                required
                className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            {state?.error && (
              <p className="text-sm text-rose-400">{state.error}</p>
            )}
            <Submit />
          </form>
          <p className="mt-4 text-center text-sm text-slate-300">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-cyan-300 hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
