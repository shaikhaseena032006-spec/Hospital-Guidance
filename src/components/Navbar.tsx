import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeft, Activity } from 'lucide-react';
import Logo from './Logo';
import RoleBadge from './RoleBadge';
import type { Role } from '@/types';

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  role: Role;
  onRoleChange: (r: Role) => void;
}

export default function Navbar({ onToggleSidebar, sidebarOpen, role, onRoleChange }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-ink-200/70 bg-white/80 px-3 backdrop-blur-xl sm:px-4"
    >
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-100 hover:text-ink-700"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </button>

        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <div className="leading-tight">
            <h1 className="font-display text-[15px] font-semibold text-ink-800">Procedure Assistant</h1>
            <p className="hidden text-[11px] text-ink-400 sm:block">Hospital guideline search</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1.5 rounded-lg bg-success-50 px-2.5 py-1.5 text-xs font-medium text-success-700 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
          </span>
          <Activity size={13} />
          Backend ready
        </div>
        <RoleBadge role={role} onChange={onRoleChange} />
      </div>
    </motion.header>
  );
}
