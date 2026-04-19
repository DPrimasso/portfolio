<template>
  <div
    class="app"
    :data-screen-label="variant === 'v1' ? 'V1 Terminal Editorial' : 'V2 Dev Dossier'"
  >
    <div class="topbar">
      <div class="brand">
        <span class="dot" />
        <b>dprimasso</b>
        <span class="breadcrumb">
          / portfolio / <b>{{ variant === 'v1' ? 'terminal-editorial' : 'dev-dossier' }}</b>
        </span>
      </div>
      <span class="spacer" />
      <div class="seg" title="Switch variant (1 / 2)">
        <button :class="{ on: variant === 'v1' }" @click="variant = 'v1'">
          v1 <span class="hide-sm">· terminal</span>
        </button>
        <button :class="{ on: variant === 'v2' }" @click="variant = 'v2'">
          v2 <span class="hide-sm">· dossier</span>
        </button>
      </div>
      <div class="seg" title="Language (L)">
        <button :class="{ on: lang === 'it' }" @click="lang = 'it'">it</button>
        <button :class="{ on: lang === 'en' }" @click="lang = 'en'">en</button>
      </div>
      <button class="pill" title="Toggle projects layout (G)" @click="toggleLayout">
        {{ layoutMode === 'list' ? '▤ list' : '▦ grid' }} <kbd>G</kbd>
      </button>
    </div>

    <div class="stage">
      <V1 v-if="variant === 'v1'" :lang="lang" :layout-mode="layoutMode" />
      <V2 v-else :lang="lang" :layout-mode="layoutMode" />
    </div>

    <div :class="['tweaks', { show: tweaksOpen }]">
      <div class="title"><b>Tweaks</b><span>live</span></div>
      <div class="trow">
        <span class="k">variant</span>
        <div class="seg">
          <button :class="{ on: variant === 'v1' }" @click="variant = 'v1'">v1</button>
          <button :class="{ on: variant === 'v2' }" @click="variant = 'v2'">v2</button>
        </div>
      </div>
      <div class="trow">
        <span class="k">projects layout</span>
        <div class="seg">
          <button :class="{ on: layoutMode === 'list' }" @click="layoutMode = 'list'">list</button>
          <button :class="{ on: layoutMode === 'grid' }" @click="layoutMode = 'grid'">grid</button>
        </div>
      </div>
      <div class="trow">
        <span class="k">language</span>
        <div class="seg">
          <button :class="{ on: lang === 'it' }" @click="lang = 'it'">it</button>
          <button :class="{ on: lang === 'en' }" @click="lang = 'en'">en</button>
        </div>
      </div>
      <div class="hint">
        shortcuts:
        <span class="kbd" style="font-size: 10px">1</span>/<span class="kbd" style="font-size: 10px"
          >2</span
        >
        variant · <span class="kbd" style="font-size: 10px">L</span> lang ·
        <span class="kbd" style="font-size: 10px">G</span> layout
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import V1 from './components/V1.vue'
import V2 from './components/V2.vue'
import { useSEO } from './composables/useSEO'
import { PORTFOLIO } from './data/portfolioData.js'

const { setMetaTags, setStructuredData } = useSEO()

const variant = ref(localStorage.getItem('dp_variant') || 'v1')
const lang = ref(localStorage.getItem('dp_lang') || 'en')
const layoutMode = ref(localStorage.getItem('dp_layout') || 'list')
const tweaksOpen = ref(false)

watch(variant, v => localStorage.setItem('dp_variant', v))
watch(lang, v => localStorage.setItem('dp_lang', v))
watch(layoutMode, v => localStorage.setItem('dp_layout', v))

function toggleLayout() {
  layoutMode.value = layoutMode.value === 'list' ? 'grid' : 'list'
}

function onKey(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  if (e.key === '1') variant.value = 'v1'
  if (e.key === '2') variant.value = 'v2'
  if (e.key.toLowerCase() === 'l') lang.value = lang.value === 'it' ? 'en' : 'it'
  if (e.key.toLowerCase() === 'g') toggleLayout()
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
