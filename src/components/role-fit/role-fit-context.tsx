"use client";

import { createContext, useContext, useEffect, useState } from "react";

type RoleFitContextValue = {
  isOpen: boolean;
  openRoleFit: () => void;
  closeRoleFit: () => void;
};

const RoleFitContext = createContext<RoleFitContextValue | null>(null);

// Give the page a moment to settle before the overlay appears.
const AUTO_OPEN_DELAY_MS = 1200;

export function RoleFitProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RoleFitContext.Provider
      value={{
        isOpen,
        openRoleFit: () => setIsOpen(true),
        closeRoleFit: () => setIsOpen(false),
      }}
    >
      {children}
    </RoleFitContext.Provider>
  );
}

export function useRoleFit() {
  const ctx = useContext(RoleFitContext);
  if (!ctx) {
    throw new Error("useRoleFit must be used within a RoleFitProvider");
  }
  return ctx;
}
