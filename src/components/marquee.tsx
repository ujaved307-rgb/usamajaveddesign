export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-ink-line py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display mx-6 shrink-0 text-3xl font-medium tracking-tight text-text-3 sm:text-4xl"
          >
            {item}
            <span className="ml-6 text-gold/50" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
