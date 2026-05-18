"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2, Mail, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 text-center"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <MailCheck className="size-7" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Email terkirim</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Kami sudah kirim link reset ke{" "}
            <span className="font-medium text-foreground">{email}</span>. Cek
            inbox atau folder spam Anda.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 w-full rounded-xl bg-card/40 border-border/70 hover:bg-card/70"
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
        >
          Kirim ulang
        </Button>
      </motion.div>
    );
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@perusahaan.co.id"
            className="h-11 pl-10 rounded-xl bg-card/40 border-border/70"
          />
        </div>
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
              <span>Mengirim…</span>
            </>
          ) : (
            <>
              <span>Kirim link reset</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
