import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getUser();
  if (user) {
    const sp = await searchParams;
    const next = sp?.next;
    redirect(next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard");
  }
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
