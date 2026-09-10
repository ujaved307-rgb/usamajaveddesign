import Image from "next/image";

export function ClientMarquee({
  clients,
}: {
  clients: { name: string; logo?: string; small?: boolean }[];
}) {
  const track = [...clients, ...clients];

  return (
    <div className="group relative overflow-hidden py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {track.map((c, i) => (
          <span key={`${c.name}-${i}`} className="mx-10 flex h-10 shrink-0 items-center sm:h-12">
            {c.logo ? (
              <Image
                src={c.logo}
                alt={c.name}
                width={200}
                height={48}
                className={`w-auto object-contain grayscale transition-[filter] duration-300 hover:grayscale-0 ${
                  c.small ? "h-6 sm:h-7" : "h-10 sm:h-12"
                }`}
              />
            ) : (
              <span className="text-base font-semibold uppercase tracking-wide text-ink-3">
                {c.name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
