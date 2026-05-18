"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialButtons } from "@/components/auth/social-buttons";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Akun berhasil dibuat — silakan masuk.");
      router.push("/");
    }, 900);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">
            Nama lengkap
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Mis. Andini Putri"
              required
              className="h-11 pl-10 rounded-xl bg-card/40 border-border/70"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm">
            Posisi
          </Label>
          <div className="relative">
            <Briefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="role"
              name="role"
              placeholder="GA Officer"
              className="h-11 pl-10 rounded-xl bg-card/40 border-border/70"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">
          Email kantor
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@perusahaan.co.id"
            required
            className="h-11 pl-10 rounded-xl bg-card/40 border-border/70"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            required
            className="h-11 pl-10 pr-10 rounded-xl bg-card/40 border-border/70"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Gunakan kombinasi huruf, angka, dan simbol untuk keamanan ekstra.
        </p>
      </div>

      <Label
        htmlFor="terms"
        className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer"
      >
        <Checkbox id="terms" className="mt-0.5" required />
        <span>
          Saya setuju dengan{" "}
          <span className="text-foreground underline-offset-2 hover:underline">
            ketentuan internal
          </span>{" "}
          penggunaan aplikasi.
        </span>
      </Label>

      <motion.div whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="group relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Membuat akun…</span>
            </>
          ) : (
            <>
              <span>Buat akun</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </motion.div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card/70 px-3 text-muted-foreground rounded-full">
            atau daftar dengan
          </span>
        </div>
      </div>

      <SocialButtons />
    </form>
  );
}
