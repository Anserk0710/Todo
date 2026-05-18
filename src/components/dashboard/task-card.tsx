"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  CheckSquare,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PRIORITIES, type Task } from "@/lib/mock-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function TaskCard({ task }: { task: Task }) {
  const priority = PRIORITIES.find((p) => p.value === task.priority)!;
  const done = task.requirements.length;

  return (
    <motion.article
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
            priority.badge
          )}
        >
          <span className={cn("size-1.5 rounded-full", priority.dot)} />
          {priority.label}
        </span>
        <span className="rounded-full border border-border/70 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
          {task.category}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Aksi tugas"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem>Lihat detail</DropdownMenuItem>
            <DropdownMenuItem>Edit tugas</DropdownMenuItem>
            <DropdownMenuItem>Duplikasi</DropdownMenuItem>
            <DropdownMenuItem className="text-rose-400 focus:text-rose-300">
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h4 className="mt-3 text-sm font-semibold leading-snug line-clamp-2">
        {task.title}
      </h4>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {task.description}
      </p>

      {task.requirements.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {task.requirements.slice(0, 2).map((req, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <CheckSquare className="mt-0.5 size-3.5 shrink-0 text-indigo-300" />
              <span className="text-muted-foreground line-clamp-1">{req}</span>
            </div>
          ))}
          {task.requirements.length > 2 && (
            <p className="pl-5.5 text-[11px] text-muted-foreground">
              +{task.requirements.length - 2} requirement lain
            </p>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Progress</span>
          <span className="font-medium text-foreground">{task.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${task.progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {formatDate(task.dueDate)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Paperclip className="size-3.5" />
            {task.attachments}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3.5" />
            {task.comments}
          </span>
        </div>
        <Avatar className="size-7 ring-2 ring-card">
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[10px] font-semibold text-white">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <span className="sr-only">{done} requirement total</span>
    </motion.article>
  );
}
