import { useHead } from '@vueuse/head'

interface MetaTagsOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}

export interface PersonStructuredDataInput {
  name: string
  jobTitle: string
  email?: string
  url: string
  image?: string
  sameAs?: string[]
}

const DEFAULT_TITLE = 'Daniele Primasso — Portfolio'
const DEFAULT_DESCRIPTION =
  'Daniele Primasso — Software Developer & Data Analyst. 10+ years building solid backends, data pipelines and blockchain systems in production.'

export function useSEO() {
  const setMetaTags = (options: MetaTagsOptions = {}) => {
    const baseUrl = (import.meta.env.VITE_BASE_URL || '').replace(/\/$/, '')
    const {
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      image = '/daniele-primasso-profile2-fcdbcb1c.jpeg',
      url = typeof window !== 'undefined' ? window.location.href : '',
      siteName = 'Daniele Primasso',
    } = options

    const imageUrl = image.startsWith('http')
      ? image
      : image.startsWith('/')
        ? `${baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')}${image}`
        : `${baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')}/${image}`

    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:locale', content: 'it_IT' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
      ],
      link: [{ rel: 'canonical', href: url }],
    })
  }

  const setStructuredData = (input: PersonStructuredDataInput) => {
    const sameAs = (input.sameAs || []).filter(Boolean)
    const structuredData: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: input.name,
      jobTitle: input.jobTitle,
      url: input.url,
    }
    if (input.email) structuredData.email = input.email
    if (input.image) structuredData.image = input.image
    if (sameAs.length) structuredData.sameAs = sameAs

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
