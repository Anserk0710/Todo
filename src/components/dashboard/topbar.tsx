"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Plus, Search, Settings, User } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type DashboardTopbarProps = {
  onCreateTask: () => void;
};

export function DashboardTopbar({ onCreateTask }: DashboardTopbarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari tugas, kategori, atau requirement…"
            className="h-10 pl-10 pr-16 rounded-xl bg-card/40 border-border/70"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-border/70 bg-card/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘ K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            size="lg"
            onClick={onCreateTask}
            className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 transition-all"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Tugas Baru</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="relative rounded-xl bg-card/40 border-border/70"
            aria-label="Notifikasi"
          >
            <Bell className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/40 pl-1 pr-3 py-1 hover:bg-card/70 transition-colors"
              aria-label="Menu user"
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-xs font-semibold">
                  GA
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-medium">Andini Putri</p>
                <p className="text-[11px] text-muted-foreground">GA Officer</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>Akun saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
                <User className="size-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                <Settings className="size-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast("Sampai jumpa lagi!");
                  router.push("/");
                }}
                className="text-rose-400 focus:text-rose-300"
              >
                <LogOut className="size-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
