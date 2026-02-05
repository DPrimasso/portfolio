import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '../portfolio'

describe('Portfolio Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty state', () => {
    const store = usePortfolioStore()
    expect(store.skills).toEqual([])
    expect(store.projects).toEqual([])
    expect(store.experience).toEqual([])
    expect(store.education).toEqual([])
    expect(store.contact).toBeNull()
    expect(store.stats).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should load skills', async () => {
    const store = usePortfolioStore()
    await store.loadSkills()
    expect(store.skills.length).toBeGreaterThan(0)
    expect(store.skills[0]).toHaveProperty('title')
    expect(store.skills[0]).toHaveProperty('level')
  })

  it('should load projects', async () => {
    const store = usePortfolioStore()
    await store.loadProjects()
    expect(store.projects.length).toBeGreaterThan(0)
    expect(store.projects[0]).toHaveProperty('title')
    expect(store.projects[0]).toHaveProperty('description')
  })

  it('should load all data', async () => {
    const store = usePortfolioStore()
    await store.loadAll()
    expect(store.skills.length).toBeGreaterThan(0)
    expect(store.projects.length).toBeGreaterThan(0)
    expect(store.experience.length).toBeGreaterThan(0)
    expect(store.education.length).toBeGreaterThan(0)
    expect(store.contact).not.toBeNull()
    expect(store.stats.length).toBeGreaterThan(0)
  })

  it('should handle errors gracefully', async () => {
    const store = usePortfolioStore()
    // Mock DataService per testare error handling
    const originalLoad = store.loadSkills
    store.loadSkills = async () => {
      throw new Error('Test error')
    }
    
    await store.loadSkills()
    expect(store.error).toBeTruthy()
    expect(store.loading).toBe(false)
    
    // Restore
    store.loadSkills = originalLoad
  })
})
