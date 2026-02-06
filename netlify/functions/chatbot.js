// Serverless function per Netlify
const {
  checkRateLimit,
  getClientIP,
  handleChatbotRequest,
  createCorsHeaders,
} = require('../../shared/chatbot-core')

exports.handler = async event => {
  const origin = event.headers?.origin || event.headers?.Origin
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []
  const headers = createCorsHeaders(origin, allowedOrigins)

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Solo POST permesso
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(event)
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too many requests',
          details: 'Please try again later',
        }),
      }
    }

    const { messages } = JSON.parse(event.body || '{}')
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    const result = await handleChatbotRequest({
      messages,
      apiKey: OPENAI_API_KEY,
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (error) {
    // Determina status code in base al tipo di errore
    let statusCode = 500
    let errorMessage = 'Internal server error'

    if (error.code === 'API_KEY_VALIDATION_FAILED') {
      statusCode = 500
      errorMessage = 'API key configuration error'
    } else if (error.message.includes('required') || error.message.includes('too long')) {
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
        context: 'chatbot-netlify',
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
        httpStatus: statusCode,
      })
    )

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error: errorMessage,
        details: error.message,
        ...(process.env.NODE_ENV === 'development' && {
          code: error.code,
          originalMessage: error.originalMessage,
        }),
      }),
    }
  }
}
