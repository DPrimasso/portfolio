<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Navigation as CarouselNavigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
  snapAlign: 'center',
  mouseDrag: true,
  pauseAutoplayOnHover: true,
}
</script>

<template>
  <section id="projects" class="projects-section py-5">
    <div class="container">
      <h2 class="fw-bold mb-5 text-center">I miei progetti</h2>

      <Carousel v-bind="carouselConfig" class="projects-carousel">
        <Slide v-for="project in projects" :key="project.title">
          <div class="project-card card shadow-sm">
            <div class="card-body d-flex flex-column">
              <!-- Copy -->
              <div class="flex-grow-1">
                <h3 class="card-title mb-2">{{ project.title }}</h3>
                <p class="card-text">{{ project.description }}</p>
              </div>

              <!-- CTA row aligned to the end / side -->
              <div class="action-row d-flex justify-content-end mt-3">
                <a
                    v-if="project.link && project.link !== 'Privato'"
                    :href="project.link"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-gradient"
                >
                  Vai al progetto
                </a>
                <span v-else class="text-muted small align-self-end">Repository privato</span>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <CarouselNavigation>
            <template #prev>
              <span>←</span>
            </template>
            <template #next>
              <span>→</span>
            </template>
          </CarouselNavigation>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        {
          title: 'Primo Code Assistant',
          description: 'Applicazione Python che utilizza le API di OpenAI per fornire supporto di codifica in tempo reale',
          technologies: 'Python, OpenAI',
          link: 'https://github.com/DPrimasso/primo-code-assistant'
        },
        {
          title: 'Portfolio Project',
          description: 'Portfolio basato su Vue.js con layout responsive, caricamento dinamico dei progetti, design delle card interattivo con effetti hover e struttura modulare dei componenti.',
          technologies: 'Vue.js, HTML5, CSS3, JavaScript',
          link: 'https://github.com/DPrimasso/portfolio'
        },
        {
          title: 'Node js Backend',
          description:
              'Backend in Node.js con Express e MongoDB: autenticazione JWT, CRUD per utenti, prodotti e ordini, integrazione Stripe per pagamenti, validazione con Joi, rate limiting, sicurezza HTTP con Helmet, logging con Morgan, test end-to-end con Jest e SuperTest, e containerizzazione Docker.',
          technologies:
              'Node.js, Express, MongoDB, Mongoose, JWT, Stripe, Joi, Jest, SuperTest, Docker, Docker Compose',
          link: 'Privato',
        },
        {
          title: 'Engine Golang',
          description:
              'Backend in Go: API REST con Gorilla Mux, connessione MongoDB, interazioni con smart contract Ethereum (go-ethereum), scheduler Cron, documentazione Swagger (Swaggo) e gestione di statistiche e snapshot tramite endpoint.',
          technologies:
              'Go, Gorilla Mux, MongoDB, go-ethereum, Robfig Cron, Swaggo (Swagger), godotenv',
          link: 'Privato',
        },
        {
          title: 'Engine GraphQL CRUD',
          description: 'GraphQL CRUD engine per entità User e Project con Node.js e Apollo Server v3: operazioni CRUD complete, TypeScript per tipizzazione, datastore in-memory, configurazione ESLint/Prettier e gestione delle variabili con dotenv.',
          technologies: 'Node.js, TypeScript, Apollo Server v3, GraphQL, ESLint, Prettier, dotenv',
          link: ''
        }
      ],
    }
  },
}
</script>

<style scoped>
/* ---- Layout & sizing ---- */
.projects-carousel :deep(.carousel__slide) {
  padding: 1rem;
  display: flex;
}

.container-projects {
  margin-left: 100px;
}

.project-card {
  flex: 1 1 100%;
  height: 100%;
  border: none;
  border-radius: 1rem;
  background: var(--bs-light);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Ensure equal height for all cards inside the carousel */
.project-card .card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ---- Modern aesthetic ---- */
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-weight: 700;
  font-size: 1.35rem;
}

.btn-gradient {
  background-image: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: #fff;
}

.btn-gradient:hover,
.btn-gradient:focus {
  filter: brightness(1.05);
  color: #fff;
}

/* Pagination dots */
.projects-carousel :deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #dee2e6;
  margin: 0 4px;
  transition: background 0.2s ease;
}

.projects-carousel :deep(.carousel__pagination-button--active) {
  background: #6366f1;
}

.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.3);
  --vc-nav-color: white;
  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 40px;
  --vc-nav-height: 40px;

}

</style>
