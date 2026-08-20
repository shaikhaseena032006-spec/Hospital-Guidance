import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export default function LoadingSpinner({ size = 20, className = '', label }: LoadingSpinnerProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink-500 ${className}`} role="status" aria-live="polite">
      <Loader2 className="animate-spin text-brand-500" size={size} aria-hidden="true" />
      {label && <span className="text-sm">{label}</span>}
    </span>
  );
}
