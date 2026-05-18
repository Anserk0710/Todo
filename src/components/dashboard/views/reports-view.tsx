"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Activity,
  CheckCircle2,
  Clock,
  Download,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";
import {
  CATEGORY_META,
  PRIORITIES,
  MOCK_TASKS,
  WEEKLY_TREND,
} from "@/lib/mock-data";

const KPIS = [
  {
    label: "Tasks selesai",
    value: "27",
    delta: "+12% vs minggu lalu",
    icon: CheckCircle2,
    accent: "from-emerald-500/30 to-teal-500/10",
    iconColor: "text-emerald-300",
  },
  {
    label: "Avg cycle time",
    value: "2.4 hari",
    delta: "-0.6 hari",
    icon: Clock,
    accent: "from-indigo-500/30 to-violet-500/10",
    iconColor: "text-indigo-300",
  },
  {
    label: "On-time rate",
    value: "88%",
    delta: "+4%",
    icon: TrendingUp,
    accent: "from-amber-500/30 to-orange-500/10",
    iconColor: "text-amber-300",
  },
  {
    label: "Tugas overdue",
    value: "2",
    delta: "-1",
    icon: Activity,
    accent: "from-rose-500/30 to-pink-500/10",
    iconColor: "text-rose-300",
  },
] as const;

export function ReportsView() {
  const maxValue = React.useMemo(
    () =>
      Math.max(
        ...WEEKLY_TREND.flatMap((d) => [d.completed, d.created]),
        1
      ),
    []
  );

  const priorityBreakdown = React.useMemo(() => {
    const total = MOCK_TASKS.length;
    return PRIORITIES.map((p) => {
      const count = MOCK_TASKS.filter((t) => t.priority === p.value).length;
      return {
        ...p,
        count,
        pct: total === 0 ? 0 : Math.round((count / total) * 100),
      };
    });
  }, []);

  const categoryBreakdown = React.useMemo(() => {
    const max = Math.max(...CATEGORY_META.map((c) => c.taskCount), 1);
    return CATEGORY_META.map((c) => ({
      ...c,
      pct: Math.round((c.taskCount / max) * 100),
    }));
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Insight"
        title="Laporan"
        description="Ringkasan performa tim GA — produktivitas, ketepatan waktu, dan distribusi pekerjaan."
        actions={
          <Button
            variant="outline"
            size="lg"
            className="h-10 rounded-xl bg-card/40 border-border/70"
          >
            <Download className="size-4" />
            Unduh PDF
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur"
          >
            <div
              className={cn(
                "pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-gradient-to-br blur-2xl opacity-70",
                stat.accent
              )}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-emerald-300">
                    {stat.delta}
                  </span>
                </p>
              </div>
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-xl border border-border/70 bg-background/50",
                  stat.iconColor
                )}
              >
                <stat.icon className="size-5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur"
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Tren mingguan
              </p>
              <p className="text-lg font-semibold tracking-tight">
                Tugas dibuat vs selesai
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-indigo-400" />
                Dibuat
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400" />
                Selesai
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2.5">
            {WEEKLY_TREND.map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end justify-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(d.created / maxValue) * 100}%`,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-3 rounded-t-md bg-gradient-to-t from-indigo-500/60 to-indigo-400/80"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(d.completed / maxValue) * 100}%`,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                    className="w-3 rounded-t-md bg-gradient-to-t from-emerald-500/60 to-emerald-400/80"
                  />
                </div>
                <p className="text-[11px] font-medium text-muted-foreground">
                  {d.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur space-y-4"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Distribusi prioritas
            </p>
            <p className="text-lg font-semibold tracking-tight">
              Beban kerja per level
            </p>
          </div>

          <ul className="space-y-3">
            {priorityBreakdown.map((p) => (
              <li key={p.value} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={cn("size-1.5 rounded-full", p.dot)} />
                    {p.label}
                  </span>
                  <span className="font-medium text-foreground">
                    {p.count} ({p.pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      p.value === "urgent" && "from-rose-400 to-pink-500",
                      p.value === "high" && "from-amber-400 to-orange-500",
                      p.value === "medium" && "from-sky-400 to-indigo-500",
                      p.value === "low" && "from-slate-400 to-slate-500"
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Per kategori
            </p>
            <p className="text-lg font-semibold tracking-tight">
              Jumlah tugas per kategori
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Total kategori: {CATEGORY_META.length}
          </p>
        </div>

        <ul className="mt-5 space-y-3">
          {categoryBreakdown.map((c) => (
            <li key={c.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", c.color)} />
                  {c.name}
                </span>
                <span className="font-medium text-foreground">
                  {c.taskCount} tugas
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-background/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    c.accent
                  )}
                />
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
    </DashboardLayout>
  );
}
