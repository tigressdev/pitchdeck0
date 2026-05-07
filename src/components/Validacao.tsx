import { motion } from 'framer-motion';
import { INTERVIEWS, LEARNINGS } from '../data';

const insightColorMap = {
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  amber: 'text-amber-600 bg-amber-50 border-amber-200',
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export function Validacao() {
  return (
    <section id="validacao" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400 shadow-sm">
            <span className="font-mono">02</span>
            Pesquisa de validação com stakeholders
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            Entrevistamos todos os lados do ecossistema<br />
            <span className="text-emerald-600">antes de definir o produto final.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-8 text-gray-500">
            Entrevistas qualitativas em profundidade com 5 perfis distintos — usuários finais, compradores B2B e especialista de mercado. Os insights foram determinantes para o pivô estratégico.
          </p>
        </motion.div>

        {/* Interview cards grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INTERVIEWS.map((iv, i) => (
            <motion.div
              key={iv.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-xl shrink-0">
                  {iv.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">{iv.name}</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">{iv.role}</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-4 text-sm leading-7 text-gray-600 italic border-l-2 border-gray-200 pl-4">
                {iv.quote}
              </blockquote>

              {/* Insight tag */}
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${insightColorMap[iv.insightColor]}`}>
                {iv.insight}
              </div>
            </motion.div>
          ))}

          {/* Synthesis card */}
          <motion.div
            custom={5}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-emerald-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white text-xl shrink-0">
                🔍
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Síntese das entrevistas</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-600">5 stakeholders · 3 segmentos</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                '✓ Problema #1 confirmado',
                '✓ Problema #2 confirmado',
                '✓ API-first validado',
                '✓ Clinical Sync validado',
                '✓ Pivô B2B justificado',
              ].map((chip) => (
                <span key={chip} className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-medium text-emerald-700">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expert quote highlight */}
        <motion.div
          className="mb-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <span className="font-['Outfit'] text-6xl leading-none text-emerald-400 select-none mt-[-0.3rem]">"</span>
            <div>
              <p className="text-lg leading-8 text-gray-700 italic">
                Seria muito legal disponibilizar isso como API. Porque aí, independente de quem seja seu consumidor final — e isso você vai descobrir quando começar a oferecer — se for plug and play, fica bem mais fácil de integrar no sistema de saúde do jeito que ele já funciona hoje.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">
                  Médica · mentoria de healthtechs · EUA · entrevista qualitativa em profundidade
                </div>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learnings grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {LEARNINGS.map((l) => (
            <div key={l.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors">
              <div className="mb-3 text-2xl">{l.icon}</div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">{l.title}</h3>
              <p className="text-xs leading-6 text-gray-500">{l.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
