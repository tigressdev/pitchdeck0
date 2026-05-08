import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SVG geometry ─────────────────────────────────────────────────────────────
const CX = 240, CY = 230, R = 158;

function toXY(deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [+(CX + R * Math.cos(rad)).toFixed(1), +(CY + R * Math.sin(rad)).toFixed(1)];
}

const [DNA_X, DNA_Y] = toXY(-90);    // top       ≈ (240, 72)
const [SYN_X, SYN_Y] = toXY(30);    // right-bot ≈ (377, 309)
const [TGT_X, TGT_Y] = toXY(150);   // left-bot  ≈ (103, 309)

const ARCS = [
  `M ${DNA_X} ${DNA_Y} A ${R} ${R} 0 0 1 ${SYN_X} ${SYN_Y}`,
  `M ${SYN_X} ${SYN_Y} A ${R} ${R} 0 0 1 ${TGT_X} ${TGT_Y}`,
  `M ${TGT_X} ${TGT_Y} A ${R} ${R} 0 0 1 ${DNA_X} ${DNA_Y}`,
];

const NODE_COLORS = ['#2ec98f', '#3f6df6', '#b846ff'];
const NODE_COLORS_DIM = ['rgba(46,201,143,0.18)', 'rgba(63,109,246,0.18)', 'rgba(184,70,255,0.18)'];

