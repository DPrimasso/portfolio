/**
 * Build-time utility — imported by vite.config.ts (`seoDistPlugin`) to write sitemap.xml during `vite build`.
 * This is NOT a runtime Vue composable. Do not rename/move without updating vite.config.ts.
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
