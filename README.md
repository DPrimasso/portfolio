# Portfolio Project

Portfolio personale di Daniele Primasso, sviluppato con Vue.js 3, Composition API, Pinia per lo state management, e best practices moderne.

## Features

- **Responsive Layout**: Design completamente responsive
- **State Management**: Pinia per gestione centralizzata dei dati
- **Composition API**: Tutti i componenti usano `<script setup>`
- **Serverless Backend**: API serverless per chatbot (Vercel/Netlify)
- **SEO Optimized**: Meta tags dinamici e structured data
- **Accessibility**: ARIA labels, focus management, skip links
- **Performance**: Code splitting, lazy loading, ottimizzazioni CSS
- **Error Handling**: Gestione errori avanzata con retry logic
- **Testing**: Setup Vitest con test base

## Tecnologie

- **Vue.js 3**: Framework JavaScript con Composition API
- **TypeScript**: Type safety
- **Pinia**: State management
- **Vite**: Build tool veloce
- **Bootstrap 5**: Framework CSS
- **VueUse**: Utilities per Vue
- **Vitest**: Testing framework
- **Vite PWA**: Progressive Web App support

## Struttura Progetto

```
portfolio/
├── api/                    # Serverless functions
│   └── chatbot.js         # API endpoint chatbot (Vercel)
├── netlify/
│   └── functions/
│       └── chatbot.js      # API endpoint chatbot (Netlify)
├── public/                 # File statici
├── src/
│   ├── assets/            # Immagini, CSS
│   ├── components/        # Componenti Vue
│   ├── composables/       # Composables riutilizzabili
│   ├── data/              # Dati JSON
│   ├── services/          # Servizi (dataService)
│   ├── stores/            # Pinia stores
│   └── test/              # Setup test
└── vite.config.js
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

3. **Configura variabili ambiente** (opzionale per sviluppo locale)
   
   **⚠️ Importante**: In sviluppo locale, l'endpoint `/api/chatbot` non è disponibile perché Vite non esegue serverless functions.
   
   **Opzioni:**
   - **Opzione A**: Crea un file `.env.local` e punta a un endpoint di produzione:
     ```plaintext
     VITE_CHATBOT_API_URL=https://tuodominio.vercel.app/api/chatbot
     ```
   - **Opzione B**: Usa Vercel CLI per testare localmente: `vercel dev`
   - **Opzione C**: Testa direttamente in produzione dopo il deploy
   
   Vedi [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) per dettagli completi.
   
   **Nota**: Per produzione, configura `OPENAI_API_KEY` nelle variabili ambiente della piattaforma (Vercel/Netlify).

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
# Esegui i test
npm run test

# Test con UI
npm run test:ui

# Test con coverage
npm run test:coverage
```

## Deploy

### Vercel
1. Connetti il repository a Vercel
2. Configura `OPENAI_API_KEY` nelle variabili ambiente
3. Deploy automatico

### Netlify
1. Connetti il repository a Netlify
2. Configura `OPENAI_API_KEY` nelle variabili ambiente
3. Build command: `npm run build`
4. Publish directory: `dist`

## Best Practices Implementate

- ✅ TypeScript per type safety completa
- ✅ Composition API per tutti i componenti
- ✅ State management centralizzato (Pinia)
- ✅ Dati centralizzati in JSON con caching
- ✅ Composable pattern per logica riutilizzabile
- ✅ SEO con meta tags dinamici, sitemap, robots.txt
- ✅ Accessibilità avanzata (ARIA, focus trap, keyboard navigation)
- ✅ Performance ottimizzata (code splitting, lazy loading, image optimization)
- ✅ Error handling con retry logic e tracking
- ✅ Testing completo con coverage thresholds
- ✅ PWA support
- ✅ Security headers e CORS whitelist
- ✅ CI/CD pipeline
- ✅ Code quality (ESLint, Prettier, Husky)

## Documentation

- [Architecture](ARCHITECTURE.md) - Documentazione architettura
- [Contributing](CONTRIBUTING.md) - Linee guida per contribuire
- [Changelog](CHANGELOG.md) - Storico delle modifiche

## License

This project is licensed under the MIT License.
