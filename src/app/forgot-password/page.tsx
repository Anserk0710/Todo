import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      heading="Reset password"
      subheading="Masukkan email Anda dan kami akan kirim link untuk mengatur password baru."
      footer={
        <>
          Ingat password Anda?{" "}
          <Link
            href="/"
            className="font-medium text-foreground hover:text-indigo-300 transition-colors"
          >
            Kembali ke login
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
