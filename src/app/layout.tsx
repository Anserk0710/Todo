import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GA Todo \u2014 Manajemen Pekerjaan Harian",
  description:
    "Aplikasi to-do list modern untuk tim GA: rencanakan pekerjaan, catat requirement, dan pantau progress harian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            classNames: {
              toast:
                "glass !bg-card/80 !text-foreground !border-border/60 !rounded-xl",
            },
          }}
        />
      </body>
    </html>
  );
}
