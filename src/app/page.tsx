import { Hero } from "@/components/home/hero";
import { Credibility } from "@/components/home/credibility";
import { SelectedWork } from "@/components/home/selected-work";
import { AboutTeaser } from "@/components/home/about-teaser";
import { AiTeaser } from "@/components/home/ai-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <SelectedWork />
      <AboutTeaser />
      <AiTeaser />
    </>
  );
}
