<template>
  <header class="hero d-flex align-items-center text-center" role="banner">
    <div class="hero-orbit"></div>
    <div class="hero-orbit hero-orbit--2"></div>

    <div class="container hero-inner">
      <div class="hero-pill">
        <span class="hero-dot"></span>
        <span>Software Engineer · Web · Cloud · Automation</span>
      </div>

      <h1 class="hero-title">
        <span class="typing">Daniele Primasso</span><span class="cursor" aria-hidden="true"></span>
      </h1>

      <p class="hero-subtitle">
        Backend engineer specializzato in <strong>Node.js</strong>, <strong>Golang</strong> e
        sistemi distribuiti — dall'automazione industriale ai
        <strong>protocolli blockchain</strong>.
      </p>

      <div class="hero-meta">
        <div v-for="(stat, i) in portfolioStore.stats" :key="i" class="hero-meta-item">
          <span class="hero-meta-label">{{ stat.label }}</span>
          <span class="hero-meta-value">{{ stat.value }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <a href="#projects" class="hero-btn-primary"> Guarda i progetti </a>
        <a href="#contact" class="hero-btn-secondary" @click.prevent="scrollToContact">
          Contattami
        </a>
      </div>

      <div class="hero-scroll-indicator" aria-hidden="true">
        <span class="hero-scroll-arrow">↓</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const portfolioStore = usePortfolioStore()

onMounted(() => {
  if (portfolioStore.stats.length === 0) {
    portfolioStore.loadStats()
  }
})

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (!el) return

  const rect = el.getBoundingClientRect()
  const headerOffset = 70
  const targetY = rect.top + window.scrollY - headerOffset

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.hero-scroll-indicator {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.hero-scroll-arrow {
  font-size: 1.4rem;
  color: var(--muted);
  animation: hero-scroll-bounce 2s ease-in-out infinite;
  display: inline-block;
}

@keyframes hero-scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}
</style>
