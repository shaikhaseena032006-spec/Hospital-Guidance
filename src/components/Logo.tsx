import { Cross } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export default function Logo({ size = 36, className = '', withGlow = false }: LogoProps) {
  return (
    <span className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      {withGlow && (
        <span className="absolute inset-0 -z-10 rounded-xl bg-brand-500/30 blur-lg" aria-hidden="true" />
      )}
      <span
        className="flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md"
        style={{ width: size, height: size }}
      >
        <Cross size={size * 0.55} strokeWidth={2.4} />
      </span>
    </span>
  );
}
