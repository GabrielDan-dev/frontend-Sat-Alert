import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { atualizarAlerta, BIOMA_LABELS, deletarAlerta, getAlertaById } from "@/services/api";
import { STATUS_OPCOES, type Alerta, type StatusAlerta } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertaContext } from "@/context/AlertaContext";

export default function AlertaDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refetch } = useAlertaContext();
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoStatus, setNovoStatus] = useState<StatusAlerta>("ABERTO");
  const [acaoMsg, setAcaoMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getAlertaById(Number(id))
      .then((a) => {
        setAlerta(a);
        setNovoStatus(a.status);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAtualizar = async () => {
    if (!alerta) return;
    try {
      const upd = await atualizarAlerta(alerta.id, novoStatus);
      setAlerta(upd);
      setAcaoMsg("Status atualizado com sucesso.");
      refetch();
    } catch (e) {
      setAcaoMsg(e instanceof Error ? e.message : "Erro ao atualizar.");
    }
  };

  const handleDeletar = async () => {
    if (!alerta) return;
    if (!confirm("Tem certeza que deseja excluir este alerta?")) return;
    try {
      await deletarAlerta(alerta.id);
      await refetch();
      navigate("/dashboard");
    } catch (e) {
      setAcaoMsg(e instanceof Error ? e.message : "Erro ao excluir.");
    }
  };

  return (
    <div className="container-page py-10">
      <Link to="/dashboard" className="text-sm text-text-muted hover:text-primary">← Voltar ao Dashboard</Link>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {alerta && (
        <div className="mt-4 space-y-6">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs text-text-muted font-mono">Alerta #{alerta.id}</div>
              <h1 className="text-3xl font-bold mt-1">{alerta.tipoAlerta}</h1>
              <p className="text-text-muted mt-1">
                {new Date(alerta.dataDeteccao).toLocaleString("pt-BR")}
              </p>
            </div>
            <span className={`px-3 py-1.5 rounded-full border text-sm font-semibold ${
              alerta.severidade === "CRITICO" ? "bg-sev-critico/15 text-sev-critico border-sev-critico/40" :
              alerta.severidade === "ALTO" ? "bg-sev-alto/15 text-sev-alto border-sev-alto/40" :
              alerta.severidade === "MEDIO" ? "bg-sev-medio/15 text-sev-medio border-sev-medio/40" :
              "bg-sev-baixo/15 text-sev-baixo border-sev-baixo/40"
            }`}>
              Severidade {alerta.severidade}
            </span>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Satélite" value={alerta.satelite} />
            <Info label="Bioma" value={BIOMA_LABELS[alerta.bioma]} />
            <Info label="Região" value={`${alerta.regiao} — ${alerta.estado}`} />
            <Info label="Status atual" value={alerta.status.replace("_", " ")} />
            <Info label="Área afetada" value={`${alerta.areaAfetadaHa.toLocaleString("pt-BR")} ha`} />
            <Info label="Confiança" value={`${alerta.confiancaPct}%`} />
          </div>

          {alerta.observacao && (
            <div className="card-space p-5">
              <h3 className="font-semibold mb-2">Observação</h3>
              <p className="text-sm text-text-muted">{alerta.observacao}</p>
            </div>
          )}

          <div className="card-space p-5 space-y-4">
            <h3 className="font-semibold">Ações</h3>
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs uppercase text-text-muted block mb-1">Novo status</label>
                <select
                  value={novoStatus}
                  onChange={(e) => setNovoStatus(e.target.value as StatusAlerta)}
                  className="input-space"
                >
                  {STATUS_OPCOES.map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleAtualizar} className="btn-primary">Atualizar</button>
              <button onClick={handleDeletar} className="btn-danger">Excluir</button>
            </div>
            {acaoMsg && <p className="text-sm text-secondary">{acaoMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-space p-4">
      <div className="text-xs uppercase text-text-muted">{label}</div>
      <div className="text-text font-medium mt-1">{value}</div>
    </div>
  );
}

// rota dinamica

// rota dinamica

// rota dinamica
