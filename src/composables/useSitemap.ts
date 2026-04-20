/**
 * Build-time utility — imported by vite.config.ts (`seoDistPlugin`) to write sitemap.xml during `vite build`.
 * This is NOT a runtime Vue composable. Do not rename/move without updating vite.config.ts.
 */
export function generateSitemapXml(baseOrigin: string): string {
  const base = baseOrigin.replace(/\/$/, '')
  const routes = ['/', '/portfolio', '/academy']
  const urlEntries = routes
    .map(
      route => `  <url>
    <loc>${base}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}
