import { motion } from 'framer-motion';
import { JOURNEY_PHASES } from '../data';

const THEN = [
  { icon: '❄️', text: 'Smart fridge com sensores IoT' },
  { icon: '🔧', text: 'Hardware físico como produto central' },
  { icon: '👤', text: 'B2C direto — persona hipotética' },
  { icon: '🏭', text: 'Dependência de parceiros de manufatura' },
  { icon: '📊', text: 'Recomendações nutricionais genéricas' },
  { icon: '🏠', text: 'Mercado de eletrodomésticos inteligentes' },
];

const NOW = [
  { icon: '⚡', text: 'Software puro — zero hardware, zero fricção' },
  { icon: '🔌', text: 'API-first plug-and-play para qualquer healthtech' },
  { icon: '🏥', text: 'B2B: clínicas, operadoras, EMRs como ICPs' },
  { icon: '🧬', text: 'Engine v6: FAISS + BM25 + 33 SNPs curados' },
  { icon: '🛡️', text: 'Confidence gate — zero alucinação de dados' },
  { icon: '🌐', text: 'vitacodex.life em produção com 4 módulos ao vivo' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export function Journey() {
  return (
    <section id="journey" className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400">
            Origem &amp; evolução
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            Partimos de um problema diferente.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-gray-500">
            O que começou como uma startup de IoT e smart fridge evoluiu — por raciocínio próprio de produto e validação com especialista real — para uma camada de inteligência genômica API-first.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div
            className="absolute top-[2.2rem] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] hidden h-px md:block"
            style={{ background: 'linear-gradient(to right, #1D9E7555, #3f6df555, #b846ff55, #f28a2255)' }}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {JOURNEY_PHASES.map((phase, i) => (
              <motion.div
                key={phase.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative rounded-2xl border p-5 transition-colors ${
                  phase.isPivot
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                {phase.isPivot && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-bold text-white whitespace-nowrap tracking-wide shadow-sm">
                    pivot ★
                  </div>
                )}
                <div className="mb-3 flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.id}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">{phase.date}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{phase.title}</div>
                <p className="text-[11px] leading-5 text-gray-400">{phase.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-[1fr_64px_1fr] items-start">
          {/* THEN */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-7 shadow-sm"
          >
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.32em] text-gray-400">Ponto de partida</div>
              <div className="font-['Outfit'] text-2xl font-bold tracking-[-0.04em] text-gray-900">NutriNest</div>
              <div className="mt-1 text-sm text-gray-400">smart fridge · IoT · hardware consumer</div>
            </div>
            <div className="space-y-3.5">
              {THEN.map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-base leading-none">{icon}</span>
                  <span className="text-sm leading-6 text-gray-400">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-col items-center justify-center gap-2 self-center py-4 md:py-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gray-300">pivot</span>
          </motion.div>

          {/* NOW */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-emerald-200 bg-emerald-50 p-7 overflow-hidden shadow-sm"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.32em] text-emerald-600">Produto atual</div>
              <div className="font-['Outfit'] text-2xl font-bold tracking-[-0.04em] text-gray-900">VitaCodex</div>
              <div className="mt-1 text-sm text-emerald-600">API-first · genômica · plug-and-play</div>
            </div>
            <div className="space-y-3.5">
              {NOW.map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-base leading-none">{icon}</span>
                  <span className="text-sm leading-6 text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insight cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-amber-200 bg-amber-50 p-7"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-amber-600">Pivot estratégico</span>
            </div>
            <p className="text-sm leading-7 text-gray-700">
              O pivot de <span className="font-semibold text-gray-900">NutriNest → VitaCodex</span> foi a decisão mais inteligente da jornada — e aconteceu{' '}
              <span className="text-amber-600 font-medium">sem orientação externa</span>, por raciocínio próprio de produto. Hardware é barreira de entrada. Software + API é escala.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-purple-200 bg-purple-50 p-7"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-purple-500" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-purple-600">Validação externa real</span>
            </div>
            <p className="text-sm leading-7 text-gray-700">
              Feedback de <span className="font-semibold text-gray-900">médica mentora de healthtechs nos EUA</span>{' '}
              reposicionou o produto para API-first plug-and-play — validação qualitativa real que nenhum framework acadêmico substituiria.
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-2xl border border-gray-200 bg-gray-50 px-8 py-10 text-center shadow-sm"
        >
          <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-gray-400">
            Do roteiro do vídeo de apresentação
          </div>
          <blockquote className="mx-auto max-w-3xl text-lg leading-9 text-gray-600 italic">
            "Você já parou pra pensar o que acontece com uma pessoa que faz um teste genético? Ela paga. Cospe numa caixinha. Espera duas semanas. E recebe… isso. Dados reais. Dados importantes. Dados que ela nunca vai conseguir usar. Porque ninguém traduziu."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-400">
            <span className="h-px w-12 bg-gray-200 rounded-full" />
            <span>VitaCodex · Startup One FIAP · 2025–2026</span>
            <span className="h-px w-12 bg-gray-200 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
