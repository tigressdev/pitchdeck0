import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINANCIAL_OPTIMISTIC, FINANCIAL_REALISTIC, type FinancialScenario } from '../data';

function useCountUpOnce(target: string, duration = 1400, trigger: boolean) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!trigger) return;
    // If non-numeric (like "Mês 8"), just flip directly
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) {
      setDisplay(target);
      return;
    }
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? '';
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = Math.round(progress * numeric);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return display;
}

function MetricCard({
  value,
  label,
  note,
  accent,
  trigger,
}: {
  value: string;
  label: string;
  note: string;
  accent: string;
  trigger: boolean;
}) {
  const displayed = useCountUpOnce(value, 1200, trigger);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="font-['Outfit'] text-3xl font-bold tracking-[-0.04em]" style={{ color: accent }}>
        {displayed}
      </div>
      <div className="mt-1 text-sm font-medium text-gray-900">{label}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">{note}</div>
    </div>
  );
}

function ScenarioPanel({ scenario, accent }: { scenario: FinancialScenario; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Metric grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
        {scenario.metrics.map((m) => (
          <MetricCard key={m.label} {...m} accent={accent} trigger={inView} />
        ))}
      </div>

      {/* Phase table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">Fase</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">Período</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 hidden md:table-cell">Ação principal</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">Receita mensal</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 hidden lg:table-cell">Custos</th>
              </tr>
            </thead>
            <tbody>
              {scenario.phases.map((phase, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{phase.phase}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{phase.period}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{phase.action}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: accent }}>{phase.mrr}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">{phase.costs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footnote */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-mono text-xs leading-6 text-gray-400">
        {scenario.note}
      </div>
    </div>
  );
}

export function Financeiro() {
  const [active, setActive] = useState<'otimista' | 'realista'>('otimista');

  const scenarios = {
    otimista: FINANCIAL_OPTIMISTIC,
    realista: FINANCIAL_REALISTIC,
  };

  const accentColors = {
    otimista: '#1D9E75',
    realista: '#d97706',
  };

  return (
    <section id="financeiro" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400">
            <span className="font-mono">06</span>
            Projeção financeira
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            Trabalhamos com dois cenários.<br />
            <span className="text-emerald-600">Mesma arquitetura. Velocidades diferentes.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-8 text-gray-500">
            O cenário otimista pressupõe tração B2B rápida com 2 clientes no Ano 1. O realista considera adoção gradual com D2C sustentando o caixa até o 1º contrato institucional.
          </p>
        </motion.div>

        {/* Scenario comparison cards */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { id: 'otimista' as const, emoji: '🟢', label: 'Cenário Otimista', headline: 'R$240k MRR · Break-even mês 8', detail: '2 clientes B2B · ARR R$1.2M no Ano 2', accent: '#1D9E75', bg: 'bg-emerald-50', border: 'border-emerald-200' },
            { id: 'realista' as const, emoji: '🟡', label: 'Cenário Realista', headline: 'R$60k MRR · Break-even mês 14', detail: '1 cliente B2B · D2C sustenta caixa', accent: '#d97706', bg: 'bg-amber-50', border: 'border-amber-200' },
          ].map(({ id, emoji, label, headline, detail, accent, bg, border }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`rounded-2xl border-2 p-6 text-left transition-all ${
                active === id ? `${border} ${bg} shadow-md` : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">{label}</span>
                    {active === id && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        ativo
                      </span>
                    )}
                  </div>
                  <div className="font-['Outfit'] text-xl font-bold text-gray-900 tracking-[-0.03em]">{headline}</div>
                  <div className="mt-1 text-sm text-gray-500">{detail}</div>
                </div>
                <div
                  className={`mt-1 h-5 w-5 rounded-full border-2 flex-shrink-0 transition-all ${
                    active === id ? 'border-current scale-110' : 'border-gray-300'
                  }`}
                  style={{ borderColor: active === id ? accent : undefined }}
                >
                  {active === id && (
                    <div className="h-full w-full rounded-full scale-50" style={{ backgroundColor: accent }} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Active scenario panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <ScenarioPanel
              scenario={scenarios[active]}
              accent={accentColors[active]}
            />
          </motion.div>
        </AnimatePresence>

        {/* Shared note */}
        <motion.div
          className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 h-8 w-8 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center">
              <span className="text-sm">💡</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                Modelo de receita comum aos dois cenários
              </div>
              <p className="text-sm leading-7 text-gray-500">
                SaaS por paciente processado · ticket médio B2B <span className="font-semibold text-gray-700">R$8k/mês por 1.000 pacientes</span> ·
                LTV:CAC ≥ 3 a partir do mês 10 · churn estimado &lt;10%/ano ·
                ciclo de vendas B2B de 3–5 meses
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
