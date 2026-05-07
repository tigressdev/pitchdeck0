import { motion } from 'framer-motion';
import { ROADMAP_PHASES } from '../data';

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400 shadow-sm">
            <span className="font-mono">07</span>
            Próximos passos
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl leading-[1.05]">
            Quatro fases para ir do protótipo<br />
            <span className="text-emerald-600">ao primeiro contrato B2B.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-500">
            "Os próximos passos são claros: ampliar as entrevistas com compradores, transformar o motor em API vendável e fechar o primeiro piloto com um profissional de saúde em até quatro meses."
          </p>
        </motion.div>

        {/* Roadmap rows */}
        <div className="border-t border-gray-200">
          {ROADMAP_PHASES.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr_180px] border-b border-gray-200 hover:bg-white transition-colors group"
            >
              {/* Phase label */}
              <div className="flex flex-col justify-center px-0 py-5 md:pr-6 md:border-r md:border-gray-200">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">{phase.timing}</div>
                <div
                  className="mt-1 font-mono text-sm font-semibold"
                  style={{ color: phase.color }}
                >
                  {phase.phase}
                </div>
              </div>

              {/* Body */}
              <div className="py-5 md:px-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-sm leading-7 text-gray-500 mb-3">{phase.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.chips.map((chip) => (
                    <span key={chip} className={`rounded-full px-3 py-1 text-[11px] font-medium ${phase.chipStyle}`}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* KPI */}
              <div className="flex items-center py-5 md:pl-6 md:border-l md:border-gray-200">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-gray-400 mb-1">KPI</div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: phase.color }}
                  >
                    {phase.kpi}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API-first close */}
        <motion.div
          className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.22em] text-emerald-600">
                Conclusão · Seção 6 do roteiro
              </div>
              <h3 className="font-['Outfit'] text-2xl font-bold tracking-[-0.03em] text-gray-900 mb-3">
                O VitaCodex não é mais só um app de DNA.<br />
                É uma camada de inteligência para saúde.
              </h3>
              <p className="text-sm leading-7 text-gray-600">
                Protótipo publicado em vitacodex.life. Engine v6 funcional. Quatro módulos ao vivo. 33 SNPs curados.
                A tese é simples: integrar genômica interpretável ao sistema de saúde que já existe — via API plug-and-play.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://vitacodex.life"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white text-center transition hover:bg-emerald-700 hover:shadow-[0_0_24px_rgba(29,158,117,.3)]"
              >
                vitacodex.life ↗
              </a>
              <a
                href="#financeiro"
                className="rounded-full border border-emerald-300 bg-white px-6 py-3 text-sm font-medium text-emerald-700 text-center transition hover:border-emerald-400"
              >
                Ver cenários financeiros
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
