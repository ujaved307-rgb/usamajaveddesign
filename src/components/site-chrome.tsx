"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RoleFitProvider } from "@/components/role-fit/role-fit-context";
import { RoleFitModal } from "@/components/role-fit/role-fit-modal";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/gate") {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <RoleFitProvider>
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <RoleFitModal />
    </RoleFitProvider>
  );
}
