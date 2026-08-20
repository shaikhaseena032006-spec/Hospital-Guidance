import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  Clock,
  Stethoscope,
  HeartPulse,
  Lock,
  Sparkles,
} from 'lucide-react';
import Logo from '@/components/Logo';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FEATURES = [
  {
    icon: Search,
    title: 'Instant guideline search',
    desc: 'Ask a clinical question in plain language and get the relevant procedure in seconds.',
  },
  {
    icon: FileText,
    title: 'Cited source pages',
    desc: 'Every answer links back to the exact document and page, so you can verify instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware access',
    desc: 'Doctor, Nurse, and Admin views keep the right information in the right hands.',
  },
  {
    icon: Clock,
    title: 'Faster decisions',
    desc: 'Replace manual PDF hunting with a single, searchable institutional knowledge base.',
  },
];

const STEPS = [
  { icon: FileText, label: 'Upload SOPs', desc: 'Drop your hospital PDFs into the secure workspace.' },
  { icon: Sparkles, label: 'Ask a question', desc: 'Type any clinical or procedural query in natural language.' },
  { icon: HeartPulse, label: 'Get cited answers', desc: 'Receive an answer with a link to the source page.' },
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute inset-0 bg-grid-light bg-[size:40px_40px] opacity-60" />
      </div>

      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <Logo size={38} />
          <span className="font-display text-lg font-semibold text-ink-800">Hospital Procedure Assistant</span>
        </div>
        <button
          onClick={onGetStarted}
          className="hidden items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700 sm:flex"
        >
          Sign in <ArrowRight size={15} />
        </button>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              AI-powered hospital guideline search
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Find the right procedure,
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                {' '}
                in seconds.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              Hospital Procedure Assistant lets authorized hospital staff quickly find relevant procedures and
              institutional guidelines. Upload your SOPs, ask in plain language, and get cited answers from your own
              documents.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onGetStarted}
                className="btn-primary group px-6 py-3.5 text-base"
              >
                Get Started
                <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
              </button>
              <div className="flex items-center gap-2 text-sm text-ink-500">
                <Lock size={15} className="text-ink-400" />
                For authorized hospital staff only
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-400">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-success-600" /> HIPAA-aware design</span>
              <span className="flex items-center gap-1.5"><Stethoscope size={14} className="text-brand-600" /> Built for clinical workflows</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-warning-600" /> Sub-second retrieval</span>
            </div>
          </motion.div>

          {/* Hero visual: mock chat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/50 to-brand-400/20 blur-2xl" />
            <div className="card overflow-hidden rounded-[1.75rem] p-1.5 shadow-card">
              <div className="rounded-[1.4rem] bg-ink-50/60 p-4">
                {/* mock window header */}
                <div className="mb-3 flex items-center gap-2">
                  <Logo size={26} />
                  <span className="text-sm font-semibold text-ink-700">Procedure Assistant</span>
                  <span className="ml-auto flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-medium text-success-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-500" /> Online
                  </span>
                </div>

                {/* user bubble */}
                <div className="mb-3 flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                    How do I admit a patient?
                  </div>
                </div>

                {/* ai bubble */}
                <div className="mb-2 flex justify-start">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-700 shadow-soft">
                    Follow the admission protocol: verify identity with two identifiers, complete the assessment
                    form, obtain vitals, and notify the on-call physician.
                    <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50/60 p-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                        <FileText size={13} />
                      </span>
                      <div className="leading-tight">
                        <p className="text-[10px] uppercase tracking-wide text-ink-400">Source</p>
                        <p className="text-xs font-medium text-ink-700">Admission_Guidelines.pdf · Page 8</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* typing */}
                <div className="flex items-center gap-1.5 pl-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
                    <Sparkles size={13} />
                  </span>
                  <div className="flex gap-1 rounded-xl border border-ink-200 bg-white px-3 py-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-brand-400"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Why it matters</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-800 sm:text-3xl">
            Everything your team needs to act fast
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-5 transition hover:shadow-card hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-800">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">How it works</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-800 sm:text-3xl">Three steps to an answer</h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative card p-6"
              >
                <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow">
                  {i + 1}
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink-800">{s.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-12 text-center text-white shadow-card sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-400/30 blur-2xl" />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ready to search your guidelines?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">
            Launch the assistant and start asking questions across your uploaded hospital documents.
          </p>
          <button
            onClick={onGetStarted}
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-[0.98]"
          >
            Get Started
            <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ink-400 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <Logo size={22} />
            <span>Hospital Procedure Assistant</span>
          </div>
          <p>For authorized hospital staff. Responses are guideline-based, not a substitute for clinical judgment.</p>
        </div>
      </footer>
    </div>
  );
}
