"use client";

import { useEffect } from "react";
import { GATE_COOKIE_NAME } from "@/lib/gate";

// Next.js Link/router navigations are client-side transitions and never
// unload the page, so `pagehide` does not fire for them — only for an
// actual refresh, tab close, or navigating away. That's what lets normal
// in-app browsing stay unlocked while a refresh forces the password again.
//
// The cookie is deleted synchronously via document.cookie rather than an
// async fetch/beacon call, since a network round trip would almost
// certainly lose the race against the reload's own request. Even
// synchronous deletion isn't a hard guarantee — browsers can dispatch a
// reload's request before running pagehide handlers on the old document,
// so the very next reload after unlocking can occasionally still succeed
// once. Every reload after that is reliably gated, since the cookie is
// gone by then.
export function GateSessionGuard() {
  useEffect(() => {
    const clearGateSession = () => {
      document.cookie = `${GATE_COOKIE_NAME}=; Max-Age=0; path=/`;
    };
    window.addEventListener("pagehide", clearGateSession);
    return () => window.removeEventListener("pagehide", clearGateSession);
  }, []);

  return null;
}
