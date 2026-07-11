import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 bg-secondary/20 p-5 md:p-8">{children}</main>
    </div>
  );
}
