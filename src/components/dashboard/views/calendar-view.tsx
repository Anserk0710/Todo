"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";
import { MOCK_TASKS, PRIORITIES, type Task } from "@/lib/mock-data";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendar(month: Date) {
  const first = startOfMonth(month);
  // Start grid on Monday (locale id-ID convention)
  const firstWeekday = (first.getDay() + 6) % 7;
  const days: Date[] = [];
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export function CalendarView() {
  const today = new Date("2026-05-18");
  const [cursor, setCursor] = React.useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = React.useState<Date>(today);
  const [view, setView] = React.useState<"month" | "week">("month");

  const days = React.useMemo(() => buildCalendar(cursor), [cursor]);

  const tasksByDate = React.useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const t of MOCK_TASKS) {
      const key = t.dueDate;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return map;
  }, []);

  const selectedKey = selectedDay.toISOString().slice(0, 10);
  const selectedTasks = tasksByDate.get(selectedKey) ?? [];

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Perencanaan"
        title="Kalender"
        description="Lihat tugas tim berdasarkan tanggal deadline. Klik tanggal untuk melihat detail."
        actions={
          <>
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "month" | "week")}
            >
              <TabsList className="rounded-xl bg-card/40 border border-border/70">
                <TabsTrigger value="month" className="rounded-lg">
                  Bulan
                </TabsTrigger>
                <TabsTrigger value="week" className="rounded-lg">
                  Minggu
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              size="lg"
              className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110"
            >
              <CalendarPlus className="size-4" />
              Tugas baru
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCursor(addMonths(cursor, -1))}
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCursor(addMonths(cursor, 1))}
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="size-4" />
              </Button>
              <p className="ml-2 text-sm font-semibold tracking-tight">
                {cursor.toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCursor(startOfMonth(today));
                setSelectedDay(today);
              }}
              className="h-8 rounded-lg bg-background/40 border-border/70"
            >
              Hari ini
            </Button>
          </div>

          <div className="grid grid-cols-7 border-b border-border/60 bg-background/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {WEEKDAYS.map((w) => (
              <div key={w} className="px-2 py-2 text-center">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((d, idx) => {
              const inMonth = d.getMonth() === cursor.getMonth();
              const isToday = isSameDay(d, today);
              const isSelected = isSameDay(d, selectedDay);
              const key = d.toISOString().slice(0, 10);
              const dayTasks = tasksByDate.get(key) ?? [];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  className={cn(
                    "relative flex min-h-22 flex-col gap-1 border-b border-r border-border/40 p-2 text-left transition-colors",
                    !inMonth && "bg-background/20 text-muted-foreground/60",
                    inMonth && "hover:bg-background/30",
                    isSelected && "bg-indigo-500/10 hover:bg-indigo-500/15"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium",
                      isToday &&
                        "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow shadow-indigo-500/30",
                      !isToday && isSelected && "text-foreground",
                      !isToday && !isSelected && inMonth && "text-foreground/90"
                    )}
                  >
                    {d.getDate()}
                  </span>
                  <div className="flex flex-col gap-1">
                    {dayTasks.slice(0, 2).map((t) => {
                      const p = PRIORITIES.find((pp) => pp.value === t.priority)!;
                      return (
                        <span
                          key={t.id}
                          className={cn(
                            "truncate rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
                            p.badge
                          )}
                          title={t.title}
                        >
                          {t.title}
                        </span>
                      );
                    })}
                    {dayTasks.length > 2 ? (
                      <span className="text-[10px] text-muted-foreground">
                        +{dayTasks.length - 2} lain
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="space-y-3 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Detail tanggal
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight">
              {selectedDay.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedTasks.length} tugas dengan deadline hari ini
            </p>
          </div>

          <div className="space-y-2">
            {selectedTasks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-background/40 p-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Tidak ada tugas pada tanggal ini.
                </p>
              </div>
            ) : (
              selectedTasks.map((t) => {
                const p = PRIORITIES.find((pp) => pp.value === t.priority)!;
                return (
                  <div
                    key={t.id}
                    className="rounded-xl border border-border/70 bg-background/40 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          p.badge
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", p.dot)} />
                        {p.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {t.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-snug line-clamp-2">
                      {t.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                      {t.description}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </motion.aside>
      </div>
    </DashboardLayout>
  );
}
