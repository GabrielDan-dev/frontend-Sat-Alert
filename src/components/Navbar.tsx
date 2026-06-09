import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo-satalert.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/registrar", label: "Registrar" },
  { to: "/sobre", label: "Sobre" },
  { to: "/faq", label: "FAQ" },
  { to: "/integrantes", label: "Integrantes" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-space-bg/80 backdrop-blur border-b border-primary/30">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="SatAlert" className="h-8 w-8 drop-shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
          <span className="text-lg font-bold tracking-tight">
            <span className="text-primary">Sat</span>Alert
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-text-muted hover:text-text hover:bg-space-card"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md text-text hover:bg-space-card"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-space-border bg-space-bg">
          <div className="container-page py-2 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive ? "text-primary bg-primary/10" : "text-text-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

// navbar responsiva
