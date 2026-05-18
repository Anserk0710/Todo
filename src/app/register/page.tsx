import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      heading="Buat akun baru"
      subheading="Daftarkan akun tim GA untuk mulai mengatur pekerjaan harian dengan rapi."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link
            href="/"
            className="font-medium text-foreground hover:text-indigo-300 transition-colors"
          >
            Masuk
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
