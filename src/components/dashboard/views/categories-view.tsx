"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Plus, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/mock-data";

export function CategoriesView() {
  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Pengelompokan"
        title="Kategori"
        description="Atur kategori pekerjaan agar tugas tim GA lebih mudah dikelompokkan dan dicari."
        actions={
          <Button
            size="lg"
            className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110"
          >
            <Plus className="size-4" />
            Kategori baru
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_META.map((c, i) => {
          const pct =
            c.taskCount === 0
              ? 0
              : Math.round((c.doneCount / c.taskCount) * 100);
          return (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-gradient-to-br blur-2xl opacity-60",
                  c.accent
                )}
              />
              <div className="relative flex items-start justify-between">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl border border-border/70 bg-background/40 text-foreground",
                    c.color.replace("bg-", "text-")
                  )}
                >
                  <Tag className="size-5" />
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Aksi kategori"
                      />
                    }
                  >
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem>Edit kategori</DropdownMenuItem>
                    <DropdownMenuItem>Lihat tugas</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-400 focus:text-rose-300">
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="relative mt-4 text-lg font-semibold tracking-tight">
                {c.name}
              </h3>
              <p className="relative mt-1 text-xs text-muted-foreground leading-relaxed">
                {c.description}
              </p>

              <div className="relative mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Total
                  </p>
                  <p className="text-base font-semibold">{c.taskCount}</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Selesai
                  </p>
                  <p className="text-base font-semibold text-emerald-300">
                    {c.doneCount}
                  </p>
                </div>
              </div>

              <div className="relative mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-medium text-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                  />
                </div>
              </div>
            </motion.article>
          );
        })}

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: CATEGORY_META.length * 0.04 }}
          className="group flex min-h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/70 bg-card/30 p-6 text-muted-foreground hover:border-indigo-400/40 hover:text-foreground hover:bg-card/50 transition-all"
        >
          <span className="grid size-10 place-items-center rounded-xl border border-border/70 bg-background/40 group-hover:border-indigo-400/40">
            <Plus className="size-5" />
          </span>
          <p className="text-sm font-medium">Tambah kategori baru</p>
          <p className="text-[11px]">Contoh: Keamanan, Transportasi</p>
        </motion.button>
      </div>
    </DashboardLayout>
  );
}
