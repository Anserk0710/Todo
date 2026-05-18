"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Bell,
  Lock,
  Palette,
  Save,
  Trash2,
  UploadCloud,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";

const ACCENT_OPTIONS = [
  { value: "indigo", label: "Indigo", swatch: "bg-indigo-500" },
  { value: "violet", label: "Violet", swatch: "bg-violet-500" },
  { value: "emerald", label: "Emerald", swatch: "bg-emerald-500" },
  { value: "amber", label: "Amber", swatch: "bg-amber-500" },
  { value: "rose", label: "Rose", swatch: "bg-rose-500" },
] as const;

const NOTIFICATIONS = [
  {
    key: "task-assigned",
    title: "Tugas baru di-assign",
    description: "Notifikasi saat ada tugas yang ditugaskan ke Anda.",
    defaults: { email: true, push: true, app: true },
  },
  {
    key: "mention",
    title: "Disebut di komentar",
    description: "Saat seseorang menyebut nama Anda di kolom komentar.",
    defaults: { email: true, push: false, app: true },
  },
  {
    key: "deadline",
    title: "Pengingat deadline",
    description: "Pengingat H-1 untuk tugas yang akan jatuh tempo.",
    defaults: { email: false, push: true, app: true },
  },
  {
    key: "weekly",
    title: "Ringkasan mingguan",
    description: "Email rekap aktivitas tim setiap Senin pagi.",
    defaults: { email: true, push: false, app: false },
  },
];

