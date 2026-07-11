import { requireUser } from "@/lib/auth";
import { getLimits } from "@/config/plans";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, subscription } = await requireUser();
  const plan = subscription?.plan ?? "free";
  const planLabel = getLimits(plan).label;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar
        isAdmin={profile?.role === "admin"}
        planLabel={planLabel}
        userName={profile?.full_name || "Pengguna"}
      />
      <main className="flex-1 bg-secondary/20 p-5 md:p-8">{children}</main>
    </div>
  );
}
