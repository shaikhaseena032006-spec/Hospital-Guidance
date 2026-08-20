import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import type { SourceRef } from '@/types';

interface SourceCardProps {
  source: SourceRef;
  onView?: (source: SourceRef) => void;
}

export default function SourceCard({ source, onView }: SourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-3 flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50/60 p-2.5 pr-2"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
        <FileText size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">Source</p>
        <p className="truncate text-sm font-medium text-ink-700">{source.document}</p>
        <p className="text-xs text-ink-500">Page {source.page}</p>
      </div>
      <button
        onClick={() => onView?.(source)}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-2.5 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-50 hover:border-brand-300"
      >
        <ExternalLink size={12} />
        View Source
      </button>
    </motion.div>
  );
}
