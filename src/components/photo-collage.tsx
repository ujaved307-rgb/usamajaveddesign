import { RevealImage } from "@/components/reveal-image";

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

export function PhotoCollage({ images, dark = false }: { images: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 sm:gap-x-4">
      {images.map((src, i) => (
        <div
          key={src}
          className={`${ROTATIONS[i % ROTATIONS.length]} w-[42%] shrink-0 rounded-lg p-1.5 shadow-lg transition-transform hover:z-10 hover:rotate-0 hover:scale-105 sm:w-[150px] ${
            dark ? "bg-cream-on-charcoal" : "bg-cream"
          }`}
        >
          <RevealImage
            src={src}
            alt={`Travel photo ${i + 1}`}
            fit="cover"
            aspect="aspect-[3/4]"
            curtain={false}
            className="rounded"
            sizes="200px"
          />
        </div>
      ))}
    </div>
  );
}
