# Deployment Guide

Per l'indice completo della documentazione: `README.md`.

## Prerequisiti

- Account Vercel o Netlify
- Repository GitHub/GitLab

## Variabili d'Ambiente

| Variabile         | Richiesta        | Descrizione                                                                              |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| `VITE_BASE_URL`   | Consigliata      | URL canonico del sito (es. `https://dprimasso.it`) — usato per sitemap.xml e meta og:url |
| `VITE_FIREBASE_*` | Sì (per Academy) | Configurazione Firebase (vedi `.env.example`)                                            |

## Deploy su Vercel

1. Importa il repository su [Vercel](https://vercel.com/)
2. Framework Preset: **Vite** — Build Command: `npm run build` — Output: `dist`
3. Aggiungi le variabili Firebase in "Environment Variables"
4. Deploy

## Deploy su Netlify

1. Connetti il repository su [Netlify](https://www.netlify.com/)
2. Build command: `npm run build` — Publish directory: `dist`
3. Aggiungi le variabili Firebase in "Site settings → Environment variables"
4. Deploy

## Post-Deploy

- Verifica SEO: meta tags, `sitemap.xml`, `robots.txt`
- Verifica Academy: login, navigazione corsi
- Controlla performance con Lighthouse
- Aggiungi dominio custom e aggiorna `VITE_BASE_URL`

## Troubleshooting

**Build fails** — Controlla log per errori TypeScript: `npm run type-check` in locale.

**Performance issues** — Apri `dist/stats.html` per analizzare bundle size.

## CI/CD

GitHub Actions (`.github/workflows/`) esegue su ogni push: lint, type-check, test, build.
