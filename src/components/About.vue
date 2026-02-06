<template>
  <section id="about" ref="aboutSection" class="py-5" aria-labelledby="about-heading">
    <div class="container">
      <h2
        id="about-heading"
        class="fw-bold mb-5 text-center fade-in-up"
        :class="{ visible: isVisible }"
      >
        Chi sono
      </h2>

      <div class="about-content fade-in-up" :class="{ visible: isVisible }">
        <!-- Immagini profilo decorative -->
        <div class="about-images mb-5 d-flex justify-content-center flex-wrap gap-4">
          <div class="profile-image-wrapper">
            <img
              :src="profile1"
              alt="Daniele Primasso - Ritratto professionale"
              class="profile-img"
              loading="lazy"
              width="180"
              height="180"
            />
          </div>
          <div class="profile-image-wrapper">
            <img
              :src="profile2"
              alt="Daniele Primasso - Foto profilo"
              class="profile-img"
              loading="lazy"
              width="180"
              height="180"
            />
          </div>
        </div>

        <!-- Testo descrittivo -->
        <div class="about-text">
          <div class="about-card card">
            <div class="card-body">
              <p class="about-paragraph">
                Software Developer orientato alla crescita continua, con oltre
                <strong>7 anni di esperienza</strong> nella progettazione e nello sviluppo di
                soluzioni back-end scalabili e performanti. Esperto nella creazione di
                <strong>API REST</strong> e <strong>microservizi</strong> in Node.js, Golang e
                Python.
              </p>
              <p class="about-paragraph">
                Forte curiosità nell'esplorare tecnologie emergenti come
                <strong>IA e Machine Learning</strong> per l'analisi di dati oppure
                <strong>protocolli blockchain</strong> per integrare soluzioni decentralizzate.
                Motivato da sfide tecniche e obiettivi ambiziosi, mi impegno a trasformare requisiti
                complessi in prodotti affidabili e ad alto impatto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import profile1 from '../assets/images/daniele-primasso-profilo.webp'
import profile2 from '../assets/images/daniele-primasso-profile2.jpeg'

const aboutSection = ref(null)
const isVisible = ref(false)

onMounted(() => {
  // Simple timeout to trigger animation
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.about-images {
  margin-bottom: 3rem;
}

.profile-image-wrapper {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 180px;
  height: 180px;
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
  transform: scale(1.05);
  border-color: var(--accent);
}

.about-card {
  max-width: 100%;
  margin: 0 auto;
}

.about-paragraph {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
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
  .about-images {
    gap: 2rem;
  }

  .profile-img {
    width: 150px;
    height: 150px;
  }
}
</style>
