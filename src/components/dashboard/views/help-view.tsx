"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  LifeBuoy,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DashboardLayout,
  PageHeader,
} from "@/components/dashboard/dashboard-layout";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  {
    title: "Panduan memulai",
    description: "Setup workspace dan undang tim dalam 5 menit.",
    icon: Sparkles,
    accent: "from-indigo-500/30 to-violet-500/10",
    iconColor: "text-indigo-300",
  },
  {
    title: "Dokumentasi",
    description: "API reference, integrasi, dan tips workflow.",
    icon: BookOpen,
    accent: "from-emerald-500/30 to-teal-500/10",
    iconColor: "text-emerald-300",
  },
  {
    title: "Komunitas",
    description: "Forum diskusi pengguna dan template terbaru.",
    icon: MessageSquare,
    accent: "from-amber-500/30 to-orange-500/10",
    iconColor: "text-amber-300",
  },
  {
    title: "Hubungi support",
    description: "Tim kami siap membantu Senin–Jumat, 09:00–18:00 WIB.",
    icon: LifeBuoy,
    accent: "from-rose-500/30 to-pink-500/10",
    iconColor: "text-rose-300",
  },
];

const FAQS = [
  {
    q: "Bagaimana cara membuat tugas baru?",
    a: "Klik tombol \"Tugas Baru\" di topbar atau di halaman Semua Tugas. Isi judul, deskripsi, requirements, prioritas, kategori, dan deadline. Tugas akan langsung muncul di Kanban dan List view.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Semua data tersimpan terenkripsi di Supabase dengan TLS 1.3. Hanya anggota workspace Anda yang punya akses. Anda bisa ekspor atau menghapus data kapan saja melalui menu Pengaturan.",
  },
  {
    q: "Bisa kolaborasi dengan tim lain?",
    a: "Ya. Undang anggota lewat halaman Tim → Undang anggota. Atur peran (Owner, Admin, Member, Viewer) dan kategori yang bisa mereka akses.",
  },
  {
    q: "Bagaimana mengatur notifikasi?",
    a: "Buka Pengaturan → tab Notifikasi. Anda bisa pilih kanal mana (email, push, in-app) untuk setiap jenis aktivitas seperti assign tugas, mention, atau pengingat deadline.",
  },
  {
    q: "Bisa integrasi dengan kalender lain?",
    a: "Integrasi dengan Google Calendar dan Outlook akan tersedia di rilis berikutnya. Untuk sementara Anda bisa export iCal dari halaman Kalender.",
  },
  {
    q: "Bagaimana cara reset password?",
    a: "Logout → klik \"Lupa password?\" di halaman login → masukkan email Anda. Link reset akan dikirim ke email tersebut, berlaku 30 menit.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <li className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            {a}
          </p>
        </motion.div>
      ) : null}
    </li>
  );
}

export function HelpView() {
  const [query, setQuery] = React.useState("");

  const filteredFaqs = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) =>
        f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Pusat bantuan"
        title="Bantuan"
        description="Temukan jawaban cepat atau hubungi tim support kami."
      />

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur sm:p-8"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-60 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-200">
            Apa yang bisa kami bantu?
          </p>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari topik bantuan, mis. ‘reset password’, ‘assign tugas’…"
            className="h-12 rounded-xl bg-background/60 border-border/70 text-sm"
          />
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_LINKS.map((q, i) => (
          <motion.button
            type="button"
            key={q.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur text-left hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
          >
            <div
              className={cn(
                "pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-gradient-to-br blur-2xl opacity-70",
                q.accent
              )}
            />
            <div className="relative flex items-start justify-between gap-2">
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-xl border border-border/70 bg-background/50",
                  q.iconColor
                )}
              >
                <q.icon className="size-5" />
              </span>
              <ExternalLink className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="relative mt-4 text-sm font-semibold tracking-tight">
              {q.title}
            </p>
            <p className="relative mt-1 text-xs text-muted-foreground leading-relaxed">
              {q.description}
            </p>
          </motion.button>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Pertanyaan umum
            </h2>
            <p className="text-xs text-muted-foreground">
              {filteredFaqs.length} dari {FAQS.length} pertanyaan
            </p>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 p-8 text-center">
              <p className="text-sm font-medium">Tidak ditemukan</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Coba kata kunci lain atau hubungi support kami.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredFaqs.map((f, idx) => (
                <FaqItem key={idx} q={f.q} a={f.a} />
              ))}
            </ul>
          )}
        </section>

        <motion.section
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur space-y-4"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-border/70 bg-background/50 text-indigo-300">
              <Mail className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Kirim pesan ke support
              </h3>
              <p className="text-xs text-muted-foreground">
                Kami balas dalam 1×24 jam kerja.
              </p>
            </div>
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Pesan terkirim ke tim support");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="help-subject">Subjek</Label>
              <Input
                id="help-subject"
                placeholder="Ringkasan singkat…"
                className="h-10 rounded-xl bg-background/40 border-border/70"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="help-message">Pesan</Label>
              <Textarea
                id="help-message"
                placeholder="Ceritakan masalah atau pertanyaan Anda dengan detail…"
                className="min-h-32 rounded-xl bg-background/40 border-border/70"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-10 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
            >
              <Send className="size-4" />
              Kirim pesan
            </Button>
          </form>

          <div className="rounded-xl border border-border/70 bg-background/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Atau email langsung</p>
            <p className="mt-1">
              support@ga-todo.app · Senin–Jumat, 09:00–18:00 WIB
            </p>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
