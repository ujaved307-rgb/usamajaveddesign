import type { Metadata } from "next";
import { Suspense } from "react";
import { GateForm } from "./gate-form";

export const metadata: Metadata = {
  title: "Private Access",
  robots: { index: false, follow: false },
};

export default function GatePage() {
  return (
    <Suspense fallback={null}>
      <GateForm />
    </Suspense>
  );
}
