<template>
  <section id="education" class="py-5" aria-labelledby="education-heading">
    <div class="container">
      <h2 id="education-heading" class="fw-bold mb-5 text-center">Formazione</h2>
      <div v-if="portfolioStore.loading" class="text-center">
        <p>Caricamento formazione...</p>
      </div>
      <div v-else class="timeline" role="list">
        <article
          v-for="(edu, index) in portfolioStore.education"
          :key="index"
          :ref="el => (itemRefs[index] = el)"
          class="timeline-item fade-in-up"
          :class="{ visible: animatedItems[index] }"
          role="listitem"
        >
          <div class="education-card card">
            <div class="card-body">
              <div class="education-header mb-3">
                <span class="education-period">
                  <i class="fas fa-calendar-alt me-2"></i>
                  <time :datetime="edu.period">{{ edu.period }}</time>
                </span>
              </div>
              <h3 class="education-degree mb-2">{{ edu.degree }}</h3>
              <p class="education-institution mb-3">
                <i class="fas fa-graduation-cap me-2"></i>
                {{ edu.institution }}
              </p>
              <p class="education-details">{{ edu.details }}</p>
              <a
                v-if="edu.badgeUrl"
                :href="edu.badgeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="education-badge-link"
                :aria-label="edu.badgeLabel || `Badge ${edu.degree}`"
              >
                <i class="fas fa-certificate me-1" aria-hidden="true"></i>
                {{ edu.badgeLabel || 'Vedi certificazione' }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const portfolioStore = usePortfolioStore()
const itemRefs = ref([])
const animatedItems = ref({})

onMounted(() => {
  if (portfolioStore.education.length === 0) {
    portfolioStore.loadEducation()
  }

  // Animate items when they come into view
  watch(
    () => portfolioStore.education,
    education => {
      if (education.length > 0) {
        setTimeout(() => {
          education.forEach((_, index) => {
            animatedItems.value[index] = true
          })
        }, 200)
      }
    },
    { immediate: true }
  )
})
</script>

<style scoped>
.education-card {
  margin-left: 0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.education-card:hover {
  transform: translateX(8px);
}

.education-header {
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1rem;
}

.education-period {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 999px;
  color: var(--accent-strong);
  font-weight: 600;
  font-size: 0.9rem;
}

.education-degree {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.education-institution {
  color: var(--accent-strong);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.education-details {
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 0;
}

.education-badge-link {
  display: inline-flex;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--accent-strong);
  text-decoration: none;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.3);
  transition: all 0.2s ease;
}

.education-badge-link:hover {
  background: rgba(124, 58, 237, 0.22);
  border-color: rgba(124, 58, 237, 0.6);
  text-decoration: none;
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
</style>
