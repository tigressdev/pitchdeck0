// ─── Existing types (unchanged from v0.1) ────────────────────────────────────

export interface Marker {
  id: string;
  gene: string;
  genotype: string;
  cluster: string;
  clusterColor: string;
  confidence: number;
  tone: string;
  insight: string;
  action: string;
  terminalLines: string[];
}

// ─── Markers — used by TransformDemo (UNCHANGED) ─────────────────────────────

export const MARKERS: Marker[] = [
  {
    id: 'rs7903146',
    gene: 'TCF7L2',
    genotype: 'CT',
    cluster: 'Metabolismo & Glicemia',
    clusterColor: '#2ec98f',
    confidence: 88,
    tone: 'Alta confiança',
    insight:
      'Tendência intermediária de sensibilidade glicêmica. Útil para orientar rotina alimentar com menor carga glicêmica e monitoramento preventivo.',
    action:
      'Priorizar proteína no café da manhã e acompanhar glicemia/insulina com profissional de saúde.',
    terminalLines: [
      '$ vita query --snp rs7903146',
      '',
      '> scanning codex v6.3...',
      '> match found: rs7903146',
      '> gene:      TCF7L2',
      '> locus:     10q25.2',
      '> genotype:  CT  (heterozygous)',
      '> effect:    risk allele T',
      '> OR:        1.32  (95% CI: 1.19–1.47)',
      '> p_value:   3.7e-33',
      '> study:     GWAS T2D meta-analysis',
      '> N:         68,000 participants',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
  {
    id: 'rs4680',
    gene: 'COMT',
    genotype: 'GA',
    cluster: 'Neurociência & Foco',
    clusterColor: '#b846ff',
    confidence: 79,
    tone: 'Confiança moderada',
    insight:
      'Perfil intermediário de processamento dopaminérgico. O impacto prático depende muito de sono, estresse e contexto pessoal.',
    action:
      'Usar rotina estável, blocos de foco e proteção de sono antes de intensificar metas cognitivas.',
    terminalLines: [
      '$ vita query --snp rs4680',
      '',
      '> scanning codex v6.3...',
      '> match found: rs4680',
      '> gene:      COMT',
      '> locus:     22q11.21',
      '> genotype:  GA  (Val158Met heterozygous)',
      '> effect:    intermediate COMT activity',
      '> type:      missense variant',
      '> pathway:   dopamine catabolism',
      '> note:      context-dependent expression',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
  {
    id: 'rs429358+rs7412',
    gene: 'APOE',
    genotype: 'ε3/ε3',
    cluster: 'Cardiovascular & Lipídios',
    clusterColor: '#f28a22',
    confidence: 91,
    tone: 'Alta confiança composta',
    insight:
      'Leitura composta exige dois marcadores. O valor não está em um SNP isolado, mas na interpretação combinada da isoforma APOE e seu impacto no metabolismo lipídico.',
    action:
      'Cruzar com LDL, HDL e triglicérides clínicos antes de gerar recomendação — Clinical Sync obrigatório.',
    terminalLines: [
      '$ vita query --compound APOE',
      '',
      '> scanning codex v6.3...',
      '> mode:      compound haplotype',
      '> snp_1:     rs429358  (C/T)',
      '> snp_2:     rs7412    (C/T)',
      '> haplotype: ε3/ε3  (most common)',
      '> gene:      APOE',
      '> locus:     19q13.32',
      '> pathway:   lipid transport & clearance',
      '> caveat:    requires 2-SNP co-interpretation',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
];

// ─── Pipeline steps — used by HowItWorks ─────────────────────────────────────

export const PIPELINE_STEPS = [
  {
    id: 'codex',
    icon: 'database',
    title: 'Codex Curado',
    subtitle: '33 SNPs validados',
    desc: 'Base de conhecimento curada manualmente: rsID, gene, genótipo, odds ratio e estudos GWAS para cada variante. Trabalho de curadoria acumulado — não é dataset público.',
    accent: '#1D9E75',
  },
  {
    id: 'engine',
    icon: 'cpu',
    title: 'Engine v6',
    subtitle: 'Retrieval híbrido FAISS + BM25',
    desc: 'FAISS + BM25 + lookup dedicado com 50+ aliases clínicos. Early-exit, two-tier primary/exploratory. Zero alucinação de dados genéticos.',
    accent: '#3f6df6',
  },
  {
    id: 'vita',
    icon: 'sparkles',
    title: 'Vita Agent',
    subtitle: 'Confidence gate + abstain flag',
    desc: 'Tradução para linguagem clínica com gate de confiança. O sistema sabe o que sabe — e sabe quando não sabe. Avisa em vez de inventar.',
    accent: '#b846ff',
  },
  {
    id: 'sync',
    icon: 'sync',
    title: 'Clinical Sync',
    subtitle: 'DNA × exames laboratoriais',
    desc: 'Cruzamento genótipo × exames reais do paciente. A ponte de integração B2B — o que nenhum app de genética brasileiro faz via API hoje.',
    accent: '#f28a22',
  },
];

// ─── Market — used by Business ────────────────────────────────────────────────

export const MARKET = [
  { label: 'TAM', value: '$35B', desc: 'Mercado global de genômica · CAGR ~18%/ano' },
  { label: 'SAM', value: '$12B', desc: 'Health tech personalizada · adjacência de maior crescimento' },
  { label: 'SOM', value: '$80M', desc: 'Healthtechs e clínicas com genética, BR' },
];

// ─── ICPs — used by Business ──────────────────────────────────────────────────

export const ICPS = [
  {
    icon: 'clinic' as const,
    title: 'Clínicas & Nutricionistas',
    desc: 'Relatórios genéticos integrados ao prontuário, com linguagem clínica e ações acionáveis. Valida Clinical Sync.',
    accent: '#1D9E75',
    validated: true,
  },
  {
    icon: 'shield' as const,
    title: 'Operadoras de Saúde',
    desc: 'BI de risco preventivo via perfil genético — redução de sinistros antes que virem custo. Valida segmento B2B.',
    accent: '#b846ff',
    validated: true,
  },
  {
    icon: 'plug' as const,
    title: 'EMRs / SaaS Healthtech',
    desc: 'API plug-and-play para sistemas de prontuário existentes. "Se for API bem documentada, integro em semanas."',
    accent: '#3f6df6',
    validated: true,
  },
  {
    icon: 'user' as const,
    title: 'D2C Vitrine',
    desc: 'App direto ao consumidor como porta de entrada. Sustenta caixa no cenário realista e prova product-market fit.',
    accent: '#f28a22',
    validated: false,
  },
];

// ─── Ticker items — used by TickerBar ─────────────────────────────────────────

export const TICKER_ITEMS = [
  'rs7903146 · TCF7L2 · CT · OR 1.32',
  'rs4680 · COMT · GA · Val/Met',
  'rs429358 · APOE · C/T · ε3',
  'rs1801282 · PPARG · CG · Pro/Ala',
  'rs1815739 · ACTN3 · CT · R/X',
  'rs12255372 · TCF7L2 · GT · OR 1.29',
  'rs9939609 · FTO · AT · OR 1.67',
  'rs1801133 · MTHFR · CT · C677T',
  'rs2228570 · VDR · TC · FokI',
  'rs1800497 · DRD2 · GA · Taq1A',
  'rs6265 · BDNF · GA · Val66Met',
  'rs1799945 · HFE · CG · H63D',
  'rs4994 · ADRB3 · AG · Trp64Arg',
  'rs5443 · GNB3 · CT · C825T',
  'rs2234693 · ESR1 · CT · PvuII',
];

// ─── NEW: Problems (Seção 1+2 do roteiro) ────────────────────────────────────

export const PROBLEMS = [
  {
    id: '01',
    title: 'Relatórios genéticos não viram ação',
    quote: 'Ela paga. Cospe numa caixinha. Espera duas semanas. E recebe… isso.',
    desc: 'Páginas de rs7903146, TCF7L2, OR 1,32, p-valor 3,7e-33. Dados reais. Dados importantes. Dados que ela nunca vai conseguir usar. Porque ninguém traduziu.',
    confirmed: 'Confirmado nas entrevistas com usuários finais',
    accentClass: 'border-emerald-400 text-emerald-600',
    topBarClass: 'bg-emerald-500',
  },
  {
    id: '02',
    title: 'O médico não tem ferramenta — e o mercado não quer mais uma plataforma',
    quote: 'O dado existe. A interpretação, não.',
    desc: 'O médico, quando recebe o laudo, muitas vezes não tem como cruzar com os exames clínicos. Clínicas e operadoras já têm sistemas — precisam de uma camada que se integre, não de um app novo para aprender.',
    confirmed: 'Confirmado nas entrevistas com compradores B2B',
    accentClass: 'border-amber-400 text-amber-600',
    topBarClass: 'bg-amber-500',
  },
  {
    id: '03',
    title: 'LLM genérico não resolve genômica clínica',
    quote: 'Um chatbot que alucina em saúde é um risco, não uma solução.',
    desc: 'Genômica exige rastreabilidade: rsID, gene, genótipo, confiança e capacidade de não responder quando a evidência é fraca. Um sistema genérico não tem isso.',
    confirmed: 'Diferencial técnico eliminatório para B2B',
    accentClass: 'border-blue-400 text-blue-600',
    topBarClass: 'bg-blue-500',
  },
];

// ─── NEW: Stakeholder interviews (Seção 2 do roteiro) ────────────────────────

export const INTERVIEWS = [
  {
    id: 'I1',
    avatar: '👤',
    name: 'Usuário leigo — Profissional 34 anos',
    role: 'Recebeu laudo 23andMe · São Paulo',
    quote: '"Recebi um PDF com dezenas de páginas e gráficos. Não fiz nada com isso. Não sabia o que pedir pro médico, nem se devia me preocupar com alguma coisa."',
    insight: '→ Valida Problema #1: dado sem ação',
    insightColor: 'emerald' as const,
  },
  {
    id: 'I2',
    avatar: '🥗',
    name: 'Nutricionista clínica — 8 anos de experiência',
    role: 'Consultório particular · SP',
    quote: '"Quando o paciente traz o genético, fico curiosa mas não tenho ferramenta para cruzar com os exames. Precisaria de algo que entrasse no meu fluxo de atendimento, não um sistema novo pra aprender."',
    insight: '→ Valida Clinical Sync + integração B2B',
    insightColor: 'blue' as const,
  },
  {
    id: 'I3',
    avatar: '📊',
    name: 'Gestor de operadora de saúde',
    role: 'Análise de risco e custos',
    quote: '"Nós já fazemos análise de quem usa mais, quem custa mais. Se houvesse uma camada genômica que eu pudesse plugar no meu BI ou sistema de glosa, seria muito relevante para prevenção."',
    insight: '→ Valida segmento planos de saúde',
    insightColor: 'amber' as const,
  },
  {
    id: 'I4',
    avatar: '💻',
    name: 'Desenvolvedor de EMR (prontuário)',
    role: 'Healthtech nacional',
    quote: '"Nossos clientes (médicos e clínicas) pedem personalização, mas a gente não vai construir um motor genômico do zero. Se for uma API bem documentada, consigo integrar em semanas."',
    insight: '→ Valida modelo API-first plug-and-play',
    insightColor: 'blue' as const,
  },
  {
    id: 'I5',
    avatar: '🩺',
    name: 'Médica — mentoria de healthtechs · EUA',
    role: 'Especialista de mercado · Entrevista qualitativa em profundidade',
    quote: '"Seria muito legal disponibilizar isso como API. O comprador pode ser clínica, operadora ou prontuário — você descobre quem vai de fato pagar quando começar a oferecer."',
    insight: '→ Pivô estratégico: B2C → API-first',
    insightColor: 'emerald' as const,
  },
];

// ─── NEW: Learnings from interviews ──────────────────────────────────────────

export const LEARNINGS = [
  {
    icon: '🔄',
    title: 'Pivô B2C → API-first',
    desc: 'Comprador final descoberto por experimentação comercial. Arquitetura plug-and-play permite testar todos os segmentos sem reconstruir o produto.',
  },
  {
    icon: '🔗',
    title: 'Clinical Sync vira produto',
    desc: 'O cruzamento genótipo + exames deixa de ser feature secundária e vira a ponte principal de integração B2B.',
  },
  {
    icon: '🎯',
    title: 'ICP provável é B2B',
    desc: 'Pagador mais provável é institucional: clínica, operadora ou EMR — não o paciente diretamente.',
  },
  {
    icon: '🛡️',
    title: 'Rastreabilidade é crítica',
    desc: 'Todos os perfis B2B exigiram justificativa clínica. O confidence gate e abstain flag endereçam isso diretamente.',
  },
];

// ─── NEW: Financial scenarios (Seção 5 do roteiro) ───────────────────────────

export interface FinancialPhase {
  phase: string;
  period: string;
  action: string;
  mrr: string;
  costs: string;
}

export interface FinancialScenario {
  id: string;
  label: string;
  emoji: string;
  metrics: { value: string; label: string; note: string }[];
  phases: FinancialPhase[];
  note: string;
}

export const FINANCIAL_OPTIMISTIC: FinancialScenario = {
  id: 'otimista',
  label: 'Cenário Otimista',
  emoji: '🟢',
  metrics: [
    { value: 'R$240k', label: 'MRR Mês 12', note: 'Ano 1' },
    { value: '2', label: 'Clientes B2B', note: 'Institucionais' },
    { value: 'Mês 8', label: 'Break-even', note: 'Operacional' },
    { value: 'R$1.2M', label: 'ARR Ano 2', note: 'Projetado' },
  ],
  phases: [
    { phase: 'MVP técnico', period: 'Mês 1–3', action: 'API endpoints + validação com 3 compradores B2B', mrr: 'R$0 → R$5k', costs: 'Dev + infra' },
    { phase: 'Piloto B2B', period: 'Mês 4–6', action: '1 contrato clínica/healthtech — 20 pacientes/mês', mrr: 'R$5k → R$40k', costs: 'Dev + suporte + compliance' },
    { phase: 'Escala', period: 'Mês 7–9', action: '2º contrato institucional + D2C como vitrine', mrr: 'R$40k → R$120k', costs: 'Marketing B2B + equipe' },
    { phase: 'Crescimento', period: 'Mês 10–12', action: '3 contratos ativos + upsell de volume', mrr: 'R$120k → R$240k', costs: 'Infra escalável + CS' },
  ],
  note: 'Ticket médio B2B R$8k/mês por 1.000 pacientes processados. CAC estimado R$15k/cliente institucional. LTV:CAC ≥ 3 a partir do mês 10.',
};

export const FINANCIAL_REALISTIC: FinancialScenario = {
  id: 'realista',
  label: 'Cenário Realista',
  emoji: '🟡',
  metrics: [
    { value: 'R$60k', label: 'MRR Mês 12', note: 'Ano 1' },
    { value: '1', label: 'Cliente B2B', note: 'Institucional' },
    { value: 'Mês 14', label: 'Break-even', note: 'Operacional' },
    { value: 'R$380k', label: 'ARR Ano 2', note: 'Projetado' },
  ],
  phases: [
    { phase: 'MVP + D2C', period: 'Mês 1–4', action: 'Lançamento D2C + primeiras assinaturas', mrr: 'R$0 → R$3k', costs: 'Dev + marketing digital' },
    { phase: 'Validação B2B', period: 'Mês 5–8', action: 'Entrevistas comerciais + POC com 1 clínica', mrr: 'R$3k → R$15k', costs: 'Dev + vendas + compliance' },
    { phase: '1º contrato', period: 'Mês 9–11', action: '1 contrato institucional fechado', mrr: 'R$15k → R$40k', costs: 'Suporte + infra + equipe' },
    { phase: 'Estabilização', period: 'Mês 12–14', action: 'Renovação + início de 2ª prospecção B2B', mrr: 'R$40k → R$60k', costs: 'CS + crescimento de equipe' },
  ],
  note: 'Ciclo de vendas B2B de 3–5 meses. 1 renovação garantida no Ano 2. Churn < 10%/ano. D2C sustenta fluxo de caixa inicial.',
};

// ─── NEW: Roadmap phases (Seção 6 do roteiro) ────────────────────────────────

export const ROADMAP_PHASES = [
  {
    id: 'S1',
    phase: 'Sprint 1',
    timing: 'Agora · < 1 semana',
    title: 'Fechar o loop do protótipo',
    desc: 'Patch no Clinical Sync pós-upload, confidence gate visual e copy API-first na Home. Protótipo passa de A− para A. Demo mais forte para a banca.',
    chips: ['< 1 semana', 'demo mais forte'],
    kpi: 'Protótipo A',
    color: '#1D9E75',
    chipStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'V',
    phase: 'Validação',
    timing: 'Semana 2–4',
    title: 'Ampliar entrevistas comerciais',
    desc: 'Expandir de 5 para 15 entrevistas com compradores B2B: médicos, nutricionistas, gestores EMR e operadoras. Definir ICP prioritário com evidência real.',
    chips: ['ICP definido', 'evidência comercial'],
    kpi: 'Hipótese validada',
    color: '#3f6df6',
    chipStyle: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  {
    id: 'MVP',
    phase: 'MVP técnico',
    timing: 'Mês 1–2',
    title: 'API como produto vendável',
    desc: 'Endpoints reais: /analyze, /sync, /explain. UI vira vitrine e sandbox. Primeiras conversas comerciais com compradores identificados na fase de validação.',
    chips: ['API-first', '1º cliente potencial'],
    kpi: 'Produto vendável',
    color: '#b846ff',
    chipStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
  },
  {
    id: 'P',
    phase: 'Piloto',
    timing: 'Mês 2–4',
    title: 'Beta com profissional de saúde',
    desc: '10–20 pacientes com consentimento e dados reais. Medir clareza, utilidade e confiança. Conformidade LGPD como critério de entrada — não negociável.',
    chips: ['LGPD', 'dados reais', 'tração inicial'],
    kpi: 'Tração inicial',
    color: '#f28a22',
    chipStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
];

// ─── Journey phases (v0.1 unchanged) ─────────────────────────────────────────

export const JOURNEY_PHASES = [
  { id: 'P1', date: 'Ago 2025', title: 'NutriNest', note: 'Smart fridge + IoT + hardware consumer B2C', color: '#1D9E75' },
  { id: 'P2', date: 'Out 2025', title: 'Hub Digital', note: 'DNA + wearables + exames clínicos integrados', color: '#3f6df6' },
  { id: 'P3', date: 'Dez 2025', title: 'Modelo B2B', note: 'Financeiro, ICP dual, parceiros e stakeholders', color: '#b846ff' },
  { id: 'P4', date: 'Abr 2026', title: 'VitaCodex', note: 'Pivot para API-first genômica — produto ao vivo', color: '#f28a22', isPivot: true },
];
