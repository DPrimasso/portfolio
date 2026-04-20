# Portfolio Project

Portfolio personale di Daniele Primasso — tre viste: Landing, Portfolio (`V2.vue`), Academy (Firebase). Sviluppato con Vue 3 + TypeScript, Composition API, Pinia e Vite.

## Features

- **Responsive Layout**: Design completamente responsive
- **State Management**: Pinia per gestione centralizzata dei dati
- **Composition API**: Tutti i componenti usano `<script setup lang="ts">`
- **Academy**: Piattaforma corsi con Firebase (auth + Firestore)
- **SEO Optimized**: Meta tags dinamici e structured data
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Code splitting, lazy loading, ottimizzazioni CSS
- **Error Handling**: Gestione errori avanzata con retry logic
- **Testing**: Setup Vitest con test base

## Tecnologie

- **Vue.js 3**: Framework JavaScript con Composition API
- **TypeScript**: Type safety (strict mode)
- **Pinia**: State management
- **Firebase**: Auth + Firestore per Academy
- **Vite**: Build tool veloce
- **Bootstrap 5**: Framework CSS
- **VueUse**: Utilities per Vue
- **Vitest**: Testing framework
- **Vite PWA**: Progressive Web App support

## Struttura Progetto

```
portfolio/
├── public/                 # File statici
├── src/
│   ├── assets/            # CSS + immagini
│   ├── components/        # Componenti Vue
│   ├── composables/       # Composables riutilizzabili
│   ├── config/            # env.ts
│   ├── data/              # portfolioData.js (fonte dati canonica)
│   ├── services/          # firebaseService.ts
│   ├── stores/            # Pinia stores (academy.ts)
│   └── types/             # TypeScript interfaces
└── vite.config.ts
```

## Installazione e Setup

1. **Clona il repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   ```

3. **Configura variabili ambiente**

   Crea un file `.env` copiando `.env.example` e compila i valori Firebase.

4. **Avvia il server di sviluppo**

   ```bash
   npm run dev
   ```

5. **Build per produzione**

   ```bash
   npm run build
   ```

6. **Preview build di produzione**
   ```bash
   npm run serve
   ```

## Testing

```bash
npm run test            # Vitest watch mode
npm run test:ui         # Test con UI
npm run test:coverage   # Coverage report
```

## Deploy

### Vercel

1. Connetti il repository a Vercel
2. Configura le variabili Firebase nelle env del progetto
3. Deploy automatico

### Netlify

1. Connetti il repository a Netlify
2. Configura le variabili Firebase nelle env del sito
3. Build command: `npm run build`
4. Publish directory: `dist`

## Best Practices Implementate

- ✅ TypeScript strict mode (`<script setup lang="ts">` su tutti i componenti)
- ✅ Composition API per tutti i componenti
- ✅ State management Pinia (academy store)
- ✅ Dati centralizzati in `portfolioData.js`
- ✅ Composable pattern per logica riutilizzabile
- ✅ SEO con meta tags dinamici, sitemap, robots.txt
- ✅ Performance ottimizzata (code splitting, lazy loading, image optimization)
- ✅ Error handling con retry logic e tracking
- ✅ Testing con coverage thresholds
- ✅ PWA support
- ✅ Security headers
- ✅ CI/CD pipeline
- ✅ Code quality (ESLint, Prettier, Husky)

## Documentation

- [Documentation Hub](docs/README.md) - Indice centralizzato della documentazione
- [CLAUDE.md](CLAUDE.md) - Guida per sviluppo assistito da AI
- [Architecture](docs/ARCHITECTURE.md) - Documentazione architettura
- [Local Development](docs/LOCAL_DEVELOPMENT.md) - Setup ambiente locale e checklist
- [Deployment](docs/DEPLOYMENT.md) - Deploy Vercel/Netlify
- [Contributing](docs/CONTRIBUTING.md) - Linee guida per contribuire
- [Changelog](docs/CHANGELOG.md) - Storico delle modifiche

## License

This project is licensed under the MIT License.
