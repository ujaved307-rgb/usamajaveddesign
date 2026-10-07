"use client";

import { Magnetic } from "@/components/magnetic";
import { useRoleFit } from "@/components/role-fit/role-fit-context";

export function RoleFitTrigger({ className }: { className?: string }) {
  const { openRoleFit } = useRoleFit();

  return (
    <Magnetic>
      <button
        type="button"
        onClick={openRoleFit}
        className={
          className ??
          "inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
        }
      >
        Check your fit
        <span aria-hidden>→</span>
      </button>
    </Magnetic>
  );
}
