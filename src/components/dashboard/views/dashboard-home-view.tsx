"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Filter, LayoutGrid, List, Plus, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TaskListView } from "@/components/dashboard/task-list";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MOCK_TASKS } from "@/lib/mock-data";

export function DashboardHomeView() {
  const [view, setView] = React.useState<"list" | "kanban">("kanban");

  return (
    <DashboardLayout>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Halo, Andini 👋
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Berikut ringkasan pekerjaan GA Anda hari ini. Ada{" "}
          <span className="text-foreground font-medium">2 tugas</span> yang
          mendekati deadline — yuk diselesaikan dulu.
        </p>
      </motion.section>

      <StatsCards />

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Pekerjaan Anda
            </h2>
            <p className="text-xs text-muted-foreground">
              8 tugas total, urutkan berdasarkan prioritas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "list" | "kanban")}
            >
              <TabsList className="rounded-xl bg-card/40 border border-border/70">
                <TabsTrigger value="kanban" className="rounded-lg">
                  <LayoutGrid className="size-3.5" />
                  Kanban
                </TabsTrigger>
                <TabsTrigger value="list" className="rounded-lg">
                  <List className="size-3.5" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-card/40 border-border/70 hidden sm:inline-flex"
            >
              <Filter className="size-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-card/40 border-border/70 hidden md:inline-flex"
            >
              <SlidersHorizontal className="size-4" />
              Urutkan
            </Button>
            <Button
              size="lg"
              className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 sm:hidden"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {view === "kanban" ? (
          <KanbanBoard tasks={MOCK_TASKS} onCreateTask={() => {}} />
        ) : (
          <TaskListView tasks={MOCK_TASKS} />
        )}
      </section>
    </DashboardLayout>
  );
}
