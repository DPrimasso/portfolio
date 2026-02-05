<template>
  <aside class="sidebar" aria-label="Link social">
    <a 
      v-if="portfolioStore.contact?.github"
      :href="portfolioStore.contact.github" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Visita il profilo GitHub"
    >
      <i class="fab fa-github" aria-hidden="true"></i>
    </a>
    <a 
      v-if="portfolioStore.contact?.linkedin"
      :href="portfolioStore.contact.linkedin" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Visita il profilo LinkedIn"
    >
      <i class="fab fa-linkedin" aria-hidden="true"></i>
    </a>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePortfolioStore } from '../stores/portfolio';

const portfolioStore = usePortfolioStore();

onMounted(() => {
  if (!portfolioStore.contact) {
    portfolioStore.loadContact();
  }
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  background: rgba(13,17,23,0.8);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.sidebar a {
  color: var(--text);
  font-size: 1.75rem;
  padding: 0.25rem;
  transition: color 0.3s, transform 0.3s;
  position: relative;
}
.sidebar a:hover {
  color: var(--accent);
  transform: translateX(5px);
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