export function SettingsView() {
  const [accent, setAccent] = React.useState<string>("indigo");
  const [theme, setTheme] = React.useState<string>("dark");

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Akun"
        title="Pengaturan"
        description="Atur profil, preferensi notifikasi, tampilan, dan keamanan akun Anda."
      />

      <Tabs defaultValue="profile" className="space-y-5">
        <TabsList className="rounded-xl bg-card/40 border border-border/70 p-1">
          <TabsTrigger value="profile" className="rounded-lg gap-2 px-3">
            <User className="size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2 px-3">
            <Bell className="size-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg gap-2 px-3">
            <Palette className="size-4" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg gap-2 px-3">
            <Lock className="size-4" />
            Keamanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur space-y-6"
          >
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Info dasar
              </h3>
              <p className="text-xs text-muted-foreground">
                Data ini akan tampil di profil publik tim GA Anda.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-semibold text-white">
                  AP
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg bg-background/40 border-border/70"
                >
                  <UploadCloud className="size-3.5" />
                  Ganti foto
                </Button>
                <p className="text-[11px] text-muted-foreground">
                  Format: PNG/JPG, maks 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="full-name">Nama lengkap</Label>
                <Input
                  id="full-name"
                  defaultValue="Andini Putri"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Jabatan</Label>
                <Input
                  id="role"
                  defaultValue="GA Officer"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="andini.p@perusahaan.co.id"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  defaultValue="+62 812 3456 7890"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="bio">Bio singkat</Label>
                <Textarea
                  id="bio"
                  defaultValue="GA Officer yang fokus pada efisiensi operasional kantor pusat."
                  className="min-h-24 rounded-xl bg-background/40 border-border/70"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="h-10 rounded-xl bg-background/40 border-border/70"
              >
                Batal
              </Button>
              <Button
                size="lg"
                onClick={() => toast.success("Profil tersimpan")}
                className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
              >
                <Save className="size-4" />
                Simpan perubahan
              </Button>
            </div>
          </motion.section>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur"
          >
            <div className="border-b border-border/60 p-6">
              <h3 className="text-base font-semibold tracking-tight">
                Preferensi notifikasi
              </h3>
              <p className="text-xs text-muted-foreground">
                Pilih kanal mana yang akan menerima setiap jenis aktivitas.
              </p>
            </div>

            <div className="hidden grid-cols-[1fr_80px_80px_80px] gap-3 border-b border-border/60 px-6 py-3 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid">
              <div>Jenis</div>
              <div className="text-center">Email</div>
              <div className="text-center">Push</div>
              <div className="text-center">In-app</div>
            </div>

            <ul className="divide-y divide-border/60">
              {NOTIFICATIONS.map((n) => (
                <li
                  key={n.key}
                  className="grid grid-cols-1 gap-3 px-6 py-4 sm:grid-cols-[1fr_80px_80px_80px] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.description}
                    </p>
                  </div>
                  {(["email", "push", "app"] as const).map((ch) => (
                    <label
                      key={ch}
                      className="inline-flex items-center justify-center gap-2 sm:gap-0"
                    >
                      <span className="text-xs text-muted-foreground sm:hidden">
                        {ch === "email"
                          ? "Email"
                          : ch === "push"
                            ? "Push"
                            : "In-app"}
                      </span>
                      <Checkbox defaultChecked={n.defaults[ch]} />
                    </label>
                  ))}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-2 border-t border-border/60 p-4">
              <Button
                size="lg"
                onClick={() =>
                  toast.success("Preferensi notifikasi diperbarui")
                }
                className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
              >
                <Save className="size-4" />
                Simpan preferensi
              </Button>
            </div>
          </motion.section>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur space-y-6"
          >
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Tampilan
              </h3>
              <p className="text-xs text-muted-foreground">
                Sesuaikan tema dan warna aksen sesuai preferensi Anda.
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Tema
              </Label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "system", label: "Ikuti sistem" },
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTheme(t.value)}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors",
                      theme === t.value
                        ? "border-indigo-400/60 bg-indigo-500/10"
                        : "border-border/70 bg-background/40 hover:bg-background/60"
                    )}
                  >
                    <div
                      className={cn(
                        "h-14 w-full rounded-lg border border-border/50",
                        t.value === "light" && "bg-slate-100",
                        t.value === "dark" && "bg-slate-900",
                        t.value === "system" &&
                          "bg-gradient-to-r from-slate-100 to-slate-900"
                      )}
                    />
                    <p className="text-xs font-medium">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Warna aksen
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {ACCENT_OPTIONS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAccent(a.value)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      accent === a.value
                        ? "border-indigo-400/60 bg-indigo-500/15"
                        : "border-border/70 bg-background/40 hover:bg-background/60"
                    )}
                  >
                    <span className={cn("size-3 rounded-full", a.swatch)} />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Bahasa
              </Label>
              <Select defaultValue="id">
                <SelectTrigger className="mt-2 h-10 w-full rounded-xl bg-background/40 border-border/70 sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
              <Button
                size="lg"
                onClick={() => toast.success("Preferensi tampilan disimpan")}
                className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
              >
                <Save className="size-4" />
                Simpan
              </Button>
            </div>
          </motion.section>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur space-y-6"
          >
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Ganti password
              </h3>
              <p className="text-xs text-muted-foreground">
                Disarankan ganti password setiap 90 hari.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="current-pwd">Password saat ini</Label>
                <Input
                  id="current-pwd"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-pwd">Password baru</Label>
                <Input
                  id="new-pwd"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-pwd">Konfirmasi password</Label>
                <Input
                  id="confirm-pwd"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 rounded-xl bg-background/40 border-border/70"
                />
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-border/60 pt-4">
              <Button
                size="lg"
                onClick={() => toast.success("Password diperbarui")}
                className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
              >
                Update password
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">
                  Two-factor authentication
                </h3>
                <p className="text-xs text-muted-foreground">
                  Lapisan keamanan tambahan dengan kode dari aplikasi
                  authenticator.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-lg bg-background/40 border-border/70"
              >
                Aktifkan
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 backdrop-blur space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-rose-200">
                  Hapus akun
                </h3>
                <p className="text-xs text-rose-200/70">
                  Aksi ini permanen — semua data dan riwayat akan dihapus.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-lg border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
              >
                <Trash2 className="size-3.5" />
                Hapus
              </Button>
            </div>
          </motion.section>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
