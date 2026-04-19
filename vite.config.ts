import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve, join } from 'node:path'
import fs from 'node:fs'
import { generateSitemapXml } from './src/composables/useSitemap'

/** robots.txt + sitemap.xml in dist con URL canoniche da VITE_BASE_URL (Netlify/Vercel). */
function seoDistPlugin(): Plugin {
  let root = ''
  let outDir = ''
  let mode = 'production'

  return {
    name: 'seo-dist-files',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
      mode = config.mode
    },
    closeBundle() {
      const env = loadEnv(mode, root, '')
      const base = (process.env.VITE_BASE_URL || env.VITE_BASE_URL || '').trim().replace(/\/$/, '')

      const robotsPath = join(outDir, 'robots.txt')
      const sitemapPath = join(outDir, 'sitemap.xml')

      if (base) {
        const robots = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
        fs.writeFileSync(robotsPath, robots, 'utf8')
        fs.writeFileSync(sitemapPath, generateSitemapXml(base), 'utf8')
      } else {
        const robots = `User-agent: *\nAllow: /\n\n# Aggiungi VITE_BASE_URL in .env (build) per generare Sitemap e URL assoluti.\n`
        fs.writeFileSync(robotsPath, robots, 'utf8')
        try {
          fs.unlinkSync(sitemapPath)
        } catch {
          /* niente sitemap in dist se non c'è base URL */
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    seoDistPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt'],
      manifest: {
        name: 'Portfolio Daniele Primasso',
        short_name: 'Portfolio',
        description: 'Portfolio personale di Daniele Primasso - Software Developer',
        theme_color: '#0d1117',
        background_color: '#0d1117',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openai\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'openai-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
        ],
      },
    }),
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    // Proxy per API in sviluppo (opzionale)
    // Se VITE_CHATBOT_API_URL è un URL completo, verrà usato direttamente
    // Altrimenti, puoi configurare un proxy qui per testare localmente
    proxy: {
      // Esempio: proxy a un endpoint di produzione per test
      // '/api/chatbot': {
      //   target: 'https://tuodominio.vercel.app',
      //   changeOrigin: true,
      //   secure: true,
      // },
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vendor-vue'
            }
            if (id.includes('bootstrap') || id.includes('carousel') || id.includes('tour')) {
              return 'vendor-ui'
            }
            return 'vendor-other'
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['vue', 'pinia', '@vueuse/core', '@vueuse/head'],
  },
})
