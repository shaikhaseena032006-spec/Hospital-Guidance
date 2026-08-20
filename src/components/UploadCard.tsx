import { useCallback, useRef, useState, type DragEvent } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText } from 'lucide-react';

interface UploadCardProps {
  onUpload: (files: File[]) => void;
  compact?: boolean;
}

const ACCEPT = '.pdf,application/pdf';

export default function UploadCard({ onUpload, compact = false }: UploadCardProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const pdfs = Array.from(files).filter(
        (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'),
      );
      if (pdfs.length > 0) onUpload(pdfs);
    },
    [onUpload],
  );

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-label="Upload PDF documents"
      className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-3 text-center transition ${
        compact ? 'py-3' : 'py-5'
      } ${
        dragging
          ? 'border-brand-500 bg-brand-50/80 scale-[1.01]'
          : 'border-ink-200 bg-ink-50/40 hover:border-brand-300 hover:bg-brand-50/40'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <div className="flex flex-col items-center gap-1.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
            dragging ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-600 group-hover:bg-brand-200'
          }`}
        >
          <UploadCloud size={17} />
        </span>
        <p className="text-xs font-medium text-ink-700">
          {dragging ? 'Drop to upload' : 'Upload PDF'}
        </p>
        <p className="flex items-center gap-1 text-[11px] text-ink-400">
          <FileText size={11} /> Drag & drop or click
        </p>
      </div>
    </motion.div>
  );
}
