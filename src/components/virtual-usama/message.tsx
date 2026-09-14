import { MarkdownLite, toSpeechText } from "@/components/virtual-usama/markdown-lite";
import { VirtualUsamaProjectCard } from "@/components/virtual-usama/project-card";
import { PromptChipRow } from "@/components/virtual-usama/suggested-prompts";
import { ListenButton } from "@/components/virtual-usama/tts";
import { Magnetic } from "@/components/magnetic";
import Link from "next/link";
import { contact } from "@/lib/data/site";
import type { DisplayMessage } from "@/components/virtual-usama/use-virtual-usama-chat";

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1" aria-live="polite">
      <span className="sr-only">Virtual Usama is thinking</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="h-1.5 w-1.5 animate-[vu-wave_1s_ease-in-out_infinite] rounded-full bg-ink-3"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function VirtualUsamaMessage({
  message,
  onSelectPrompt,
  onNavigate,
}: {
  message: DisplayMessage;
  onSelectPrompt: (prompt: string) => void;
  onNavigate?: () => void;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-[15px] leading-relaxed text-cream">
          {message.visible}
        </p>
      </div>
    );
  }

  const showThinking = message.status === "streaming" && message.visible.length === 0;
  const isDone = message.status === "done";
  const meta = message.meta;

  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-3">
        <span className="text-accent-strong" aria-hidden>
          ✦
        </span>
        Virtual Usama
      </span>

      {showThinking ? (
        <ThinkingIndicator />
      ) : message.status === "error" ? (
        <p className="text-[15px] leading-relaxed text-ink-2">{message.visible}</p>
      ) : (
        <MarkdownLite text={message.visible} />
      )}

      {isDone && message.visible && (
        <div className="mt-1">
          <ListenButton id={message.id} text={toSpeechText(message.visible)} />
        </div>
      )}

      {isDone && meta?.caseStudySlug && (
        <div className="mt-1">
          <VirtualUsamaProjectCard slug={meta.caseStudySlug} onNavigate={onNavigate} />
        </div>
      )}

      {isDone && meta?.cta === "contact" && (
        <Magnetic className="mt-1 inline-block w-fit">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition-opacity hover:opacity-85"
          >
            Get in touch
            <span aria-hidden>→</span>
          </a>
        </Magnetic>
      )}

      {isDone && meta?.cta === "work" && (
        <Magnetic className="mt-1 inline-block w-fit">
          <Link
            href="/work"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition-opacity hover:opacity-85"
          >
            View his work
            <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      )}

      {message.status === "error" && (
        <div className="mt-1 flex flex-wrap gap-4 text-sm">
          <Link href="/work" onClick={onNavigate} className="font-medium text-accent-strong hover:underline">
            Explore case studies →
          </Link>
          <a href={`mailto:${contact.email}`} className="font-medium text-accent-strong hover:underline">
            Get in touch →
          </a>
        </div>
      )}

      {isDone && meta?.suggested && meta.suggested.length > 0 && (
        <div className="mt-2">
          <PromptChipRow prompts={meta.suggested} onSelect={onSelectPrompt} />
        </div>
      )}
    </div>
  );
}
