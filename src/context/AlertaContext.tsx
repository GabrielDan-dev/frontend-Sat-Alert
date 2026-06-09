import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Alerta, StatusAlerta } from "@/types";
import { useAlertas } from "@/hooks/useAlertas";

type FiltroStatus = StatusAlerta | "TODOS";

interface AlertaContextValue {
  alertas: Alerta[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filtroStatus: FiltroStatus;
  setFiltroStatus: (s: FiltroStatus) => void;
  alertasFiltrados: Alerta[];
}

const AlertaContext = createContext<AlertaContextValue | undefined>(undefined);

export function AlertaProvider({ children }: { children: ReactNode }) {
  const { alertas, loading, error, refetch } = useAlertas();
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("TODOS");

  const alertasFiltrados = useMemo(
    () => (filtroStatus === "TODOS" ? alertas : alertas.filter((a) => a.status === filtroStatus)),
    [alertas, filtroStatus]
  );

  return (
    <AlertaContext.Provider
      value={{ alertas, loading, error, refetch, filtroStatus, setFiltroStatus, alertasFiltrados }}
    >
      {children}
    </AlertaContext.Provider>
  );
}

export function useAlertaContext() {
  const ctx = useContext(AlertaContext);
  if (!ctx) throw new Error("useAlertaContext deve ser usado dentro de AlertaProvider");
  return ctx;
}

// context api

// context api
