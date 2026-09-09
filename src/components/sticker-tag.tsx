const TILTS = ["sticker-tilt-1", "sticker-tilt-2", "sticker-tilt-3"] as const;

export function StickerTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        const filled = i % 3 === 1;
        const tilt = TILTS[i % TILTS.length];
        return (
          <span
            key={item}
            className={`${tilt} inline-block rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-transform hover:rotate-0 ${
              filled ? "border-ink bg-ink text-cream" : "border-ink bg-cream text-ink"
            }`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
