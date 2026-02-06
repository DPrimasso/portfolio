<template>
  <div>
    <!-- Navigation & sections -->
    <Navbar />

    <main id="main-content">
      <!--    <Sidebar />-->
      <Hero />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Divider />
      <Education />
      <Divider />
      <Projects />
      <Divider />
      <CTA />
      <Divider />
      <Chatbot />
    </main>

    <!-- Footer ----------------------------------------------------------- -->
    <footer id="footer" class="footer-modern py-5" role="contentinfo">
      <div class="container">
        <div class="row g-4 justify-content-center">
          <div id="contact" class="col-12 col-md-8 col-lg-6 text-center">
            <h3 class="footer-heading">Contatti</h3>
            <div v-if="portfolioStore.contact" class="footer-contacts-row">
              <a
                :href="'mailto:' + portfolioStore.contact.email"
                class="footer-link footer-email-link"
              >
                <i class="fas fa-envelope me-2"></i>
                {{ portfolioStore.contact.email }}
              </a>
              <div class="footer-social">
                <a
                  :href="portfolioStore.contact.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-social-link linkedin"
                  aria-label="Visita il profilo LinkedIn"
                >
                  <i class="fab fa-linkedin" aria-hidden="true"></i>
                </a>
                <a
                  :href="portfolioStore.contact.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-social-link github"
                  aria-label="Visita il profilo GitHub"
                >
                  <i class="fab fa-github" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr class="footer-divider mt-4 mb-4" />
        <p class="footer-copyright text-center mb-0">
          &copy; 2025 Daniele Primasso. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Divider from './components/Divider.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Education from './components/Education.vue'
import CTA from './components/CTA.vue'
import { defineAsyncComponent } from 'vue'
import Chatbot from './components/Chatbot.vue'
// Lazy load heavy components
const Projects = defineAsyncComponent(() => import('./components/Projects.vue'))
import { usePortfolioStore } from './stores/portfolio'
import { useSEO } from './composables/useSEO'

const portfolioStore = usePortfolioStore()
const { setMetaTags, setStructuredData } = useSEO()

// Setup SEO on mount
onMounted(() => {
  setMetaTags()

  // Wait for contact data to be loaded
  if (portfolioStore.contact) {
    setStructuredData(portfolioStore.contact)
  } else {
    portfolioStore.loadContact().then(() => {
      setStructuredData(portfolioStore.contact)
    })
  }
})
</script>

<style scoped>
/* Buttons */
.btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  margin: 0.4em;
}

/* Footer moderno */
.footer-modern {
  background: var(--bg-alt);
  color: var(--text);
  border-top: 1px solid var(--border-subtle);
}

.footer-heading {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  text-align: center;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  border-radius: 2px;
}

.footer-contacts-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0;
}

.footer-email-link {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
}

.footer-link {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.footer-link:hover {
  color: var(--accent-strong);
  text-decoration: none;
}

.footer-social {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footer-social-link {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid var(--border-subtle);
  background: rgba(15, 23, 42, 0.5);
}

.footer-social-link.linkedin {
  color: #0077b5;
}

.footer-social-link.github {
  color: var(--text);
}

.footer-social-link:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
  border-color: var(--accent);
  text-decoration: none;
}

.footer-social-link.linkedin:hover {
  background: rgba(0, 119, 181, 0.2);
  color: #0077b5;
}

.footer-social-link.github:hover {
  background: var(--accent-soft);
  color: var(--accent-strong);
}

.footer-links {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links li:last-child {
  margin-bottom: 0;
}

.footer-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 2rem 0 1rem;
  opacity: 0.5;
}

.footer-copyright {
  color: var(--muted);
  font-size: 0.9rem;
  text-align: center !important;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .footer-contacts-row {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
