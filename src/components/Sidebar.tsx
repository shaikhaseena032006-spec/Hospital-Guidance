import { AnimatePresence, motion } from 'framer-motion';
import { FolderOpen, FileText, Info, X } from 'lucide-react';
import Logo from './Logo';
import DocumentList from './DocumentList';
import UploadCard from './UploadCard';
import type { Role, UploadedDoc } from '@/types';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  documents: UploadedDoc[];
  onUpload: (files: File[]) => void;
  onRemove: (id: string) => void;
  role: Role;
}

export default function Sidebar({ open, onClose, documents, onUpload, onRemove, role }: SidebarProps) {
  const docCount = documents.length;
  const readyCount = documents.filter((d) => d.status === 'ready').length;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-ink-900/30 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="z-40 h-[calc(100vh-4rem)] shrink-0 overflow-hidden border-r border-ink-200/70 bg-white/95 backdrop-blur-xl lg:relative lg:z-0"
            style={{ position: 'fixed', top: '4rem', left: 0 }}
          >
            <div className="flex h-full w-[300px] flex-col">
              {/* Brand header */}
              <div className="flex items-center justify-between px-4 pb-3 pt-4">
                <div className="flex items-center gap-2.5">
                  <Logo size={34} />
                  <div className="leading-tight">
                    <p className="font-display text-sm font-semibold text-ink-800">Hospital Procedure</p>
                    <p className="text-[11px] text-ink-400">Assistant</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 lg:hidden"
                  aria-label="Close sidebar"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Upload */}
              <div className="px-4">
                <UploadCard onUpload={onUpload} />
              </div>

              {/* Documents */}
              <div className="mt-4 flex min-h-0 flex-1 flex-col px-4 pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <FolderOpen size={13} />
                    Documents
                  </h3>
                  <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500">
                    {readyCount}/{docCount}
                  </span>
                </div>
                <div className="scroll-thin min-h-0 flex-1 overflow-y-auto pr-1">
                  <DocumentList documents={documents} onRemove={onRemove} />
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-ink-200/70 p-4">
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-50/70 p-3">
                  <Info size={15} className="mt-0.5 shrink-0 text-brand-600" />
                  <p className="text-[11px] leading-relaxed text-ink-500">
                    Signed in as <span className="font-medium text-ink-700">{role}</span>. Responses are
                    guideline-based and do not replace clinical judgment.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
