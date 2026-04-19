import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import V1 from '../V1.vue'

describe('V1 skills section', () => {
  it('renders all skills', () => {
    const wrapper = mount(V1, { props: { lang: 'en', layoutMode: 'list' } })
    const skills = wrapper.findAll('.v1-skill')
    expect(skills.length).toBeGreaterThan(0)
  })

  it('renders skill level badges', () => {
    const wrapper = mount(V1, { props: { lang: 'en', layoutMode: 'list' } })
    const badges = wrapper.findAll('.skill-badge')
    expect(badges.length).toBeGreaterThan(0)
    const levels = ['Expert', 'Advanced', 'Intermediate', 'Familiar']
    badges.forEach(badge => {
      expect(levels.some(l => badge.classes().includes(l))).toBe(true)
    })
  })

  it('renders skill names', () => {
    const wrapper = mount(V1, { props: { lang: 'en', layoutMode: 'list' } })
    const text = wrapper.text()
    expect(text).toContain('JavaScript')
    expect(text).toContain('Node.js')
    expect(text).toContain('Golang')
  })
})
