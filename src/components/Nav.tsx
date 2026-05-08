import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#validacao', label: 'Validação' },
  { href: '#demo', label: 'Demo' },
  { href: '#solucao', label: 'Solução' },
  { href: '#negocio', label: 'Negócio' },
  { href: '#financeiro', label: 'Financeiro' },
  { href: '#roadmap', label: 'Roadmap' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-3.5 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        {/* Brand */}
       <div className="flex items-center gap-3">
          <div className="font-['Rethink Sans'] text-xl font-normal tracking-[-0.1em] text-gray-900 select-none">
            vita<span className="text-emerald-600">codex</span>
          </div>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.18em] text-gray-400 border border-gray-200 rounded px-2 py-0.5">
            Startup One · FIAP 2026
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-emerald-600"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://vitacodex.life/index/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:shadow-[0_0_24px_rgba(29,158,117,.3)]"
        >
          Ver app ao vivo ↗
        </a>
      </div>
    </motion.header>
  );
}
