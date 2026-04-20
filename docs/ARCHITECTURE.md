# Architecture Documentation

Per l'indice completo della documentazione: `README.md`.

## Overview

Portfolio Vue 3 + TypeScript. Architettura a tre viste gestite da `App.vue`, sito statico deployato su Vercel/Netlify.

## Three-View Architecture

`App.vue` gestisce il routing tra tre viste principali:

1. **Landing** — schermata d'ingresso (`Landing.vue`)
2. **Portfolio** — layout principale (`V2.vue`)
3. **Academy** — piattaforma di corsi Firebase (`Academy.vue`)

Esiste anche `V1.vue`, un layout alternativo non più renderizzato da `App.vue` — tenuto come riferimento di design.

## Project Structure

```
portfolio/
├── public/                 # File statici
├── src/
│   ├── assets/             # CSS + immagini
│   ├── components/         # Componenti Vue
│   ├── composables/        # Composables riutilizzabili
│   ├── config/             # env.ts
│   ├── data/               # portfolioData.js (fonte dati canonica)
│   ├── services/           # firebaseService.ts
│   ├── stores/             # Pinia stores (academy.ts)
│   └── types/              # TypeScript interfaces
└── .github/workflows/      # CI/CD
```

## Key Technologies

- **Vue 3**: Composition API, `<script setup lang="ts">`
- **TypeScript**: strict mode
- **Pinia**: state management (solo `academy` store)
- **Firebase**: auth + Firestore per Academy
- **Vite**: build tool, code splitting, Terser minification
- **Vitest**: unit testing

## Data Flow (Stack Attivo)

I componenti attivi (`V2.vue`, `App.vue`) leggono **direttamente** da `src/data/portfolioData.js` tramite named import `PORTFOLIO`. Non passano per Pinia store.

```
portfolioData.js → import PORTFOLIO → V2.vue / App.vue
```

## Data Flow (Academy)

```
Academy.vue
  └── useAcademyStore (Pinia)
        ├── firebaseService.ts (auth + Firestore)
        └── Firebase (cloud)
```

## Composable Pattern

| Composable         | Tipo           | Scopo                                 |
| ------------------ | -------------- | ------------------------------------- |
| `useSEO`           | runtime        | Meta tags + JSON-LD                   |
| `useErrorHandler`  | runtime        | Retry logic                           |
| `useErrorTracking` | runtime        | Error logging                         |
| `usePerformance`   | runtime        | Core Web Vitals                       |
| `useKeyboard`      | runtime        | Scorciatoie tastiera                  |
| `useSitemap`       | **build-time** | Genera sitemap.xml via vite.config.ts |

> **Nota:** `useSitemap.ts` non è un composable runtime. È importato da `vite.config.ts` per generare `sitemap.xml` durante `vite build`. Non rinominare senza aggiornare l'import.

## Build Process

1. `vue-tsc` type checking
2. Vite build con code splitting manuale:
   - `vendor-vue`: Vue + Pinia
   - `vendor-ui`: Bootstrap + carousel + tour
   - `vendor-other`: restanti
3. Terser: rimuove `console.*` e `debugger` in produzione
4. Plugin SEO: genera `robots.txt` + `sitemap.xml` in `dist/`
5. PWA: service worker + manifest

## Deployment

Sito statico deployato su Vercel o Netlify. Entrambi configurati con security headers (CSP, X-Frame-Options, X-Content-Type-Options).

## Performance

- Code splitting automatico + manual chunks
- Lazy loading con IntersectionObserver
- WebP per le immagini
- Service Worker caching (Workbox)
- Core Web Vitals monitoring (`usePerformance`)

## Security

- Security headers configurati (CSP, X-Frame-Options, etc.)
- Input validation
- `catch (e: unknown)` con narrowing — no `any` negli error handler

## Testing

- Unit tests con Vitest + @vue/test-utils
- Coverage thresholds: Lines 79%, Functions 70%, Branches 45%
- Test files in `src/components/__tests__/`

## CI/CD

GitHub Actions (`.github/workflows/`):

- Lint check
- Type check
- Test con coverage
- Build verification
