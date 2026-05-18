import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-indigo-500/15 blur-[140px]" />

      <DashboardSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
