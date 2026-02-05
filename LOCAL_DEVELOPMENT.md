# Sviluppo Locale - Chatbot

## ⚠️ Problema: Endpoint API non disponibile in sviluppo

In sviluppo locale con Vite, le serverless functions (`/api/chatbot`) **non sono disponibili** perché Vite non esegue funzioni server-side.

## ✅ Soluzioni

### Opzione 1: Usa URL di Produzione (Consigliato per test rapidi)

Crea un file `.env.local` nella root del progetto:

```env
VITE_CHATBOT_API_URL=https://tuodominio.vercel.app/api/chatbot
```

Poi riavvia il server di sviluppo:
```bash
npm run dev
```

**Pro:** Veloce, testa direttamente l'endpoint di produzione  
**Contro:** Usa la quota API di produzione

### Opzione 2: Vercel CLI (Consigliato per sviluppo completo)

1. Installa Vercel CLI:
```bash
npm i -g vercel
```

2. Esegui il login:
```bash
vercel login
```

3. Avvia il server di sviluppo con le functions:
```bash
vercel dev
```

Questo avvierà sia il frontend che le serverless functions localmente.

**Pro:** Test completo in locale, functions funzionanti  
**Contro:** Richiede Vercel CLI e configurazione

### Opzione 3: Test solo in Produzione

Semplicemente testa il chatbot dopo il deploy su Vercel/Netlify.

**Pro:** Nessuna configurazione aggiuntiva  
**Contro:** Devi deployare per testare

## 🔧 Configurazione

### File `.env.local` (non committato)

```env
# URL completo per sviluppo (opzionale)
VITE_CHATBOT_API_URL=https://tuodominio.vercel.app/api/chatbot

# Oppure lascia il default (richiede Vercel CLI)
# VITE_CHATBOT_API_URL=/api/chatbot
```

### Variabili d'Ambiente su Vercel/Netlify

**IMPORTANTE:** `OPENAI_API_KEY` va configurata solo su Vercel/Netlify, non nel file `.env` locale!

- Vercel: Dashboard → Project → Settings → Environment Variables
- Netlify: Site settings → Environment variables

## 🐛 Debug

Se vedi errori 404 in sviluppo:

1. **Controlla console** - Dovresti vedere un warning che spiega il problema
2. **Verifica `.env.local`** - Se usi un URL esterno, assicurati che sia corretto
3. **Testa endpoint direttamente**:
   ```bash
   curl https://tuodominio.vercel.app/api/chatbot/health
   ```

## 📝 Note

- Il file `.env.local` è ignorato da git (non committato)
- Le variabili devono iniziare con `VITE_` per essere accessibili dal client
- `OPENAI_API_KEY` è server-side, non può essere letta dal client
