# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- TypeScript migration completa
- ESLint e Prettier configuration
- Husky git hooks per pre-commit e pre-push
- PWA support con vite-plugin-pwa
- Bundle analyzer con rollup-plugin-visualizer
- Image optimization con vite-imagetools
- Security headers in netlify.toml
- CORS whitelist per serverless functions
- Rate limiting per chatbot API
- Error tracking composable
- Performance monitoring composable
- Focus trap composable per accessibility
- Keyboard navigation composable
- Intersection Observer composable
- CI/CD pipeline con GitHub Actions
- robots.txt e sitemap.xml
- Environment configuration centralizzata
- DataService caching
- Test coverage setup con thresholds

### Fixed
- Bug in useSEO.js: variabile `url` non definita in setStructuredData
- Meta image path non funzionante in produzione
- Favicon path errato in index.html
- CORS troppo permissivo (ora con whitelist)

### Changed
- Migrazione completa da JavaScript a TypeScript
- Config files convertiti in TypeScript (vite.config.ts, vitest.config.ts)
- Serverless functions refactored con logica comune
- Font loading ottimizzato con preload
- Build process migliorato con type checking

### Security
- Security headers aggiunti (X-Frame-Options, CSP, etc.)
- CORS configurato con whitelist domini
- Rate limiting implementato
- Input validation migliorata

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- Vue 3 + Pinia setup
- Chatbot integration con OpenAI
- Responsive design
- SEO optimization
- Accessibility features
