import { ref, nextTick, type Ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import { useErrorHandler } from './useErrorHandler'
import { config } from '../config/env'

interface ChatMessage {
  id: number
  text: string
  isUser: boolean
}

interface ApiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatbotResponse {
  message: string
}

const SYSTEM_PROMPT: ApiMessage = {
  role: 'system',
  content: `Sei PrimoBot, l'assistente virtuale del portfolio di Daniele Primasso. Usa queste informazioni del CV per rispondere alle domande:
    Nome: Daniele Primasso
    Data di nascita: 27/09/1993
    Posizione: Software Developer
    Contatti: primo.note4@gmail.com, +39 3272404432

    Formazione:
    - Diploma in Informatica/Sistemi, Bonsignori, Remedello (BS), 2010

    Competenze:
    - Linguaggi: Node.js, Solidity, Golang, Python, Vue.js, Phoenix (Elixir), JavaScript, MongoDB, SQL
    - Esperienza con microservizi, API REST, blockchain (ERC-20/721/1155), IA/ML

    Esperienza:
    - Secarepay (Nov 2024 - presente): Software Developer (Phoenix/Angular/Python)
    - Scaling Parrots (Apr 2020 - Ott 2024): Lead Developer (Node.js, Golang, Python, Solidity)
    - Nextre Engineering (Gen 2017 - Mar 2020): Software Developer (Java/Grails)
    - Margor SRL (Mar 2014 - Dic 2016): Developer PLC, progetti IoT
    `,
}

export function useChatbot() {
  const chatMessages: Ref<ChatMessage[]> = ref([])
  const isTyping = ref(false)
  const isOpen = ref(false)
  const apiMessages: Ref<ApiMessage[]> = ref([SYSTEM_PROMPT])
  const { error, setError, retry } = useErrorHandler()

  // Determina l'URL dell'API in base all'ambiente
  const getApiUrl = (): string => {
    const url = config.apiUrl
    
    // Se è un URL completo (inizia con http/https), usalo direttamente
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    
    // In sviluppo, se l'URL è relativo e non c'è un server locale,
    // mostra un warning e usa l'URL relativo (potrebbe non funzionare)
    if (config.isDev && url === '/api/chatbot') {
      console.warn(
        '⚠️ Chatbot API: In sviluppo locale, /api/chatbot non è disponibile.\n' +
        'Opzioni:\n' +
        '1. Configura VITE_CHATBOT_API_URL nel file .env per puntare a un endpoint esterno\n' +
        '   Esempio: VITE_CHATBOT_API_URL=https://tuodominio.vercel.app/api/chatbot\n' +
        '2. Usa Vercel CLI per testare le functions localmente: vercel dev\n' +
        '3. Testa direttamente in produzione dopo il deploy'
      )
    }
    
    return url
  }

  const toggleChatbot = (): void => {
    isOpen.value = !isOpen.value
  }

  const scrollToBottom = (container: HTMLElement | null): void => {
    if (container) {
      nextTick(() => {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
      })
    }
  }

  const sendMessage = async (text: string, messagesContainer: HTMLElement | null): Promise<void> => {
    if (!text.trim()) return

    // Reset error
    error.value = null

    // Aggiungi messaggio utente alla UI
    const userMessage: ChatMessage = { id: Date.now(), text: text.trim(), isUser: true }
    chatMessages.value.push(userMessage)

    // Aggiungi messaggio utente alla history API
    apiMessages.value.push({ role: 'user', content: text.trim() })

    scrollToBottom(messagesContainer)

    // Avvia indicatore di digitazione
    isTyping.value = true

    try {
      const apiUrl = getApiUrl()
      console.log('Making request to:', apiUrl)

      const makeRequest = async (): Promise<AxiosResponse<ChatbotResponse>> => {
        try {
          const response = await axios.post<ChatbotResponse>(
            apiUrl,
            { messages: apiMessages.value },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              timeout: 30000, // 30 secondi timeout
            }
          )
          return response
        } catch (err) {
          // Log dettagliato per debugging
          if (axios.isAxiosError(err)) {
            console.error('Axios error details:', {
              message: err.message,
              code: err.code,
              status: err.response?.status,
              statusText: err.response?.statusText,
              data: err.response?.data,
              url: apiUrl,
            })
          }
          throw err
        }
      }

      const response = await retry(makeRequest)

      if (!response) {
        // Se retry ha fallito, l'errore è già stato loggato
        throw new Error('Impossibile ottenere risposta dopo i tentativi. Controlla la console per i dettagli.')
      }

      const answer = response.data.message?.trim()

      if (!answer) {
        throw new Error('Risposta vuota dal server')
      }

      isTyping.value = false

      // Aggiungi risposta bot a UI e history API
      const botMessage: ChatMessage = { id: Date.now() + 1, text: answer, isUser: false }
      chatMessages.value.push(botMessage)
      apiMessages.value.push({ role: 'assistant', content: answer })

      scrollToBottom(messagesContainer)
    } catch (err) {
      console.error('Error getting response from API:', err)
      isTyping.value = false

      let errorMessage = "Mi dispiace, c'è stato un errore."
      let userFriendlyMessage = "Mi dispiace, c'è stato un errore nel comunicare con il servizio."

      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Errore dalla risposta del server
          const errorData = err.response.data as { error?: string; details?: string; code?: string }
          const status = err.response.status

          // Messaggi user-friendly in base allo status code
          switch (status) {
            case 400:
              userFriendlyMessage = 'Richiesta non valida. Riprova con un messaggio diverso.'
              break
            case 404:
              // 404 in dev locale significa endpoint non disponibile
              if (config.isDev && getApiUrl() === '/api/chatbot') {
                userFriendlyMessage = 
                  '⚠️ Endpoint API non disponibile in sviluppo locale.\n\n' +
                  'Configura VITE_CHATBOT_API_URL nel file .env per testare localmente, ' +
                  'oppure testa in produzione dopo il deploy.'
              } else {
                userFriendlyMessage = 'Endpoint non trovato. Verifica la configurazione.'
              }
              break
            case 401:
            case 500:
              // Probabilmente problema API key
              userFriendlyMessage = 'Servizio temporaneamente non disponibile. Riprova più tardi.'
              break
            case 429:
              userFriendlyMessage = 'Troppe richieste. Riprova tra qualche minuto.'
              break
            case 502:
            case 503:
              userFriendlyMessage = 'Servizio temporaneamente non disponibile. Riprova più tardi.'
              break
            default:
              userFriendlyMessage = errorData?.error || 'Errore del server. Riprova più tardi.'
          }

          errorMessage = errorData?.error || `Errore ${status}`
          if (errorData?.details) {
            errorMessage += `: ${errorData.details}`
          }

          // Log per debugging
          console.error('Server error response:', {
            status,
            error: errorData,
            url: getApiUrl(),
          })
        } else if (err.request) {
          // Richiesta fatta ma nessuna risposta (timeout, network error, etc.)
          const apiUrl = getApiUrl()
          
          // Se è 404 in dev e l'URL è relativo, è probabile che l'endpoint non esista
          if (config.isDev && apiUrl === '/api/chatbot' && err.response?.status === 404) {
            userFriendlyMessage = 
              '⚠️ Endpoint API non disponibile in sviluppo locale.\n\n' +
              'Per testare il chatbot:\n' +
              '1. Configura VITE_CHATBOT_API_URL nel file .env\n' +
              '2. Oppure testa in produzione dopo il deploy'
            errorMessage = 'API endpoint not available in local development'
          } else {
            userFriendlyMessage = 'Impossibile connettersi al server. Verifica la connessione e riprova.'
            errorMessage = err.code === 'ECONNABORTED' 
              ? 'Timeout: il server non ha risposto in tempo'
              : err.message || 'Network error'
          }
          
          console.error('Network error:', {
            code: err.code,
            message: err.message,
            url: apiUrl,
            status: err.response?.status,
          })
        } else {
          // Errore nella configurazione della richiesta
          errorMessage = err.message || errorMessage
          userFriendlyMessage = 'Errore nella configurazione della richiesta.'
        }
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage
        // Se contiene "tentativi", è già user-friendly
        if (errorMessage.includes('tentativi')) {
          userFriendlyMessage = errorMessage
        }
      }

      setError(err, errorMessage)

      chatMessages.value.push({
        id: Date.now() + 2,
        text: userFriendlyMessage,
        isUser: false,
      })

      scrollToBottom(messagesContainer)
    }
  }

  const clearChat = (): void => {
    chatMessages.value = []
    apiMessages.value = [SYSTEM_PROMPT]
    error.value = null
  }

  return {
    chatMessages,
    isTyping,
    isOpen,
    error,
    toggleChatbot,
    sendMessage,
    clearChat,
  }
}
