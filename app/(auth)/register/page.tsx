import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");
  return <RegisterForm />;
}
