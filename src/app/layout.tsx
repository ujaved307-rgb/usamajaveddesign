import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usamajaved.design"),
  title: {
    default: "Usama Javed — Experience Design Lead & Senior UX Consultant",
    template: "%s — Usama Javed",
  },
  description:
    "Usama Javed is an award-winning Experience Design Lead and Senior UX Consultant based in Riyadh, working across government, enterprise, aviation, fintech, telecom and smart-city platforms in the GCC and globally.",
  keywords: [
    "Experience Design Lead",
    "Senior UX Consultant",
    "Lead UX Designer",
    "Product Design Lead",
    "UX Strategy",
    "Enterprise UX",
    "Design Systems",
    "AI Product Design",
    "Experience Strategy",
    "Service Design",
  ],
  openGraph: {
    title: "Usama Javed — Experience Design Lead & Senior UX Consultant",
    description:
      "Award-winning Experience Design Lead based in Riyadh, turning complex government, enterprise and consumer ecosystems into clear digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
