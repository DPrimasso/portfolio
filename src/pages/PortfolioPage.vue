<template>
  <div>
    <div class="topbar">
      <div class="brand">
        <button class="brand-btn" @click="goLanding">
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
        <button class="topbar-nav-btn" @click="goLanding">
          {{ lang === 'it' ? 'home' : 'home' }}
        </button>
        <button class="topbar-nav-btn active" @click="goPortfolio">
          {{ lang === 'it' ? 'portfolio' : 'portfolio' }}
        </button>
        <button class="topbar-nav-btn" @click="goAcademy">
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
      <button class="topbar-academy-link" @click="goAcademy">
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
      <V2 :lang="lang" :layout-mode="layoutMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import V2 from '@/components/V2.vue'
import { useSEO } from '@/composables/useSEO'
import { PORTFOLIO } from '@/data/portfolioData.js'

const router = useRouter()
const route = useRoute()
const { setMetaTags } = useSEO()

const lang = ref<'it' | 'en'>((localStorage.getItem('dp_lang') as 'it' | 'en') || 'it')
const layoutMode = ref<'list' | 'grid'>(
  (localStorage.getItem('dp_layout') as 'list' | 'grid') || 'list'
)

function goLanding() {
  router.push({ name: 'home' })
}

function goPortfolio() {
  router.push({ name: 'portfolio' })
}

function goAcademy() {
  router.push({ name: 'academy' })
}

function toggleLayout() {
  layoutMode.value = layoutMode.value === 'list' ? 'grid' : 'list'
}

function jumpToSection(sectionId: string) {
  const hash = `#s-${sectionId}`
  if (route.hash === hash) {
    const el = document.getElementById(`s-${sectionId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  router.push({ name: 'portfolio', hash })
}

function onKey(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null
  const tag = target?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return
  if (e.key === 'Escape') goLanding()
  if (e.key.toLowerCase() === 'l') lang.value = lang.value === 'it' ? 'en' : 'it'
  if (e.key.toLowerCase() === 'g') toggleLayout()
}

watch(lang, value => localStorage.setItem('dp_lang', value))
watch(layoutMode, value => localStorage.setItem('dp_layout', value))

onMounted(() => {
  window.addEventListener('keydown', onKey)
  const p = PORTFOLIO.profile
  const origin = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')
  setMetaTags({
    title: `${p.name} — Portfolio`,
    description: `${p.name} — ${p.role.en}. ${p.tagline.en}`,
    image: '/daniele-primasso-profile2-fcdbcb1c.jpeg',
    siteName: p.name,
    url: `${origin}${route.fullPath}`,
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
})
</script>
