<template>
  <div class="v2 variant">
    <div class="wrap">
      <div class="v2-layout">
        <!-- SIDEBAR -->
        <aside class="v2-side">
          <div class="id">
            <div class="sig">Daniele<br /><i>Primasso.</i></div>
            <div class="role">{{ t(D.profile.role) }}</div>
          </div>
          <nav class="nav">
            <a
              v-for="([id, label], i) in navItems"
              :key="id"
              :href="'#s-' + id"
              :class="{ cur: curSection === id }"
              @click.prevent="scrollToSection(id)"
            >
              <span>{{ label }}</span>
              <span class="n">{{ String(i + 1).padStart(2, '0') }}</span>
            </a>
          </nav>
          <div class="status">
            <div><span class="led" />available for projects</div>
            <div style="color: var(--fg-mute); margin-top: 6px">
              {{ D.profile.location }} · UTC+1
            </div>
          </div>
        </aside>

        <!-- MAIN -->
        <main class="v2-main">
          <!-- HERO -->
          <section class="v2-hero">
            <div class="eyebrow">portfolio · 2026 edition · {{ lang.toUpperCase() }}</div>
            <h1>Backends<br />that <em>don't</em><br />break.</h1>
            <p class="lede">
              <b>{{ t(D.profile.role) }}</b> — {{ t(D.profile.tagline) }}
            </p>
            <div class="stats">
              <div v-for="(s, i) in D.stats" :key="i">
                <div class="v">{{ s.value }}</div>
                <div class="l">{{ t(s.label) }}</div>
              </div>
            </div>
          </section>

          <!-- ABOUT -->
          <section id="s-about" class="v2-sec">
            <div class="sh">
              <div class="n">§ 01 — {{ lang === 'it' ? 'PROFILO' : 'PROFILE' }}</div>
              <h2 v-if="lang === 'it'">chi <i>sono</i>.</h2>
              <h2 v-else>who <i>I am</i>.</h2>
            </div>
            <div class="v2-about">
              <div class="l">bio</div>
              <p>{{ t(D.profile.bio) }}</p>
              <div>
                <p
                  style="
                    font-family: var(--serif);
                    font-size: 24px;
                    color: var(--fg);
                    line-height: 1.25;
                    font-style: italic;
                    margin: 0 0 18px;
                  "
                >
                  "{{
                    lang === 'it'
                      ? 'Il codice migliore è quello che puoi lasciare in produzione e dormire bene la notte.'
                      : 'The best code is the one you can leave running and still sleep at night.'
                  }}"
                </p>
                <div
                  style="
                    font-family: var(--mono);
                    font-size: 11.5px;
                    color: var(--fg-mute);
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                  "
                >
                  — personal manifesto
                </div>
              </div>
            </div>
          </section>

          <!-- SKILLS -->
          <section id="s-skills" class="v2-sec">
            <div class="sh">
              <div class="n">§ 02 — STACK</div>
              <h2 v-if="lang === 'it'"><i>come</i> lavoro.</h2>
              <h2 v-else><i>how</i> I work.</h2>
            </div>
            <div class="v2-skills">
              <div
                class="l"
                style="
                  font-family: var(--mono);
                  font-size: 11.5px;
                  color: var(--fg-mute);
                  letter-spacing: 0.08em;
                  text-transform: uppercase;
                "
              >
                {{ lang === 'it' ? 'strumenti' : 'tools' }}
              </div>
              <div class="groups">
                <div v-for="[cat, skills] in groupedSkills" :key="cat" class="g">
                  <h3>{{ cat }}</h3>
                  <div class="items">
                    <div v-for="s in skills" :key="s.title" class="it">
                      <div class="top">
                        <div class="name">{{ s.title }}</div>
                        <span :class="['skill-badge', s.level]">{{ s.level }}</span>
                      </div>
                      <div class="d">{{ t(s.desc) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- PROJECTS -->
          <section id="s-projects" class="v2-sec">
            <div class="sh">
              <div class="n">§ 03 — WORK</div>
              <h2 v-if="lang === 'it'"><i>selezione</i> di progetti.</h2>
              <h2 v-else>selected <i>work</i>.</h2>
            </div>
            <div :class="['v2-proj', layoutMode === 'grid' ? 'grid-mode' : 'list']">
              <div class="filters">
                <span class="tag" style="background: transparent; border: 1px dashed var(--line)">
                  {{ lang === 'it' ? 'filtra per tecnologia' : 'filter by tech' }}
                </span>
                <span
                  v-for="tag in allTech"
                  :key="tag"
                  :class="['tag', 'clickable', { on: filters.includes(tag) }]"
                  @click="toggleFilter(tag)"
                  >{{ tag }}</span
                >
                <span
                  v-if="filters.length"
                  class="tag clickable"
                  style="border-color: #5a2a2a; color: #e89c9c"
                  @click="filters = []"
                  >reset ✕</span
                >
              </div>
              <div class="grid">
                <template v-for="(p, i) in filtered" :key="p.title">
                  <div
                    class="p"
                    :data-status="isPrivate(p) ? 'private' : 'public'"
                    @click="openIdx = openIdx === i ? null : i"
                  >
                    <template v-if="layoutMode === 'list'">
                      <div class="year">{{ p.year }}</div>
                      <div>
                        <div class="title">{{ p.title }}</div>
                        <div class="sum">{{ t(p.summary) }}</div>
                      </div>
                      <div class="meta">
                        <div class="s">{{ t(p.status) }}</div>
                        <div>{{ p.stack.slice(0, 3).join(' · ') }}</div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="meta">
                        <span>{{ p.year }}</span
                        ><span>{{ t(p.status) }}</span>
                      </div>
                      <div class="title">{{ p.title }}</div>
                      <div class="sum">{{ t(p.summary) }}</div>
                      <div class="tags">
                        <span v-for="s in p.stack.slice(0, 4)" :key="s" class="tag">{{ s }}</span>
                      </div>
                    </template>
                  </div>
                  <div v-if="openIdx === i" class="v2-expand">
                    <div class="desc">{{ t(p.detail) }}</div>
                    <div class="tags">
                      <span v-for="s in p.stack" :key="s" class="tag">{{ s }}</span>
                    </div>
                    <a v-if="p.link" :href="p.link" target="_blank" rel="noopener"
                      >→ {{ p.link }}</a
                    >
                  </div>
                </template>
              </div>
            </div>
          </section>

          <!-- EXPERIENCE -->
          <section id="s-experience" class="v2-sec">
            <div class="sh">
              <div class="n">§ 04 — PATH</div>
              <h2 v-if="lang === 'it'"><i>percorso</i> professionale.</h2>
              <h2 v-else>career <i>path</i>.</h2>
            </div>
            <div class="v2-xp">
              <div v-for="(x, i) in D.experience" :key="i" class="row">
                <div class="when">
                  {{ formatMonth(x.from, lang) }}
                  <span class="span"
                    >→
                    {{
                      x.to ? formatMonth(x.to, lang) : lang === 'it' ? 'presente' : 'present'
                    }}</span
                  >
                </div>
                <div>
                  <h3>
                    {{ t(x.role) }} <i>@ {{ x.company }}</i>
                  </h3>
                  <div class="loc">{{ x.location }}</div>
                  <ul>
                    <li v-for="(b, j) in t(x.bullets)" :key="j">{{ b }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- EDUCATION -->
          <section id="s-education" class="v2-sec">
            <div class="sh">
              <div class="n">§ 05 — CREDENTIALS</div>
              <h2 v-if="lang === 'it'"><i>formazione</i>.</h2>
              <h2 v-else><i>education</i>.</h2>
            </div>
            <div class="v2-edu">
              <div v-for="(e, i) in D.education" :key="i" class="e">
                <div class="y">{{ e.period }}</div>
                <h3>{{ t(e.degree) }}</h3>
                <div class="s">{{ e.school }}</div>
                <p>{{ t(e.detail) }}</p>
                <a v-if="e.link" :href="e.link" target="_blank" rel="noopener">→ view credential</a>
              </div>
            </div>
          </section>

          <!-- CONTACT -->
          <section id="s-contact" class="v2-contact">
            <h2 v-if="lang === 'it'">
              parliamo di <i>qualcosa</i><br />che <span class="a">resiste</span>.
            </h2>
            <h2 v-else>let's talk about <i>work</i><br />that <span class="a">lasts</span>.</h2>
            <div class="links">
              <a :href="'mailto:' + D.profile.email">
                <span class="l">email</span>
                <span class="v">{{ D.profile.email }}</span>
              </a>
              <a :href="D.profile.github" target="_blank" rel="noopener">
                <span class="l">github</span>
                <span class="v">@DPrimasso</span>
              </a>
              <a :href="D.profile.linkedin" target="_blank" rel="noopener">
                <span class="l">linkedin</span>
                <span class="v">daniele-primasso</span>
              </a>
            </div>
            <div class="v2-foot">
              <div>© 2026 · Daniele Primasso</div>
              <div>portfolio · v2.0 · {{ lang.toUpperCase() }}</div>
            </div>
          </section>
        </main>
      </div>
      <nav class="v2-mobile-nav" aria-label="Navigazione rapida">
        <button
          v-for="[id, label] in mobileNavItems"
          :key="id"
          :class="{ cur: curSection === id }"
          @click="scrollToSection(id)"
        >
          {{ label }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  PORTFOLIO,
  t as tFn,
  formatMonth,
  uniqueStack,
  matchFilter,
} from '../data/portfolioData.js'

const props = defineProps({
  lang: { type: String, default: 'en' },
  layoutMode: { type: String, default: 'list' },
})

const D = PORTFOLIO
const t = obj => tFn(obj, props.lang)

const filters = ref([])
const openIdx = ref(null)
const curSection = ref('about')

const allTech = computed(() => uniqueStack(D.projects))
const filtered = computed(() => D.projects.filter(p => matchFilter(p, filters.value)))

const navItems = computed(() => [
  ['about', props.lang === 'it' ? 'chi sono' : 'about'],
  ['skills', props.lang === 'it' ? 'competenze' : 'skills'],
  ['projects', props.lang === 'it' ? 'progetti' : 'projects'],
  ['experience', props.lang === 'it' ? 'esperienza' : 'experience'],
  ['education', props.lang === 'it' ? 'formazione' : 'education'],
  ['contact', props.lang === 'it' ? 'contatti' : 'contact'],
  ['academy', props.lang === 'it' ? 'academy' : 'academy'],
])

const mobileNavItems = computed(() => [
  ['about', props.lang === 'it' ? 'profilo' : 'profile'],
  ['projects', props.lang === 'it' ? 'progetti' : 'projects'],
  ['experience', props.lang === 'it' ? 'esperienza' : 'experience'],
  ['contact', props.lang === 'it' ? 'contatti' : 'contact'],
])

const groupedSkills = computed(() => {
  const g = {}
  D.skills.forEach(s => {
    if (!g[s.category]) g[s.category] = []
    g[s.category].push(s)
  })
  return Object.entries(g)
})

function toggleFilter(tech) {
  const idx = filters.value.indexOf(tech)
  if (idx >= 0) filters.value.splice(idx, 1)
  else filters.value.push(tech)
  openIdx.value = null
}

function isPrivate(p) {
  return p.status.en.toLowerCase().includes('private')
}

function onScroll() {
  const ids = ['about', 'skills', 'projects', 'experience', 'education', 'contact', 'academy']
  for (let i = ids.length - 1; i >= 0; i--) {
    const el = document.getElementById('s-' + ids[i])
    if (el && el.getBoundingClientRect().top < 160) {
      curSection.value = ids[i]
      return
    }
  }
}

function scrollToSection(id) {
  const el = document.getElementById('s-' + id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
