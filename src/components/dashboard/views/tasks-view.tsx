"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Download,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { TaskListView } from "@/components/dashboard/task-list";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";
import { MOCK_TASKS, STATUSES, type TaskStatus } from "@/lib/mock-data";

type StatusFilter = "all" | TaskStatus;

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

export function TasksView() {
  const [view, setView] = React.useState<"list" | "kanban">("list");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_TASKS.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.requirements.some((r) => r.toLowerCase().includes(q))
      );
    });
  }, [statusFilter, query]);

  const counts = React.useMemo(() => {
    const map: Record<StatusFilter, number> = {
      all: MOCK_TASKS.length,
      todo: 0,
      "in-progress": 0,
      review: 0,
      done: 0,
    };
    for (const t of MOCK_TASKS) map[t.status] += 1;
    return map;
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Manajemen tugas"
        title="Semua Tugas"
        description="Lihat dan kelola seluruh tugas tim GA dalam satu tampilan terpusat."
        actions={
          <>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-card/40 border-border/70"
            >
              <Download className="size-4" />
              Ekspor
            </Button>
            <Button
              size="lg"
              className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110"
            >
              <Plus className="size-4" />
              Tugas baru
            </Button>
          </>
        }
      />

      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur space-y-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berdasarkan judul, kategori, atau requirement…"
              className="h-10 pl-10 rounded-xl bg-background/40 border-border/70"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-background/40 border-border/70"
            >
              <Filter className="size-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-background/40 border-border/70"
            >
              <SlidersHorizontal className="size-4" />
              Urutkan
            </Button>
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "list" | "kanban")}
            >
              <TabsList className="rounded-xl bg-background/40 border border-border/70">
                <TabsTrigger value="list" className="rounded-lg">
                  <List className="size-3.5" />
                  List
                </TabsTrigger>
                <TabsTrigger value="kanban" className="rounded-lg">
                  <LayoutGrid className="size-3.5" />
                  Kanban
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((s) => {
            const active = statusFilter === s.value;
            const colorDot = STATUSES.find((st) => st.value === s.value)?.color;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatusFilter(s.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-100"
                    : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground hover:bg-background/70"
                )}
              >
                {s.value === "all" ? (
                  <span className="size-1.5 rounded-full bg-foreground/60" />
                ) : (
                  <span className={cn("size-1.5 rounded-full", colorDot)} />
                )}
                {s.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    active
                      ? "bg-indigo-500/30 text-indigo-50"
                      : "bg-background/60 text-muted-foreground"
                  )}
                >
                  {counts[s.value]}
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Menampilkan{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            dari {MOCK_TASKS.length} tugas
          </span>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Reset pencarian
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 p-10 text-center">
            <p className="text-sm font-medium">Tidak ada tugas yang cocok</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        ) : view === "list" ? (
          <TaskListView tasks={filtered} />
        ) : (
          <KanbanBoard tasks={filtered} onCreateTask={() => {}} />
        )}
      </section>
    </DashboardLayout>
  );
}
