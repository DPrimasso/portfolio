export const PORTFOLIO = {
  profile: {
    name: 'Daniele Primasso',
    handle: 'dprimasso',
    location: 'Brescia, Italia',
    email: 'daniele.primasso@gmail.com',
    github: 'https://github.com/DPrimasso',
    linkedin: 'https://www.linkedin.com/in/daniele-primasso-695ab8158/',
    role: {
      it: 'Software Developer & Data Analyst',
      en: 'Software Developer & Data Analyst',
    },
    tagline: {
      it: '10+ anni a costruire backend solidi, pipeline dati e sistemi blockchain in produzione.',
      en: '10+ years building solid backends, data pipelines and blockchain systems in production.',
    },
    bio: {
      it: 'Sviluppatore full-stack con radici forti sul backend. Ho guidato team per 4 anni come Lead, progettato microservizi Node e Go, integrato smart contract Ethereum (ERC20/721/1155/4337) e oggi mi concentro su automazione dati e tooling interno con React e TypeScript.',
      en: 'Full-stack developer with strong backend roots. I led teams for 4 years as Lead, designed Node and Go microservices, integrated Ethereum smart contracts (ERC20/721/1155/4337) and today I focus on data automation and internal tooling with React and TypeScript.',
    },
  },
  stats: [
    { value: '10+', label: { it: 'anni di carriera', en: 'years of career' } },
    { value: '50+', label: { it: 'progetti consegnati', en: 'projects delivered' } },
    { value: '5+', label: { it: 'linguaggi in produzione', en: 'languages in production' } },
    { value: '4', label: { it: 'anni come Lead', en: 'years as Lead' } },
  ],
  skills: [
    {
      title: 'JavaScript',
      level: 'Expert',
      category: 'Frontend',
      desc: {
        it: 'ES6+, async/await, DOM, pattern moderni',
        en: 'ES6+, async/await, DOM, modern patterns',
      },
    },
    {
      title: 'TypeScript',
      level: 'Advanced',
      category: 'Frontend',
      desc: {
        it: 'Tipi, generics, strict mode in produzione',
        en: 'Types, generics, strict mode in production',
      },
    },
    {
      title: 'React',
      level: 'Advanced',
      category: 'Frontend',
      desc: {
        it: 'React 19, Context, feature-oriented, Vitest',
        en: 'React 19, Context, feature-oriented, Vitest',
      },
    },
    {
      title: 'Vue.js',
      level: 'Intermediate',
      category: 'Frontend',
      desc: { it: 'Vue 3 Composition, Pinia, Router', en: 'Vue 3 Composition, Pinia, Router' },
    },
    {
      title: 'Node.js',
      level: 'Expert',
      category: 'Backend',
      desc: {
        it: 'Express, REST, pipeline file, FTP, logging',
        en: 'Express, REST, file pipelines, FTP, logging',
      },
    },
    {
      title: 'Python',
      level: 'Intermediate',
      category: 'Backend',
      desc: {
        it: 'Flask, Django, scripting, automazione',
        en: 'Flask, Django, scripting, automation',
      },
    },
    {
      title: 'Golang',
      level: 'Intermediate',
      category: 'Backend',
      desc: { it: 'Gin, microservizi REST', en: 'Gin, REST microservices' },
    },
    {
      title: 'Solidity',
      level: 'Intermediate',
      category: 'Blockchain',
      desc: {
        it: 'ERC20/721/1155/4337, DeFi protocols',
        en: 'ERC20/721/1155/4337, DeFi protocols',
      },
    },
    {
      title: 'MongoDB',
      level: 'Advanced',
      category: 'Data',
      desc: { it: 'Schema, aggregation, indici', en: 'Schema, aggregation, indexes' },
    },
    {
      title: 'SQL',
      level: 'Intermediate',
      category: 'Data',
      desc: { it: 'MySQL, Postgres, join, indici', en: 'MySQL, Postgres, joins, indexes' },
    },
    {
      title: 'Docker',
      level: 'Familiar',
      category: 'Infra',
      desc: { it: 'Container, Compose, ambienti', en: 'Containers, Compose, environments' },
    },
    {
      title: 'Git',
      level: 'Expert',
      category: 'Infra',
      desc: {
        it: 'Branch, rebase, workflow collaborativi',
        en: 'Branch, rebase, collaborative workflows',
      },
    },
    {
      title: 'Vite',
      level: 'Intermediate',
      category: 'Tooling',
      desc: {
        it: 'Code splitting, build portable Node',
        en: 'Code splitting, portable Node builds',
      },
    },
  ],
  projects: [
    {
      title: 'Tracciato Maker',
      year: '2025',
      status: { it: 'In produzione · privato', en: 'In production · private' },
      summary: {
        it: 'Conversione automatica Excel/PDF → tracciati TXT logistici, con upload FTP multi-cliente.',
        en: 'Automatic Excel/PDF → logistic TXT conversion, with multi-client FTP upload.',
      },
      detail: {
        it: 'App React/TS con architettura feature-oriented (parsing, orders, export, ftp-config) e backend Express che orchestra parsing, generazione TXT e upload. Distribuito come eseguibile Windows per utenti non tecnici.',
        en: 'React/TS app with feature-oriented architecture (parsing, orders, export, ftp-config) and an Express backend orchestrating parsing, TXT generation and upload. Shipped as a Windows executable for non-technical users.',
      },
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Node.js',
        'Express',
        'XLSX',
        'pdf-parse',
        'basic-ftp',
        'Winston',
      ],
      link: null,
    },
    {
      title: 'Engine Golang',
      year: '2023',
      status: { it: 'Privato', en: 'Private' },
      summary: {
        it: 'API REST in Go con integrazione smart contract Ethereum, scheduler Cron e snapshot.',
        en: 'Go REST API with Ethereum smart contract integration, Cron scheduler and snapshots.',
      },
      detail: {
        it: 'Gorilla Mux + MongoDB + go-ethereum. Endpoint documentati via Swaggo, job ricorrenti e statistiche on-chain.',
        en: 'Gorilla Mux + MongoDB + go-ethereum. Endpoints documented via Swaggo, recurring jobs and on-chain statistics.',
      },
      stack: ['Go', 'Gorilla Mux', 'MongoDB', 'go-ethereum', 'Cron', 'Swagger'],
      link: null,
    },
    {
      title: 'Node Backend E-commerce',
      year: '2022',
      status: { it: 'Privato', en: 'Private' },
      summary: {
        it: 'Backend Node con JWT, Stripe, rate limiting, Helmet, test e2e con Jest.',
        en: 'Node backend with JWT, Stripe, rate limiting, Helmet, e2e tests with Jest.',
      },
      detail: {
        it: 'Express + MongoDB + Mongoose. Validazione Joi, logging Morgan, containerizzazione Docker Compose.',
        en: 'Express + MongoDB + Mongoose. Joi validation, Morgan logging, Docker Compose containerization.',
      },
      stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Jest', 'Docker'],
      link: null,
    },
    {
      title: 'GraphQL CRUD Engine',
      year: '2022',
      status: { it: 'Privato', en: 'Private' },
      summary: {
        it: 'CRUD GraphQL tipizzato per User/Project con Apollo Server v3.',
        en: 'Typed GraphQL CRUD for User/Project with Apollo Server v3.',
      },
      detail: {
        it: 'Node + TypeScript, datastore in-memory, ESLint/Prettier, gestione env con dotenv.',
        en: 'Node + TypeScript, in-memory datastore, ESLint/Prettier, env management via dotenv.',
      },
      stack: ['Node.js', 'TypeScript', 'Apollo', 'GraphQL'],
      link: null,
    },
    {
      title: 'Primo Code Assistant',
      year: '2023',
      status: { it: 'Open source', en: 'Open source' },
      summary: {
        it: 'CLI Python che usa GPT-4 per spiegare errori, refactorare e generare snippet.',
        en: 'Python CLI using GPT-4 to explain errors, refactor and generate snippets.',
      },
      detail: {
        it: 'Input da stdin o file, output Markdown. Progetto personale per automatizzare il debug quotidiano.',
        en: 'Input from stdin or file, Markdown output. Personal tool to automate daily debugging.',
      },
      stack: ['Python', 'OpenAI', 'CLI'],
      link: 'https://github.com/DPrimasso/primo-code-assistant',
    },
    {
      title: 'Portfolio v1',
      year: '2024',
      status: { it: 'Open source', en: 'Open source' },
      summary: {
        it: 'Portfolio Vue 3 con Pinia, Composition API e chatbot serverless.',
        en: 'Vue 3 portfolio with Pinia, Composition API and serverless chatbot.',
      },
      detail: {
        it: 'Layout responsive, caricamento dinamico progetti, componenti modulari.',
        en: 'Responsive layout, dynamic project loading, modular components.',
      },
      stack: ['Vue.js', 'TypeScript', 'Pinia', 'Vite'],
      link: 'https://github.com/DPrimasso/portfolio',
    },
  ],
  experience: [
    {
      role: { it: 'Software Developer & Data Analyst', en: 'Software Developer & Data Analyst' },
      company: 'Transfilms SRL',
      from: '2025-09',
      to: null,
      location: 'Brescia, IT',
      bullets: {
        it: [
          'Sviluppo Tracciato Maker: app React/TS + Node per generare e inviare via FTP tracciati TXT da Excel/PDF multi-cliente.',
          'Analisi e normalizzazione dati logistici con pipeline di parsing e modelli di dominio tipizzati.',
          'Monitoraggio in produzione con logging strutturato, metriche e tracciamento errori.',
        ],
        en: [
          'Built Tracciato Maker: React/TS + Node app to generate and FTP-send TXT records from multi-client Excel/PDF.',
          'Analyzed and normalized logistics data with parsing pipelines and typed domain models.',
          'Production monitoring via structured logging, metrics and error tracking.',
        ],
      },
    },
    {
      role: { it: 'Software Developer', en: 'Software Developer' },
      company: 'Secarepay',
      from: '2024-10',
      to: '2025-09',
      location: 'Brescia, IT',
      bullets: {
        it: [
          'Piattaforma rivendita auto in Phoenix (Elixir) con frontend Angular.',
          'Microservizi Python per integrazioni e processi di supporto.',
        ],
        en: [
          'Car resale platform in Phoenix (Elixir) with Angular frontend.',
          'Python microservices for integrations and supporting processes.',
        ],
      },
    },
    {
      role: { it: 'Lead Software Developer', en: 'Lead Software Developer' },
      company: 'Scaling Parrots',
      from: '2020-04',
      to: '2024-10',
      location: 'Brescia, IT',
      bullets: {
        it: [
          'Lead developer per 4 anni: architettura backend, code review, mentoring.',
          'Backend Node e Golang per piattaforme DeFi con smart contract Ethereum (ERC20/721/1155/4337).',
          'Protocolli Masterchef, VotingEscrow, Curve/Compound + microservizi Python.',
          'Deploy, monitoring e incident in produzione su cloud.',
        ],
        en: [
          'Lead developer for 4 years: backend architecture, code review, mentoring.',
          'Node and Go backends for DeFi platforms with Ethereum smart contracts (ERC20/721/1155/4337).',
          'Masterchef, VotingEscrow, Curve/Compound protocols + Python microservices.',
          'Deploy, monitoring and production incidents on cloud.',
        ],
      },
    },
    {
      role: { it: 'Software Developer', en: 'Software Developer' },
      company: 'Nextre Engineering',
      from: '2017-01',
      to: '2020-03',
      location: 'Milano, IT',
      bullets: {
        it: [
          'Manutenzione e sviluppo software agenzia viaggi Expedia con Java (Grails).',
          'Progetto Tech Companies Lab 2019 — menzione speciale Cloud/Big Data/IoT.',
          'Migrazione software gestionale per HP.',
        ],
        en: [
          'Maintained and developed Expedia travel-agency software in Java (Grails).',
          'Tech Companies Lab 2019 — special mention Cloud/Big Data/IoT.',
          'Migrated HP management software.',
        ],
      },
    },
    {
      role: { it: 'Developer PLC', en: 'PLC Developer' },
      company: 'Margor SRL',
      from: '2014-03',
      to: '2016-12',
      location: 'Calcinato (BS), IT',
      bullets: {
        it: [
          'Automazione macchine aziendali con PLC.',
          'Prototipi IoT per smaltimento rifiuti.',
          'Digitalizzazione catalogazione pezzi meccanici.',
        ],
        en: [
          'Industrial machine automation with PLC.',
          'IoT prototypes for waste disposal.',
          'Digitized catalog of mechanical parts.',
        ],
      },
    },
  ],
  education: [
    {
      period: '2005 — 2010',
      degree: {
        it: 'Diploma in Informatica / Sistemi',
        en: 'Diploma in Computer Science / Systems',
      },
      school: 'ITIS Bonsignori, Remedello (BS)',
      detail: {
        it: 'Reti, sistemi operativi, programmazione, basi di dati.',
        en: 'Networks, operating systems, programming, databases.',
      },
      link: null,
    },
    {
      period: '2018',
      degree: { it: 'Oracle Database & SQL — Badge', en: 'Oracle Database & SQL — Badge' },
      school: 'Oracle / Credly',
      detail: {
        it: 'Competenze certificate su Oracle Database e SQL.',
        en: 'Certified skills on Oracle Database and SQL.',
      },
      link: 'https://www.credly.com/badges/26135217-a577-40ff-be66-f761cef095cf/linked_in',
    },
  ],
}

export function t(obj, lang) {
  if (typeof obj === 'string') return obj
  return obj?.[lang] ?? ''
}

export function formatMonth(ym, lang) {
  if (!ym) return ''
  const [y, m] = ym.split('-')
  const monthsIt = [
    'gen',
    'feb',
    'mar',
    'apr',
    'mag',
    'giu',
    'lug',
    'ago',
    'set',
    'ott',
    'nov',
    'dic',
  ]
  const monthsEn = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]
  const arr = lang === 'it' ? monthsIt : monthsEn
  return `${arr[parseInt(m, 10) - 1]} ${y}`
}

export function uniqueStack(projects) {
  const s = new Set()
  projects.forEach(p => p.stack.forEach(tech => s.add(tech)))
  return Array.from(s).sort()
}

export function matchFilter(p, filters) {
  if (!filters.length) return true
  return filters.every(f => p.stack.includes(f))
}
