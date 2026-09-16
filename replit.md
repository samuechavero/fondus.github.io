# Fondus — Embudo Gamificado

SPA móvil-first de Fondus para guiar a potenciales clientes desde una simulación de capitalización hasta una adhesión informada.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fondus-embudo/src/App.tsx` — recorrido completo de los cinco pasos y estado de la experiencia.
- `artifacts/fondus-embudo/src/index.css` — tokens visuales y estilos globales de la experiencia.
- `artifacts/fondus-embudo/public/media/` — logo de Fondus y video vertical de fondo.
- `artifacts/fondus-embudo/.replit-artifact/artifact.toml` — configuración del artefacto web y su ruta de preview.

## Architecture decisions

- La primera versión es frontend-only: el recorrido completo funciona localmente sin bloquearse por un backend.
- La navegación se mantiene dentro de una SPA mediante `currentStep`, con transiciones y estado de sesión en memoria.
- El video de fondo solo acompaña los pasos 1 y 2; el resto cambia a superficies oscuras para mejorar legibilidad y foco.
- La fecha del sorteo se calcula en el cliente para mostrar siempre el último sábado del mes y el siguiente ciclo.

## Product

El usuario atraviesa una introducción cinematográfica, elige una meta, conversa con un asesor simulado, descubre números de sorteo, recibe la palabra clave `FONDUS2026` y completa un formulario de adhesión con método de débito.

## User preferences

El brief solicita una experiencia premium, inmersiva, móvil-first, en español y sin emojis en la interfaz.

## Gotchas

- El workflow web inyecta `PORT` y `BASE_PATH`; para ver la app hay que usar el workflow administrado del artefacto.
- Los recursos adjuntos se sirven desde `public/media` para que Vite pueda entregarlos directamente.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
