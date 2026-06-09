# 🛰️ SatAlert — Frontend

## Descrição
Plataforma de monitoramento de queimadas e desmatamento via satélite no Brasil. Integra dados de satélites internacionais e brasileiros (GOES-16, MODIS, Amazonia-1) com classificação automática por IA para apoiar IBAMA, INPE e equipes ambientais. Projeto acadêmico **FIAP Global Solution 2026**.

## Tecnologias Utilizadas
- React 18 + Vite + TypeScript
- Tailwind CSS v3
- React Router DOM v6
- Fetch API nativa (sem Axios)

## Estrutura de Pastas
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AlertCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── pages/
│   ├── Home.tsx
│   ├── Sobre.tsx
│   ├── FAQ.tsx
│   ├── Integrantes.tsx
│   ├── Dashboard.tsx
│   ├── AlertaDetalhes.tsx
│   └── RegistrarAlerta.tsx
├── services/
│   └── api.ts
├── hooks/
│   └── useAlertas.ts
├── context/
│   └── AlertaContext.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Autores e Créditos

| Nome                            | RM       | Turma         | GitHub                                 | LinkedIn                                       |
|---------------------------------|----------|---------------|----------------------------------------|------------------------------------------------|
| Gabriel Dã                      | RM566985 | 1TDS Agosto   | https://github.com/gabriel-da          | https://linkedin.com/in/gabriel-da             |
| Pedro Rellich                   | RM567933 | 1TDS Agosto   | https://github.com/pedrorellich        | https://linkedin.com/in/pedro-rellich          |
| Caike Roberto de Souza Hollo    | RM568104 | 1TDS Agosto   | https://github.com/caikehollo          | https://linkedin.com/in/caike-hollo            |

## Como Usar

### Link do Repositório GitHub
https://github.com/GabrielDan-dev/Frontend-Sat-Alert

### Link do Vídeo YouTube
_[a adicionar]_

### Deploy na Vercel
https://frontend-sat-alert.vercel.app/

### Instalação Local
```bash
npm install
npm run dev
```
A aplicação inicia em `http://localhost:8080`.

### Build de Produção
```bash
npm run build
npm run preview
```

## Endpoints consumidos (API Java)
`BASE_URL = https://sat-alert-production.up.railway.app

| Método | Endpoint           | Função                      |
|--------|--------------------|-----------------------------|
| GET    | /alertas           | Listar todos os alertas     |
| GET    | /alertas/:id       | Buscar alerta por ID        |
| POST   | /alertas           | Criar novo alerta           |
| PUT    | /alertas/:id       | Atualizar status do alerta  |
| DELETE | /alertas/:id       | Excluir alerta              |
| GET    | /satelites         | Listar satélites            |
| GET    | /regioes           | Listar regiões              |

> A camada de serviço (`src/services/api.ts`) usa fallback com dados mock quando a API Java está fora do ar, garantindo que a UI continue navegável em ambiente de demonstração.

## Contato
- Gabriel Dã — https://linkedin.com/in/gabriel-da
- Pedro Rellich — https://linkedin.com/in/pedro-rellich
- Caike Hollo — https://linkedin.com/in/caike-hollo

<!-- readme atualizado -->

<!-- readme atualizado -->

<!-- readme atualizado -->
