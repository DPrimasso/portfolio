# Debug Chatbot - Guida Rapida

## 🔍 Cosa Controllare Nella Console

Dopo i miglioramenti, la console ora mostra:

1. **URL della richiesta**: `Making request to: /api/chatbot`
2. **Dettagli errori Axios**: status code, data, etc.
3. **Tentativi di retry**: `Retry attempt 1/3 failed`

## 🐛 Problemi Comuni

### 1. Endpoint Non Raggiungibile (404/Network Error)

**Sintomi:**
- `Network error` o `ECONNABORTED`
- Status code 404
- Nessuna risposta dal server

**Soluzioni:**
- Verifica che l'endpoint sia deployato
- Controlla l'URL in `src/config/env.ts`
- In produzione, verifica che `VITE_CHATBOT_API_URL` sia configurato correttamente

### 2. API Key Non Configurata (500)

**Sintomi:**
- Status code 500
- Messaggio: "API key configuration error"
- Dettagli: "OPENAI_API_KEY not configured"

**Soluzioni:**
- Verifica variabile `OPENAI_API_KEY` su Vercel/Netlify
- Testa health check: `/api/chatbot/health`

### 3. API Key Invalida (401/500)

**Sintomi:**
- Status code 401 o 500
- Messaggio: "API key configuration error"
- Dettagli: "OPENAI_API_KEY has invalid format"

**Soluzioni:**
- Verifica che l'API key inizi con `sk-`
- Rigenera API key su [OpenAI Platform](https://platform.openai.com/api-keys)
- Aggiorna variabile d'ambiente

### 4. Rate Limit (429)

**Sintomi:**
- Status code 429
- Messaggio: "Rate limit exceeded"

**Soluzioni:**
- Aspetta qualche minuto
- Verifica quota su OpenAI

### 5. Timeout (ECONNABORTED)

**Sintomi:**
- `ECONNABORTED` error
- Messaggio: "Timeout: il server non ha risposto in tempo"

**Soluzioni:**
- Verifica che la serverless function non sia in cold start
- Aumenta timeout se necessario (attualmente 30s)

## 🧪 Test Rapido

### 1. Test Health Check
```bash
curl https://tuodominio.com/api/chatbot/health
```

### 2. Test Endpoint Chatbot
```bash
curl -X POST https://tuodominio.com/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

### 3. Verifica Console Browser
1. Apri DevTools (F12)
2. Tab Console
3. Invia messaggio al chatbot
4. Controlla log dettagliati

## 📊 Log Dettagliati

Ora vedrai nella console:

```javascript
// URL della richiesta
Making request to: /api/chatbot

// Dettagli errore (se presente)
Axios error details: {
  message: "...",
  code: "...",
  status: 500,
  statusText: "Internal Server Error",
  data: { error: "...", details: "..." },
  url: "/api/chatbot"
}

// Tentativi retry
Retry attempt 1/3 failed: Error...
Retrying in 2000ms...
Retry attempt 2/3 failed: Error...
All retry attempts exhausted. Last error: Error...
```

## ✅ Checklist Debug

- [ ] Health check endpoint risponde?
- [ ] API key configurata su Vercel/Netlify?
- [ ] API key ha formato corretto (`sk-...`)?
- [ ] Endpoint chatbot raggiungibile?
- [ ] Nessun errore CORS nella console?
- [ ] Serverless function deployata?
- [ ] Log su Vercel/Netlify mostrano errori?

## 🔧 Fix Immediato

Se vedi "Impossibile ottenere risposta dopo i tentativi":

1. **Apri console browser** (F12)
2. **Cerca "Axios error details"** o "Network error"
3. **Controlla status code**:
   - `500` → Problema API key o server
   - `404` → Endpoint non trovato
   - `429` → Rate limit
   - `Network error` → Endpoint non raggiungibile
4. **Segui soluzione** in base allo status code
