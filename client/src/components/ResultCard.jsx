export function ResultCard({ label, tone, children }) {
  const tones = {
    sage: "bg-sage-dim border-sage/30",
    butter: "bg-butter-dim border-butter/30",
    accent: "bg-accent-dim border-accent/30",
  };
  return (
    <div className={`mt-4 p-4 rounded-lg border ${tones[tone] || tones.accent}`}>
      <p className="text-xs font-mono uppercase tracking-wide text-ink-faint mb-1">{label}</p>
      <p className="text-sm text-ink-body leading-relaxed">{children}</p>
    </div>
  );
}

export function Dots() {
  return (
    <span className="inline-flex gap-1 align-middle">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.2s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.1s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
    </span>
  );
}

export const btn =
  "px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
export const btnPrimary = `${btn} bg-accent-btn text-white hover:bg-accent`;
export const btnGhost = `${btn} bg-surface-warm border border-surface-border text-ink hover:border-accent`;
