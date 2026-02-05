import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DataService } from '../services/dataService'
import type { Skill, Project, Experience, Education, Contact, Stat } from '../types/portfolio'

export const usePortfolioStore = defineStore('portfolio', () => {
  // State
  const skills = ref<Skill[]>([])
  const projects = ref<Project[]>([])
  const experience = ref<Experience[]>([])
  const education = ref<Education[]>([])
  const contact = ref<Contact | null>(null)
  const stats = ref<Stat[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function loadSkills(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      skills.value = await DataService.loadSkills()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento delle skills'
      console.error('Error loading skills:', err)
    } finally {
      loading.value = false
    }
  }

  async function loadProjects(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      projects.value = await DataService.loadProjects()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento dei progetti'
      console.error('Error loading projects:', err)
    } finally {
      loading.value = false
    }
  }

  async function loadExperience(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      experience.value = await DataService.loadExperience()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento delle esperienze'
      console.error('Error loading experience:', err)
    } finally {
      loading.value = false
    }
  }

  async function loadEducation(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      education.value = await DataService.loadEducation()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento della formazione'
      console.error('Error loading education:', err)
    } finally {
      loading.value = false
    }
  }

  async function loadContact(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      contact.value = await DataService.loadContact()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento dei contatti'
      console.error('Error loading contact:', err)
    } finally {
      loading.value = false
    }
  }

  async function loadStats(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      stats.value = await DataService.loadStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento delle statistiche'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Carica tutti i dati del portfolio
   */
  async function loadAll(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      await Promise.all([
        loadSkills(),
        loadProjects(),
        loadExperience(),
        loadEducation(),
        loadContact(),
        loadStats(),
      ])
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento dei dati'
      console.error('Error loading portfolio data:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    skills,
    projects,
    experience,
    education,
    contact,
    stats,
    loading,
    error,
    // Actions
    loadSkills,
    loadProjects,
    loadExperience,
    loadEducation,
    loadContact,
    loadStats,
    loadAll,
  }
})
