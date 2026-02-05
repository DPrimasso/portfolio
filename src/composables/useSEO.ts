import { useHead } from '@vueuse/head'
import type { Contact } from '../types/portfolio'

interface MetaTagsOptions {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function useSEO() {
  const setMetaTags = (options: MetaTagsOptions = {}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || ''
    const {
      title = 'Portfolio di Daniele Primasso - Software Developer',
      description = 'Portfolio di Daniele Primasso, Software Developer con oltre 7 anni di esperienza in Node.js, Golang, Python e Vue.js. Specializzato in API REST, microservizi e blockchain.',
      image = '/images/daniele-primasso-profilo.webp',
      url = typeof window !== 'undefined' ? window.location.href : '',
    } = options

    // Resolve image path - use absolute URL if provided, otherwise construct from baseUrl
    const imageUrl = image.startsWith('http')
      ? image
      : image.startsWith('/')
        ? `${baseUrl}${image}`
        : `${baseUrl}/${image}`

    useHead({
      title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        // Open Graph
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: imageUrl,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    })
  }

  const setStructuredData = (data?: Contact | null) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Daniele Primasso',
      jobTitle: 'Software Developer',
      email: 'primo.note4@gmail.com',
      url: url,
      sameAs: [data?.linkedin || '', data?.github || ''].filter(Boolean),
      ...data,
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structuredData),
        },
      ],
    })
  }

  return {
    setMetaTags,
    setStructuredData,
  }
}
