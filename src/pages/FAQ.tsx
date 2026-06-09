import { useState } from "react";

const FAQS = [
  { q: "O que é o SatAlert?", a: "É uma plataforma de monitoramento ambiental que centraliza alertas de queimadas e desmatamento detectados por satélites no território brasileiro." },
  { q: "Quais satélites são monitorados?", a: "GOES-16, TERRA/MODIS, AQUA/MODIS, NOAA-20 e o satélite brasileiro Amazonia-1, entre outros." },
  { q: "Como um alerta é registrado?", a: "Detecções automáticas chegam via API. Usuários autorizados também podem registrar manualmente pela página Registrar Alerta." },
  { q: "O que significa cada status?", a: "ABERTO: detecção nova; EM_ANALISE: sendo avaliada; CONFIRMADO: validada; FALSO_POSITIVO: não confirmada; RESOLVIDO: ação concluída em campo." },
  { q: "Quais biomas são cobertos?", a: "Os seis biomas brasileiros: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pantanal e Pampa." },
  { q: "Como a IA classifica os alertas?", a: "Modelos analisam temperatura, área afetada, padrão espectral e histórico da região para atribuir severidade (BAIXO a CRÍTICO) e tipo." },
  { q: "Quem pode usar o sistema?", a: "Órgãos ambientais (IBAMA, INPE), brigadistas, pesquisadores e equipes municipais cadastradas." },
  { q: "Como integro minha API ao SatAlert?", a: "Consumimos a API REST Java em https://satalert-api.onrender.com com endpoints REST padrão (GET, POST, PUT, DELETE) em /alertas, /satelites e /regioes." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="container-page py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Perguntas frequentes</h1>
        <p className="text-text-muted">Tudo o que você precisa saber sobre o SatAlert.</p>
      </header>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={item.q} className="card-space overflow-hidden">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-space-bg/50 transition"
              >
                <span className="font-medium">{item.q}</span>
                <span className={`text-primary transition-transform ${open ? "rotate-45" : ""}`}>+</span>
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm text-text-muted border-t border-space-border pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// accordion faq

// accordion faq
