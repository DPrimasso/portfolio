# CLAUDE.md — LLM Developer Guide

Portfolio personale di Daniele Primasso — dprimasso.it.

## Tech Stack

| Layer     | Technology                                          |
| --------- | --------------------------------------------------- |
| Framework | Vue 3 (Composition API, `<script setup lang="ts">`) |
| Language  | TypeScript (strict mode)                            |
| State     | Pinia                                               |
| Build     | Vite 4 + Terser (drops console in production)       |
| Styling   | Bootstrap 5 + CSS variables design system           |
| Testing   | Vitest + @vue/test-utils                            |
| Backend   | Firebase (academy)                                  |
| Deploy    | Vercel + Netlify (dual-target, static only)         |

## Architecture: Three Views

`App.vue` manages a single-page view router between:

1. **Landing** (`Landing.vue`) — entry screen, emits `go-portfolio` / `go-academy`
2. **Portfolio** (`V2.vue`) — main portfolio layout, reads data directly from `src/data/portfolioData.js`
3. **Academy** (`Academy.vue`) — Firebase-backed learning platform

There is also a legacy `V1.vue` (alternate terminal-aesthetic layout) — not rendered by App.vue, kept as a design reference.

## Key File Paths

```
src/
  App.vue                        # Root — view switcher (landing / portfolio / academy)
  main.js                        # App init + runtime error overlay
  components/
    Landing.vue                  # Entry screen
    V2.vue                       # ACTIVE portfolio layout
    V1.vue                       # LEGACY alternate layout (not rendered)
    Academy.vue                  # Full-screen academy (Firebase)
  composables/
    useSEO.ts                    # Meta tags + JSON-LD structured data
    useErrorHandler.ts           # Retry logic for async operations
    useErrorTracking.ts          # Error logging (dev only; prod endpoint TBD)
    usePerformance.ts            # Core Web Vitals collection
    useKeyboard.ts               # Global keyboard shortcuts
    useSitemap.ts                # BUILD-TIME ONLY — imported by vite.config.ts
  config/
    env.ts                       # Centralized import.meta.env wrappers
  data/
    portfolioData.js             # CANONICAL data source for all active views
  stores/
    academy.ts                   # Firebase auth + course progress (ACTIVE)
  services/
    firebaseService.ts           # Firebase app init + auth/db exports
  types/
    portfolio.ts                 # TypeScript interfaces
```

## Commands

```bash
npm run dev             # Vite dev server (port 5173, auto-open)
npm run build           # vue-tsc + vite build
npm run serve           # Preview production build
npm run test            # Vitest (watch mode)
npm run test:coverage   # Coverage report
npm run lint            # ESLint (auto-fix)
npm run type-check      # vue-tsc only
```

## Conventions

- All SFC scripts use `<script setup lang="ts">` — no plain JS blocks
- `catch (e: unknown)` with proper narrowing — never `catch (e: any)`
- All `console.*` wrapped in `if (import.meta.env.DEV)` guards
- CSS design tokens via variables: `--accent`, `--bg-card`, `--bg-elevated`, `--fg`, `--fg-dim`, `--fg-mute`, `--line`, `--mono`, `--magenta`
- No hardcoded hex colors in component `<style scoped>` blocks
- Terser drops `console` in production build (belt-and-suspenders vs. DEV guards)

## Environment Variables

| Variable          | Side       | Purpose                                         |
| ----------------- | ---------- | ----------------------------------------------- |
| `VITE_BASE_URL`   | build-time | Canonical site URL for sitemap + canonical tags |
| `VITE_FIREBASE_*` | build-time | Firebase config — in .env (not .env.local)      |

## Build-Time Utilities

`src/composables/useSitemap.ts` is **not a runtime composable** — it is imported by `vite.config.ts`'s `seoDistPlugin` to generate `sitemap.xml` during `vite build`. Do not rename/move without updating the import in `vite.config.ts`.

## Known Limitations / TODOs

- `usePerformance.ts` → `sendMetrics()` is a no-op in production; see TODO comment in file
- `useErrorTracking.ts` → production error reporting endpoint not configured
- `V1.vue` is an unused alternate layout — remove once confirmed no longer needed
