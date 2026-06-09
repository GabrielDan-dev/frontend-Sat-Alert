export default function Sobre() {
  return (
    <div className="container-page py-12 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-3">Sobre o <span className="text-primary">SatAlert</span></h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Tecnologia espacial a serviço do meio ambiente brasileiro.
        </p>
      </header>

      <section className="card-space p-8">
        <h2 className="text-2xl font-semibold mb-3 text-primary">Nossa missão</h2>
        <p className="text-text-muted leading-relaxed">
          Reduzir o tempo de resposta a focos de queimada e identificar áreas em risco de
          desmatamento antes que o dano se torne irreversível. O SatAlert nasce do projeto
          FIAP Global Solution 2026 com foco em uma plataforma única para órgãos ambientais,
          pesquisadores e a sociedade civil.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="card-space p-6">
          <h3 className="font-semibold text-lg mb-2 text-secondary">O problema</h3>
          <p className="text-sm text-text-muted">
            O Brasil concentra os maiores índices de queimadas e desmatamento da América Latina.
            A falta de integração entre dados de diferentes satélites e a demora na verificação
            dificultam a ação dos fiscais.
          </p>
        </section>
        <section className="card-space p-6">
          <h3 className="font-semibold text-lg mb-2 text-secondary">A solução</h3>
          <p className="text-sm text-text-muted">
            Centralizamos detecções de múltiplos satélites, aplicamos classificação por IA para
            severidade e tipo, e entregamos um painel único com fluxo de status — do alerta
            aberto até a resolução em campo.
          </p>
        </section>
      </div>

      <section className="card-space p-8">
        <h2 className="text-2xl font-semibold mb-4">Tecnologias</h2>
        <div className="flex flex-wrap gap-2">
          {["React 18", "Vite", "TypeScript", "Tailwind CSS", "React Router DOM", "Java + Spring", "Python + Flask", "Oracle Database"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-space-bg border border-space-border text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="card-space p-8">
        <h2 className="text-2xl font-semibold mb-4">Órgãos parceiros</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { sigla: "IBAMA", desc: "Fiscalização ambiental federal" },
            { sigla: "INPE", desc: "Pesquisas espaciais e satélites" },
            { sigla: "MMA", desc: "Políticas públicas ambientais" },
          ].map((o) => (
            <div key={o.sigla} className="p-4 rounded-lg bg-space-bg border border-space-border">
              <div className="text-xl font-bold text-primary">{o.sigla}</div>
              <div className="text-xs text-text-muted mt-1">{o.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// pagina sobre
