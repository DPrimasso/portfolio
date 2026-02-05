<template>
  <section id="experience" class="py-5" aria-labelledby="experience-heading">
    <div class="container">
      <h2 id="experience-heading" class="fw-bold mb-5 text-center">Esperienza</h2>
      <div v-if="portfolioStore.loading" class="text-center">
        <p>Caricamento esperienze...</p>
      </div>
      <div v-else class="timeline" role="list">
        <article
          v-for="(item, index) in portfolioStore.experience"
          :key="`${item.company}-${item.from}`"
          class="timeline-item fade-in-up"
          :class="{ visible: animatedItems[index] }"
          :ref="el => itemRefs[index] = el"
          role="listitem"
        >
          <div class="experience-card card">
            <div class="card-body">
              <div class="experience-header mb-3">
                <h3 class="experience-title mb-2">
                  {{ item.title }} @ <strong class="company-name">{{ item.company }}</strong>
                </h3>
                <div class="experience-meta">
                  <span class="experience-badge">
                    <i class="fas fa-calendar-alt me-1"></i>
                    <time :datetime="item.from">{{ item.from }}</time> - 
                    <time :datetime="item.to">{{ item.to }}</time>
                  </span>
                  <span class="experience-location">
                    <i class="fas fa-map-marker-alt me-1"></i>
                    {{ item.location }}
                  </span>
                </div>
              </div>
              <ul class="experience-bullets">
                <li v-for="(bullet, bulletIndex) in item.bullets" :key="bulletIndex">
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { usePortfolioStore } from '../stores/portfolio';

const portfolioStore = usePortfolioStore();
const itemRefs = ref([]);
const animatedItems = ref({});

onMounted(() => {
  if (portfolioStore.experience.length === 0) {
    portfolioStore.loadExperience();
  }
  
  // Animate items when they come into view
  watch(() => portfolioStore.experience, (experience) => {
    if (experience.length > 0) {
      setTimeout(() => {
        experience.forEach((_, index) => {
          animatedItems.value[index] = true;
        });
      }, 200);
    }
  }, { immediate: true });
});
</script>

<style scoped>
.experience-card {
  margin-left: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.experience-card:hover {
  transform: translateX(8px);
}

.experience-header {
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1rem;
}

.experience-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.company-name {
  color: var(--accent-strong);
}

.experience-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
}

.experience-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 999px;
  color: var(--accent-strong);
  font-weight: 500;
}

.experience-location {
  display: inline-flex;
  align-items: center;
  color: var(--muted);
}

.experience-bullets {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.experience-bullets li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--muted);
  line-height: 1.7;
}

.experience-bullets li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

.experience-bullets li:last-child {
  margin-bottom: 0;
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
</style>
