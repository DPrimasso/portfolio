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
        Costruisco prodotti web curando <strong>architettura</strong>,
        <strong>performance</strong> e <strong>design</strong>.
      </p>

      <div class="hero-meta">
        <div class="hero-meta-item">
          <span class="hero-meta-label">anni di esperienza</span>
          <span class="hero-meta-value">7+</span>
        </div>
        <div class="hero-meta-item">
          <span class="hero-meta-label">progetti production-ready</span>
          <span class="hero-meta-value">10+</span>
        </div>
        <div class="hero-meta-item">
          <span class="hero-meta-label">stack principale</span>
          <span class="hero-meta-value">Vue · Node · Cloud</span>
        </div>
      </div>

      <div class="hero-actions">
        <a href="#projects" class="hero-btn-primary"> Guarda i progetti </a>
        <a href="#contact" class="hero-btn-secondary" @click.prevent="scrollToContact">
          Contattami
        </a>
      </div>

      <div class="hero-hints">
        <span class="hero-hint-pill">⌘K · Chatbot per farmi domande</span>
        <span class="hero-hint-pill">Scrolla per esplorare il codice</span>
      </div>
    </div>
  </header>
</template>

<script setup>
const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (!el) return

  const rect = el.getBoundingClientRect()
  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  const headerOffset = 70 // offset per navbar / padding-top body
  const targetY = rect.top + scrollTop - headerOffset

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  })
}
</script>
