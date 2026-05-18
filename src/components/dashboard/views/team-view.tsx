"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Plus, Search, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/mock-data";

const STATUS_META: Record<
  TeamMember["status"],
  { label: string; dot: string; ring: string }
> = {
  active: {
    label: "Aktif",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
  },
  away: { label: "Sibuk", dot: "bg-amber-400", ring: "ring-amber-400/30" },
  offline: { label: "Offline", dot: "bg-slate-500", ring: "ring-slate-500/30" },
};

function workloadColor(value: number) {
  if (value >= 80) return "from-rose-400 to-rose-500";
  if (value >= 60) return "from-amber-400 to-amber-500";
  return "from-indigo-400 to-fuchsia-400";
}

export function TeamView() {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<TeamMember>(TEAM_MEMBERS[0]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }, [query]);

  const totalActive = TEAM_MEMBERS.filter((m) => m.status === "active").length;
  const totalTasks = TEAM_MEMBERS.reduce((s, m) => s + m.activeTasks, 0);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Kolaborasi"
        title="Tim GA"
        description="Pantau workload dan aktivitas anggota tim General Affairs."
        actions={
          <Button
            size="lg"
            className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110"
          >
            <UserPlus className="size-4" />
            Undang anggota
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total anggota", value: TEAM_MEMBERS.length },
          { label: "Online sekarang", value: totalActive },
          { label: "Tugas aktif", value: totalTasks },
        ].map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama, role, atau email…"
                className="h-10 pl-10 rounded-xl bg-card/40 border-border/70"
              />
            </div>
          </div>

          <ul className="space-y-2">
            {filtered.map((m) => {
              const status = STATUS_META[m.status];
              const active = selected.id === m.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(m)}
                    className={cn(
                      "w-full rounded-2xl border bg-card/40 p-4 text-left transition-all backdrop-blur",
                      active
                        ? "border-indigo-400/50 ring-1 ring-indigo-400/30"
                        : "border-border/70 hover:border-indigo-400/30 hover:bg-card/60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "relative shrink-0 rounded-full ring-2",
                          status.ring
                        )}
                      >
                        <Avatar className="size-11">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-semibold text-white">
                            {m.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={cn(
                            "absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-card",
                            status.dot
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold">
                            {m.name}
                          </p>
                          <span className="text-[11px] text-muted-foreground">
                            {status.label}
                          </span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {m.role}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span>
                            <span className="font-medium text-foreground">
                              {m.activeTasks}
                            </span>{" "}
                            aktif
                          </span>
                          <span>
                            <span className="font-medium text-emerald-300">
                              {m.completedThisWeek}
                            </span>{" "}
                            selesai mgg ini
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Workload</span>
                        <span className="font-medium text-foreground">
                          {m.workload}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.workload}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            workloadColor(m.workload)
                          )}
                        />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <motion.aside
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "relative rounded-full ring-2",
                STATUS_META[selected.status].ring
              )}
            >
              <Avatar className="size-14">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-base font-semibold text-white">
                  {selected.initials}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-card",
                  STATUS_META[selected.status].dot
                )}
              />
            </div>
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-tight">
                {selected.name}
              </p>
              <p className="text-xs text-muted-foreground">{selected.role}</p>
              <p className="text-[11px] text-muted-foreground">
                {selected.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg bg-background/40 border-border/70"
            >
              <MessageSquare className="size-3.5" />
              Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg bg-background/40 border-border/70"
            >
              <Mail className="size-3.5" />
              Email
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border/70 bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Tugas aktif
              </p>
              <p className="mt-1 text-xl font-semibold">
                {selected.activeTasks}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Selesai
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-300">
                {selected.completedThisWeek}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workload
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background/60">
              <motion.div
                key={selected.id}
                initial={{ width: 0 }}
                animate={{ width: `${selected.workload}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  workloadColor(selected.workload)
                )}
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {selected.workload}% kapasitas
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 w-full rounded-lg bg-background/40 border-border/70"
          >
            <Plus className="size-3.5" />
            Assign tugas baru
          </Button>
        </motion.aside>
      </div>
    </DashboardLayout>
  );
}
