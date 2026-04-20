# Local Development

Guida operativa per lavorare in locale sullo stack attuale (Vue 3 + TypeScript + Firebase Academy).

Per l'indice completo della documentazione: `README.md`.

## Prerequisiti

- Node.js 18+ (consigliato LTS)
- npm 9+
- Accesso ai valori Firebase del progetto

## Setup Rapido

1. Installa dipendenze:
   ```bash
   npm install
   ```
2. Crea `.env` copiando `.env.example`.
3. Compila le variabili `VITE_FIREBASE_*`.
4. Avvia il dev server:
   ```bash
   npm run dev
   ```

## Variabili Ambiente

Le variabili lato client devono iniziare con `VITE_`.

Minimo consigliato:

```env
VITE_BASE_URL=http://localhost:5173
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## Script Utili

```bash
npm run dev            # sviluppo locale
npm run clean          # rimuove output generati (dist, coverage)
npm run build          # type-check + build produzione
npm run rebuild        # clean + build
npm run serve          # preview build
npm run lint           # eslint fix
npm run type-check     # controllo tipi
npm run test           # vitest watch
npm run test:coverage  # coverage report
```

## Checklist Prima di Commit

```bash
npm run lint:check
npm run type-check
npm run test:coverage
```

## Troubleshooting

**Build fallisce su TypeScript**

- Esegui `npm run type-check` e risolvi gli errori in ordine.

**Academy non carica dati**

- Verifica `VITE_FIREBASE_*` in `.env`.
- Controlla rules/progetto Firebase associato.

**Mismatch SEO URL in locale**

- Usa `VITE_BASE_URL=http://localhost:5173` in sviluppo.
