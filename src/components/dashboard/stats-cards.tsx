"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  ListChecks,
  type LucideIcon,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
  accent: string;
  iconColor: string;
};

const STATS: Stat[] = [
  {
    label: "Total Tugas",
    value: "8",
    delta: "+2 minggu ini",
    trend: "up",
    icon: ListChecks,
    accent: "from-indigo-500/30 to-violet-500/10",
    iconColor: "text-indigo-300",
  },
  {
    label: "Sedang Berjalan",
    value: "3",
    delta: "37.5%",
    trend: "up",
    icon: TrendingUp,
    accent: "from-amber-500/30 to-orange-500/10",
    iconColor: "text-amber-300",
  },
  {
    label: "Mendekati Deadline",
    value: "2",
    delta: "≤ 3 hari",
    trend: "up",
    icon: Clock,
    accent: "from-rose-500/30 to-pink-500/10",
    iconColor: "text-rose-300",
  },
  {
    label: "Selesai",
    value: "2",
    delta: "+1 kemarin",
    trend: "up",
    icon: CheckCircle2,
    accent: "from-emerald-500/30 to-teal-500/10",
    iconColor: "text-emerald-300",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-emerald-300 font-medium">
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
  );
}
