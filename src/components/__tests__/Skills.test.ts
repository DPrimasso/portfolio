import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Skills from '../Skills.vue'
import { usePortfolioStore } from '../../stores/portfolio'

describe('Skills.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders skills heading', () => {
    const wrapper = mount(Skills)
    expect(wrapper.find('#skills-heading').text()).toBe('Competenze Dettagliate')
  })

  it('shows loading state', () => {
    const store = usePortfolioStore()
    store.loading = true

    const wrapper = mount(Skills)
    expect(wrapper.find('.skeleton-loader').exists()).toBe(true)
  })

  it('loads skills on mount if empty', async () => {
    const store = usePortfolioStore()
    const loadSkillsSpy = vi.spyOn(store, 'loadSkills')

    mount(Skills)
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(loadSkillsSpy).toHaveBeenCalled()
  })
})
