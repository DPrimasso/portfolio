import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Skills from '../Skills.vue'
import { usePortfolioStore } from '../../stores/portfolio'

// Mock IntersectionObserver (not available in jsdom)
let intersectionCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null

class MockIntersectionObserver {
  constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
    intersectionCallback = cb
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

describe('Skills.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    intersectionCallback = null
  })

  it('renders skills heading', () => {
    const wrapper = mount(Skills)
    expect(wrapper.find('#skills-heading').text()).toBe('Competenze')
  })

  it('shows loading state', () => {
    const store = usePortfolioStore()
    store.loading = true

    const wrapper = mount(Skills)
    expect(wrapper.find('.skeleton-loader').exists()).toBe(true)
  })

  it('loads skills when viewport intersection fires', async () => {
    const store = usePortfolioStore()
    const loadSkillsSpy = vi.spyOn(store, 'loadSkills')

    mount(Skills)

    // Simulate intersection observer firing
    if (intersectionCallback) {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])
    }
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(loadSkillsSpy).toHaveBeenCalled()
  })
})
