<template>
  <section id="about" ref="target" class="py-5" aria-labelledby="about-heading">
    <div class="container">
      <h2
        id="about-heading"
        class="fw-bold mb-5 text-center fade-in-up"
        :class="{ visible: isVisible }"
      >
        Chi sono
      </h2>

      <div class="about-content fade-in-up" :class="{ visible: isVisible }">
        <div class="about-profile-row">
          <div class="profile-image-wrapper">
            <img
              :src="profile1"
              alt="Daniele Primasso - Ritratto professionale"
              class="profile-img"
              loading="lazy"
              width="220"
              height="220"
            />
          </div>

          <div class="about-text">
            <div class="about-card card">
              <div class="card-body">
                <p class="about-paragraph">
                  Software engineer con oltre <strong>10 anni di carriera</strong>, specializzato in
                  architetture back-end scalabili: <strong>API REST</strong>,
                  <strong>microservizi</strong> e pipeline di dati. Profondo in
                  <strong>Node.js</strong>, <strong>Golang</strong> e <strong>Python</strong>, con
                  esperienza trasversale che spazia dall'automazione industriale (PLC) ai
                  <strong>protocolli blockchain</strong> (ERC20, ERC4337, VotingEscrow) fino alle
                  pipeline dati aziendali.
                </p>
                <p class="about-paragraph">
                  Ho guidato lo sviluppo tecnico in una startup come
                  <strong>Lead Developer per 4 anni</strong> e portato in produzione sistemi
                  distribuiti per clienti in settori diversi. Oggi lavoro su prodotti web complessi,
                  integrando le mie competenze backend con un occhio attento a
                  <strong>performance</strong>, <strong>osservabilità</strong> e
                  <strong>qualità del codice</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import profile1 from '../assets/images/daniele-primasso-profilo.webp'

const isVisible = ref(false)

const { target } = useIntersectionObserver(
  () => {
    isVisible.value = true
  },
  { once: true, threshold: 0.15 }
)
</script>

<style scoped>
.about-content {
  max-width: 960px;
  margin: 0 auto;
}

.about-profile-row {
  display: flex;
  align-items: flex-start;
  gap: 3rem;
}

.profile-image-wrapper {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.profile-img {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-subtle);
  box-shadow:
    0 0 0 4px var(--bg-alt),
    0 0 30px var(--accent-soft);
  transition: all 0.3s ease;
  display: block;
}

.profile-img:hover {
  box-shadow:
    0 0 0 4px var(--bg-alt),
    0 0 40px var(--accent-strong);
  transform: scale(1.04);
  border-color: var(--accent);
}

.about-text {
  flex: 1;
}

.about-card {
  max-width: 100%;
  margin: 0;
}

.about-paragraph {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.about-paragraph:last-child {
  margin-bottom: 0;
}

.about-paragraph strong {
  color: var(--text);
  font-weight: 600;
  background: linear-gradient(120deg, transparent, var(--accent-soft), transparent);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.5s ease;
  padding: 0.1rem 0.2rem;
  border-radius: 4px;
}

.about-card:hover .about-paragraph strong {
  background-position: 0 0;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about-profile-row {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .profile-img {
    width: 160px;
    height: 160px;
  }
}
</style>
