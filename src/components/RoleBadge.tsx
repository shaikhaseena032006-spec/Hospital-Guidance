import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Stethoscope, HeartPulse, ShieldCheck } from 'lucide-react';
import type { Role } from '@/types';

interface RoleBadgeProps {
  role: Role;
  onChange: (role: Role) => void;
  compact?: boolean;
}

const ROLES: { value: Role; icon: typeof Stethoscope; tint: string }[] = [
  { value: 'Doctor', icon: Stethoscope, tint: 'text-brand-600 bg-brand-50' },
  { value: 'Nurse', icon: HeartPulse, tint: 'text-emerald-600 bg-emerald-50' },
  { value: 'Admin', icon: ShieldCheck, tint: 'text-amber-600 bg-amber-50' },
];

export default function RoleBadge({ role, onChange, compact = false }: RoleBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = ROLES.find((r) => r.value === role) ?? ROLES[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-xl border border-ink-200 bg-white transition hover:border-brand-300 hover:bg-brand-50/40 ${
          compact ? 'px-2.5 py-1.5' : 'px-3 py-2'
        }`}
      >
        <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${current.tint}`}>
          <CurrentIcon size={14} />
        </span>
        <span className="text-sm font-medium text-ink-700">{role}</span>
        <ChevronDown size={14} className={`text-ink-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-200 bg-white py-1 shadow-card"
            role="listbox"
          >
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = r.value === role;
              return (
                <button
                  key={r.value}
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(r.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition ${
                    active ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-50'
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${r.tint}`}>
                    <Icon size={13} />
                  </span>
                  {r.value}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
