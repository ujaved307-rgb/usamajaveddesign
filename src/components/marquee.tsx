export function Marquee({ items, invert = false }: { items: string[]; invert?: boolean }) {
  const track = [...items, ...items];
  const border = invert ? "border-charcoal-line" : "border-ink";
  const text = invert ? "text-cream-on-charcoal" : "text-ink";
  const edgeFrom = invert ? "from-charcoal" : "from-cream";

  return (
    <div className={`relative overflow-hidden border-y-2 ${border} py-6`}>
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${edgeFrom} to-transparent sm:w-32`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${edgeFrom} to-transparent sm:w-32`}
      />
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className={`font-display mx-6 shrink-0 text-3xl font-semibold tracking-tight sm:text-4xl ${text}`}
          >
            {item}
            <span className="ml-6 text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
