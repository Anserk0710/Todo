"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Cog,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  Tag,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "Semua Tugas", icon: ListTodo, badge: "8" },
  { href: "/dashboard/calendar", label: "Kalender", icon: CalendarDays },
  { href: "/dashboard/team", label: "Tim", icon: Users },
  { href: "/dashboard/reports", label: "Laporan", icon: BarChart3 },
];

const SECONDARY_NAV: NavItem[] = [
  { href: "/dashboard/categories", label: "Kategori", icon: Tag },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Cog },
  { href: "/dashboard/help", label: "Bantuan", icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30">
          <ClipboardList className="size-4.5 text-white" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">GA Todo</p>
          <p className="text-xs text-muted-foreground">Workspace</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-5">
        <p className="px-3 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Menu
        </p>
        <ul className="space-y-1">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </ul>

        <p className="mt-7 px-3 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Lainnya
        </p>
        <ul className="space-y-1">
          {SECONDARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/15 p-4">
          <div className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-indigo-500/30 blur-2xl" />
          <p className="relative text-sm font-medium leading-snug">
            Tip: tekan{" "}
            <kbd className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">
              N
            </kbd>{" "}
            untuk buat tugas baru
          </p>
          <p className="relative mt-1 text-xs text-muted-foreground leading-relaxed">
            Gunakan shortcut untuk lebih cepat mengelola pekerjaan harian.
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          active
            ? "text-foreground bg-sidebar-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
        )}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-gradient-to-b from-indigo-400 to-fuchsia-400"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
        <Icon
          className={cn(
            "size-4 shrink-0",
            active ? "text-foreground" : "text-muted-foreground"
          )}
        />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/20 px-1.5 text-[10px] font-medium text-indigo-200">
            {item.badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
