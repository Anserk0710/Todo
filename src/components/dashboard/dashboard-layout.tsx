"use client";

import * as React from "react";
import { motion } from "motion/react";

import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

type PageHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex flex-col gap-1 min-w-0">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-muted-foreground max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </motion.section>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <div className="relative flex flex-1 bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-indigo-500/15 blur-[140px]" />

      <DashboardSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onCreateTask={() => setCreateOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6 scrollbar-thin">
          {children}
        </main>
      </div>

      <CreateTaskDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
