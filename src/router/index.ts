import { createRouter, createWebHistory } from 'vue-router'
import type { RouterScrollBehavior } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PortfolioPage from '@/pages/PortfolioPage.vue'
import AcademyPage from '@/pages/AcademyPage.vue'

const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      top: 84,
    }
  }
  return { left: 0, top: 0 }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/portfolio', name: 'portfolio', component: PortfolioPage },
    { path: '/academy', name: 'academy', component: AcademyPage },
  ],
  scrollBehavior,
})

export default router
