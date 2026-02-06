<template>
  <section id="contact" ref="contactSection" class="py-5" aria-labelledby="contact-heading">
    <div class="container">
      <h2
        id="contact-heading"
        class="fw-bold mb-5 text-center fade-in-up"
        :class="{ visible: isVisible }"
      >
        Contatti
      </h2>
      <div v-if="portfolioStore.loading" class="text-center">
        <p>Caricamento contatti...</p>
      </div>
      <div v-else-if="portfolioStore.contact" class="contact-cards">
        <div class="row g-4 justify-content-center">
          <!-- Email Card -->
          <div class="col-md-6 col-lg-4">
            <a
              :href="'mailto:' + portfolioStore.contact.email"
              class="contact-card card text-decoration-none"
              aria-label="Invia email a Daniele Primasso"
            >
              <div class="card-body text-center">
                <div class="contact-icon email-icon">
                  <i class="fas fa-envelope" aria-hidden="true"></i>
                </div>
                <h3 class="contact-title">Email</h3>
                <p class="contact-value">{{ portfolioStore.contact.email }}</p>
              </div>
            </a>
          </div>

          <!-- LinkedIn Card -->
          <div class="col-md-6 col-lg-4">
            <a
              :href="portfolioStore.contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card card text-decoration-none"
              aria-label="Visita il profilo LinkedIn di Daniele Primasso"
            >
              <div class="card-body text-center">
                <div class="contact-icon linkedin-icon">
                  <i class="fab fa-linkedin" aria-hidden="true"></i>
                </div>
                <h3 class="contact-title">LinkedIn</h3>
                <p class="contact-value">Visita il profilo</p>
              </div>
            </a>
          </div>

          <!-- GitHub Card -->
          <div class="col-md-6 col-lg-4">
            <a
              :href="portfolioStore.contact.github"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card card text-decoration-none"
              aria-label="Visita il profilo GitHub di Daniele Primasso"
            >
              <div class="card-body text-center">
                <div class="contact-icon github-icon">
                  <i class="fab fa-github" aria-hidden="true"></i>
                </div>
                <h3 class="contact-title">GitHub</h3>
                <p class="contact-value">Visita il profilo</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const portfolioStore = usePortfolioStore()
const contactSection = ref(null)
const isVisible = ref(false)

onMounted(() => {
  if (!portfolioStore.contact) {
    portfolioStore.loadContact()
  }

  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
.contact-cards {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-card {
  height: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  color: inherit;
}

.contact-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-glow);
  text-decoration: none;
  color: inherit;
}

.contact-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.email-icon {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.2));
  color: var(--accent-strong);
  border: 2px solid var(--accent-soft);
}

.linkedin-icon {
  background: linear-gradient(135deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.3));
  color: #0077b5;
  border: 2px solid rgba(0, 119, 181, 0.3);
}

.github-icon {
  background: linear-gradient(135deg, rgba(36, 41, 46, 0.2), rgba(36, 41, 46, 0.3));
  color: #24292e;
  border: 2px solid rgba(36, 41, 46, 0.3);
}

.contact-card:hover .contact-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
}

.contact-card:hover .email-icon {
  background: linear-gradient(135deg, var(--accent-soft), rgba(168, 85, 247, 0.3));
  border-color: var(--accent);
}

.contact-card:hover .linkedin-icon {
  background: linear-gradient(135deg, rgba(0, 119, 181, 0.3), rgba(0, 119, 181, 0.4));
  border-color: #0077b5;
}

.contact-card:hover .github-icon {
  background: linear-gradient(135deg, rgba(36, 41, 46, 0.3), rgba(36, 41, 46, 0.4));
  border-color: #24292e;
}

.contact-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.contact-value {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 0;
  word-break: break-word;
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
  .contact-icon {
    width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }
}
</style>
