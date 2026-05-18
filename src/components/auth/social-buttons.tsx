"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 rounded-xl bg-card/40 border-border/70 hover:bg-card/70"
      >
        <GoogleIcon className="size-4" />
        <span>Google</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 rounded-xl bg-card/40 border-border/70 hover:bg-card/70"
      >
        <MicrosoftIcon className="size-4" />
        <span>Microsoft</span>
      </Button>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21.35 11.1H12v2.93h5.35c-.23 1.4-1.6 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.93s2.63-5.93 5.85-5.93c1.84 0 3.07.78 3.78 1.45l2.58-2.48C16.88 4.04 14.7 3.1 12 3.1 6.95 3.1 2.86 7.18 2.86 12.2S6.95 21.3 12 21.3c6.93 0 9.5-4.87 9.5-7.4 0-.5-.05-.88-.15-1.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 3h8.5v8.5H3z" fill="#F25022" />
      <path d="M12.5 3H21v8.5h-8.5z" fill="#7FBA00" />
      <path d="M3 12.5h8.5V21H3z" fill="#00A4EF" />
      <path d="M12.5 12.5H21V21h-8.5z" fill="#FFB900" />
    </svg>
  );
}
