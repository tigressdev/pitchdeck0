import { motion } from 'framer-motion';

const TEAM = [
  { name: 'Helen Borges', rm: 'RM 364154' },
  { name: 'André Lima', rm: 'RM 364124' },
  { name: 'Gabriel Sanches', rm: 'RM 363699' },
];

export function Footer() {
  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Subtle green radial glow */}
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,158,117,.15),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Closing CTA */}
        <motion.div
          className="py-24 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Live badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            API em desenvolvimento ativo · vitacodex.life ao vivo
          </div>

          {/* Tagline — the emotional anchor from the script */}
          <h2 className="font-['Outfit'] max-w-3xl mx-auto text-5xl font-bold leading-[1.0] tracking-[-0.06em] text-white md:text-7xl mb-6">
            Seu corpo<br />funciona em código.
            <br />
            <span className="text-emerald-400">Nós te ajudamos a ler.</span>
          </h2>

          <p className="mt-6 max-w-lg mx-auto text-base leading-8 text-gray-400">
            VitaCodex está em fase de parcerias early access. Entre em contato para discutir integração API e casos de uso clínico.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:contato@vitacodex.life"
              className="rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(46,201,143,.4)]"
            >
              Solicitar acesso early access
            </a>
            <a
              href="https://vitacodex.life"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-700 px-8 py-4 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              Explorar app completo →
            </a>
          </div>

          {/* Team */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {TEAM.map(({ name, rm }) => (
              <div
                key={rm}
                className="rounded-full border border-gray-700 bg-gray-800/60 px-4 py-2 text-xs font-mono text-gray-400"
              >
                {name} · {rm}
              </div>
            ))}
            <div className="rounded-full border border-gray-700 bg-gray-800/60 px-4 py-2 text-xs font-mono text-gray-400">
              Startup One · FIAP · 2026
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Footer bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <div>
            <div className="font-['Outfit'] text-xl font-bold tracking-[-0.05em] text-white">
              vita<span className="text-emerald-400">codex</span>
            </div>
            <p className="mt-0.5 text-xs text-gray-600">Genomic intelligence layer · Pitch Final v0.2</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="https://vitacodex.life" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              vitacodex.life
            </a>
            <span>·</span>
            <a href="mailto:contato@vitacodex.life" className="hover:text-gray-300 transition-colors">
              contato@vitacodex.life
            </a>
            <span>·</span>
            <span>© 2026 VitaCodex</span>
          </div>

          <div className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 font-mono text-xs text-gray-600">
            raw SNP → cluster → insight · v0.2
          </div>
        </div>
      </div>
    </footer>
  );
}
