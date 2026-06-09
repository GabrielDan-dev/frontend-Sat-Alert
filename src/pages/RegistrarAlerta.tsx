import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAlerta, getRegioes, getSatelites } from "@/services/api";
import { TIPOS_ALERTA, type AlertaForm, type Regiao, type Satelite } from "@/types";
import { useAlertaContext } from "@/context/AlertaContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RegistrarAlerta() {
  const navigate = useNavigate();
  const { refetch } = useAlertaContext();
  const [satelites, setSatelites] = useState<Satelite[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "erro"; text: string } | null>(null);

  const [form, setForm] = useState<AlertaForm>({
    idSatelite: 1,
    idRegiao: 1,
    idTipoAlerta: 1,
    idUsuario: 1,
    areaAfetadaHa: 0,
    latitude: 0,
    longitude: 0,
    confiancaPct: 80,
    observacao: "",
  });

  useEffect(() => {
    Promise.all([getSatelites(), getRegioes()])
      .then(([s, r]) => {
        setSatelites(s);
        setRegioes(r);
        if (s[0]) setForm((f) => ({ ...f, idSatelite: s[0].id }));
        if (r[0]) setForm((f) => ({ ...f, idRegiao: r[0].id }));
      })
      .finally(() => setLoadingOptions(false));
  }, []);

  const upd = <K extends keyof AlertaForm>(k: K, v: AlertaForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validar = (): string | null => {
    if (form.areaAfetadaHa <= 0) return "Área afetada deve ser maior que zero.";
    if (form.confiancaPct < 0 || form.confiancaPct > 100) return "Confiança deve estar entre 0 e 100.";
    if (form.latitude < -90 || form.latitude > 90) return "Latitude inválida.";
    if (form.longitude < -180 || form.longitude > 180) return "Longitude inválida.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validar();
    if (err) { setMsg({ type: "erro", text: err }); return; }
    setSubmitting(true);
    setMsg(null);
    try {
      await criarAlerta(form);
      await refetch();
      setMsg({ type: "ok", text: "Alerta registrado com sucesso. Redirecionando..." });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (e) {
      setMsg({ type: "erro", text: e instanceof Error ? e.message : "Erro ao registrar." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) return <LoadingSpinner label="Carregando opções..." />;

  return (
    <div className="container-page py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Registrar Alerta</h1>
        <p className="text-text-muted mt-1">Preencha os dados da detecção para registrar no sistema.</p>
      </header>

      <form onSubmit={submit} className="card-space p-6 grid gap-4 md:grid-cols-2">
        <Field label="Satélite">
          <select className="input-space" value={form.idSatelite} onChange={(e) => upd("idSatelite", Number(e.target.value))}>
            {satelites.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </Field>
        <Field label="Região">
          <select className="input-space" value={form.idRegiao} onChange={(e) => upd("idRegiao", Number(e.target.value))}>
            {regioes.map((r) => <option key={r.id} value={r.id}>{r.nome} ({r.estado})</option>)}
          </select>
        </Field>
        <Field label="Tipo de Alerta">
          <select className="input-space" value={form.idTipoAlerta} onChange={(e) => upd("idTipoAlerta", Number(e.target.value))}>
            {TIPOS_ALERTA.map((t, i) => <option key={t} value={i + 1}>{t}</option>)}
          </select>
        </Field>
        <Field label="ID do Usuário">
          <input type="number" min={1} className="input-space" value={form.idUsuario}
            onChange={(e) => upd("idUsuario", Number(e.target.value))} required />
        </Field>
        <Field label="Área afetada (ha)">
          <input type="number" step="0.1" min={0} className="input-space" value={form.areaAfetadaHa}
            onChange={(e) => upd("areaAfetadaHa", Number(e.target.value))} required />
        </Field>
        <Field label="Confiança (%)">
          <input type="number" min={0} max={100} className="input-space" value={form.confiancaPct}
            onChange={(e) => upd("confiancaPct", Number(e.target.value))} required />
        </Field>
        <Field label="Latitude">
          <input type="number" step="any" className="input-space" value={form.latitude}
            onChange={(e) => upd("latitude", Number(e.target.value))} required />
        </Field>
        <Field label="Longitude">
          <input type="number" step="any" className="input-space" value={form.longitude}
            onChange={(e) => upd("longitude", Number(e.target.value))} required />
        </Field>
        <div className="md:col-span-2">
          <Field label="Observação">
            <textarea rows={4} className="input-space" value={form.observacao}
              onChange={(e) => upd("observacao", e.target.value)}
              placeholder="Detalhes adicionais sobre a detecção..." />
          </Field>
        </div>

        {msg && (
          <div className={`md:col-span-2 p-3 rounded-md text-sm ${
            msg.type === "ok"
              ? "bg-secondary/10 border border-secondary/40 text-secondary"
              : "bg-sev-critico/10 border border-sev-critico/40 text-sev-critico"
          }`}>
            {msg.text}
          </div>
        )}

        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/dashboard")} className="btn-ghost">Cancelar</button>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Registrando..." : "Registrar alerta"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase text-text-muted block mb-1">{label}</span>
      {children}
    </label>
  );
}

// formulario registro

// formulario registro

// formulario registro
