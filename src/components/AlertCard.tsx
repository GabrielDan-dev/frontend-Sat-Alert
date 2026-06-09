import { Link } from "react-router-dom";
import type { Alerta, Severidade, StatusAlerta } from "@/types";
import { BIOMA_LABELS } from "@/services/api";

const sevColor: Record<Severidade, string> = {
  BAIXO: "bg-sev-baixo/15 text-sev-baixo border-sev-baixo/40",
  MEDIO: "bg-sev-medio/15 text-sev-medio border-sev-medio/40",
  ALTO: "bg-sev-alto/15 text-sev-alto border-sev-alto/40",
  CRITICO: "bg-sev-critico/15 text-sev-critico border-sev-critico/40",
};

const statusColor: Record<StatusAlerta, string> = {
  ABERTO: "bg-primary/15 text-primary border-primary/40",
  EM_ANALISE: "bg-sev-medio/15 text-sev-medio border-sev-medio/40",
  CONFIRMADO: "bg-sev-critico/15 text-sev-critico border-sev-critico/40",
  FALSO_POSITIVO: "bg-text-muted/15 text-text-muted border-text-muted/40",
  RESOLVIDO: "bg-secondary/15 text-secondary border-secondary/40",
};

export default function AlertCard({ alerta }: { alerta: Alerta }) {
  return (
    <article className="card-space p-5 flex flex-col hover:border-primary/40 transition">
      <header className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="text-xs text-text-muted font-mono">#{alerta.id}</div>
          <h3 className="font-semibold text-text mt-0.5">{alerta.tipoAlerta}</h3>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold uppercase ${sevColor[alerta.severidade]}`}>
          {alerta.severidade}
        </span>
      </header>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-[10px] uppercase text-text-muted">Satélite</dt>
          <dd className="text-text">{alerta.satelite}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase text-text-muted">Bioma</dt>
          <dd className="text-text">{BIOMA_LABELS[alerta.bioma]}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[10px] uppercase text-text-muted">Região</dt>
          <dd className="text-text">{alerta.regiao} — {alerta.estado}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase text-text-muted">Área (ha)</dt>
          {/* CORREÇÃO 1: Adicionado '?.' e fallback para exibir 'N/D' se não houver área */}
          <dd className="text-text font-mono">
            {alerta.areaAfetadaHa?.toLocaleString("pt-BR") ?? "N/D"}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase text-text-muted">Confiança</dt>
          <dd className="text-text font-mono">{alerta.confiancaPct}%</dd>
        </div>
      </dl>

      <footer className="mt-4 pt-3 border-t border-space-border flex items-center justify-between">
        <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold ${statusColor[alerta.status]}`}>
          {alerta.status.replace("_", " ")}
        </span>
        <Link to={`/alerta/${alerta.id}`} className="text-xs text-primary hover:underline font-medium">
          Ver detalhes →
        </Link>
      </footer>
      <time className="text-[10px] text-text-muted mt-2">
        {/* CORREÇÃO 2: Verificando se a data existe antes de formatar */}
        {alerta.dataDeteccao 
          ? new Date(alerta.dataDeteccao).toLocaleString("pt-BR") 
          : "Data indisponível"}
      </time>
    </article>
  );
}

// badge severidade

// badge severidade

// badge severidade
