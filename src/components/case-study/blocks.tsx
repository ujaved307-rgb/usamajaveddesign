import type { Block } from "@/lib/types";
import { StatValue } from "@/components/stat-value";
import { RevealImage } from "@/components/reveal-image";

export function BlockRenderer({ block, invert = false }: { block: Block; invert?: boolean }) {
  const dotColor = invert ? "bg-accent" : "bg-ink";
  const quoteBorder = invert ? "border-accent" : "border-ink";

  switch (block.type) {
    case "heading":
      return (
        <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {block.text}
        </h3>
      );

    case "paragraph":
      return <p className="max-w-3xl text-lg leading-relaxed text-pretty opacity-90">{block.text}</p>;

    case "statement":
      return (
        <p className="font-display max-w-3xl text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed opacity-90">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className={`max-w-3xl border-l-4 ${quoteBorder} pl-6`}>
          <p className="font-display text-xl font-medium leading-snug text-pretty sm:text-2xl">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-3 block text-sm not-italic opacity-70">{block.attribution}</cite>
          )}
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid gap-8 sm:grid-cols-3">
          {block.items.map((stat, i) => (
            <div key={i}>
              <StatValue
                value={stat.value}
                className="font-display block text-4xl font-semibold tracking-tight sm:text-5xl"
              />
              <p className="mt-2 max-w-[20ch] text-sm opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <figure className={block.wide ? "w-full" : "max-w-3xl"}>
          <RevealImage
            src={block.src}
            alt={block.alt}
            aspect="aspect-[16/10]"
            bgClassName="bg-transparent"
            roundedClassName="rounded-[20px]"
            sizes="(min-width: 1024px) 1000px, 100vw"
          />
          {block.caption && (
            <figcaption className="mt-2 text-sm opacity-60">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "gallery":
      return (
        <div className="flex flex-col gap-6">
          {block.images.map((img, i) => (
            <RevealImage
              key={i}
              src={img.src}
              alt={img.alt}
              aspect="aspect-[16/10]"
              bgClassName="bg-transparent"
              roundedClassName="rounded-[20px]"
              sizes="(min-width: 1024px) 1000px, 100vw"
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
