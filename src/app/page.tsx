"use client";

import * as React from "react";

import { AppLink, useAppPathname } from "@/lib/app-router";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { DashboardHomeView } from "@/components/dashboard/views/dashboard-home-view";
import { TasksView } from "@/components/dashboard/views/tasks-view";
import { CalendarView } from "@/components/dashboard/views/calendar-view";
import { TeamView } from "@/components/dashboard/views/team-view";
import { ReportsView } from "@/components/dashboard/views/reports-view";
import { CategoriesView } from "@/components/dashboard/views/categories-view";
import { SettingsView } from "@/components/dashboard/views/settings-view";
import { HelpView } from "@/components/dashboard/views/help-view";

export default function AppRoot() {
  const pathname = useAppPathname();

  if (pathname.startsWith("/dashboard")) {
    return <DashboardRouter pathname={pathname} />;
  }
  if (pathname.startsWith("/register")) {
    return <RegisterView />;
  }
  if (pathname.startsWith("/forgot-password")) {
    return <ForgotPasswordView />;
  }
  return <LoginView />;
}

function DashboardRouter({ pathname }: { pathname: string }) {
  if (pathname.startsWith("/dashboard/tasks")) return <TasksView />;
  if (pathname.startsWith("/dashboard/calendar")) return <CalendarView />;
  if (pathname.startsWith("/dashboard/team")) return <TeamView />;
  if (pathname.startsWith("/dashboard/reports")) return <ReportsView />;
  if (pathname.startsWith("/dashboard/categories")) return <CategoriesView />;
  if (pathname.startsWith("/dashboard/settings")) return <SettingsView />;
  if (pathname.startsWith("/dashboard/help")) return <HelpView />;
  return <DashboardHomeView />;
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
