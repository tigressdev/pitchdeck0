import { motion } from 'framer-motion';

const YOUTUBE_ID = '0Hzdh-62PE0';

const STATS = [
  { value: '33', label: 'SNPs curados' },
  { value: '5', label: 'Stakeholders entrevistados' },
  { value: '4', label: 'Camadas de engine' },
  { value: '2', label: 'Cenários financeiros' },
];

function DnaHelix() {
  return (
    <svg
      viewBox="0 0 120 480"
      className="absolute right-0 top-0 h-full w-auto opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const y = i * 52 + 20;
        const leftX = 30 + Math.sin(i * 0.85) * 26;
        const rightX = 90 - Math.sin(i * 0.85) * 26;
        return (
          <g key={i}>
            <line x1={leftX} y1={y} x2={rightX} y2={y} stroke="#1D9E75" strokeWidth="1.5" strokeOpacity="0.8" />
            <circle cx={leftX} cy={y} r="4" fill="#1D9E75" fillOpacity="0.9" />
            <circle cx={rightX} cy={y} r="4" fill="#1D9E75" fillOpacity="0.9" />
          </g>
        );
      })}
      <path
        d={Array.from({ length: 20 }).map((_, i) => {
          const t = i / 19;
          const x = 30 + Math.sin(t * Math.PI * 4) * 26;
          const y = t * 460 + 20;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ')}
        fill="none" stroke="#1D9E75" strokeWidth="2" strokeOpacity="0.6"
      />
      <path
        d={Array.from({ length: 20 }).map((_, i) => {
          const t = i / 19;
          const x = 90 - Math.sin(t * Math.PI * 4) * 26;
          const y = t * 460 + 20;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ')}
        fill="none" stroke="#b846ff" strokeWidth="2" strokeOpacity="0.4"
      />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Soft green glow — top left */}
      <div className="absolute left-0 top-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-400/6 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* LEFT — Headline */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          <motion.div variants={itemVariants}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-emerald-700">
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M7 2c5 4 5 16 0 20M17 2c-5 4-5 16 0 20M7.5 6h9M7 12h10M7.5 18h9" />
              </svg>
              Genomic intelligence layer · Pitch Final FIAP 2026
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-['Syne'] max-w-2xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-gray-900 md:text-7xl"
          >
            Your body<br />runs in code.{' '}
            <span className="text-emerald-600">We help health systems read it.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-600"
          >
            VitaCodex transforma SNPs genéticos brutos em insights clínicos acionáveis.
            API-first. Confidence gate. Zero alucinação de dados.
          </motion.p>

          {/* Stats grid */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-xl"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors"
              >
                <div className="font-['Outfit'] text-2xl font-bold text-emerald-600">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-400">{label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:shadow-[0_0_32px_rgba(29,158,117,.3)]"
            >
              Explorar demo interativo
            </a>
            <a
              href="#problema"
              className="rounded-full border border-gray-300 px-7 py-3.5 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:text-emerald-700"
            >
              Ver o problema →
            </a>
            <a
              href="https://vitacodex.life"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 transition hover:text-emerald-600 underline-offset-4 hover:underline"
            >
              vitacodex.life ↗
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Video card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl">
            <DnaHelix />
            <div className="relative p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gray-400">
                <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                pitch · demo · 3 min 30 s
              </div>
              <div className="aspect-video overflow-hidden rounded-[1.4rem] border border-gray-100 bg-gray-900">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
                  title="VitaCodex — pitch experience"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm italic leading-7 text-gray-500">
                "Não para prever o seu destino. Mas para entender melhor o seu próprio sistema."
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-md"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Vita Score: 84 · 3 sinais ativos
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs uppercase tracking-[0.3em]">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-5 w-5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
