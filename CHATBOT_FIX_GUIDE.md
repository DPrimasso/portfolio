# Guida Fix Chatbot - API Key

## 🔍 Verifica Rapida

### 1. Controlla le Variabili d'Ambiente

**Su Vercel:**
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto
3. Settings → Environment Variables
4. Verifica che `OPENAI_API_KEY` sia presente e non vuota

**Su Netlify:**
1. Vai su [Netlify Dashboard](https://app.netlify.com/)
2. Seleziona il sito
3. Site settings → Environment variables
4. Verifica che `OPENAI_API_KEY` sia presente e non vuota

### 2. Verifica Formato API Key

L'API key di OpenAI deve:
- Iniziare con `sk-`
- Essere lunga almeno 20 caratteri
- Non contenere spazi iniziali/finali

**Esempio valido:** `sk-1234567890abcdef...`

### 3. Test Health Check

Dopo il deploy, testa l'endpoint di health check:

```bash
# Vercel
curl https://tuodominio.vercel.app/api/chatbot/health

# Netlify
curl https://tuodominio.netlify.app/api/chatbot/health
```

**Risposta sana:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "apiKey": {
    "configured": true,
    "valid": true
  }
}
```

**Risposta non sana:**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "apiKey": {
    "configured": true,
    "valid": false,
    "error": "OPENAI_API_KEY has invalid format (should start with \"sk-\")"
  }
}
```

## 🛠️ Cosa è Stato Migliorato

### 1. Validazione API Key Robusta
- ✅ Verifica che l'API key non sia vuota o solo spazi
- ✅ Verifica formato (deve iniziare con `sk-`)
- ✅ Verifica lunghezza

### 2. Gestione Errori Specifica
- ✅ Errori categorizzati per tipo (401, 429, 500, etc.)
- ✅ Messaggi più chiari per debugging
- ✅ Codici errore strutturati

### 3. Logging Migliorato
- ✅ Log strutturati in JSON
- ✅ Timestamp e contesto
- ✅ API key mai loggata (redacted)

### 4. Health Check Endpoint
- ✅ `/api/chatbot/health` per verificare configurazione
- ✅ Disponibile sia su Vercel che Netlify

## 📝 Passi per Risolvere

1. **Verifica variabile d'ambiente** su Vercel/Netlify
2. **Rigenera API key** su [OpenAI Platform](https://platform.openai.com/api-keys) se necessario
3. **Aggiorna variabile** con la nuova key (formato: `sk-...`)
4. **Redeploy** il progetto
5. **Testa health check** endpoint
6. **Testa chatbot** nel browser

## 🐛 Debug

Se il problema persiste:

1. Controlla i log su Vercel/Netlify:
   - Vercel: Dashboard → Deployments → Functions → Logs
   - Netlify: Functions → Logs

2. Cerca errori con codice:
   - `API_KEY_VALIDATION_FAILED` → API key non valida
   - `INVALID_API_KEY` → API key rifiutata da OpenAI
   - `RATE_LIMIT` → Quota esaurita
   - `NETWORK_ERROR` → Problema di connessione

3. Verifica che l'API key abbia crediti disponibili su OpenAI

## ⚠️ Note Importanti

- L'API key **NON** deve essere committata nel repository
- Usa sempre variabili d'ambiente per le API keys
- In sviluppo locale, crea un file `.env.local` (non committato):
  ```
  OPENAI_API_KEY=sk-tua-api-key-qui
  ```
