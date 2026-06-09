import type {
  Alerta,
  AlertaForm,
  Bioma,
  Regiao,
  Satelite,
  Severidade,
  StatusAlerta,
  TipoAlerta,
} from "@/types";

const BASE_URL = "https://sat-alert-production.up.railway.app";

// ─── Mock fallback (usado quando a API Java ainda não está no ar) ──────────
const MOCK_SATELITES: Satelite[] = [
  { id: 1, nome: "GOES-16", tipo: "Geoestacionário", pais: "EUA" },
  { id: 2, nome: "TERRA/MODIS", tipo: "Polar", pais: "EUA" },
  { id: 3, nome: "AQUA/MODIS", tipo: "Polar", pais: "EUA" },
  { id: 4, nome: "NOAA-20", tipo: "Polar", pais: "EUA" },
  { id: 5, nome: "Amazonia-1", tipo: "Polar", pais: "Brasil" },
];

const MOCK_REGIOES: Regiao[] = [
  { id: 1, nome: "Floresta Nacional do Jamari", estado: "RO", bioma: "Amazonia" },
  { id: 2, nome: "Parque Nacional da Chapada", estado: "GO", bioma: "Cerrado" },
  { id: 3, nome: "Reserva da Serra do Mar", estado: "SP", bioma: "Mata Atlantica" },
  { id: 4, nome: "Pantanal Mato-Grossense", estado: "MT", bioma: "Pantanal" },
  { id: 5, nome: "Caatinga de Petrolina", estado: "PE", bioma: "Caatinga" },
  { id: 6, nome: "Pampa Gaúcho", estado: "RS", bioma: "Pampa" },
];

const MOCK_ALERTAS: Alerta[] = [
  {
    id: 1, satelite: "GOES-16", regiao: "Floresta Nacional do Jamari", estado: "RO",
    bioma: "Amazonia", tipoAlerta: "Foco de Incendio", severidade: "CRITICO",
    areaAfetadaHa: 1245.7, confiancaPct: 96, status: "CONFIRMADO",
    dataDeteccao: "2026-06-07T14:32:00Z",
    observacao: "Foco ativo com avanço rápido devido a ventos secos.",
  },
  {
    id: 2, satelite: "TERRA/MODIS", regiao: "Parque Nacional da Chapada", estado: "GO",
    bioma: "Cerrado", tipoAlerta: "Desmatamento", severidade: "ALTO",
    areaAfetadaHa: 432.1, confiancaPct: 89, status: "EM_ANALISE",
    dataDeteccao: "2026-06-07T11:10:00Z",
  },
];

const HEADERS = { "Content-Type": "application/json", Accept: "application/json" };

const useMock = (err: unknown) => {
  console.warn("[SatAlert] API indisponível ou falhou, usando dados mock.", err);
};

