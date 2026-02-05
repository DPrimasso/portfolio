import portfolioData from '../data/portfolio.json'
import type { PortfolioData, Skill, Project, Experience, Education, Contact, Stat } from '../types/portfolio'

/**
 * Servizio per caricare i dati del portfolio
 * In futuro può essere esteso per caricare dati da API
 */
export class DataService {
  // Cache per i dati del portfolio
  private static cachedData: PortfolioData | null = null

  /**
   * Carica tutti i dati del portfolio
   * @returns {Promise<PortfolioData>} Dati del portfolio
   */
  static async loadPortfolioData(): Promise<PortfolioData> {
    // Ritorna dati dalla cache se disponibili
    if (this.cachedData) {
      return Promise.resolve(this.cachedData)
    }

    // Per ora ritorna i dati statici
    // In futuro può fare una chiamata API
    this.cachedData = portfolioData as PortfolioData
    return Promise.resolve(this.cachedData)
  }

  /**
   * Carica le skills
   * @returns {Promise<Skill[]>} Array di skills
   */
  static async loadSkills(): Promise<Skill[]> {
    const data = await this.loadPortfolioData()
    return data.skills
  }

  /**
   * Carica i progetti
   * @returns {Promise<Project[]>} Array di progetti
   */
  static async loadProjects(): Promise<Project[]> {
    const data = await this.loadPortfolioData()
    return data.projects
  }

  /**
   * Carica le esperienze lavorative
   * @returns {Promise<Experience[]>} Array di esperienze
   */
  static async loadExperience(): Promise<Experience[]> {
    const data = await this.loadPortfolioData()
    return data.experience
  }

  /**
   * Carica la formazione
   * @returns {Promise<Education[]>} Array di formazione
   */
  static async loadEducation(): Promise<Education[]> {
    const data = await this.loadPortfolioData()
    return data.education
  }

  /**
   * Carica i contatti
   * @returns {Promise<Contact>} Oggetto con informazioni di contatto
   */
  static async loadContact(): Promise<Contact> {
    const data = await this.loadPortfolioData()
    return data.contact
  }

  /**
   * Carica le statistiche
   * @returns {Promise<Stat[]>} Array di statistiche
   */
  static async loadStats(): Promise<Stat[]> {
    const data = await this.loadPortfolioData()
    return data.stats
  }

  /**
   * Pulisce la cache dei dati
   */
  static clearCache(): void {
    this.cachedData = null
  }
}
