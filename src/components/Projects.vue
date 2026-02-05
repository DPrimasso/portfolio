<template>
  <section id="projects" class="projects-section py-5" aria-labelledby="projects-heading" ref="projectsSection">
    <div class="container">
      <h2 id="projects-heading" class="fw-bold mb-5 text-center fade-in-up" :class="{ visible: isVisible }">I miei progetti</h2>

      <div v-if="portfolioStore.loading" class="text-center">
        <p>Caricamento progetti...</p>
      </div>
      <Carousel 
        v-else 
        ref="carouselRef"
        v-bind="carouselConfig" 
        class="projects-carousel" 
        aria-label="Carosello progetti"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <Slide v-for="(project, index) in duplicatedProjects" :key="`${project.title}-${index}`">
          <div class="project-card card">
            <div class="card-body d-flex flex-column">
              <!-- Copy -->
              <div class="flex-grow-1">
                <h3 class="card-title mb-3">{{ project.title }}</h3>
                <p class="card-text mb-3">{{ project.description }}</p>
                
                <!-- Tech tags -->
                <div v-if="project.technologies" class="tech-tags mb-3">
                  <span 
                    v-for="(tech, idx) in getTechTags(project.technologies)" 
                    :key="idx" 
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- CTA row aligned to the end / side -->
              <div class="action-row d-flex justify-content-end mt-auto">
                <a
                    v-if="project.link && project.link !== 'Privato' && project.link !== ''"
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-project-link"
                    :aria-label="`Vai al progetto ${project.title}`"
                >
                  <i class="fab fa-github me-2"></i>
                  Vai al progetto
                </a>
                <span v-else class="project-private">
                  <i class="fas fa-lock me-2"></i>
                  Repository privato
                </span>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <CarouselNavigation>
            <template #prev>
              <span class="carousel-nav-icon">←</span>
            </template>
            <template #next>
              <span class="carousel-nav-icon">→</span>
            </template>
          </CarouselNavigation>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted, watch, nextTick } from 'vue';
import { usePortfolioStore } from '../stores/portfolio'
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { Navigation as CarouselNavigation } from 'vue3-carousel';

const portfolioStore = usePortfolioStore();
const projectsSection = ref(null);
const isVisible = ref(false);
const carouselRef = ref(null);
let autoplayInterval = null;

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
  snapAlign: 'center',
  mouseDrag: true,
  transition: 800,
};

// Duplica i progetti per effetto seamless infinito
const duplicatedProjects = computed(() => {
  const projects = portfolioStore.projects;
  if (projects.length === 0) return [];
  // Duplica 3 volte per garantire continuità
  return [...projects, ...projects, ...projects];
});

const getTechTags = (technologies) => {
  if (!technologies) return [];
  return technologies.split(',').map(tech => tech.trim()).slice(0, 4);
};

const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  if (!carouselRef.value) return;
  
  autoplayInterval = setInterval(() => {
    if (carouselRef.value) {
      // Prova diversi metodi dell'API vue3-carousel
      if (typeof carouselRef.value.next === 'function') {
        carouselRef.value.next();
      } else if (typeof carouselRef.value.slideTo === 'function') {
        const currentSlide = carouselRef.value.currentSlide || 0;
        const totalSlides = duplicatedProjects.value.length;
        const nextSlide = (currentSlide + 1) % totalSlides;
        carouselRef.value.slideTo(nextSlide);
      } else if (carouselRef.value.$el) {
        // Fallback: usa il DOM direttamente
        const nextButton = carouselRef.value.$el.querySelector('.carousel__next');
        if (nextButton) {
          nextButton.click();
        }
      }
    }
  }, 3000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const handleMouseEnter = () => {
  stopAutoplay();
};

const handleMouseLeave = () => {
  startAutoplay();
};

// Watch per avviare autoplay quando i progetti sono caricati
watch(() => portfolioStore.projects.length, (newLength) => {
  if (newLength > 0) {
    nextTick(() => {
      setTimeout(() => {
        startAutoplay();
      }, 800);
    });
  }
});

onMounted(() => {
  if (portfolioStore.projects.length === 0) {
    portfolioStore.loadProjects();
  }
  
  setTimeout(() => {
    isVisible.value = true;
    // Avvia autoplay dopo che il carosello è renderizzato
    if (portfolioStore.projects.length > 0) {
      nextTick(() => {
        setTimeout(() => {
          startAutoplay();
        }, 800);
      });
    }
  }, 100);
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
/* ---- Layout & sizing ---- */
.projects-carousel {
  position: relative;
  overflow: hidden;
}

.projects-carousel :deep(.carousel__viewport) {
  cursor: grab;
}

.projects-carousel :deep(.carousel__viewport:active) {
  cursor: grabbing;
}

.projects-carousel :deep(.carousel__slide) {
  padding: 1rem;
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card {
  flex: 1 1 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, var(--accent-soft), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.project-card:hover::before {
  opacity: 1;
}

/* Ensure equal height for all cards inside the carousel */
.project-card .card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
}

/* ---- Modern aesthetic ---- */
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-glow);
  border-color: rgba(124, 58, 237, 0.6) !important;
}

.card-title {
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.card-text {
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* Tech tags */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--accent-strong);
  font-weight: 500;
  transition: all 0.2s ease;
}

.project-card:hover .tech-tag {
  background: rgba(124, 58, 237, 0.25);
  border-color: rgba(124, 58, 237, 0.5);
  transform: translateY(-1px);
}

/* Project link button */
.btn-project-link {
  background: linear-gradient(120deg, var(--accent), var(--accent-strong));
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-project-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
  color: white;
  text-decoration: none;
}

.project-private {
  color: var(--muted);
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
}

/* Pagination dots */
.projects-carousel :deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-subtle);
  margin: 0 4px;
  transition: all 0.2s ease;
}

.projects-carousel :deep(.carousel__pagination-button:hover) {
  background: var(--accent);
  transform: scale(1.2);
}

.projects-carousel :deep(.carousel__pagination-button--active) {
  background: var(--accent-strong);
  width: 24px;
  border-radius: 5px;
}

/* Carousel navigation */
.carousel {
  --vc-nav-background: rgba(15, 23, 42, 0.8);
  --vc-nav-color: var(--text);
  --vc-nav-color-hover: var(--accent-strong);
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 45px;
  --vc-nav-height: 45px;
  --vc-nav-border: 1px solid var(--border-subtle);
}

.carousel-nav-icon {
  font-size: 1.2rem;
  font-weight: 600;
}

.projects-carousel :deep(.carousel__prev),
.projects-carousel :deep(.carousel__next) {
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.projects-carousel :deep(.carousel__prev:hover),
.projects-carousel :deep(.carousel__next:hover) {
  background: rgba(124, 58, 237, 0.2);
  border-color: var(--accent);
  transform: scale(1.1);
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth autoplay animation */
.projects-carousel :deep(.carousel__track) {
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Pause animation on hover */
.projects-carousel:hover :deep(.carousel__track) {
  transition-duration: 0.3s;
}

</style>
