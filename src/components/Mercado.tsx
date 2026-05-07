import { motion } from 'framer-motion';

// ─── Market KPIs ─────────────────────────────────────────────────────────────
const KPIS = [
  { label: 'Mercado global genômica', value: '$35B', sub: 'CAGR ~18% ao ano', color: '#1D9E75', bg: '#f0fdf6', border: '#bbf7d3' },
  { label: 'Segmento health tech personalizada', value: '$12B', sub: 'Adjacência de maior crescimento', color: '#3f6df6', bg: '#eff6ff', border: '#bfdbfe' },
  { label: 'Usuários 23andMe (órfãos)', value: '14M+', sub: 'Maior base de DNA sem destino', color: '#b846ff', bg: '#faf5ff', border: '#e9d5ff' },
  { label: 'Categoria VitaCodex', value: '0→?', sub: '"Alto dado + alta ação" vazia', color: '#f28a22', bg: '#fff7ed', border: '#fed7aa' },
];

// ─── Competitive matrix ───────────────────────────────────────────────────────
const MATRIX_FEATURES = [
  { label: 'Clusters de SNPs', v23: '✗', vCircle: '✗', vNebula: '✗', vVita: '✓ 6 clusters biológicos', vitaGood: true },
  { label: 'Score de confiança', v23: '✗', vCircle: '✗', vNebula: '✗', vVita: '✓ por cluster', vitaGood: true },
  { label: 'Integração laboratorial', v23: '✗', vCircle: 'limitado', vNebula: 'parcial', vVita: '✓ Clinical Sync (core)', vitaGood: true },
  { label: 'Sinais semanais', v23: '✗', vCircle: '✗', vNebula: '✗', vVita: '✓ contexto contínuo', vitaGood: true },
  { label: 'Engine de metas (Target)', v23: '✗', vCircle: 'dicas básicas', vNebula: '✗', vVita: '✓ Target module', vitaGood: true },
  { label: 'Modelagem de incerteza', v23: '✗', vCircle: '✗', vNebula: '✗', vVita: '✓ Primary / Exploratory', vitaGood: true },
  { label: 'Atualização contínua', v23: '✗', vCircle: '✗', vNebula: 'parcial', vVita: '✓ modelo core', vitaGood: true },
  { label: 'Import de arquivo (sem kit)', v23: '✗', vCircle: '✗', vNebula: '✗', vVita: '✓ 23andMe / AncestryDNA', vitaGood: true },
  { label: 'Relatórios estáticos', v23: '✓ 100+', vCircle: '✓ 500+', vNebula: '✓ Profundos', vVita: '✗ Não é modelo de relatório', vitaGood: false },
  { label: 'Pipeline nativo de DNA', v23: '✓ kit completo', vCircle: '✓ kit completo', vNebula: '✓ WGS completo', vVita: '✗ import-first (v1)', vitaGood: false },
];

// ─── Market tailwinds ─────────────────────────────────────────────────────────
const TAILWINDS = [
  {
    title: 'Falência da 23andMe (2025)',
    desc: '14M+ usuários com arquivos de DNA que não têm mais produto. O modelo import-first do VitaCodex captura essa janela sem custo de aquisição de DNA — zero kit necessário.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: '#1D9E75',
  },
  {
    title: 'Saúde preventiva como padrão',
    desc: 'Gasto migra de tratamento para prevenção e otimização. "Biologia como contexto contínuo" é o modelo premium — exatamente o que VitaCodex propõe como loop semanal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    color: '#3f6df6',
  },
  {
    title: 'LLMs prontos para genômica',
    desc: 'Linguagem natural sobre achados genéticos é produção-ready. A decisão de design "linguagem humana sobre estatística crua" já tomada pelo VitaCodex é a certa — e a tecnologia escala.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    ),
    color: '#b846ff',
  },
];

