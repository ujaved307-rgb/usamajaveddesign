import { Hero } from "@/components/home/hero";
import { Credibility } from "@/components/home/credibility";
import { AiToolsStrip } from "@/components/home/ai-tools-strip";
import { SelectedWork } from "@/components/home/selected-work";
import { AboutTeaser } from "@/components/home/about-teaser";
import { AiTeaser } from "@/components/home/ai-teaser";
import { RoleFitTeaser } from "@/components/home/role-fit-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <AiToolsStrip />
      <SelectedWork />
      <RoleFitTeaser />
      <AboutTeaser />
      <AiTeaser />
    </>
  );
}
