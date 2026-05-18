"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CalendarDays, MoreHorizontal, Paperclip } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PRIORITIES, STATUSES, type Task } from "@/lib/mock-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function TaskListView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur">
      <div className="hidden md:grid grid-cols-[1.5rem_minmax(0,3fr)_8rem_8rem_8rem_6rem_2.5rem] gap-4 border-b border-border/60 bg-card/60 px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        <span />
        <span>Tugas</span>
        <span>Status</span>
        <span>Prioritas</span>
        <span>Kategori</span>
        <span>Due</span>
        <span className="text-right">Aksi</span>
      </div>

      <ul className="divide-y divide-border/60">
        {tasks.map((task, i) => (
          <TaskRow key={task.id} task={task} index={i} />
        ))}
      </ul>
    </div>
  );
}

function TaskRow({ task, index }: { task: Task; index: number }) {
  const priority = PRIORITIES.find((p) => p.value === task.priority)!;
  const status = STATUSES.find((s) => s.value === task.status)!;
  const isDone = task.status === "done";

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="grid grid-cols-1 md:grid-cols-[1.5rem_minmax(0,3fr)_8rem_8rem_8rem_6rem_2.5rem] gap-3 md:gap-4 px-4 py-3.5 hover:bg-card/60 transition-colors"
    >
      <div className="flex md:block items-start gap-3">
        <Checkbox defaultChecked={isDone} className="mt-0.5" />
      </div>

      <div className="min-w-0">
        <p
          className={cn(
            "text-sm font-medium leading-tight",
            isDone && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="font-mono">{task.id}</span>
          <span className="inline-flex items-center gap-1">
            <Paperclip className="size-3" />
            {task.attachments}
          </span>
          <span className="hidden sm:inline truncate">
            {task.requirements.length} requirement
          </span>
        </div>
      </div>

      <div className="flex items-center md:justify-start">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-2 py-0.5 text-[11px]">
          <span className={cn("size-1.5 rounded-full", status.color)} />
          {status.label}
        </span>
      </div>

      <div className="flex items-center md:justify-start">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
            priority.badge
          )}
        >
          <span className={cn("size-1.5 rounded-full", priority.dot)} />
          {priority.label}
        </span>
      </div>

      <div className="text-xs text-muted-foreground self-center">
        {task.category}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground self-center">
        <CalendarDays className="size-3.5" />
        {formatDate(task.dueDate)}
      </div>

      <div className="flex items-center justify-end gap-2">
        <Avatar className="size-7">
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[10px] font-semibold text-white">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Aksi tugas" />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem>Lihat detail</DropdownMenuItem>
            <DropdownMenuItem>Edit tugas</DropdownMenuItem>
            <DropdownMenuItem className="text-rose-400 focus:text-rose-300">
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.li>
  );
}
