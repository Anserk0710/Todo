"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialButtons } from "@/components/auth/social-buttons";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // Design-only: simulate latency, no real auth wiring yet.
    setTimeout(() => {
      setLoading(false);
      toast.success("Berhasil masuk — selamat bekerja!");
      router.push("/dashboard");
    }, 900);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">
          Email
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Lupa password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan password Anda"
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
      </div>

      <div className="flex items-center justify-between">
        <Label
          htmlFor="remember"
          className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
        >
          <Checkbox id="remember" defaultChecked />
          Ingat saya
        </Label>
      </div>

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
              <span>Memverifikasi…</span>
            </>
          ) : (
            <>
              <span>Masuk ke dashboard</span>
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
            atau lanjut dengan
          </span>
        </div>
      </div>

      <SocialButtons />
    </form>
  );
}
