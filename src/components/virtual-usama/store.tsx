"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface VirtualUsamaContextValue {
  isOpen: boolean;
  /** Set once the panel has been opened for the first time — gates lazy-loading its code. */
  hasOpened: boolean;
  /** A question queued to auto-send the moment the panel mounts (e.g. from a hero prompt chip). */
  pendingQuestion: string | null;
  open: (question?: string) => void;
  close: () => void;
  consumePendingQuestion: () => void;
}

const VirtualUsamaContext = createContext<VirtualUsamaContextValue | null>(null);

export function VirtualUsamaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const open = useCallback((question?: string) => {
    setIsOpen(true);
    setHasOpened(true);
    if (question) setPendingQuestion(question);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const consumePendingQuestion = useCallback(() => setPendingQuestion(null), []);

  const value = useMemo(
    () => ({ isOpen, hasOpened, pendingQuestion, open, close, consumePendingQuestion }),
    [isOpen, hasOpened, pendingQuestion, open, close, consumePendingQuestion]
  );

  return <VirtualUsamaContext.Provider value={value}>{children}</VirtualUsamaContext.Provider>;
}

export function useVirtualUsama() {
  const ctx = useContext(VirtualUsamaContext);
  if (!ctx) throw new Error("useVirtualUsama must be used within VirtualUsamaProvider");
  return ctx;
}
