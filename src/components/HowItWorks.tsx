import { motion } from 'framer-motion';
import { PIPELINE_STEPS } from '../data';

const ICONS: Record<string, JSX.Element> = {
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3z" />
      <path d="M5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
      <path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5L19 15z" />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M5 2h8l3 3v13H5z" />
      <path d="M8 9h5M8 12h5M8 15h3" />
      <path d="M16 8l3 3-3 3" />
    </svg>
  ),
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export function HowItWorks() {
  return (
    <section id="solucao" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">

        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400">
            <span className="font-mono">04</span>
            Solução · Arquitetura técnica
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            Quatro camadas. Zero alucinação.<br />
            <span className="text-emerald-600">Do rsID bruto ao insight clínico.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-gray-500">
            Codex curado + engine híbrido + agente com confidence gate + Clinical Sync. Cada camada endereça um problema diferente — e todas juntas formam o diferencial dificilmente copiável.
          </p>
        </motion.div>

        {/* 4-step pipeline cards */}
        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {PIPELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-6 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-mono text-gray-400 shadow-sm">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Connector arrow (desktop) */}
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-gray-400">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div
                className="mb-5 grid h-14 w-14 place-items-center rounded-2xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
              >
                {ICONS[step.icon]}
              </div>

              <div className="mb-1 text-xs uppercase tracking-[0.2em]" style={{ color: step.accent }}>
                {step.subtitle}
              </div>
              <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em] text-gray-900">{step.title}</h3>
              <p className="text-sm leading-7 text-gray-500">{step.desc}</p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, transparent, ${step.accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Technical guarantees row */}
        <motion.div
          className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { label: 'Abstain flag', desc: 'Vita recusa responder quando a evidência é insuficiente. Segurança clínica acima da completude.' },
            { label: 'Confidence gate', desc: 'Cada resposta traz score baseado em tamanho de estudo, OR e qualidade do SNP. Rastreável.' },
            { label: 'Zero hallucination', desc: 'Dados genéticos jamais são gerados — apenas recuperados e interpretados do codex curado.' },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold text-gray-900">{label}</span>
              </div>
              <p className="text-xs leading-6 text-gray-500">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Diferencial highlight */}
        <motion.div
          className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="absolute top-4 right-5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
            Diferencial estratégico
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-3 text-xs font-mono uppercase tracking-[0.22em] text-emerald-600">
                ⚡ Diferencial dificilmente copiável
              </div>
              <h3 className="font-['Outfit'] text-2xl font-bold tracking-[-0.03em] text-gray-900 mb-3">
                "Esse cruzamento — DNA mais exames — é o que nenhum app de genética brasileiro faz hoje via API."
              </h3>
              <p className="text-sm leading-7 text-gray-600">
                Nenhum LLM genérico consegue replicar a combinação de codex curado manualmente + rastreabilidade por rsID + confidence gate clínico. Construir isso exige meses de curadoria especializada — não apenas acesso a um modelo de linguagem.
              </p>
            </div>
            <div className="shrink-0 grid gap-3">
              {[
                { label: 'Codex proprietário', color: '#1D9E75' },
                { label: 'Rastreabilidade clínica', color: '#3f6df6' },
                { label: 'Genômica × exames', color: '#b846ff' },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
