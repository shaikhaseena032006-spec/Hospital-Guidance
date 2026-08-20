import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import type { Message, Role, SourceRef, UploadedDoc } from '@/types';
import { DUMMY_DOCUMENTS } from '@/lib/dummyData';
import { askQuestion, uploadDocument } from '@/lib/api';
import { uid } from '@/lib/utils';

interface ChatAppProps {
  onExit: () => void;
}

export default function ChatApp({ onExit }: ChatAppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState<Role>('Doctor');
  const [documents, setDocuments] = useState<UploadedDoc[]>(DUMMY_DOCUMENTS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState<SourceRef | null>(null);

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: Message = {
        id: uid('msg'),
        role: 'user',
        content: text,
        createdAt: Date.now(),
      };
      const pendingId = uid('msg');
      const pendingMsg: Message = {
        id: pendingId,
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
        pending: true,
      };
      setMessages((prev) => [...prev, userMsg, pendingMsg]);
      setLoading(true);

      try {
        const res = await askQuestion(text);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  content: res.answer,
                  source: { document: res.source, page: res.page },
                  pending: false,
                }
              : m,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  content: 'Sorry, I could not reach the assistant service. Please try again in a moment.',
                  pending: false,
                  error: true,
                }
              : m,
          ),
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleStop = useCallback(() => {
    // In dummy mode requests auto-resolve; this removes the pending bubble.
    setMessages((prev) => prev.filter((m) => !m.pending));
    setLoading(false);
  }, []);

  const handleClear = useCallback(() => {
    setMessages([]);
  }, []);

  const handleUpload = useCallback(async (files: File[]) => {
    for (const file of files) {
      const id = uid('doc');
      setDocuments((prev) => [
        {
          id,
          name: file.name,
          size: file.size,
          uploadedAt: Date.now(),
          status: 'uploading',
          progress: 0,
        },
        ...prev,
      ]);
      try {
        await uploadDocument(file, (pct) => {
          setDocuments((prev) =>
            prev.map((d) => (d.id === id ? { ...d, progress: pct, status: 'uploading' } : d)),
          );
        });
        setDocuments((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: 'ready', progress: 100 } : d)),
        );
      } catch {
        setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, status: 'error' } : d)));
      }
    }
  }, []);

  const handleRemoveDoc = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ink-50">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
        role={role}
        onRoleChange={setRole}
      />

      <div className="relative flex min-h-0 flex-1">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          documents={documents}
          onUpload={handleUpload}
          onRemove={handleRemoveDoc}
          role={role}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ChatWindow
            messages={messages}
            loading={loading}
            onSend={handleSend}
            onStop={handleStop}
            onClear={handleClear}
            onViewSource={setPreviewSource}
          />
        </main>
      </div>

      {/* Back to landing (subtle) */}
      <button
        onClick={onExit}
        className="fixed bottom-4 right-4 z-20 hidden rounded-full border border-ink-200 bg-white/80 px-3 py-1.5 text-xs text-ink-500 backdrop-blur transition hover:text-ink-700 sm:block"
      >
        ← Landing
      </button>

      {/* Source preview modal */}
      <AnimatePresence>
        {previewSource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4 backdrop-blur-sm"
            onClick={() => setPreviewSource(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                    <FileText size={17} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-ink-800">{previewSource.document}</p>
                    <p className="text-xs text-ink-400">Page {previewSource.page}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewSource(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
                  aria-label="Close preview"
                >
                  <X size={17} />
                </button>
              </div>
              <div className="bg-ink-100/60 p-6">
                <div className="mx-auto aspect-[1/1.3] w-full max-w-xs rounded-lg bg-white p-5 shadow-soft">
                  <p className="text-[10px] font-medium text-ink-400">Page {previewSource.page}</p>
                  <div className="mt-3 space-y-2">
                    {[...Array(14)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full bg-ink-200"
                        style={{ width: `${70 + ((i * 13) % 30)}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 h-24 rounded-md bg-brand-50/60 ring-1 ring-brand-200" />
                </div>
                <p className="mt-4 text-center text-xs text-ink-400">
                  Preview is illustrative. Connect the backend to render the actual PDF page.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
