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
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0, scale: 1, pointerEvents: isOpen ? "none" : "auto" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Magnetic strength={0.2}>
          <button
            type="button"
            onClick={() => open()}
            aria-label="Ask me anything — Virtual Usama, my AI"
            className="group relative flex items-center gap-3 rounded-full bg-ink p-2.5 text-cream shadow-xl transition-transform hover:scale-[1.03] sm:py-3 sm:pl-3 sm:pr-6"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent sm:h-10 sm:w-10">
              <span aria-hidden className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-[vu-ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="relative text-base" aria-hidden>
                ✦
              </span>
            </span>
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-sm font-semibold">Ask me anything</span>
              <span className="text-xs text-cream/60">✦ Virtual Usama, my AI</span>
            </span>
          </button>
        </Magnetic>
      </motion.div>

      {hasOpened && <VirtualUsamaPanel />}
    </>
  );
}
