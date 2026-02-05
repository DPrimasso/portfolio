# Contributing Guidelines

Grazie per il tuo interesse nel contribuire a questo progetto!

## Getting Started

1. Fork il repository
2. Clona il tuo fork: `git clone https://github.com/tuonome/portfolio.git`
3. Crea un branch per la tua feature: `git checkout -b feature/nome-feature`
4. Installa le dipendenze: `npm install`

## Development

### Scripts disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Build per produzione
- `npm run lint` - Esegue ESLint e fix automatici
- `npm run lint:check` - Verifica lint senza fix
- `npm run format` - Formatta il codice con Prettier
- `npm run format:check` - Verifica formato senza modificare
- `npm run type-check` - Verifica TypeScript types
- `npm run test` - Esegue i test
- `npm run test:coverage` - Esegue test con coverage

### Code Style

- Usa TypeScript per tutti i nuovi file
- Segui le regole ESLint configurate
- Formatta il codice con Prettier prima di commitare
- Usa commit messages descrittivi

### Git Hooks

Il progetto usa Husky per git hooks:
- Pre-commit: esegue lint-staged (lint + format)
- Pre-push: esegue test coverage check

## Making Changes

1. Fai le tue modifiche
2. Assicurati che i test passino: `npm run test`
3. Verifica il lint: `npm run lint:check`
4. Verifica il type check: `npm run type-check`
5. Commit le modifiche: `git commit -m "Descrizione chiara"`

## Pull Request Process

1. Assicurati che tutti i test passino
2. Assicurati che il coverage sia >= 80%
3. Aggiorna la documentazione se necessario
4. Crea una Pull Request con una descrizione chiara
5. Link eventuali issue correlate

## Code Review

- Le PR verranno reviewate prima del merge
- I maintainer potrebbero richiedere modifiche
- Rispondi ai feedback in modo costruttivo

## Questions?

Se hai domande, apri una issue o contatta i maintainer.