// ─── Icons (inline SVG paths, 24×24 reference box) ───────────────────────────
function IconDNA({ active }: { active: boolean }) {
  return (
    <g transform={`translate(${DNA_X - 12}, ${DNA_Y - 12})`}>
      <path d="M4 2c4 5 4 17 0 22M20 2c-4 5-4 17 0 22" stroke={active ? '#2ec98f' : 'rgba(255,255,255,0.45)'} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M5 7h14M4 12h16M5 17h14" stroke={active ? '#2ec98f' : 'rgba(255,255,255,0.35)'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function IconSync({ active }: { active: boolean }) {
  const c = active ? '#3f6df6' : 'rgba(255,255,255,0.45)';
  return (
    <g transform={`translate(${SYN_X - 12}, ${SYN_Y - 13})`}>
      <path d="M6 2h9l5 5v17H6z" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M15 2v6h5" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M9 10h8M9 13h8M9 16h5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M21 19 A 3 3 0 1 1 18 22" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M21 19 l0 3-3 0" stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function IconTarget({ active }: { active: boolean }) {
  const c = active ? '#b846ff' : 'rgba(255,255,255,0.45)';
  return (
    <g transform={`translate(${TGT_X - 12}, ${TGT_Y - 12})`}>
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="6" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill={c} />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

// ─── Orbit SVG ────────────────────────────────────────────────────────────────
function OrbitSVG({ activeStep }: { activeStep: number }) {
  const dotRef = useRef<SVGCircleElement>(null);
  const dotGlowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const TOTAL_MS = 9000;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = ((ts - startTime) % TOTAL_MS) / TOTAL_MS;
      const angle = (-90 + 360 * progress) * (Math.PI / 180);
      const x = +(CX + R * Math.cos(angle)).toFixed(1);
      const y = +(CY + R * Math.sin(angle)).toFixed(1);
      if (dotRef.current) { dotRef.current.setAttribute('cx', String(x)); dotRef.current.setAttribute('cy', String(y)); }
      if (dotGlowRef.current) { dotGlowRef.current.setAttribute('cx', String(x)); dotGlowRef.current.setAttribute('cy', String(y)); }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const nodePositions: [number, number][] = [[DNA_X, DNA_Y], [SYN_X, SYN_Y], [TGT_X, TGT_Y]];
  const nodeLabels = ['DNA Explorer', 'Clinical Sync', 'Target'];
  const nodeSubs = ['Analisa & prevê', 'Valida com labs', 'Define & ajusta'];

  const labelProps: Array<{ textAnchor: 'middle' | 'start' | 'end'; dy: number; dx: number }> = [
  { textAnchor: 'middle', dy: -52, dx: 0  },   // DNA — topo, não muda
  { textAnchor: 'start',  dy: -8,  dx: 44 },   // Clinical Sync — direita
  { textAnchor: 'end',    dy: -8,  dx: -44 },  // Target — esquerda
];
  return (
    <svg viewBox="0 0 480 460" className="w-full max-w-[480px] mx-auto" aria-hidden="true">
      <defs>
        <filter id="tc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="tc-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>

      {/* Dashed orbit ring */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 9" />

      {/* Inactive arc base */}
      {ARCS.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
      ))}

      {/* Active arc (draws itself) */}
      {ARCS.map((d, i) => (
        <motion.path
          key={`active-${i}`}
          d={d}
          fill="none"
          stroke={NODE_COLORS[i]}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: activeStep === i ? 1 : 0,
            opacity: activeStep === i ? 1 : 0,
          }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Node glows (active) */}
      {nodePositions.map(([nx, ny], i) =>
        activeStep === i ? (
          <circle key={`glow-${i}`} cx={nx} cy={ny} r="52" fill={NODE_COLORS[i]} opacity="0.08" />
        ) : null
      )}

      {/* Node circles */}
      {nodePositions.map(([nx, ny], i) => (
        <motion.circle
          key={`node-${i}`}
          cx={nx}
          cy={ny}
          r="36"
          fill={activeStep === i ? NODE_COLORS_DIM[i] : 'rgba(255,255,255,0.04)'}
          stroke={activeStep === i ? NODE_COLORS[i] : 'rgba(255,255,255,0.14)'}
          strokeWidth={activeStep === i ? 2 : 1.5}
          animate={{
            stroke: activeStep === i ? NODE_COLORS[i] : 'rgba(255,255,255,0.14)',
            fill: activeStep === i ? NODE_COLORS_DIM[i] : 'rgba(255,255,255,0.04)',
          }}
          transition={{ duration: 0.4 }}
        />
      ))}

      {/* Icons */}
      <IconDNA active={activeStep === 0} />
      <IconSync active={activeStep === 1} />
      <IconTarget active={activeStep === 2} />

      {/* Node labels */}
      {nodePositions.map(([nx, ny], i) => {
        const lp = labelProps[i];
        return (
          <g key={`label-${i}`}>
            <text
              x={nx + lp.dx}
              y={ny + lp.dy}
              textAnchor={lp.textAnchor}
              fontSize="11.5"
              fontWeight="700"
              fontFamily="Outfit, system-ui, sans-serif"
              fill={activeStep === i ? 'white' : 'rgba(255,255,255,0.45)'}
            >
              {nodeLabels[i]}
            </text>
            <text
              x={nx + lp.dx}
              y={ny + lp.dy + 16}
              textAnchor={lp.textAnchor}
              fontSize="9.5"
              fontFamily="DM Sans, system-ui, sans-serif"
              fill={activeStep === i ? NODE_COLORS[i] : 'rgba(255,255,255,0.25)'}
            >
              {nodeSubs[i]}
            </text>
          </g>
        );
      })}

      {/* Center hub */}
      <circle cx={CX} cy={CY} r="30" fill="rgba(46,201,143,0.08)" stroke="rgba(46,201,143,0.25)" strokeWidth="1.5" />
      <text x={CX} y={CY - 5} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Outfit, system-ui" fill="rgba(255,255,255,0.6)">vita</text>
      <text x={CX} y={CY + 8} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Outfit, system-ui" fill="rgba(255,255,255,0.6)">codex</text>

      {/* Animated dot glow */}
      <circle ref={dotGlowRef} cx={DNA_X} cy={DNA_Y} r="16" fill="#2ec98f" opacity="0.25" filter="url(#tc-dot-glow)" />
      {/* Animated dot */}
      <circle ref={dotRef} cx={DNA_X} cy={DNA_Y} r="7" fill="#2ec98f" filter="url(#tc-glow)" />
      <circle ref={useRef(null)} cx={DNA_X} cy={DNA_Y} r="3.5" fill="white" opacity="0.9" />

      {/* Step counter badge */}
      <rect x={CX - 22} y={CY + 36} width="44" height="18" rx="9" fill="rgba(46,201,143,0.15)" stroke="rgba(46,201,143,0.3)" strokeWidth="1" />
      <text x={CX} y={CY + 49} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="rgba(46,201,143,0.9)" fontWeight="500">
        {`0${activeStep + 1} / 03`}
      </text>
    </svg>
  );
}

// ─── Step data (real demo content) ───────────────────────────────────────────
const STEPS = [
  {
    id: 'dna',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
        <path d="M7 2c5 4 5 16 0 20M17 2c-5 4-5 16 0 20M7.5 6h9M7 12h10M7.5 18h9" />
      </svg>
    ),
    label: 'DNA Explorer',
    color: '#2ec98f',
    colorBg: 'rgba(46,201,143,0.1)',
    colorBorder: 'rgba(46,201,143,0.25)',
    badge: '01 · DNA Explorer',
    headline: '32 SNPs analisados · 3 previsões ativas',
    items: [
      { label: 'TCF7L2 · CT', cluster: 'Metabolismo & glicemia', confidence: 88, color: '#2ec98f', note: 'Sensibilidade glicêmica elevada detectada' },
      { label: 'COMT · GA', cluster: 'Neurociência & foco', confidence: 79, color: '#b846ff', note: 'Foco bom, alta sensibilidade a estresse' },
      { label: 'APOE · ε3/ε3', cluster: 'Cardiovascular & lipídios', confidence: 91, color: '#f28a22', note: 'Atenção lipídica prioritária' },
    ],
    signal: '3 previsões enviadas → Clinical Sync',
    signalColor: '#3f6df6',
  },
  {
    id: 'sync',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M5 2h12l4 4v16H5z" />
        <path d="M17 2v5h4" />
        <path d="M9 10h8M9 13h6" />
        <path d="M17 18 A 3.5 3.5 0 1 1 14 21" />
        <path d="M17 18l0 3-3 0" />
      </svg>
    ),
    label: 'Clinical Sync',
    color: '#3f6df6',
    colorBg: 'rgba(63,109,246,0.1)',
    colorBorder: 'rgba(63,109,246,0.25)',
    badge: '02 · Clinical Sync',
    headline: 'DNA × exames laboratoriais cruzados',
    items: [
      { label: 'Glicemia: 98 mg/dL', cluster: 'alinhado TCF7L2 CT', confidence: 88, color: '#2ec98f', note: '← correlação confirmada ✓' },
      { label: 'LDL: 142 mg/dL', cluster: 'alinhado APOE ε3/ε3', confidence: 91, color: '#f28a22', note: '← atenção lipídica confirmada ✓' },
      { label: 'Vitamina D: 28 ng/mL', cluster: 'gap VDR GA detectado', confidence: 74, color: '#e45858', note: '← suplementação recomendada ⚠' },
    ],
    signal: 'Correlação clínica confirmada → Target',
    signalColor: '#b846ff',
  },
  {
    id: 'target',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    label: 'Target',
    color: '#b846ff',
    colorBg: 'rgba(184,70,255,0.1)',
    colorBorder: 'rgba(184,70,255,0.25)',
    badge: '03 · Target',
    headline: 'Metas adaptadas ao perfil genético',
    items: [
      { label: 'LDL < 130 mg/dL', cluster: 'prioridade alta · lipídio', confidence: 91, color: '#f28a22', note: 'Semana 2: LDL 134 mg/dL (−8) ✓' },
      { label: 'Carga glicêmica ↓30%', cluster: 'protocolo alimentar', confidence: 88, color: '#2ec98f', note: 'Semana 2: redução de 18% ✓' },
      { label: 'Vitamina D · 1 000 UI/dia', cluster: 'suplementação alvo', confidence: 74, color: '#3f6df6', note: 'Semana 1: iniciado ✓' },
    ],
    signal: 'Modelo reforçado → próximo ciclo em 7 dias',
    signalColor: '#2ec98f',
  },
] as const;

// ─── Data panel ───────────────────────────────────────────────────────────────
function DataPanel({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
          style={{ backgroundColor: step.colorBg, color: step.color, border: `1px solid ${step.colorBorder}` }}
        >
          {step.icon}
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: step.color }}>
            {step.badge}
          </div>
          <h3 className="mt-0.5 text-lg font-semibold leading-snug text-white tracking-[-0.02em]">
            {step.headline}
          </h3>
        </div>
      </div>

      {/* Data rows */}
      <div className="flex flex-col gap-2.5">
        {step.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="font-mono text-sm font-medium text-white">{item.label}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{item.cluster}</div>
              </div>
              <span className="font-mono text-sm font-semibold shrink-0" style={{ color: item.color }}>
                {item.confidence}%
              </span>
            </div>
            {/* Confidence bar */}
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.confidence}%` }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <div className="text-[11px] text-white/55 italic">{item.note}</div>
          </motion.div>
        ))}
      </div>

      {/* Signal badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: step.signalColor }}
        />
        <span className="font-mono text-xs text-white/70">{step.signal}</span>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function TriadCycle() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const step = STEPS[activeStep];

  return (
    <section
      id="ciclo"
      className="relative py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #050e08 0%, #0a1420 50%, #050e08 100%)' }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(46,201,143,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(46,201,143,.05) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
              <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
            </svg>
            04 · Produto · O ciclo Vita
          </div>
          <h2 className="font-['Syne'] text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl">
            Um ciclo inteligente que não para.
            <span className="block mt-1 text-emerald-400">DNA → Sync → Alvo → modelo reforçado.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-base leading-8 text-white/60">
            Cada semana, o sistema lê novos sinais, cruza com exames laboratoriais, ajusta metas e retroalimenta o modelo genômico. O dado genético não é estático : ele vira contexto contínuo.
          </p>
        </div>

        {/* Step tabs */}
        <div className="mb-10 flex justify-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(i)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                activeStep === i
                  ? 'text-white border-transparent'
                  : 'border-white/10 text-white/45 hover:text-white/70 hover:border-white/20'
              }`}
              style={activeStep === i ? { backgroundColor: NODE_COLORS_DIM[i], borderColor: NODE_COLORS[i] } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main content: orbit + data */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] items-center">
          {/* Left: SVG orbit */}
          <div className="relative rounded-[2rem] border border-white/8 bg-white/[0.02] p-6">
            <OrbitSVG activeStep={activeStep} />
            {/* Loop label */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/50">
                <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                ciclo contínuo · atualização semanal
              </div>
            </div>
          </div>

          {/* Right: Data panel */}
          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <DataPanel step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-14 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.07] p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Diferencial de produto
              </div>
              <h3 className="font-['Syne'] text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                "O loop é o produto — não os relatórios."
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60 max-w-2xl">
                Todos os concorrentes entregam um relatório estático. VitaCodex entrega um sistema fechado: DNA Explorer envia previsões, Clinical Sync valida com exames reais, Target ajusta metas e retroalimenta o modelo semana a semana. Retenção que nenhum produto de relatório consegue.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {[
                { label: 'DNA → previsão', color: '#2ec98f' },
                { label: 'Exames → correlação', color: '#3f6df6' },
                { label: 'Metas → modelo', color: '#b846ff' },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-white/80 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
