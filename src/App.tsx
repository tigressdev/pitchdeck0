import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TickerBar } from './components/TickerBar';
import { Problema } from './components/Problema';
import { Validacao } from './components/Validacao';
import { TransformDemo } from './components/TransformDemo';
import { TriadCycle } from './components/TriadCycle';
import { HowItWorks } from './components/HowItWorks';
import { Mercado } from './components/Mercado';
import { Business } from './components/Business';
import { Financeiro } from './components/Financeiro';
import { Roadmap } from './components/Roadmap';
import { Journey } from './components/Journey';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Subtle green radial tint — top right, very soft */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 0%, rgba(29,158,117,.04) 0%, transparent 40%), radial-gradient(circle at 10% 100%, rgba(63,109,246,.03) 0%, transparent 35%)',
        }}
      />

      <Nav />
      <Hero />
      <TickerBar />

      {/* Seção 1+2 do roteiro: O problema humano + o que existe não resolve */}
      <Problema />

      {/* Seção 2 do roteiro: Entrevistamos cinco perfis */}
      <Validacao />

      {/* Seção 3 do roteiro: Demo do slider — o coração do vídeo
          TransformDemo is EXACTLY the same as v0.1.
          Wrapped in a dark section so the glass-morphism cards render correctly. */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, #0c1a14 0%, #050e08 50%, #0c1a14 100%)',
        }}
      >
        {/* Subtle grid overlay matching v0.1 aesthetic */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(46,201,143,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,201,143,.06) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <TransformDemo />
      </div>

      {/* Produto · O ciclo Vita: DNA Explorer → Clinical Sync → Target */}
      <TriadCycle />

      {/* Seção 4 do roteiro: Arquitetura + diferencial */}
      <HowItWorks />

      {/* Mercado: análise competitiva + $35B + 14M+ orphans */}
      <Mercado />

      {/* Seção 4 (final) do roteiro: 4 ICPs + modelo API */}
      <Business />

      {/* Seção 5 do roteiro: Dois cenários financeiros */}
      <Financeiro />

      {/* Seção 6 do roteiro: Próximos passos */}
      <Roadmap />

      {/* Contexto do pitch: origem e evolução NutriNest → VitaCodex */}
      <Journey />

      {/* Tagline final: "Seu corpo funciona em código. Nós te ajudamos a ler." */}
      <Footer />
    </div>
  );
}
