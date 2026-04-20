# Documentation Hub

Indice centralizzato della documentazione del progetto.

## Start Here

- Se devi capire il progetto in 5 minuti: `../README.md`
- Se devi capire struttura e scelte tecniche: `ARCHITECTURE.md`
- Se devi avviare il progetto in locale: `LOCAL_DEVELOPMENT.md`
- Se devi fare deploy: `DEPLOYMENT.md`
- Se devi contribuire con PR: `CONTRIBUTING.md`
- Se devi verificare le modifiche nel tempo: `CHANGELOG.md`

## Mappa Rapida per Task

| Task                               | Documento                                  |
| ---------------------------------- | ------------------------------------------ |
| Setup iniziale del progetto        | `../README.md`                             |
| Configurazione env (`.env`)        | `LOCAL_DEVELOPMENT.md` + `../.env.example` |
| Comprendere data flow e componenti | `ARCHITECTURE.md`                          |
| Deploy Vercel/Netlify              | `DEPLOYMENT.md`                            |
| Processo PR e standard di codice   | `CONTRIBUTING.md`                          |
| Storico release/change             | `CHANGELOG.md`                             |
| Note operative per agenti AI       | `../CLAUDE.md`                             |

## Regole di Organizzazione

- `README.md` resta il punto di ingresso pubblico.
- I dettagli operativi stanno nei documenti dedicati (non duplicare blocchi lunghi nel README).
- Quando aggiorni una feature, aggiorna anche il documento più vicino al tema:
  - architettura -> `docs/ARCHITECTURE.md`
  - setup locale -> `docs/LOCAL_DEVELOPMENT.md`
  - deploy -> `docs/DEPLOYMENT.md`
  - changelog -> `docs/CHANGELOG.md`
- Mantieni i link interni relativi, per compatibilità GitHub e IDE.

## Stato Attuale

Questa repository contiene anche snapshot tecnici in cartelle di lavoro interne (es. `.claude/worktrees/...`): non sono la documentazione canonica del progetto attivo.
