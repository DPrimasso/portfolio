# Deployment Guide

Questa guida spiega come deployare il portfolio su Netlify o Vercel.

## Prerequisiti

- Account Netlify o Vercel
- Repository GitHub/GitLab/Bitbucket
- OpenAI API key

## Variabili d'Ambiente

Configura le seguenti variabili d'ambiente nella piattaforma di deploy:

### Richieste

- `OPENAI_API_KEY`: La tua API key di OpenAI

### Opzionali

- `VITE_BASE_URL`: URL base del sito (es. `https://tuodominio.com`)
- `VITE_CHATBOT_API_URL`: URL dell'API chatbot (default: `/api/chatbot`)
- `ALLOWED_ORIGINS`: Lista di origins permessi per CORS (separati da virgola)
- `VITE_SENTRY_DSN`: DSN di Sentry per error tracking (opzionale)

## Deploy su Netlify

### Setup Automatico

1. Vai su [Netlify](https://www.netlify.com/)
2. Clicca "New site from Git"
3. Connetti il tuo repository
4. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Aggiungi le variabili d'ambiente nella sezione "Environment variables"
6. Clicca "Deploy site"

### Setup Manuale

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Configurazione

Il file `netlify.toml` è già configurato con:
- Build settings
- Redirects per API
- Security headers
- Functions directory

## Deploy su Vercel

### Setup Automatico

1. Vai su [Vercel](https://vercel.com/)
2. Clicca "New Project"
3. Importa il tuo repository
4. Configura:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Aggiungi le variabili d'ambiente
6. Clicca "Deploy"

### Setup Manuale

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Configurazione

Il file `vercel.json` è già configurato con:
- Functions settings
- Rewrites per API
- Security headers

## Post-Deploy

### Verifica

1. Controlla che il sito sia accessibile
2. Testa il chatbot
3. Verifica SEO (meta tags, sitemap, robots.txt)
4. Controlla performance con Lighthouse

### Custom Domain

1. Aggiungi il tuo dominio nelle impostazioni della piattaforma
2. Configura DNS secondo le istruzioni
3. Aggiorna `VITE_BASE_URL` con il nuovo dominio
4. Aggiorna `sitemap.xml` e `robots.txt` con il nuovo dominio

## Troubleshooting

### Build Fails

- Verifica che tutte le dipendenze siano installate
- Controlla i log di build per errori TypeScript
- Assicurati che `node_modules` non sia nel repository

### Chatbot Non Funziona

- Verifica che `OPENAI_API_KEY` sia configurata
- Controlla i log delle serverless functions
- Verifica CORS settings

### Performance Issues

- Controlla bundle size con `npm run build` e apri `dist/stats.html`
- Verifica che le immagini siano ottimizzate
- Controlla che il code splitting funzioni

## CI/CD

Il progetto include GitHub Actions per CI/CD automatico. Ogni push su `main` triggera:
- Lint check
- Type check
- Test con coverage
- Build verification

Deploy automatico può essere configurato nelle impostazioni della piattaforma.
