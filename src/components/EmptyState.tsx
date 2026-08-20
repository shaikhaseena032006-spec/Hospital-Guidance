import { motion } from 'framer-motion';
import { Stethoscope, MessageSquareText } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  suggestions?: string[];
  onSuggestion?: (q: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  'How do I admit a patient?',
  'What is the cardiac arrest protocol?',
  'Explain the infection control SOP',
  'What are the high-alert medication checks?',
];

export default function EmptyState({
  title = 'Ask about hospital procedures',
  description = 'Search across your uploaded institutional guidelines. I\u2019ll find the relevant procedure and cite the exact source page.',
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestion,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
          <Stethoscope size={30} />
        </div>
      </div>
      <h2 className="font-display text-xl font-semibold text-ink-800 sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">{description}</p>

      <div className="mt-7 w-full max-w-xl">
        <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-400">
          <MessageSquareText size={13} /> Try asking
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => onSuggestion?.(s)}
              className="group flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-left text-sm text-ink-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-soft"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-500 transition group-hover:bg-brand-100 group-hover:text-brand-600">
                <MessageSquareText size={13} />
              </span>
              <span className="line-clamp-1">{s}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
