<template>
  <Academy :initial-screen="initialScreen" @close="closeAcademy" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Academy from '@/components/Academy.vue'
import { useSEO } from '@/composables/useSEO'
import { PORTFOLIO } from '@/data/portfolioData.js'

const route = useRoute()
const router = useRouter()
const { setMetaTags } = useSEO()

const initialScreen = computed(() => {
  const queryScreen = typeof route.query.screen === 'string' ? route.query.screen : ''
  return queryScreen || 's0'
})

function closeAcademy() {
  if (window.history.state?.back) {
    router.back()
    return
  }
  router.push({ name: 'home' })
}

onMounted(() => {
  const p = PORTFOLIO.profile
  const origin = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')
  setMetaTags({
    title: `${p.name} — Academy`,
    description: 'Academy con percorsi guidati, dashboard corsi e progress tracking.',
    image: '/daniele-primasso-profile2-fcdbcb1c.jpeg',
    siteName: p.name,
    url: `${origin}${route.fullPath}`,
  })
})
</script>
