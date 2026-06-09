import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-space-border bg-space-card/40 mt-16">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary text-xl">🛰️</span>
            <span className="font-bold text-lg">
              <span className="text-primary">Sat</span>Alert
            </span>
          </div>
          <p className="text-text-muted">
            Vigilância ambiental via satélite. Projeto acadêmico — FIAP Global Solution 2026.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navegação</h4>
          <ul className="space-y-1.5 text-text-muted">
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/registrar" className="hover:text-primary">Registrar alerta</Link></li>
            <li><Link to="/sobre" className="hover:text-primary">Sobre</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Parceiros institucionais</h4>
          <ul className="space-y-1.5 text-text-muted">
            <li>IBAMA</li>
            <li>INPE</li>
            <li>MMA — Ministério do Meio Ambiente</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-space-border py-4 text-center text-xs text-text-muted">
        © 2026 SatAlert · FIAP 1TDS Agosto
      </div>
    </footer>
  );
}

// footer responsivo
