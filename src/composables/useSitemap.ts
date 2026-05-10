/**
 * Build-time utility — imported by vite.config.ts (`seoDistPlugin`) to write sitemap.xml during `vite build`.
 * This is NOT a runtime Vue composable. Do not rename/move without updating vite.config.ts.
 */
const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/portfolio', changefreq: 'monthly', priority: '0.8' },
  { path: '/academy', changefreq: 'monthly', priority: '0.7' },
] as const

export function generateSitemapXml(baseOrigin: string, lastmod = new Date()): string {
  const base = baseOrigin.replace(/\/$/, '')
  const lastmodDate = lastmod.toISOString().slice(0, 10)
  const urlEntries = SITEMAP_ROUTES.map(
    route => `  <url>
    <loc>${base}${route.path}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}
