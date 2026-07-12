import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="theme-future relative flex min-h-screen flex-col bg-slate-950 text-slate-100 md:flex-row">
      <div className="future-grid" />
      <div className="pointer-events-none fixed -top-32 -left-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="pointer-events-none fixed -bottom-32 -right-24 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <AdminNav />
      <main className="relative flex-1 bg-secondary/20 p-5 md:p-8">
        {children}
      </main>
    </div>
  );
}
