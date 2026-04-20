<template>
  <div class="app">
    <Landing
      v-if="currentView === 'landing'"
      @go-portfolio="currentView = 'portfolio'"
      @go-academy="goAcademy"
    />

    <template v-else-if="currentView === 'portfolio'">
      <div class="topbar">
        <div class="brand">
          <button class="brand-btn" @click="currentView = 'landing'">
            <span class="dot" />
            <b>dprimasso</b>
          </button>
          <span class="breadcrumb">/ portfolio / <b>dev-dossier</b></span>
        </div>
        <div
          class="topbar-nav"
          role="navigation"
          :aria-label="lang === 'it' ? 'Navigazione vista' : 'View navigation'"
        >
          <button
            :class="['topbar-nav-btn', { active: currentView === 'landing' }]"
            @click="goLanding"
          >
            {{ lang === 'it' ? 'home' : 'home' }}
          </button>
          <button
            :class="['topbar-nav-btn', { active: currentView === 'portfolio' }]"
            @click="goPortfolio"
          >
            {{ lang === 'it' ? 'portfolio' : 'portfolio' }}
          </button>
          <button
            :class="['topbar-nav-btn', { active: currentView === 'academy' }]"
            @click="goAcademy()"
          >
            {{ lang === 'it' ? 'academy' : 'academy' }}
          </button>
        </div>
        <span class="spacer" />
        <div class="topbar-jump">
          <button class="pill" @click="jumpToSection('about')">
            {{ lang === 'it' ? 'profilo' : 'profile' }}
          </button>
          <button class="pill" @click="jumpToSection('projects')">
            {{ lang === 'it' ? 'progetti' : 'projects' }}
          </button>
          <button class="pill" @click="jumpToSection('contact')">
            {{ lang === 'it' ? 'contatti' : 'contact' }}
          </button>
        </div>
        <button class="topbar-academy-link" @click="goAcademy()">
          academy
          <span class="topbar-academy-live">live</span>
        </button>
        <div class="seg" title="Language (L)">
          <button :class="{ on: lang === 'it' }" @click="lang = 'it'">it</button>
          <button :class="{ on: lang === 'en' }" @click="lang = 'en'">en</button>
        </div>
        <button class="pill" title="Toggle projects layout (G)" @click="toggleLayout">
          {{ layoutMode === 'list' ? '▤ list' : '▦ grid' }} <kbd>G</kbd>
        </button>
      </div>
      <div class="stage">
        <V2 :lang="lang" :layout-mode="layoutMode" @open-academy="goAcademy" />
      </div>
    </template>

    <Academy
      v-else-if="currentView === 'academy'"
      :initial-screen="academyScreen"
      @close="closeAcademy"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import V2 from './components/V2.vue'
import Academy from './components/Academy.vue'
import Landing from './components/Landing.vue'
import { useSEO } from './composables/useSEO'
import { PORTFOLIO } from './data/portfolioData.js'

const { setMetaTags, setStructuredData } = useSEO()

const currentView = ref('landing')
const academyReturnView = ref('landing')
const lang = ref(localStorage.getItem('dp_lang') || 'it')
const layoutMode = ref(localStorage.getItem('dp_layout') || 'list')
const academyScreen = ref('s0')

function goAcademy(screen = 's0') {
  academyReturnView.value =
    currentView.value === 'academy' ? academyReturnView.value : currentView.value
  academyScreen.value = screen
  currentView.value = 'academy'
}

function goLanding() {
  currentView.value = 'landing'
}

function goPortfolio() {
  currentView.value = 'portfolio'
}

function closeAcademy() {
  currentView.value = academyReturnView.value === 'academy' ? 'landing' : academyReturnView.value
}

async function jumpToSection(sectionId) {
  if (currentView.value !== 'portfolio') {
    currentView.value = 'portfolio'
    await nextTick()
  }
  const el = document.getElementById(`s-${sectionId}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

watch(lang, v => localStorage.setItem('dp_lang', v))
watch(layoutMode, v => localStorage.setItem('dp_layout', v))

function toggleLayout() {
  layoutMode.value = layoutMode.value === 'list' ? 'grid' : 'list'
}

function onKey(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  if (e.key === 'Escape' && currentView.value !== 'landing') currentView.value = 'landing'
  if (currentView.value === 'portfolio') {
    if (e.key.toLowerCase() === 'l') lang.value = lang.value === 'it' ? 'en' : 'it'
    if (e.key.toLowerCase() === 'g') toggleLayout()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)

  const p = PORTFOLIO.profile
  const title = `${p.name} — Portfolio`
  const description = `${p.name} — ${p.role.en}. ${p.tagline.en}`
  setMetaTags({
    title,
    description,
    image: '/images/daniele-primasso-profilo.webp',
    siteName: p.name,
  })

  const origin = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')
  const pageUrl = window.location.href
  const imageAbs = `${origin}/images/daniele-primasso-profilo.webp`
  setStructuredData({
    name: p.name,
    jobTitle: p.role.en,
    email: p.email,
    url: pageUrl,
    image: imageAbs,
    sameAs: [p.linkedin, p.github].filter(Boolean),
  })
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
