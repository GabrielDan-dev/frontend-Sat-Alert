import { useMemo, useState } from "react";
import { useAlertaContext } from "@/context/AlertaContext";
import { BIOMA_LABELS } from "@/services/api";
import { BIOMAS, STATUS_OPCOES, type Bioma } from "@/types";
import AlertCard from "@/components/AlertCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function Dashboard() {
  const { alertas, loading, error, refetch, filtroStatus, setFiltroStatus } = useAlertaContext();
  const [filtroBioma, setFiltroBioma] = useState<Bioma | "TODOS">("TODOS");

  const visiveis = useMemo(() => {
    return alertas.filter((a) => {
      if (filtroStatus !== "TODOS" && a.status !== filtroStatus) return false;
      if (filtroBioma !== "TODOS" && a.bioma !== filtroBioma) return false;
      return true;
    });
  }, [alertas, filtroStatus, filtroBioma]);

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Painel de Alertas</h1>
        <p className="text-text-muted mt-1">Monitoramento em tempo real de detecções via satélite.</p>
      </header>

      {/* Filtros */}
      <div className="card-space p-5 mb-6 space-y-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-2">Status</div>
          <div className="flex flex-wrap gap-2">
            {(["TODOS", ...STATUS_OPCOES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFiltroStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  filtroStatus === s
                    ? "bg-primary text-space-bg border-primary"
                    : "bg-space-bg text-text-muted border-space-border hover:text-text"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-2">Bioma</div>
          <div className="flex flex-wrap gap-2">
            {(["TODOS", ...BIOMAS] as const).map((b) => (
              <button
                key={b}
                onClick={() => setFiltroBioma(b)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  filtroBioma === b
                    ? "bg-secondary text-space-bg border-secondary"
                    : "bg-space-bg text-text-muted border-space-border hover:text-text"
                }`}
              >
                {b === "TODOS" ? "TODOS" : BIOMA_LABELS[b]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner label="Carregando alertas..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && visiveis.length === 0 && (
        <div className="card-space p-12 text-center text-text-muted">
          <div className="text-4xl mb-2">🔍</div>
          Nenhum alerta encontrado para esses filtros.
        </div>
      )}

      {!loading && !error && visiveis.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((a) => (
            <AlertCard key={a.id} alerta={a} />
          ))}
        </div>
      )}
    </div>
  );
}

// filtro bioma
