export interface Skill {
  title: string
  icon: string
  level: number
  description: string
}

export interface Project {
  title: string
  description: string
  technologies: string
  link: string
}

export interface Experience {
  title: string
  company: string
  from: string
  to: string
  description: string
  technologies?: string[]
}

export interface Education {
  title: string
  institution: string
  from: string
  to: string
  description?: string
  badgeUrl?: string
  badgeLabel?: string
}

export interface Contact {
  email: string
  phone?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface Stat {
  label: string
  value: string | number
  icon?: string
}

export interface PortfolioData {
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  contact: Contact
  stats: Stat[]
}
