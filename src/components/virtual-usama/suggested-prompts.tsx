export const INTRO_PROMPT_GROUPS: { label: string; prompts: string[] }[] = [
  {
    label: "Explore Usama",
    prompts: ["Tell me about Usama", "What does he specialize in?", "How does he approach UX?"],
  },
  {
    label: "Explore the work",
    prompts: ["What did he do at Nedbank?", "Show me his government experience", "What did he do for TASMU?"],
  },
  {
    label: "Explore AI",
    prompts: ["How does Usama use AI in design?", "What does AI-native UX mean to him?"],
  },
  {
    label: "Hiring",
    prompts: ["Why should I hire Usama?", "Is he a good fit for a Lead UX role?"],
  },
];

export function PromptChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-ink/15 bg-cream px-3.5 py-2 text-left text-sm text-ink-2 transition-colors hover:border-ink/30 hover:text-ink"
    >
      {label}
    </button>
  );
}

export function PromptChipRow({ prompts, onSelect }: { prompts: string[]; onSelect: (prompt: string) => void }) {
  if (prompts.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <PromptChip key={prompt} label={prompt} onClick={() => onSelect(prompt)} />
      ))}
    </div>
  );
}
