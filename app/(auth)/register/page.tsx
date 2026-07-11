"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { Heart } from "lucide-react";
import { register, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Memproses..." : "Daftar"}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, action] = useFormState<AuthState, FormData>(register, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2 font-semibold"
        >
          <Heart className="h-5 w-5 text-primary" /> WeddingKu
        </Link>
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-xl font-semibold">Buat Akun</h1>
            <p className="mb-4 text-sm text-muted-foreground">
              Gratis, mulai buat undangan pertamamu.
            </p>
            <form action={action} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <Input id="full_name" name="full_name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                />
              </div>
              {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              <Submit />
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
