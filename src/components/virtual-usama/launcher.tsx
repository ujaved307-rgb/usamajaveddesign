"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useVirtualUsama } from "@/components/virtual-usama/store";
import { Magnetic } from "@/components/magnetic";

const VirtualUsamaPanel = dynamic(
  () => import("@/components/virtual-usama/panel").then((m) => m.VirtualUsamaPanel),
  { ssr: false }
);

export function VirtualUsamaLauncher() {
  const { isOpen, hasOpened, open } = useVirtualUsama();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0, pointerEvents: isOpen ? "none" : "auto" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, delay: shouldReduceMotion ? 0 : 1.2 }}
        className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Magnetic strength={0.2}>
          <button
            type="button"
            onClick={() => open()}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-cream shadow-lg transition-opacity hover:opacity-90 sm:px-5"
          >
            <span className="text-accent" aria-hidden>
              ✦
            </span>
            <span className="hidden sm:inline">Talk to Virtual Usama</span>
            <span className="sm:hidden">Virtual Usama</span>
          </button>
        </Magnetic>
      </motion.div>

      {hasOpened && <VirtualUsamaPanel />}
    </>
  );
}
