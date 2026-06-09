// Union Types
export type StatusAlerta =
  | "ABERTO"
  | "EM_ANALISE"
  | "CONFIRMADO"
  | "FALSO_POSITIVO"
  | "RESOLVIDO";

export type Severidade = "BAIXO" | "MEDIO" | "ALTO" | "CRITICO";

export type Bioma =
  | "Amazonia"
  | "Cerrado"
  | "Mata Atlantica"
  | "Caatinga"
  | "Pantanal"
  | "Pampa";

export type TipoAlerta =
  | "Foco de Incendio"
  | "Desmatamento"
  | "Fumaca Densa"
  | "Degradacao Florestal"
  | "Queimada Controlada";

// Interfaces
export interface Satelite {
  id: number;
  nome: string;
  tipo: string;
  pais: string;
}

export interface Regiao {
  id: number;
  nome: string;
  estado: string;
  bioma: Bioma;
}

export interface Alerta {
  id: number;
  satelite: string;
  regiao: string;
  estado: string;
  bioma: Bioma;
  tipoAlerta: TipoAlerta;
  severidade: Severidade;
  areaAfetadaHa: number;
  confiancaPct: number;
  status: StatusAlerta;
  dataDeteccao: string;
  observacao?: string;
}

export interface AlertaForm {
  idSatelite: number;
  idRegiao: number;
  idTipoAlerta: number;
  idUsuario: number;
  areaAfetadaHa: number;
  latitude: number;
  longitude: number;
  confiancaPct: number;
  observacao: string;
}

// Intersection Type
export type AlertaComDetalhes = Alerta & {
  nomeUsuario: string;
  orgaoUsuario: string;
  latLong: string;
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  mensagem?: string;
}

export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  cargo: string;
}

export const STATUS_OPCOES: StatusAlerta[] = [
  "ABERTO",
  "EM_ANALISE",
  "CONFIRMADO",
  "FALSO_POSITIVO",
  "RESOLVIDO",
];

export const BIOMAS: Bioma[] = [
  "Amazonia",
  "Cerrado",
  "Mata Atlantica",
  "Caatinga",
  "Pantanal",
  "Pampa",
];

export const TIPOS_ALERTA: TipoAlerta[] = [
  "Foco de Incendio",
  "Desmatamento",
  "Fumaca Densa",
  "Degradacao Florestal",
  "Queimada Controlada",
];

// tipos documentados

// tipos documentados

// tipos documentados
