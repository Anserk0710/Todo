"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Filter, LayoutGrid, List, Plus, SlidersHorizontal } from "lucide-react";

import { AppLink, useAppPathname } from "@/lib/app-router";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TaskListView } from "@/components/dashboard/task-list";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { MOCK_TASKS } from "@/lib/mock-data";

export default function AppRoot() {
  const pathname = useAppPathname();

  if (pathname.startsWith("/dashboard")) {
    return <DashboardView />;
  }
  if (pathname.startsWith("/register")) {
    return <RegisterView />;
  }
  if (pathname.startsWith("/forgot-password")) {
    return <ForgotPasswordView />;
  }
  return <LoginView />;
}

function LoginView() {
  return (
    <AuthShell
      heading="Selamat datang kembali"
      subheading="Masuk untuk melanjutkan mengelola pekerjaan GA Anda hari ini."
      footer={
        <>
          Belum punya akun?{" "}
          <AppLink
            href="/register"
            className="font-medium text-foreground hover:text-indigo-300 transition-colors"
          >
            Daftar di sini
          </AppLink>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}

function RegisterView() {
  return (
    <AuthShell
      heading="Buat akun baru"
      subheading="Daftarkan akun tim GA untuk mulai mengatur pekerjaan harian dengan rapi."
      footer={
        <>
          Sudah punya akun?{" "}
          <AppLink
            href="/"
            className="font-medium text-foreground hover:text-indigo-300 transition-colors"
          >
            Masuk
          </AppLink>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}

function ForgotPasswordView() {
  return (
    <AuthShell
      heading="Reset password"
      subheading="Masukkan email Anda dan kami akan kirim link untuk mengatur password baru."
      footer={
        <>
          Ingat password Anda?{" "}
          <AppLink
            href="/"
            className="font-medium text-foreground hover:text-indigo-300 transition-colors"
          >
            Kembali ke login
          </AppLink>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}

function DashboardView() {
  const [view, setView] = React.useState<"list" | "kanban">("kanban");
  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <div className="relative flex flex-1 bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-indigo-500/15 blur-[140px]" />

      <DashboardSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onCreateTask={() => setCreateOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6 scrollbar-thin">
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
                  onClick={() => setCreateOpen(true)}
                  className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 sm:hidden"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {view === "kanban" ? (
              <KanbanBoard
                tasks={MOCK_TASKS}
                onCreateTask={() => setCreateOpen(true)}
              />
            ) : (
              <TaskListView tasks={MOCK_TASKS} />
            )}
          </section>
        </main>
      </div>

      <CreateTaskDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
