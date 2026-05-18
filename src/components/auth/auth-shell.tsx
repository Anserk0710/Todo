"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AppLink } from "@/lib/app-router";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Highlight = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const DEFAULT_HIGHLIGHTS: Highlight[] = [
  {
    icon: ClipboardList,
    title: "Catat requirement setiap pekerjaan",
    description:
      "Setiap tugas punya checklist kebutuhan agar tidak ada yang terlewat.",
  },
  {
    icon: CalendarDays,
    title: "Rencanakan hari & minggu Anda",
    description:
      "Atur prioritas, due date, dan kategori pekerjaan dalam satu tempat.",
  },
  {
    icon: CheckCircle2,
    title: "Pantau progress tim GA",
    description: "Lihat status pekerjaan dari to-do, in-progress, sampai done.",
  },
];

type AuthShellProps = {
  children: React.ReactNode;
  badge?: string;
  heading: string;
  subheading: string;
  highlights?: Highlight[];
  footer?: React.ReactNode;
};

export function AuthShell({
  children,
  badge = "Internal tool untuk tim General Affairs",
  heading,
  subheading,
  highlights = DEFAULT_HIGHLIGHTS,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen flex-1 bg-background text-foreground overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 -left-40 size-[480px] rounded-full bg-indigo-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 size-[420px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[460px] rounded-full bg-sky-500/20 blur-[120px]" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: brand + highlights */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-border/60 p-10 xl:p-14">
          <Brand />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-indigo-300" />
              {badge}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight leading-tight">
              Atur pekerjaan harian Anda{" "}
              <span className="text-gradient">dengan lebih rapi.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Kelola plan, requirement, dan progress pekerjaan tim General
              Affairs dari satu dashboard yang clean dan cepat.
            </p>

            <ul className="mt-10 space-y-5">
              {highlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/60 backdrop-blur">
                    <h.icon className="size-5 text-indigo-300" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{h.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GA Todo. Internal use only.
          </p>
        </aside>

        {/* Right: form panel */}
        <main className="flex flex-col">
          <div className="flex items-center justify-between p-6 lg:hidden">
            <Brand compact />
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  {heading}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {subheading}
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
                {children}
              </div>

              {footer ? (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {footer}
                </div>
              ) : null}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <AppLink
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group",
        compact ? "text-base" : "text-lg"
      )}
    >
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30">
        <ClipboardList className="size-4.5 text-white" />
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </span>
      <span className="font-semibold tracking-tight">
        GA <span className="text-muted-foreground font-normal">Todo</span>
      </span>
    </AppLink>
  );
}
