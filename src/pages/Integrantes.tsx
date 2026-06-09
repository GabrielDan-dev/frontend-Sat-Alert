import type { Integrante } from "@/types";

export default function Integrantes() {
  const INTEGRANTES: Integrante[] = [
    {
      nome: "Gabriel Dã",
      rm: "RM566985",
      turma: "1TDS Agosto",
      foto: "/foto_gabriel.png",
      github: "https://github.com/GabrielDan-dev",
      linkedin: "https://www.linkedin.com/in/gabriel-d%C3%A3-freitas-de-souza-45139b37a",
      cargo: "Desenvolvedor Full Stack",
    },
    {
      nome: "Pedro Relich",
      rm: "RM567933",
      turma: "1TDS Agosto",
      foto: "/foto_pedro.jpeg",
      github: "https://github.com/pedrorelich-source",
      linkedin: "https://www.linkedin.com/in/pedro-henrique-relich-de-lima-b40493358/",
      cargo: "Desenvolvedor Backend",
    },
    {
      nome: "Caike Roberto",
      rm: "RM568104",
      turma: "1TDS Agosto",
      foto: "/foto_caike.jpeg",
      github: "https://github.com/caike-roberto",
      linkedin: "https://www.linkedin.com/in/caike-roberto/",
      cargo: "Desenvolvedor Frontend",
    },
  ];

  return (
    <div className="container-page py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Equipe</h1>
        <p className="text-text-muted">FIAP — 1TDS Agosto — Global Solution 2026</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {INTEGRANTES.map((p) => (
          <article key={p.rm} className="card-space p-6 text-center hover:border-primary/50 transition">
            <div className="relative mx-auto h-28 w-28 mb-4">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <img
                src={p.foto}
                alt={p.nome}
                className="relative h-28 w-28 rounded-full border-2 border-primary/50 bg-space-bg object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{p.nome}</h3>
            <p className="text-xs text-primary mt-1">{p.cargo}</p>
            <dl className="mt-4 text-sm space-y-1 text-text-muted">
              <div><span className="text-text-muted">RM:</span> <span className="text-text font-mono">{p.rm}</span></div>
              <div><span className="text-text-muted">Turma:</span> <span className="text-text">{p.turma}</span></div>
            </dl>
            <div className="mt-4 flex justify-center gap-2">
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost text-xs px-3 py-1.5">GitHub</a>
              <a href={p.linkedin} target="_blank" rel="noreferrer" className="btn-ghost text-xs px-3 py-1.5">LinkedIn</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}