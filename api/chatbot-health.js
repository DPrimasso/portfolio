// Health check endpoint per verificare la configurazione del chatbot
const { validateApiKey } = require('../shared/chatbot-core')

export default async function handler(req, res) {
  // Solo GET permesso
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
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

  return res.status(validation.valid ? 200 : 503).json(health)
}
