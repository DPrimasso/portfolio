// Health check endpoint per verificare la configurazione del chatbot
const { validateApiKey } = require('../../shared/chatbot-core')

exports.handler = async event => {
  // Solo GET permesso
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const apiKey = process.env.OPENAI_API_KEY
  const validation = validateApiKey(apiKey)

  const health = {
    status: validation.valid ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    apiKey: {
      configured: !!apiKey,
      valid: validation.valid,
      ...(validation.error && { error: validation.error }),
    },
  }

  return {
    statusCode: validation.valid ? 200 : 503,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(health),
  }
}
