import { useCallback, useEffect, useState } from "react";
import { getAlertas } from "@/services/api";
import type { Alerta } from "@/types";

export function useAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlertas();
      setAlertas(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar alertas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { alertas, loading, error, refetch };
}

// hook customizado

// hook customizado

// hook customizado
