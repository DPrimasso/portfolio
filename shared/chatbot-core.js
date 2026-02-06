/**
 * Logica comune per le serverless functions del chatbot
 * Può essere usata sia da Netlify che da Vercel
 */

// Rate limiting in-memory (per development)
// In production, usare Redis o un servizio esterno
const rateLimiter = new Map()

/**
 * Verifica rate limit per un IP
 * @param {string} ip - IP address
 * @param {number} maxRequests - Numero massimo di richieste
 * @param {number} windowMs - Finestra temporale in millisecondi
 * @returns {boolean} true se la richiesta è permessa
 */
function checkRateLimit(ip, maxRequests = 10, windowMs = 60000) {
  const now = Date.now()

  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const limit = rateLimiter.get(ip)
  if (now > limit.resetTime) {
    limit.count = 1
    limit.resetTime = now + windowMs
    return true
  }

  if (limit.count >= maxRequests) {
    return false
  }

  limit.count++
  return true
}

/**
 * Ottiene l'IP del client dalla richiesta
 * @param {Object} event - Event object (Netlify) o req (Vercel)
 * @returns {string} IP address
 */
function getClientIP(event) {
  return (
    event.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers?.['x-real-ip'] ||
    event.requestContext?.identity?.sourceIp ||
    event.ip ||
    'unknown'
  )
}

/**
 * Valida l'API key di OpenAI
 * @param {string} apiKey - API key da validare
 * @returns {{valid: boolean, key?: string, error?: string}} Risultato validazione
 */
function validateApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    return { valid: false, error: 'OPENAI_API_KEY not configured' }
  }

  const trimmed = apiKey.trim()
  if (!trimmed) {
    return { valid: false, error: 'OPENAI_API_KEY is empty (only whitespace)' }
  }

  // OpenAI API keys iniziano con "sk-"
  if (!trimmed.startsWith('sk-')) {
    return {
      valid: false,
      error: 'OPENAI_API_KEY has invalid format (should start with "sk-")',
    }
  }

  // Lunghezza tipica: 51 caratteri, ma accettiamo range più ampio
  if (trimmed.length < 20 || trimmed.length > 200) {
    return {
      valid: false,
      error: 'OPENAI_API_KEY has invalid length',
    }
  }

  return { valid: true, key: trimmed }
}

/**
 * Gestisce gli errori dell'API OpenAI in modo specifico
 * @param {Response} response - Response object
 * @param {Object} errorData - Dati dell'errore
 * @returns {Error} Error object con messaggio specifico
 */
function handleOpenAIError(response, errorData) {
  const status = response.status
  const errorMessage = errorData?.error?.message || 'Unknown error'

  let userMessage
  let errorCode

  switch (status) {
    case 401:
      userMessage = 'OPENAI_API_KEY not configured or invalid'
      errorCode = 'INVALID_API_KEY'
      break
    case 429:
      userMessage = 'OpenAI API rate limit exceeded. Please try again later.'
      errorCode = 'RATE_LIMIT'
      break
    case 500:
    case 502:
    case 503:
      userMessage = `OpenAI API server error (${status}). Please try again later.`
      errorCode = 'OPENAI_SERVER_ERROR'
      break
    default:
      userMessage = `OpenAI API error: ${errorMessage} (${status})`
      errorCode = 'OPENAI_API_ERROR'
  }

  const error = new Error(userMessage)
  error.code = errorCode
  error.status = status
  error.originalMessage = errorMessage
  return error
}

/**
 * Logging strutturato per errori
 * @param {string} context - Contesto dell'errore
 * @param {Error} error - Error object
 * @param {Object} metadata - Metadata aggiuntiva
 */
function logError(context, error, metadata = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    },
    ...metadata,
  }

  // Non loggare API key
  if (logEntry.apiKey) {
    logEntry.apiKey = '***REDACTED***'
  }

  console.error(JSON.stringify(logEntry))
}

/**
 * Gestisce la richiesta del chatbot
 * @param {Object} params - Parametri della richiesta
 * @param {Array} params.messages - Array di messaggi
 * @param {string} params.apiKey - OpenAI API key
 * @returns {Promise<Object>} Risposta del chatbot
 */
async function handleChatbotRequest({ messages, apiKey }) {
  // Validazione input
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error('Messages array is required')
  }

  // Validazione max length
  const maxMessageLength = 1000
  for (const msg of messages) {
    if (msg.content && msg.content.length > maxMessageLength) {
      throw new Error(`Message too long. Max length: ${maxMessageLength}`)
    }
  }

  // Validazione API key robusta
  const apiKeyValidation = validateApiKey(apiKey)
  if (!apiKeyValidation.valid) {
    const error = new Error(apiKeyValidation.error)
    error.code = 'API_KEY_VALIDATION_FAILED'
    throw error
  }

  const validatedKey = apiKeyValidation.key

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${validatedKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error = handleOpenAIError(response, errorData)
      logError('OpenAI API call failed', error, {
        status: response.status,
        errorData,
      })
      throw error
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content?.trim()

    if (!answer) {
      const error = new Error('Empty response from AI')
      error.code = 'EMPTY_RESPONSE'
      logError('Empty AI response', error, { data })
      throw error
    }

    return { message: answer }
  } catch (error) {
    // Se è già un errore gestito, rilancialo
    if (error.code) {
      throw error
    }

    // Altrimenti, gestisci errori di rete/timeout
    const networkError = new Error(
      `Network error: ${error.message || 'Failed to connect to OpenAI API'}`
    )
    networkError.code = 'NETWORK_ERROR'
    networkError.originalError = error.message
    logError('Network error during OpenAI API call', networkError)
    throw networkError
  }
}

/**
 * Crea CORS headers con whitelist
 * Se ALLOWED_ORIGINS non è impostato, riflette l'origin della richiesta (qualsiasi https o localhost)
 * così il deploy su Vercel/altro dominio funziona senza configurare env.
 * @param {string} origin - Origin della richiesta
 * @param {Array<string>} allowedOrigins - Lista di origins permessi (es. da process.env.ALLOWED_ORIGINS)
 * @returns {Object} CORS headers
 */
function createCorsHeaders(origin, allowedOrigins = []) {
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://tuodominio.com',
  ]

  const origins = allowedOrigins.length > 0 ? allowedOrigins : defaultOrigins
  let allowedOrigin

  if (origin && origins.includes(origin)) {
    allowedOrigin = origin
  } else if (
    allowedOrigins.length === 0 &&
    origin &&
    (origin.startsWith('https://') || origin.startsWith('http://localhost'))
  ) {
    // Nessun ALLOWED_ORIGINS: rifletti l'origin così funziona su qualsiasi deploy (Vercel, etc.)
    allowedOrigin = origin
  } else {
    allowedOrigin = origins[0] || '*'
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  }
}

module.exports = {
  checkRateLimit,
  getClientIP,
  handleChatbotRequest,
  createCorsHeaders,
  validateApiKey,
}
