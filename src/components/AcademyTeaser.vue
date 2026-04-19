<template>
  <div class="academy-section">
    <div class="ac-hero">
      <div>
        <div class="ac-hero-eyebrow"># academy · corsi</div>
        <h2>
          {{ lang === 'it' ? 'Impara' : 'Learn' }}
          <i>{{ lang === 'it' ? 'costruendo' : 'by building' }}</i>
        </h2>
        <p>
          {{
            lang === 'it'
              ? "Corsi pratici con esercizi, quiz e tracciamento dei progressi. Accedi con le credenziali ricevute dopo l'iscrizione e segui le lezioni al tuo ritmo."
              : 'Practical courses with exercises, quizzes and progress tracking. Log in with the credentials you receive after enrolling and study at your own pace.'
          }}
        </p>
        <div class="ac-hero-ctas">
          <button class="ac-btn-p" @click="emit('openAcademy', 's1')">
            {{ lang === 'it' ? 'Accedi →' : 'Sign in →' }}
          </button>
          <button class="ac-btn-o" @click="emit('openAcademy', 's2')">
            {{ lang === 'it' ? 'Scopri i corsi' : 'Browse courses' }}
          </button>
        </div>
      </div>
    </div>
    <div class="ac-courses-grid">
      <div
        v-for="c in COURSES"
        :key="c.id"
        class="ac-course-card"
        @click="emit('openAcademy', 's1')"
      >
        <div :class="['ac-course-icon', c.color]">{{ c.icon }}</div>
        <div class="ac-course-info">
          <div class="ac-course-tag">{{ lang === 'it' ? c.tag : c.tagEn }}</div>
          <div class="ac-course-title">{{ lang === 'it' ? c.title : c.titleEn }}</div>
          <div class="ac-course-desc">{{ lang === 'it' ? c.desc : c.descEn }}</div>
        </div>
        <span class="ac-course-cta">{{ lang === 'it' ? 'scopri di più →' : 'learn more →' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ lang: { type: String, default: 'en' } })
const emit = defineEmits(['openAcademy'])

const COURSES = [
  {
    id: 'programmazione-base',
    icon: '{ }',
    color: '',
    tag: 'JavaScript · base',
    tagEn: 'JavaScript · beginner',
    title: 'Programmazione Base',
    titleEn: 'Programming Fundamentals',
    desc: 'Variabili, funzioni, cicli, array e oggetti. Il punto di partenza per chiunque voglia imparare a programmare.',
    descEn:
      'Variables, functions, loops, arrays and objects. The starting point for anyone who wants to learn programming.',
  },
  {
    id: 'code-together',
    icon: '⟨⟩',
    color: 'purple',
    tag: 'Tutoraggio · 1:1',
    tagEn: 'Mentoring · 1:1',
    title: 'Code Together',
    titleEn: 'Code Together',
    desc: 'Sessioni di coding 1:1 su un progetto reale scelto insieme. Impari costruendo qualcosa che ti interessa davvero.',
    descEn:
      '1:1 coding sessions on a real project you choose together. Learn by building something you actually care about.',
  },
]
</script>
