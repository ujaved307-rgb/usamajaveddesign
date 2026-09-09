import Image from "next/image";

export function ClientMarquee({ clients }: { clients: { name: string; logo?: string }[] }) {
  const track = [...clients, ...clients];

  return (
    <div className="relative overflow-hidden border-y-2 border-ink py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {track.map((c, i) => (
          <span key={`${c.name}-${i}`} className="mx-8 flex shrink-0 items-center">
            {c.logo ? (
              <Image
                src={c.logo}
                alt={c.name}
                width={120}
                height={32}
                className="h-7 w-auto object-contain sm:h-8"
              />
            ) : (
              <span className="text-sm font-semibold uppercase tracking-wide text-ink-3">
                {c.name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
