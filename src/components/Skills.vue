<template>
  <section id="skills" ref="target" class="py-5" aria-labelledby="skills-heading">
    <div class="container">
      <h2 id="skills-heading" class="fw-bold mb-5 text-center">Competenze</h2>
      <div v-if="portfolioStore.loading">
        <SkeletonLoader :lines="6" variant="card" />
      </div>
      <div v-else class="skills-grid fade-in-up" :class="{ visible: isVisible }">
        <div v-for="category in skillCategories" :key="category.name" class="skill-category">
          <h3 class="skill-category-title">
            <i :class="category.icon + ' me-2'" aria-hidden="true"></i>
            {{ category.name }}
          </h3>
          <div class="skill-tags">
            <div
              v-for="skill in category.skills"
              :key="skill.title"
              class="skill-item"
              :title="skill.description"
            >
              <div class="skill-item-header">
                <i :class="skill.icon + ' skill-icon'" aria-hidden="true"></i>
                <span class="skill-name">{{ skill.title }}</span>
                <span class="skill-badge" :class="getLevelClass(skill.level)">
                  {{ getLevelLabel(skill.level) }}
                </span>
              </div>
              <p class="skill-desc">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import SkeletonLoader from './SkeletonLoader.vue'

const portfolioStore = usePortfolioStore()

const isVisible = ref(false)

const { target } = useIntersectionObserver(
  () => {
    isVisible.value = true
    if (portfolioStore.skills.length === 0) {
      portfolioStore.loadSkills()
    }
  },
  { once: true, threshold: 0.1 }
)

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Infrastruttura']
const CATEGORY_ICONS = {
  Frontend: 'fas fa-laptop-code',
  Backend: 'fas fa-server',
  Infrastruttura: 'fas fa-layer-group',
}

const skillCategories = computed(() => {
  const map = {}
  for (const skill of portfolioStore.skills) {
    const cat = skill.category || 'Altro'
    if (!map[cat]) map[cat] = []
    map[cat].push(skill)
  }

  return CATEGORY_ORDER.filter(c => map[c]).map(name => ({
    name,
    icon: CATEGORY_ICONS[name] || 'fas fa-code',
    skills: map[name],
  }))
})

const getLevelLabel = level => {
  if (level >= 80) return 'Avanzato'
  if (level >= 70) return 'Intermedio'
  return 'Base'
}

const getLevelClass = level => {
  if (level >= 80) return 'badge-advanced'
  if (level >= 70) return 'badge-intermediate'
  return 'badge-base'
}
</script>

<style scoped>
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.skill-category {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.8rem 2rem;
  backdrop-filter: blur(18px);
  transition: border-color 0.2s ease;
}

.skill-category:hover {
  border-color: rgba(124, 58, 237, 0.4);
}

.skill-category-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-strong);
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
}

.skill-tags {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.skill-item {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.skill-item:hover {
  border-color: rgba(124, 58, 237, 0.45);
  background: rgba(124, 58, 237, 0.08);
  transform: translateY(-2px);
}

.skill-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.skill-icon {
  font-size: 1rem;
  color: var(--accent);
  flex-shrink: 0;
}

.skill-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  flex: 1;
}

.skill-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.badge-advanced {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #4ade80;
}

.badge-intermediate {
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.badge-base {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: var(--muted);
}

.skill-desc {
  font-size: 0.78rem;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
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
  .skill-category {
    padding: 1.2rem 1rem;
  }

  .skill-tags {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .skill-tags {
    grid-template-columns: 1fr;
  }
}
</style>
