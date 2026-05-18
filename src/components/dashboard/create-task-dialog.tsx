"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  Loader2,
  Paperclip,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CATEGORIES, PRIORITIES, STATUSES } from "@/lib/mock-data";

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateTaskDialog({
  open,
  onOpenChange,
}: CreateTaskDialogProps) {
  const [requirements, setRequirements] = React.useState<string[]>([
    "",
    "",
  ]);
  const [submitting, setSubmitting] = React.useState(false);

  function addRequirement() {
    setRequirements((r) => [...r, ""]);
  }

  function removeRequirement(idx: number) {
    setRequirements((r) => r.filter((_, i) => i !== idx));
  }

  function updateRequirement(idx: number, value: string) {
    setRequirements((r) => r.map((v, i) => (i === idx ? value : v)));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Tugas berhasil dibuat (mock)");
      onOpenChange(false);
      setRequirements(["", ""]);
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass rounded-2xl border-border/70 p-0 overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute -top-24 -right-24 size-60 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-60 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <DialogHeader className="relative space-y-1 border-b border-border/60 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30">
                <Sparkles className="size-4 text-white" />
              </span>
              <div>
                <DialogTitle className="text-lg">Buat tugas baru</DialogTitle>
                <DialogDescription className="text-xs">
                  Detail pekerjaan lengkap dengan requirement-nya.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="relative max-h-[70vh] overflow-y-auto scrollbar-thin px-6 py-5 space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="task-title">Judul tugas</Label>
              <Input
                id="task-title"
                placeholder="Mis. Pengadaan ATK lantai 5"
                required
                className="h-11 rounded-xl bg-card/40 border-border/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-description">Deskripsi</Label>
              <Textarea
                id="task-description"
                rows={3}
                placeholder="Jelaskan detail pekerjaan, konteks, dan pihak terkait…"
                className="min-h-24 rounded-xl bg-card/40 border-border/70"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Requirement / kebutuhan</Label>
                <Button
                  type="button"
                  size="xs"
                  variant="ghost"
                  onClick={addRequirement}
                >
                  <Plus className="size-3.5" />
                  Tambah
                </Button>
              </div>

              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-border/70 bg-card/40 text-[11px] font-medium text-muted-foreground">
                        {idx + 1}
                      </span>
                      <Input
                        value={req}
                        onChange={(e) =>
                          updateRequirement(idx, e.target.value)
                        }
                        placeholder={`Kebutuhan ${idx + 1}`}
                        className="h-10 rounded-lg bg-card/40 border-border/70"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeRequirement(idx)}
                        aria-label="Hapus requirement"
                        className={cn(
                          requirements.length <= 1 && "invisible"
                        )}
                      >
                        <X className="size-4" />
                      </Button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-priority">Prioritas</Label>
                <Select defaultValue="medium">
                  <SelectTrigger
                    id="task-priority"
                    className="h-11 rounded-xl bg-card/40 border-border/70 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span className="inline-flex items-center gap-2">
                          <span className={cn("size-1.5 rounded-full", p.dot)} />
                          {p.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-status">Status</Label>
                <Select defaultValue="todo">
                  <SelectTrigger
                    id="task-status"
                    className="h-11 rounded-xl bg-card/40 border-border/70 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        <span className="inline-flex items-center gap-2">
                          <span className={cn("size-1.5 rounded-full", s.color)} />
                          {s.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-category">Kategori</Label>
                <Select defaultValue={CATEGORIES[0]}>
                  <SelectTrigger
                    id="task-category"
                    className="h-11 rounded-xl bg-card/40 border-border/70 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-due">Due date</Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="task-due"
                    type="date"
                    className="h-11 pl-10 rounded-xl bg-card/40 border-border/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select defaultValue="me">
                  <SelectTrigger
                    id="task-assignee"
                    className="h-11 rounded-xl bg-card/40 border-border/70 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Saya (Andini Putri)</SelectItem>
                    <SelectItem value="bs">Budi S.</SelectItem>
                    <SelectItem value="cl">Citra L.</SelectItem>
                    <SelectItem value="dr">Dimas R.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lampiran</Label>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-card/30 py-5 text-sm text-muted-foreground hover:border-indigo-500/50 hover:text-foreground transition-colors"
              >
                <Paperclip className="size-4" />
                Klik untuk upload (PDF, gambar, dll.)
              </button>
            </div>

            <DialogFooter className="border-t border-border/60 -mx-6 px-6 pt-4 mt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 rounded-xl bg-card/40 border-border/70"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-11 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Menyimpan…
                  </>
                ) : (
                  <>Simpan tugas</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
