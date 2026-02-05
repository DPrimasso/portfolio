<template>
  <div id="chatbot" v-if="isOpen" class="chatbot" role="dialog" aria-labelledby="chatbot_header" aria-modal="true">
    <div id="chatbot_header" class="chatbot-header">
      <strong>PrimoBot</strong>
      <button 
        @click="toggleChatbot" 
        aria-label="Chiudi chatbot"
        :aria-expanded="isOpen"
      >
        {{ isOpen ? '➖' : '➕' }}
      </button>
    </div>
    <div id="messages" class="chatbot-messages" ref="messagesContainer" role="log" aria-live="polite" aria-atomic="false">
      <div
          v-for="msg in chatMessages"
          :key="msg.id"
          :class="['message', msg.isUser ? 'user' : 'bot']"
          :role="msg.isUser ? 'user' : 'assistant'"
      >
        <div class="text">{{ msg.text }}</div>
      </div>
      <div v-if="isTyping" class="typing-indicator" aria-label="Il bot sta scrivendo">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="chatbot-input">
      <input
          type="text"
          v-model="userMessage"
          @keyup.enter="handleSendMessage"
          placeholder="Scrivi un messaggio..."
          aria-label="Messaggio per il chatbot"
          :disabled="isTyping"
      />
      <button 
        @click="handleSendMessage" 
        aria-label="Invia messaggio"
        :disabled="isTyping || !userMessage.trim()"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
  <div 
    id="chatbot_minimize" 
    class="minimized-chatbot" 
    v-else 
    @click="toggleChatbot"
    role="button"
    aria-label="Apri chatbot PrimoBot"
    tabindex="0"
    @keyup.enter="toggleChatbot"
  >
    CHATTA CON PRIMOBOT  💬
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatbot } from '../composables/useChatbot'

const userMessage = ref('');
const messagesContainer = ref(null);

const {
  chatMessages,
  isTyping,
  isOpen,
  error,
  toggleChatbot,
  sendMessage,
} = useChatbot();

const handleSendMessage = async () => {
  if (!userMessage.value.trim() || isTyping.value) return;
  
  const text = userMessage.value;
  userMessage.value = '';
  
  await sendMessage(text, messagesContainer.value);
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
