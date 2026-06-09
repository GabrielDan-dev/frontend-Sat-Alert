import { Link } from "react-router-dom";
import { useAlertaContext } from "@/context/AlertaContext";
import { BIOMA_LABELS } from "@/services/api";
import { BIOMAS } from "@/types";

export default function Home() {
  const { alertas } = useAlertaContext();
  const confirmados = alertas.filter((a) => a.status === "CONFIRMADO").length;
  const areaTotal = alertas.reduce((s, a) => s + a.areaAfetadaHa, 0);
  const satelitesAtivos = new Set(alertas.map((a) => a.satelite)).size || 5;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="container-page pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-xs text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            FIAP Global Solution 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">SatAlert</span> — Vigilância Ambiental via Satélite
          </h1>
          <p className="max-w-2xl mx-auto text-text-muted text-lg">
            Monitoramento em tempo real de queimadas e desmatamento no Brasil, integrando
            dados de satélites internacionais e brasileiros com classificação por IA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard" className="btn-primary">Ver Dashboard</Link>
            <Link to="/registrar" className="btn-ghost">Registrar Alerta</Link>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-primary/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center text-5xl animate-pulse-glow rounded-full">🛰️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de alertas", value: alertas.length, color: "text-primary" },
            { label: "Confirmados", value: confirmados, color: "text-sev-critico" },
            { label: "Área monitorada (ha)", value: areaTotal.toLocaleString("pt-BR", { maximumFractionDigits: 0 }), color: "text-secondary" },
            { label: "Satélites ativos", value: satelitesAtivos, color: "text-primary-glow" },
          ].map((s) => (
            <div key={s.label} className="card-space p-6">
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="container-page py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🛰️", title: "Detecção via Satélite", desc: "Satélites como GOES-16, MODIS e Amazonia-1 capturam dados térmicos e ópticos do território brasileiro." },
            { icon: "🤖", title: "Análise por IA", desc: "Modelos de classificação automática avaliam severidade, tipo e nível de confiança de cada detecção." },
            { icon: "🚒", title: "Ação dos Fiscais", desc: "Equipes do IBAMA e brigadistas recebem os alertas geolocalizados e atuam em campo." },
          ].map((c) => (
            <div key={c.title} className="card-space p-6 text-center">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Biomas */}
      <section className="container-page py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Biomas monitorados</h2>
        <p className="text-center text-text-muted mb-10">Cobertura nacional dos seis biomas brasileiros.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BIOMAS.map((b) => (
            <div key={b} className="card-space p-4 text-center hover:border-secondary/50 transition">
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-sm font-medium">{BIOMA_LABELS[b]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// home otimizada

// home otimizada
