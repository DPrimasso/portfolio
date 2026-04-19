/**
 * Sitemap XML (solo URL reali; niente hash — per Google sono comunque la home).
 * Usata in build (`vite.config`) e disponibile lato app se serve.
 */
export function generateSitemapXml(baseOrigin: string): string {
  const base = baseOrigin.replace(/\/$/, '')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
}
