<template>
  <div class="v1 variant">
    <div class="wrap">
      <!-- HERO -->
      <section class="v1-hero">
        <div class="crt">
          <span><span class="prompt" />whoami</span>
          <span><b>session:</b> portfolio.v2.0</span>
          <span><b>host:</b> dprimasso.dev</span>
          <span><b>ts:</b> {{ timestamp }} UTC</span>
          <span><b>uptime:</b> 10y 4mo</span>
        </div>
        <h1>Daniele<br />Primasso<span class="cursor" /></h1>
        <p class="lede">
          <span>{{ t(D.profile.role) }}</span> — {{ t(D.profile.tagline) }}
        </p>
        <div class="hero-grid">
          <div v-for="(s, i) in D.stats" :key="i">
            <div class="k">/* {{ t(s.label) }} */</div>
            <div class="v">
              {{ s.value }}<small>{{ t(s.label) }}</small>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="v1-h">
        <span class="num">01</span>
        <span class="slug"><b># about</b> — {{ lang === 'it' ? 'chi sono' : 'who i am' }}</span>
        <span class="rule" />
      </section>
      <section class="v1-about">
        <div class="prose" v-html="bioHtml" />
        <div class="meta">
          <div class="row">
            <span>location</span><b>{{ D.profile.location }}</b>
          </div>
          <div class="row">
            <span>role</span><b>{{ t(D.profile.role) }}</b>
          </div>
          <div class="row">
            <span>status</span>
            <b style="color: var(--ok)"
              >● {{ lang === 'it' ? 'disponibile per collaborazioni' : 'open to opportunities' }}</b
            >
          </div>
          <div class="row"><span>stack</span><b>Node · Go · Python · React · TS</b></div>
          <div class="row">
            <span>focus</span
            ><b>{{ lang === 'it' ? 'backend, data, automazione' : 'backend, data, automation' }}</b>
          </div>
          <div class="row"><span>since</span><b>2014</b></div>
        </div>
      </section>

      <!-- SKILLS -->
      <section class="v1-h">
        <span class="num">02</span>
        <span class="slug"
          ><b># skills</b> — {{ lang === 'it' ? 'competenze tecniche' : 'technical skills' }}</span
        >
        <span class="rule" />
      </section>
      <section class="v1-skills">
        <div v-for="s in D.skills" :key="s.title" class="v1-skill">
          <div class="t">{{ s.title }}</div>
          <span :class="['skill-badge', s.level]">{{ s.level }}</span>
          <div class="c">/* {{ s.category }} */</div>
          <div class="d">{{ t(s.desc) }}</div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section class="v1-h">
        <span class="num">03</span>
        <span class="slug">
          <b># projects</b> — {{ lang === 'it' ? 'selezione di lavori' : 'selected work' }} ·
          {{ filtered.length }}/{{ D.projects.length }}
        </span>
        <span class="rule" />
      </section>
      <section :class="['v1-projects', layoutMode === 'grid' ? 'grid-mode' : 'list']">
        <div class="filters">
          <span class="tag" style="background: transparent; border: 1px dashed var(--line)"
            >filter:</span
          >
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
            >clear ✕</span
          >
        </div>
        <div class="grid">
          <template v-for="(p, i) in filtered" :key="p.title">
            <div
              :class="['p', { open: openIdx === i }]"
              :data-status="isPrivate(p) ? 'private' : 'public'"
              @click="openIdx = openIdx === i ? null : i"
            >
              <template v-if="layoutMode === 'list'">
                <div class="year">{{ p.year }}</div>
                <div class="name">
                  {{ p.title }}<small>{{ t(p.summary) }}</small>
                </div>
                <div class="stackmini">{{ p.stack.slice(0, 4).join(' · ') }}</div>
                <div class="status">{{ t(p.status) }}</div>
              </template>
              <template v-else>
                <div class="head">
                  <div class="name">{{ p.title }}</div>
                  <div class="year">{{ p.year }}</div>
                </div>
                <div class="sum">{{ t(p.summary) }}</div>
                <div class="tags">
                  <span v-for="s in p.stack.slice(0, 5)" :key="s" class="tag">{{ s }}</span>
                </div>
                <div class="status">● {{ t(p.status) }}</div>
              </template>
            </div>
            <div v-if="openIdx === i" class="v1-expand">
              <div class="desc">{{ t(p.detail) }}</div>
              <div class="tags">
                <span v-for="s in p.stack" :key="s" class="tag">{{ s }}</span>
              </div>
              <a v-if="p.link" :href="p.link" target="_blank" rel="noopener">↗ {{ p.link }}</a>
            </div>
          </template>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section class="v1-h">
        <span class="num">04</span>
        <span class="slug"
          ><b># experience</b> — {{ lang === 'it' ? 'storia lavorativa' : 'work history' }}</span
        >
        <span class="rule" />
      </section>
      <section class="v1-xp">
        <div v-for="(x, i) in D.experience" :key="i" class="x">
          <div class="when">
            <b>{{ formatMonth(x.from, lang) }}</b>
            <span
              >→ {{ x.to ? formatMonth(x.to, lang) : lang === 'it' ? 'presente' : 'present' }}</span
            >
          </div>
          <div>
            <div class="who">
              {{ t(x.role) }} <span class="co">@ {{ x.company }}</span>
            </div>
            <div class="dim" style="font-size: 11.5px; margin-top: 2px">{{ x.location }}</div>
            <ul>
              <li v-for="(b, j) in t(x.bullets)" :key="j">{{ b }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- EDUCATION -->
      <section class="v1-h">
        <span class="num">05</span>
        <span class="slug"
          ><b># education</b> —
          {{ lang === 'it' ? 'formazione & certificazioni' : 'education & certs' }}</span
        >
        <span class="rule" />
      </section>
      <section class="v1-edu">
        <div v-for="(e, i) in D.education" :key="i" class="e">
          <div class="y">{{ e.period }}</div>
          <div class="d">{{ t(e.degree) }}</div>
          <div class="s">{{ e.school }}</div>
          <div class="x">{{ t(e.detail) }}</div>
          <a
            v-if="e.link"
            :href="e.link"
            target="_blank"
            rel="noopener"
            style="margin-top: 8px; display: inline-block"
            >↗ view credential</a
          >
        </div>
      </section>

      <!-- CONTACT -->
      <section class="v1-contact">
        <div>
          <h2 v-if="lang === 'it'">costruiamo<br />qualcosa di <span class="a">solido</span>.</h2>
          <h2 v-else>let's build<br />something <span class="a">solid</span>.</h2>
          <p>
            {{
              lang === 'it'
                ? 'Apri un canale: email, LinkedIn o GitHub. Rispondo rapidamente, soprattutto su progetti backend, data pipeline e architetture distribuite.'
                : 'Drop a line via email, LinkedIn or GitHub. I reply fast — especially for backend, data pipelines and distributed systems work.'
            }}
          </p>
        </div>
        <div class="links">
          <a :href="'mailto:' + D.profile.email"><span>email</span>{{ D.profile.email }}</a>
          <a :href="D.profile.github" target="_blank" rel="noopener"
            ><span>github</span>@DPrimasso</a
          >
          <a :href="D.profile.linkedin" target="_blank" rel="noopener"
            ><span>linkedin</span>daniele-primasso</a
          >
        </div>
      </section>

      <footer class="v1-foot">
        <div>© 2026 Daniele Primasso · v2.0 · built with care</div>
        <div><span class="prompt" />exit 0</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const allTech = computed(() => uniqueStack(D.projects))
const filtered = computed(() => D.projects.filter(p => matchFilter(p, filters.value)))

const now = new Date()
const timestamp = now.toISOString().replace('T', ' ').slice(0, 16)

const bioHtml = computed(() => {
  return t(D.profile.bio)
    .replace(/Lead/g, '<b>Lead</b>')
    .replace(/Node/g, '<b>Node</b>')
    .replace(/Go(\s|lang)/g, '<b>Go$1</b>')
    .replace(/React/g, '<b>React</b>')
    .replace(/TypeScript/g, '<b>TypeScript</b>')
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
</script>
