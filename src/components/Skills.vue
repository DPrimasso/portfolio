<template>
  <section id="skills" class="py-5" aria-labelledby="skills-heading">
    <div class="container">
      <h2 id="skills-heading" class="fw-bold mb-5 text-center">Competenze Dettagliate</h2>
      <div v-if="portfolioStore.loading">
        <SkeletonLoader :lines="6" variant="card" />
      </div>
      <div v-else class="row" ref="skillsContainer">
        <div 
          v-for="(skill, index) in portfolioStore.skills" 
          :key="index" 
          class="col-md-6 col-lg-4 mb-4"
          :ref="el => skillRefs[index] = el"
        >
          <div class="skill-card card fade-in-up" :class="{ visible: animatedSkills[index] }">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="skill-header">
                  <i :class="skill.icon + ' me-2 skill-icon'" aria-hidden="true"></i>
                  <span class="skill-title">{{ skill.title }}</span>
                </div>
                <div class="skill-level fw-bold" aria-label="Livello competenza {{ skill.level }}%">
                  {{ skill.level }}%
                </div>
              </div>
              <div 
                class="progress mb-3" 
                role="progressbar" 
                :aria-valuenow="animatedSkills[index] ? skill.level : 0" 
                aria-valuemin="0" 
                aria-valuemax="100" 
                :aria-label="`${skill.title}: ${skill.level}%`"
              >
                <div
                  class="progress-bar"
                  :style="{ width: animatedSkills[index] ? skill.level + '%' : '0%' }"
                ></div>
              </div>
              <p class="small skill-description">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { usePortfolioStore } from '../stores/portfolio'
import SkeletonLoader from './SkeletonLoader.vue';

const portfolioStore = usePortfolioStore();
const skillsContainer = ref(null);
const skillRefs = ref([]);
const animatedSkills = ref({});

onMounted(() => {
  if (portfolioStore.skills.length === 0) {
    portfolioStore.loadSkills();
  }
  
  // Animate skills when they come into view
  watch(() => portfolioStore.skills, (skills) => {
    if (skills.length > 0) {
      setTimeout(() => {
        skills.forEach((_, index) => {
          animatedSkills.value[index] = true;
        });
      }, 200);
    }
  }, { immediate: true });
});
</script>

<style scoped>
.skill-card {
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-card:hover {
  transform: translateY(-2px);
}

.skill-header {
  display: flex;
  align-items: center;
}

.skill-icon {
  font-size: 1.25rem;
  color: var(--accent);
  transition: transform 0.2s ease, color 0.2s ease;
}

.skill-card:hover .skill-icon {
  color: var(--accent-strong);
  transform: scale(1.1);
}

.skill-title {
  font-weight: 600;
  color: var(--text);
}

.skill-level {
  color: var(--accent-strong);
  font-size: 1.1rem;
}

.skill-description {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 0;
}

.progress {
  height: 8px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
}

.progress-bar {
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
  transition: width 1s ease-out;
  border-radius: 999px;
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
