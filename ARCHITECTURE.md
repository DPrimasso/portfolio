# Architecture Documentation

## Overview

Questo portfolio è costruito con Vue 3, TypeScript, Pinia per lo state management, e Vite come build tool.

## Project Structure

```
portfolio/
├── api/                    # Serverless functions (Vercel)
├── netlify/
│   └── functions/         # Serverless functions (Netlify)
├── shared/                 # Logica comune condivisa
├── public/                # File statici
├── src/
│   ├── assets/           # Immagini, CSS
│   ├── components/       # Componenti Vue
│   ├── composables/      # Composables riutilizzabili
│   ├── config/           # Configurazione
│   ├── data/             # Dati JSON
│   ├── services/          # Servizi (dataService)
│   ├── stores/           # Pinia stores
│   ├── types/            # TypeScript types
│   └── test/             # Setup test
└── .github/
    └── workflows/        # CI/CD
```

## Key Technologies

- **Vue 3**: Framework con Composition API
- **TypeScript**: Type safety
- **Pinia**: State management
- **Vite**: Build tool veloce
- **Vitest**: Testing framework
- **Vite PWA**: Progressive Web App support

## Architecture Patterns

### Composition API

Tutti i componenti usano `<script setup>` con Composition API per una migliore organizzazione del codice.

### Composable Pattern

La logica riutilizzabile è estratta in composables:
- `useChatbot`: Gestione chatbot
- `useSEO`: SEO meta tags
- `useErrorHandler`: Gestione errori
- `usePerformance`: Performance monitoring
- `useFocusTrap`: Focus management
- `useKeyboard`: Keyboard navigation

### Service Layer

Il `DataService` gestisce il caricamento dei dati, con caching per performance.

### State Management

Pinia store centralizzato (`portfolio`) per gestire lo stato dell'applicazione.

## Data Flow

1. Componenti Vue richiedono dati dallo store
2. Store chiama DataService
3. DataService carica dati (con cache)
4. Store aggiorna lo stato reattivo
5. Componenti si aggiornano automaticamente

## Build Process

1. TypeScript type checking
2. Vite build con code splitting
3. Image optimization
4. PWA manifest generation
5. Bundle analysis

## Deployment

Supporta sia Netlify che Vercel:
- Serverless functions in `api/` (Vercel) e `netlify/functions/` (Netlify)
- Logica comune in `shared/`

## Performance Optimizations

- Code splitting automatico
- Lazy loading componenti
- Image optimization (WebP)
- Font preloading
- Service Worker caching
- Bundle analysis

## Security

- Security headers configurati
- CORS whitelist
- Rate limiting
- Input validation
- Environment variables security

## Testing

- Unit tests con Vitest
- Component tests
- Coverage thresholds: 80%

## CI/CD

GitHub Actions esegue:
- Lint check
- Type check
- Test con coverage
- Build verification