// ─── Positioning map (SVG-based) ──────────────────────────────────────────────
function PositioningMap() {
  const dots = [
    { name: '23andMe', abbr: '23a', xPct: 16, yPct: 34, color: '#9ca3af', size: 36 },
    { name: 'CircleDNA', abbr: 'CD', xPct: 22, yPct: 27, color: '#9ca3af', size: 34 },
    { name: 'Nebula', abbr: 'Neb', xPct: 62, yPct: 20, color: '#8b5cf6', size: 38 },
    { name: 'VitaCodex', abbr: 'VC', xPct: 81, yPct: 78, color: '#18c56e', size: 50 },
  ];

  // SVG: 360×280, with margins: left=44 (Y-axis), bottom=32 (X-axis)
  // Plot area: x from 44 to 356 (312px wide), y from 12 to 248 (236px tall)
  const PL = 44, PR = 360, PT = 12, PB = 248;
  const PW = PR - PL, PH = PB - PT;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-5 pt-5 pb-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.18em] mb-1">Mapa de posicionamento</div>
        <div className="text-[11px] text-gray-400">profundidade de dado × valor de decisão</div>
      </div>
      <svg viewBox="0 0 380 290" className="w-full">
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="#e5e7eb" strokeWidth="1" />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="#e5e7eb" strokeWidth="1" />
        {/* Quadrant dividers */}
        <line x1={PL + PW / 2} y1={PT} x2={PL + PW / 2} y2={PB} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={PL} y1={PT + PH / 2} x2={PR} y2={PT + PH / 2} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />

        {/* Quadrant label (empty one) */}
        <text x={PL + PW * 0.72} y={PT + 18} fontSize="8" fill="#d1fae5" fontWeight="700" fontFamily="Outfit, system-ui" textAnchor="middle">
          categoria vazia →
        </text>
        <text x={PL + PW * 0.72} y={PT + 28} fontSize="8" fill="#d1fae5" fontWeight="600" fontFamily="DM Sans, system-ui" textAnchor="middle">
          VitaCodex ocupa aqui
        </text>

        {/* Axis labels */}
        <text x={(PL + PR) / 2} y={PB + 22} textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="600" fontFamily="DM Sans, system-ui">
          Profundidade de dado →
        </text>
        <text
          x={14}
          y={(PT + PB) / 2}
          textAnchor="middle"
          fontSize="9"
          fill="#9ca3af"
          fontWeight="600"
          fontFamily="DM Sans, system-ui"
          transform={`rotate(-90, 14, ${(PT + PB) / 2})`}
        >
          ← Valor de decisão
        </text>

        {/* Dots */}
        {dots.map(({ name, abbr, xPct, yPct, color, size }) => {
          const cx = PL + (xPct / 100) * PW;
          const cy = PB - (yPct / 100) * PH;
          const r = size / 2;
          return (
            <g key={name}>
              {name === 'VitaCodex' && (
                <circle cx={cx} cy={cy} r={r + 8} fill="#18c56e" opacity="0.1" />
              )}
              <circle cx={cx} cy={cy} r={r} fill={color} opacity={name === 'VitaCodex' ? 1 : 0.75} />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="700" fontFamily="Outfit, system-ui">
                {abbr}
              </text>
              <text
                x={cx}
                y={cy + r + 14}
                textAnchor="middle"
                fontSize="9"
                fill={name === 'VitaCodex' ? '#0f8e57' : '#6b7280'}
                fontWeight={name === 'VitaCodex' ? '700' : '500'}
                fontFamily="DM Sans, system-ui"
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Competitive cell helper ──────────────────────────────────────────────────
function Cell({ value, vitaGood, isVita }: { value: string; vitaGood: boolean; isVita?: boolean }) {
  const isGoodVita = isVita && vitaGood;
  const isBadVita = isVita && !vitaGood;
  const isGoodOther = !isVita && value.startsWith('✓');
  const isBad = !isVita && value === '✗';

  return (
    <td
      className={`px-3 py-2.5 text-xs leading-5 border-b border-gray-100 ${
        isGoodVita ? 'bg-emerald-50 text-emerald-700 font-semibold' :
        isBadVita ? 'bg-gray-50 text-gray-400' :
        isGoodOther ? 'text-gray-700 font-medium' :
        isBad ? 'text-gray-300' :
        'text-gray-500'
      }`}
    >
      {value}
    </td>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Mercado() {
  return (
    <section id="mercado" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
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
            <span className="font-mono">06</span>
            Mercado · Oportunidade
          </div>
          <h2 className="font-['Outfit'] text-4xl font-bold tracking-[-0.05em] text-gray-900 md:text-5xl">
            Mercado de $35B com uma<br />
            <span className="text-emerald-600">categoria vazia no quadrante certo.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-8 text-gray-500">
            Todos os concorrentes são produtos de relatório. VitaCodex é o primeiro sistema de decisão contínua baseado em genética. O quadrante "alto dado + alta ação" não tem ocupante.
          </p>
        </motion.div>

        {/* KPI strip */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border p-5 bg-white shadow-sm"
              style={{ borderColor: kpi.border }}
            >
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: kpi.color }}>
                {kpi.label}
              </div>
              <div className="font-['Outfit'] text-4xl font-bold tracking-[-0.04em]" style={{ color: kpi.color }}>
                {kpi.value}
              </div>
              <div className="mt-1.5 text-[11px] text-gray-400">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* 23andMe callout */}
        <motion.div
          className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 h-9 w-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-1">Janela estratégica · 2025</div>
              <p className="text-sm leading-7 text-emerald-800">
                A 23andMe entrou em falência em 2025 com <span className="font-semibold">14M+ usuários</span> que já têm seus dados e não têm mais produto. O modelo import-first do VitaCodex — que ingere arquivos 23andMe/AncestryDNA existentes sem exigir novo kit — captura essa janela com <span className="font-semibold">custo de aquisição de DNA zero</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Competitive matrix + positioning map */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">

          {/* Feature matrix */}
          <motion.div
            className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900">Feature matrix · comparativo honesto</div>
              <div className="text-[11px] text-gray-400 mt-0.5">linhas verdes = VitaCodex único · linha cinza = ainda não implementado</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400 min-w-[140px]">Feature</th>
                    <th className="px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">23andMe</th>
                    <th className="px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">CircleDNA</th>
                    <th className="px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">Nebula</th>
                    <th className="px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-600 bg-emerald-50/50">VitaCodex</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_FEATURES.map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 text-xs font-medium text-gray-700 border-b border-gray-100">{row.label}</td>
                      <Cell value={row.v23} vitaGood={row.vitaGood} />
                      <Cell value={row.vCircle} vitaGood={row.vitaGood} />
                      <Cell value={row.vNebula} vitaGood={row.vitaGood} />
                      <Cell value={row.vVita} vitaGood={row.vitaGood} isVita />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Positioning map + market share */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <PositioningMap />
            </motion.div>

            {/* Market share bars */}
            <motion.div
              className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.18em] mb-4">Share DTC · est. 2024</div>
              {[
                { name: '23andMe', pct: 52, color: '#9ca3af' },
                { name: 'AncestryDNA', pct: 28, color: '#60a5fa' },
                { name: 'CircleDNA', pct: 8, color: '#a78bfa' },
                { name: 'Nebula + outros', pct: 7, color: '#fb923c' },
                { name: 'VitaCodex → novo quadrante', pct: 3, color: '#18c56e' },
              ].map(({ name, pct, color }, i) => (
                <div key={name} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs ${name.includes('VitaCodex') ? 'font-semibold text-emerald-700' : 'text-gray-600'}`}>{name}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color }}>{name.includes('VitaCodex') ? '0% → ?' : `${pct}%`}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Three tailwinds */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TAILWINDS.map((tw, i) => (
            <motion.div
              key={tw.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="mb-4 grid h-11 w-11 place-items-center rounded-2xl"
                style={{ backgroundColor: `${tw.color}18`, color: tw.color }}
              >
                {tw.icon}
              </div>
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: tw.color }}>
                Tailwind {i + 1}
              </div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900 leading-snug">{tw.title}</h4>
              <p className="text-xs leading-6 text-gray-500">{tw.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* VitaCodex unique position callout */}
        <motion.div
          className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="absolute top-4 right-5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
            Diferencial estrutural
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.22em] text-emerald-600">
                Posicionamento competitivo
              </div>
              <h3 className="font-['Outfit'] text-2xl font-bold tracking-[-0.04em] text-gray-900 mb-3">
                "Arquitetura de clusters em vez de lista de SNPs. O loop de feedback é o produto. Modelagem explícita de incerteza."
              </h3>
              <p className="text-sm leading-7 text-gray-600 max-w-2xl">
                Agrupar SNPs em 6 clusters funcionais é a abstração certa — nenhum concorrente faz isso. O ciclo DNA→Clinical Sync→Target cria retenção que nenhum produto baseado em relatório consegue. E modelar incerteza explicitamente é mais defensável frente a escrutínio regulatório.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 shrink-0">
              {[
                { label: '6 clusters biológicos', color: '#1D9E75' },
                { label: 'Loop de feedback fechado', color: '#3f6df6' },
                { label: 'Incerteza explícita (Primary/Exploratory)', color: '#b846ff' },
                { label: 'Import-first · zero custo de DNA', color: '#f28a22' },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
