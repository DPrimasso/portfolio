import { config } from '../config/env'

/**
 * Genera il contenuto XML per la sitemap
 * @returns {string} Contenuto XML della sitemap
 */
export function generateSitemap(): string {
  const baseUrl = config.baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  const routes = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/#about', changefreq: 'monthly', priority: '0.8' },
    { path: '/#skills', changefreq: 'monthly', priority: '0.8' },
    { path: '/#experience', changefreq: 'monthly', priority: '0.8' },
    { path: '/#education', changefreq: 'monthly', priority: '0.7' },
    { path: '/#projects', changefreq: 'weekly', priority: '0.9' },
    { path: '/#contact', changefreq: 'monthly', priority: '0.7' },
  ]

  const urlEntries = routes
    .map(
      route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}
