// Serverless function per Vercel
const {
  checkRateLimit,
  getClientIP,
  handleChatbotRequest,
  createCorsHeaders,
} = require('../shared/chatbot-core')

export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.Origin
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : []
  const headers = createCorsHeaders(origin, allowedOrigins)

  // Set CORS headers
  Object.keys(headers).forEach((key) => {
    res.setHeader(key, headers[key])
  })

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  }

  // Solo POST permesso
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req)
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        error: 'Too many requests',
        details: 'Please try again later',
      })
    }

    const { messages } = req.body
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    const result = await handleChatbotRequest({
      messages,
      apiKey: OPENAI_API_KEY,
    })

    return res.status(200).json(result)
  } catch (error) {
    // Determina status code in base al tipo di errore
    let statusCode = 500
    let errorMessage = 'Internal server error'

    if (error.code === 'API_KEY_VALIDATION_FAILED') {
      statusCode = 500
      errorMessage = 'API key configuration error'
    } else if (
      error.message.includes('required') ||
      error.message.includes('too long')
    ) {
      statusCode = 400
      errorMessage = 'Bad request'
    } else if (error.code === 'INVALID_API_KEY') {
      statusCode = 500
      errorMessage = 'API key configuration error'
    } else if (error.code === 'RATE_LIMIT') {
      statusCode = 429
      errorMessage = 'Rate limit exceeded'
    } else if (error.code === 'NETWORK_ERROR') {
      statusCode = 502
      errorMessage = 'Service temporarily unavailable'
    } else if (error.code === 'OPENAI_SERVER_ERROR') {
      statusCode = 502
      errorMessage = 'AI service temporarily unavailable'
    }

    // Log strutturato
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        context: 'chatbot-api',
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
        httpStatus: statusCode,
      })
    )

    return res.status(statusCode).json({
      error: errorMessage,
      details: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        code: error.code,
        originalMessage: error.originalMessage,
      }),
    })
  }
}
