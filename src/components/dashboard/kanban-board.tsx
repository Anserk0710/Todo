"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/dashboard/task-card";
import { cn } from "@/lib/utils";
import { STATUSES, type Task } from "@/lib/mock-data";

type KanbanBoardProps = {
  tasks: Task[];
  onCreateTask?: () => void;
};

export function KanbanBoard({ tasks, onCreateTask }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATUSES.map((status, i) => {
        const columnTasks = tasks.filter((t) => t.status === status.value);
        return (
          <motion.section
            key={status.value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col rounded-2xl border border-border/70 bg-card/30 backdrop-blur"
          >
            <header className="flex items-center justify-between gap-2 px-4 py-3.5 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", status.color)} />
                <h3 className="text-sm font-semibold">{status.label}</h3>
                <span className="rounded-full bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {columnTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onCreateTask}
                aria-label={`Tambah tugas di ${status.label}`}
              >
                <Plus className="size-4" />
              </Button>
            </header>

            <div className="flex flex-col gap-3 p-3 min-h-40">
              {columnTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-background/30 py-10 text-center">
                  <p className="text-xs text-muted-foreground">
                    Belum ada tugas
                  </p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