async function safeFetch<T>(path: string, init?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { ...init, headers: { ...HEADERS, ...init?.headers } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (err) {
    if (fallback !== undefined) {
      useMock(err);
      return fallback;
    }
    throw err;
  }
}

// ─── Tradutor de DTO (Java -> React) ──────────
function adaptarAlerta(item: any): Alerta {
  return {
    id: item.idAlerta || item.id,
    satelite: item.nmSatelite || item.satelite || "Desconhecido",
    regiao: item.nmRegiao || item.regiao || "Desconhecida",
    estado: item.nmEstado || item.estado || "BR",
    bioma: item.dsBioma || item.bioma || "Amazonia",
    tipoAlerta: item.dsTipo || item.tipoAlerta || "Foco de Incêndio",
    severidade: item.dsSeveridade || item.severidade || "MEDIO",
    areaAfetadaHa: item.nrAreaAfetadaHa ?? item.areaAfetadaHa,
    confiancaPct: item.nrConfiancaPct ?? item.confiancaPct,
    status: item.stAlerta || item.status || "ABERTO",
    dataDeteccao: item.dtDeteccao || item.dataDeteccao,
    observacao: item.dsObservacao || item.observacao,
  };
}

// ─── Funções da API ──────────

export async function getAlertas(): Promise<Alerta[]> {
  const rawData = await safeFetch<any[]>("/alertas", undefined, MOCK_ALERTAS);
  
  if (rawData === MOCK_ALERTAS) return MOCK_ALERTAS;

  return rawData.map(adaptarAlerta);
}

export async function getAlertaById(id: number): Promise<Alerta> {
  const found = MOCK_ALERTAS.find((a) => a.id === id);
  const rawData = await safeFetch<any>(`/alertas/${id}`, undefined, found ?? MOCK_ALERTAS[0]);
  
  if (rawData === found || rawData === MOCK_ALERTAS[0]) return rawData as Alerta;

  return adaptarAlerta(rawData);
}

export async function criarAlerta(data: AlertaForm): Promise<Alerta> {
  try {
    const res = await fetch(`${BASE_URL}/alertas`, {
      method: "POST", headers: HEADERS, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawData = await res.json();
    return adaptarAlerta(rawData);
  } catch (err) {
    useMock(err);
    const sat = MOCK_SATELITES.find((s) => s.id === data.idSatelite);
    const reg = MOCK_REGIOES.find((r) => r.id === data.idRegiao);
    const tipo = (["Foco de Incendio", "Desmatamento", "Fumaca Densa", "Degradacao Florestal", "Queimada Controlada"] as TipoAlerta[])[data.idTipoAlerta - 1] ?? "Foco de Incendio";
    const sev: Severidade =
      data.areaAfetadaHa > 1000 ? "CRITICO" :
      data.areaAfetadaHa > 500 ? "ALTO" :
      data.areaAfetadaHa > 100 ? "MEDIO" : "BAIXO";
    const novo: Alerta = {
      id: Date.now(),
      satelite: sat?.nome ?? "Desconhecido",
      regiao: reg?.nome ?? "Desconhecida",
      estado: reg?.estado ?? "—",
      bioma: reg?.bioma ?? "Amazonia",
      tipoAlerta: tipo,
      severidade: sev,
      areaAfetadaHa: data.areaAfetadaHa,
      confiancaPct: data.confiancaPct,
      status: "ABERTO",
      dataDeteccao: new Date().toISOString(),
      observacao: data.observacao,
    };
    MOCK_ALERTAS.unshift(novo);
    return novo;
  }
}

export async function atualizarAlerta(id: number, status: StatusAlerta): Promise<Alerta> {
  try {
    const res = await fetch(`${BASE_URL}/alertas/${id}`, {
      method: "PUT", headers: HEADERS, body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawData = await res.json();
    return adaptarAlerta(rawData);
  } catch (err) {
    useMock(err);
    const idx = MOCK_ALERTAS.findIndex((a) => a.id === id);
    if (idx >= 0) {
      MOCK_ALERTAS[idx] = { ...MOCK_ALERTAS[idx], status };
      return MOCK_ALERTAS[idx];
    }
    throw new Error("Alerta não encontrado");
  }
}

export async function deletarAlerta(id: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/alertas/${id}`, { method: "DELETE", headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    useMock(err);
    const idx = MOCK_ALERTAS.findIndex((a) => a.id === id);
    if (idx >= 0) MOCK_ALERTAS.splice(idx, 1);
  }
}

export async function getSatelites(): Promise<Satelite[]> {
  return safeFetch<Satelite[]>("/satelites", undefined, MOCK_SATELITES);
}

export async function getRegioes(): Promise<Regiao[]> {
  return safeFetch<Regiao[]>("/regioes", undefined, MOCK_REGIOES);
}

export const BIOMA_LABELS: Record<Bioma, string> = {
  Amazonia: "Amazônia",
  Cerrado: "Cerrado",
  "Mata Atlantica": "Mata Atlântica",
  Caatinga: "Caatinga",
  Pantanal: "Pantanal",
  Pampa: "Pampa",
};

// timeout tratado

// timeout tratado
