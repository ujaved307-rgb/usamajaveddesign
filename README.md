# Usama Javed — Portfolio

Personal portfolio for Usama Javed, Experience Design Lead & Senior UX Consultant. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Motion.

All copy and case-study content is sourced from the original portfolio (`usamajaveddesign.framer.website`) via its Framer CMS — see `src/lib/data/` for the structured content and `src/lib/types.ts` for the case-study content model.

## Structure

- `src/app` — routes: home, `/work`, `/work/[slug]` (case studies), `/about`, `/strategy-and-ai`
- `src/components` — shared UI (nav, footer, motion primitives, project rows) and case-study building blocks
- `src/lib/data` — all site copy and the five case studies as typed content

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
