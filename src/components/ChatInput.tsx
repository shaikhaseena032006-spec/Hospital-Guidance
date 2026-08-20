import { useRef, useState, type KeyboardEvent } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  onStop?: () => void;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  onStop,
  loading = false,
  disabled = false,
  placeholder = 'Ask about a procedure or guideline\u2026',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const text = value.trim();
    if (!text || loading || disabled) return;
    onSend(text);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function autoresize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  const canSend = value.trim().length > 0 && !loading && !disabled;

  return (
    <div className="border-t border-ink-200/70 bg-white/80 px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-ink-200 bg-white p-2 shadow-soft transition focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-500/20">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              autoresize();
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={placeholder}
            disabled={disabled}
            aria-label="Ask a question"
            className="scroll-thin max-h-40 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none disabled:opacity-60"
          />
          {loading ? (
            <button
              onClick={onStop}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-600 transition hover:bg-ink-200"
              aria-label="Stop generating"
            >
              <Square size={16} className="fill-current" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canSend}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 active:scale-95 disabled:bg-ink-200 disabled:text-ink-400"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          )}
        </div>
        <p className="mt-1.5 px-2 text-center text-[11px] text-ink-400">
          Press <kbd className="rounded bg-ink-100 px-1 py-0.5 text-[10px] font-medium text-ink-500">Enter</kbd> to send,
          <kbd className="ml-1 rounded bg-ink-100 px-1 py-0.5 text-[10px] font-medium text-ink-500">Shift+Enter</kbd> for
          a new line
        </p>
      </div>
    </div>
  );
}
