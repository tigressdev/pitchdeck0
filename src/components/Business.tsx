import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MARKET, ICPS } from '../data';

const ICP_ICONS: Record<string, (color: string) => JSX.Element> = {
  clinic: (c) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
      <line x1="12" y1="8" x2="12" y2="11" />
      <line x1="10.5" y1="9.5" x2="13.5" y2="9.5" />
    </svg>
  ),
  shield: (c) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  plug: (c) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  user: (c) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function MarketCard({ item, index }: { item: (typeof MARKET)[0]; index: number }) {
  const accents = ['#1D9E75', '#3f6df6', '#b846ff'];
  const accent = accents[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
      />
      <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
        {item.label}
      </div>
      <div className="font-['Outfit'] text-5xl font-bold tracking-[-0.04em] text-gray-900 md:text-6xl">
        {item.value}
      </div>
      <p className="mt-3 text-sm leading-7 text-gray-500">{item.desc}</p>
    </motion.div>
  );
}

export function Business() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="negocio" ref={sectionRef} className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400 shadow-sm">
            <span className="font-mono">05</span>
            Modelo de negócios
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            A interface encanta o usuário.<br />
            <span className="text-emerald-600">A API monetiza para todos os stakeholders.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-gray-500">
            "A mesma API serve os quatro ICPs. O ICP prioritário a gente descobre testando."
          </p>
        </motion.div>

        {/* Market size */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {MARKET.map((item, i) => (
            <MarketCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Revenue model */}
        <motion.div
          className="mb-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-emerald-600">
                Modelo de receita · SaaS por paciente processado
              </div>
              <h3 className="font-['Outfit'] text-2xl font-bold tracking-[-0.04em] text-gray-900 md:text-3xl">
                R$8k/mês por 1.000 pacientes.
              </h3>
              <p className="mt-4 text-base leading-8 text-gray-600">
                API-first B2B: integrações com clínicas, operadoras e EMRs pagam pelo volume de interpretações genômicas. Ticket médio validado com compradores potenciais. LTV:CAC ≥ 3 a partir do mês 10.
              </p>

              {/* API endpoints showcase */}
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm leading-8">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">API endpoints</div>
                {[
                  { method: 'POST', endpoint: '/v1/genome/analyze' },
                  { method: 'POST', endpoint: '/v1/clinical/sync' },
                  { method: 'GET ', endpoint: '/v1/risk-profile/{id}' },
                  { method: 'POST', endpoint: '/v1/vita/explain' },
                ].map(({ method, endpoint }) => (
                  <div key={endpoint} className="flex gap-3 text-xs">
                    <span className="text-emerald-600 font-semibold w-10 shrink-0">{method}</span>
                    <span className="text-gray-600">{endpoint}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { tier: 'Starter', volume: '500 pacientes/mês', mrr: 'R$10k/mês', accent: '#1D9E75', accentBg: '#f0fdf4', accentBorder: '#bbf7d3' },
                { tier: 'Clinic', volume: '1.000 pacientes/mês', mrr: 'R$18k/mês', accent: '#3f6df6', accentBg: '#eff6ff', accentBorder: '#bfdbfe' },
                { tier: 'Enterprise', volume: 'Volume customizado', mrr: 'Negociado', accent: '#b846ff', accentBg: '#faf5ff', accentBorder: '#e9d5ff' },
              ].map(({ tier, volume, mrr, accent, accentBg, accentBorder }) => (
                <div
                  key={tier}
                  className="flex items-center justify-between rounded-xl border px-5 py-4 transition-colors hover:shadow-sm"
                  style={{ borderColor: accentBorder, backgroundColor: accentBg }}
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{tier}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{volume}</div>
                  </div>
                  <div className="font-mono text-sm font-semibold" style={{ color: accent }}>{mrr}</div>
                </div>
              ))}

              {/* Adoption propensity bars */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Propensão de adoção por comprador
                </div>
                {[
                  { label: 'Plano de saúde', pct: 85 },
                  { label: 'Clínica / nutrição', pct: 78 },
                  { label: 'EMR / prontuário', pct: 70 },
                  { label: 'D2C consumidor', pct: 45 },
                ].map(({ label, pct }) => (
                  <div key={label} className="mb-2.5">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">{label}</span>
                      <span className="font-mono text-xs text-emerald-600">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${pct}%` : 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ICP grid */}
        <div className="mb-6 text-center">
          <h3 className="font-['Outfit'] text-2xl font-bold tracking-[-0.04em] text-gray-900">
            4 ICPs validados por entrevistas.
          </h3>
          <p className="mt-2 text-sm text-gray-400">5 stakeholders entrevistados. Problema confirmado em todos os perfis.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICPS.map((icp, i) => (
            <motion.div
              key={icp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="mb-4 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${icp.accent}18` }}>
                {ICP_ICONS[icp.icon]?.(icp.accent)}
              </div>
              <h4 className="mb-2 text-sm font-semibold leading-tight text-gray-900">{icp.title}</h4>
              <p className="text-xs leading-6 text-gray-500">{icp.desc}</p>
              {icp.validated && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Entrevista validada
                </div>
              )}
              <div
                className="mt-4 h-px w-0 rounded-full group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${icp.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Validation note */}
        <motion.div
          className="mt-10 rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm leading-7 text-gray-500">
            Validação qualitativa com{' '}
            <span className="font-medium text-gray-900">leigo receptor de relatório 23andMe</span>,{' '}
            <span className="font-medium text-gray-900">nutricionista clínica</span>,{' '}
            <span className="font-medium text-gray-900">gestor de risco de operadora</span>,{' '}
            <span className="font-medium text-gray-900">dev de prontuário EMR</span> e{' '}
            <span className="font-medium text-gray-900">médica mentora nos EUA</span>.
            Todos confirmaram a existência do translation gap.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
