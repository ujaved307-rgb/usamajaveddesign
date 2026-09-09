"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Re-mounted by Next.js on every navigation (unlike layout.tsx), which
// makes it the right place for a per-page enter transition — nav and
// footer live in layout.tsx and stay untouched across routes.
//
// `initial` must stay identical regardless of reduced-motion (that
// preference is only knowable client-side, so varying it here would
// mismatch the server-rendered snapshot); only the transition duration —
// not serialized into the DOM — is safe to condition on it.
export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
