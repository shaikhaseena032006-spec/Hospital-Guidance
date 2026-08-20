import { AnimatePresence, motion } from 'framer-motion';
import { FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { UploadedDoc } from '@/types';
import { formatBytes, formatRelativeTime } from '@/lib/utils';

interface DocumentListProps {
  documents: UploadedDoc[];
  onRemove: (id: string) => void;
}

export default function DocumentList({ documents, onRemove }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-200 bg-ink-50/50 px-4 py-8 text-center">
        <FileText size={22} className="text-ink-300" />
        <p className="mt-2 text-xs text-ink-400">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {documents.map((doc) => (
          <motion.li
            key={doc.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="group flex items-center gap-3 rounded-xl border border-ink-200/70 bg-white p-2.5 transition hover:border-brand-200 hover:shadow-soft"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileText size={16} />
              {doc.status === 'uploading' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <Loader2 size={11} className="animate-spin text-brand-500" />
                </span>
              )}
              {doc.status === 'ready' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <CheckCircle2 size={12} className="text-success-600" />
                </span>
              )}
              {doc.status === 'error' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <AlertCircle size={12} className="text-danger-600" />
                </span>
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-700">{doc.name}</p>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-400">
                <span>{formatBytes(doc.size)}</span>
                <span aria-hidden>·</span>
                <span>{formatRelativeTime(doc.uploadedAt)}</span>
                {doc.status === 'uploading' && typeof doc.progress === 'number' && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="text-brand-600">{doc.progress}%</span>
                  </>
                )}
              </div>
              {doc.status === 'uploading' && typeof doc.progress === 'number' && (
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink-100">
                  <motion.div
                    className="h-full rounded-full bg-brand-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${doc.progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => onRemove(doc.id)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-400 opacity-0 transition hover:bg-danger-50 hover:text-danger-600 group-hover:opacity-100"
              aria-label={`Remove ${doc.name}`}
            >
              <X size={15} />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
