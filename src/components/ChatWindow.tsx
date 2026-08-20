import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import type { Message, SourceRef } from '@/types';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onClear: () => void;
  onViewSource?: (source: SourceRef) => void;
}

export default function ChatWindow({
  messages,
  loading,
  onSend,
  onStop,
  onClear,
  onViewSource,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom on new messages / loading changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-ink-50/40">
      {/* Chat header bar */}
      <div className="flex items-center justify-between border-b border-ink-200/60 bg-white/60 px-4 py-2.5 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <Sparkles size={14} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink-800">Procedure Assistant</p>
            <p className="text-[11px] text-ink-400">
              {loading ? 'Searching guidelines\u2026' : 'Ready'}
            </p>
          </div>
        </div>
        {hasMessages && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-500 transition hover:bg-danger-50 hover:text-danger-600"
          >
            <Trash2 size={13} />
            Clear chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        {!hasMessages ? (
          <EmptyState onSuggestion={onSend} />
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onViewSource={onViewSource} />
              ))}
            </AnimatePresence>
            <div ref={bottomRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} onStop={onStop} loading={loading} />
    </div>
  );
}
