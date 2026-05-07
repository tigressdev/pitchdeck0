import { motion } from 'framer-motion';
import { PROBLEMS } from '../data';

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export function Problema() {
  return (
    <section id="problema" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-400">
            <span className="font-mono">01</span>
            Problema
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl leading-[1.05]">
            O gargalo não é gerar dados genéticos.<br />
            <span className="text-emerald-600">É transformá-los em decisão clínica real.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-500">
            Três falhas sistêmicas identificadas e confirmadas nas entrevistas com usuários e compradores B2B.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROBLEMS.map((prob, i) => (
            <motion.div
              key={prob.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${prob.topBarClass} rounded-t-2xl`} />

              {/* Number */}
              <div className="mb-5 font-mono text-5xl font-light text-gray-100 select-none leading-none">
                {prob.id}
              </div>

              {/* Quote */}
              <blockquote className="mb-4 text-sm font-medium italic leading-7 text-gray-700 border-l-2 border-gray-200 pl-4">
                {prob.quote}
              </blockquote>

              <h3 className="mb-3 text-base font-semibold leading-snug text-gray-900">
                {prob.title}
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                {prob.desc}
              </p>

              {/* Confirmed tag */}
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                {prob.confirmed}
              </div>

              {/* Hover underline */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${prob.topBarClass} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>

        {/* Central insight */}
        <motion.div
          className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.22em] text-emerald-600">
                Síntese das entrevistas · 5 stakeholders · 3 segmentos
              </div>
              <p className="text-xl font-semibold leading-8 text-gray-900 md:text-2xl tracking-[-0.02em]">
                "Entrevistamos cinco perfis diferentes.<br />
                Todos confirmaram a mesma coisa:{' '}
                <span className="text-emerald-700">o dado existe. A interpretação não.</span>"
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-center shadow-sm">
                <div className="font-['Outfit'] text-3xl font-bold text-emerald-600">5</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-400">entrevistas</div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-center shadow-sm">
                <div className="font-['Outfit'] text-3xl font-bold text-emerald-600">3</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-400">segmentos</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
