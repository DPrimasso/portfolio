<template>
  <Landing />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Landing from '@/components/Landing.vue'
import { useSEO } from '@/composables/useSEO'
import { PORTFOLIO } from '@/data/portfolioData.js'

const route = useRoute()
const { setMetaTags, setStructuredData } = useSEO()

const canonicalUrl = computed(() => {
  const origin = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')
  return `${origin}${route.fullPath || '/'}`
})

onMounted(() => {
  const p = PORTFOLIO.profile
  setMetaTags({
    title: `${p.name} — Home`,
    description: `${p.name} — ${p.role.en}. ${p.tagline.en}`,
    image: '/images/daniele-primasso-profilo.webp',
    siteName: p.name,
    url: canonicalUrl.value,
  })

  const origin = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')
  setStructuredData({
    name: p.name,
    jobTitle: p.role.en,
    email: p.email,
    url: canonicalUrl.value,
    image: `${origin}/images/daniele-primasso-profilo.webp`,
    sameAs: [p.linkedin, p.github].filter(Boolean),
  })
})
</script>
