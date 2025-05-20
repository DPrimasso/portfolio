<template>
  <div id="chatbot" v-if="isOpen" class="chatbot">
    <div id="chatbot_header" class="chatbot-header">
      <strong>PrimoBot</strong>
      <button @click="toggleChatbot">{{ isOpen ? '➖' : '➕' }}</button>
    </div>
    <div id="messages" class="chatbot-messages" ref="messagesContainer">
      <div
          v-for="msg in chatMessages"
          :key="msg.id"
          :class="['message', msg.isUser ? 'user' : 'bot']"
      >
        <div class="text">{{ msg.text }}</div>
      </div>
      <div v-if="isTyping" class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="chatbot-input">
      <input
          type="text"
          v-model="userMessage"
          @keyup.enter="sendMessage"
          placeholder="Scrivi un messaggio..."
      />
      <button @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
    </div>
  </div>
  <div id="chatbot_minimize" class="minimized-chatbot" v-else @click="toggleChatbot">
    CHATTA CON PRIMOBOT  💬
  </div>
</template>

<script>
import axios from 'axios';

const OPENAI_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY

export default {
  name: 'Chatbot',
  data() {
    return {
      userMessage: '',
      chatMessages: [],
      isOpen: false,
      // Manteniamo la history dei messaggi API
      apiMessages: [
        {
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
            ` },
      ],
      isTyping: false,
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    async sendMessage() {
      const text = this.userMessage.trim();
      if (!text) return;
      // Aggiungi messaggio utente alla UI
      this.chatMessages.push({ id: Date.now(), text, isUser: true });
      // Aggiungi messaggio utente alla history API
      this.apiMessages.push({ role: 'user', content: text });
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      });
      this.userMessage = '';
      // Avvia indicatore di digitazione
      this.isTyping = true;

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: this.apiMessages
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_KEY}`
            }
          }
        );
        const answer = response.data.choices[0].message.content.trim();
        this.isTyping = false;
        // Aggiungi risposta bot a UI e history API
        this.chatMessages.push({ id: Date.now()+2, text: answer, isUser: false });
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        });
        this.apiMessages.push({ role: 'assistant', content: answer });
      } catch (error) {
        console.error('Error getting response from API:', error);
        this.isTyping = false;
        this.chatMessages.push({
          id: Date.now()+3,
          text: "Mi dispiace, c'è stato un errore.",
          isUser: false
        });
      }
    },
  }
};
</script>

<style scoped>
.chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  height: 450px;
  background: #c9d1d9;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  transition: bottom 0.3s ease, right 0.3s ease, opacity 0.3s ease;
  z-index: 9999;
}
.chatbot-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chatbot-messages {
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.message .text {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 100%;
}
.message.user { align-self: flex-end; }
.message.user .text { background: #007bff; color: #fff; }
.message.bot { align-self: flex-start; }
.message.bot .text { background: #e9ecef; color: #333; }
.chatbot-input {
  display: flex;
}
.chatbot-input input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  border-radius: 20px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  padding: 12px;
  margin: 5px;
}
.chatbot-input button {
  background: none;
  border: none;
  color: #007bff;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.chatbot-input button:hover {
  transform: scale(1.1);
}
.minimized-chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 60px;
  background: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 9999;
}
.typing-indicator {
  display: flex;
  align-items: center;
  padding: 0 12px 12px;
  gap: 4px;
  margin-top: 10px;
}
.typing-indicator span {
  display: block;
  width: 6px;
  height: 6px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  animation: bounce 1s infinite ease-in-out;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
</style>
