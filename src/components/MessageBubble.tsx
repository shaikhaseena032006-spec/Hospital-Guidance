import { motion } from 'framer-motion';
import { User, AlertCircle } from 'lucide-react';
import Logo from './Logo';
import SourceCard from './SourceCard';
import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  onViewSource?: (source: NonNullable<Message['source']>) => void;
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-brand-400"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

export default function MessageBubble({ message, onViewSource }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isPending = message.pending;
  const isError = message.error;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex w-full gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className="mt-0.5 shrink-0">
        {isUser ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-100 text-ink-500">
            <User size={16} />
          </span>
        ) : (
          <Logo size={32} />
        )}
      </div>

      {/* Bubble */}
      <div className={`flex max-w-[85%] flex-col gap-1.5 sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={
            isUser
              ? 'rounded-2xl rounded-tr-md bg-brand-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm'
              : isError
                ? 'rounded-2xl rounded-tl-md border border-danger-200 bg-danger-50 px-4 py-2.5 text-sm leading-relaxed text-danger-700'
                : 'rounded-2xl rounded-tl-md border border-ink-200/70 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft'
          }
        >
          {isPending ? (
            <TypingDots />
          ) : isError ? (
            <span className="flex items-center gap-2">
              <AlertCircle size={15} />
              {message.content}
            </span>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>

        {/* Source card */}
        {!isPending && !isError && !isUser && message.source && (
          <SourceCard source={message.source} onView={onViewSource} />
        )}
      </div>
    </motion.div>
  );
}
