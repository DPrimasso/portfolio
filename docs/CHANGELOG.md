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
- Security headers (X-Frame-Options, CSP, etc.)
- Error tracking composable
- Performance monitoring composable
- Keyboard navigation composable
- Intersection Observer composable
- CI/CD pipeline con GitHub Actions
- robots.txt e sitemap.xml
- Environment configuration centralizzata
- Test coverage setup con thresholds

### Fixed

- Bug in useSEO.js: variabile `url` non definita in setStructuredData
- Meta image path non funzionante in produzione
- Favicon path errato in index.html

### Changed

- Migrazione completa da JavaScript a TypeScript
- Config files convertiti in TypeScript (vite.config.ts, vitest.config.ts)
- Font loading ottimizzato con preload
- Build process migliorato con type checking

## [1.0.0] - 2025-01-XX

### Added

- Initial release
- Vue 3 + Pinia setup
- Academy con Firebase
- Responsive design
- SEO optimization
- Accessibility features
