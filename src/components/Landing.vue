<template>
  <div class="landing">
    <button
      type="button"
      class="theme-btn"
      :aria-label="theme === 'dark' ? 'Passa a light mode' : 'Passa a dark mode'"
      @click="toggleTheme"
    >
      <span v-if="theme === 'dark'">◑</span>
      <span v-else>◐</span>
    </button>

    <div class="mob-topbar">
      <span class="mono-xs muted">dprimasso.it</span>
      <span class="mono-xs muted">2026</span>
    </div>

    <div class="split">
      <div class="mob-hero">
        <img
          class="mob-photo"
          src="@/assets/images/daniele-primasso-profile2.jpeg"
          alt="Daniele Primasso"
        />
        <div class="mob-identity">
          <div class="mob-name">Daniele Primasso</div>
          <div class="mob-location">BRESCIA, IT</div>
          <div class="available-row">
            <span class="dot-live"></span>
            <span class="available-lbl">disponibile</span>
          </div>
        </div>
      </div>

      <div class="panel panel--dev">
        <div class="panel-inner">
          <div class="eyebrow eyebrow--dev">§ 01 — Developer</div>

          <h2 class="headline">Backend, pipeline<br />e sistemi che<br />resistono.</h2>

          <p class="sub">10+ anni · Node · Go · Blockchain · AI</p>

          <div class="tags">
            <span v-for="t in devTags" :key="t" class="tag tag--dev">{{ t }}</span>
          </div>

          <div class="stats-row">
            <div v-for="s in devStats" :key="s.label" class="stat">
              <span class="stat-val">{{ s.value }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          </div>

          <button type="button" class="cta cta--dev" @click="goPortfolio">
            Vedi il portfolio →
          </button>
        </div>
      </div>

      <div class="center-col">
        <div class="center-inner">
          <img
            class="desk-photo"
            src="@/assets/images/daniele-primasso-profile2.jpeg"
            alt="Daniele Primasso"
          />
          <div class="desk-name">Daniele Primasso</div>
          <div class="desk-location">BRESCIA, IT</div>
          <div class="available-row available-row--center">
            <span class="dot-live"></span>
            <span class="available-lbl">disponibile</span>
          </div>
          <div class="vert-line"></div>
          <div class="vert-url">dprimasso.it</div>
        </div>
      </div>

      <div class="panel panel--acad">
        <div class="panel-inner">
          <div class="eyebrow eyebrow--acad">§ 02 — Academy</div>

          <h2 class="headline">Impara a<br />programmare<br />davvero.</h2>

          <p class="sub">Corsi individuali · Progetti reali · Metodo</p>

          <ul class="features">
            <li v-for="f in acadFeatures" :key="f" class="feature">
              <span class="feature-dot"></span>
              <span>{{ f }}</span>
            </li>
          </ul>

          <div class="stats-row">
            <div v-for="s in acadStats" :key="s.label" class="stat">
              <span class="stat-val">{{ s.value }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          </div>

          <button type="button" class="cta cta--acad" @click="goAcademy">Accedi ai corsi →</button>
        </div>
      </div>
    </div>

    <footer class="footer-strip">
      <a href="mailto:daniele.primasso@gmail.com" class="foot-link">{{ email }}</a>
      <div class="foot-right">
        <a href="https://github.com/DPrimasso" target="_blank" rel="noopener" class="foot-link"
          >github</a
        >
        <span class="foot-sep">·</span>
        <a
          href="https://www.linkedin.com/in/daniele-primasso-695ab8158/"
          target="_blank"
          rel="noopener"
          class="foot-link"
          >linkedin</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { theme, init, toggleTheme } = useTheme()

const email = 'daniele.primasso@gmail.com'

const devTags = ['Node.js', 'Go', 'TypeScript', 'Ethereum', 'Python', 'OpenAI']
const devStats = [
  { value: '10+', label: 'anni' },
  { value: '50+', label: 'progetti' },
  { value: '4', label: 'linguaggi' },
]
const acadFeatures = ['Lezioni 1-1', 'Progetti reali', 'Principianti e avanzati', 'Metodo pratico']
const acadStats = [
  { value: '1:1', label: 'lezioni' },
  { value: 'reali', label: 'progetti' },
  { value: '0→∞', label: 'livelli' },
]

onMounted(init)

function goPortfolio() {
  router.push({ name: 'portfolio' })
}

function goAcademy() {
  router.push({ name: 'academy' })
}
</script>

<style scoped>
/* ── Root ── */
.landing {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
}

/* ── Theme toggle ── */
.theme-btn {
  position: absolute;
  top: 14px;
  right: 18px;
  z-index: 10;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bg-card);
  color: var(--fg-dim);
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.15s,
    border-color 0.15s;
}
.theme-btn:hover {
  color: var(--fg);
  border-color: var(--fg-mute);
}

/* ── Mobile-only elements (hidden desktop) ── */
.mob-topbar,
.mob-hero {
  display: none;
}

/* ── Split area ── */
.split {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── Panels ── */
.panel {
  flex: 1;
  display: flex;
  overflow-y: auto;
}

.panel--dev {
  background:
    radial-gradient(ellipse at 0% 100%, rgba(var(--accent-dev-rgb), 0.1), transparent 55%),
    var(--bg);
  border-right: 1px solid var(--line);
}

.panel--acad {
  background:
    radial-gradient(ellipse at 100% 100%, rgba(var(--accent-acad-rgb), 0.1), transparent 55%),
    var(--bg);
  border-left: 1px solid var(--line);
}

.panel-inner {
  width: 100%;
  padding: 40px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

/* ── Center column ── */
.center-col {
  width: 168px;
  flex-shrink: 0;
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.desk-photo {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow:
    0 0 0 5px var(--bg),
    0 0 0 6px var(--line);
  object-fit: cover;
  object-position: center 20%;
}

.desk-name {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--fg);
  text-align: center;
}

.desk-location {
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fg-mute);
}

.vert-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, var(--line), transparent);
}

.vert-url {
  font-family: var(--font-mono);
  font-size: 8.5px;
  writing-mode: vertical-rl;
  color: var(--fg-mute);
  letter-spacing: 0.08em;
}

/* ── Eyebrow ── */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.eyebrow--dev {
  color: var(--accent-dev);
}
.eyebrow--acad {
  color: var(--accent-acad);
}

/* ── Headline ── */
.headline {
  font-family: var(--font-sans);
  font-size: clamp(32px, 3.5vw, 50px);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.03em;
  color: var(--fg);
  margin: 0;
  white-space: pre-line;
}

/* ── Subtitle ── */
.sub {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-dim);
  letter-spacing: 0.04em;
  line-height: 1.7;
  margin: 0;
}

/* ── Tech tags ── */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 5px;
}

.tag--dev {
  background: rgba(var(--accent-dev-rgb), 0.08);
  color: var(--accent-dev);
}

/* ── Features list ── */
.features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--fg-dim);
}

.feature-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-acad);
  flex-shrink: 0;
}

/* ── Stats row ── */
.stats-row {
  display: flex;
  gap: 0;
  border-top: 1px solid var(--line);
  padding-top: 14px;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 16px;
}

.stat-val {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--fg);
  line-height: 1;
}

.stat-lbl {
  font-family: var(--font-mono);
  font-size: 9.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-mute);
}

/* ── CTA buttons ── */
.cta {
  align-self: flex-start;
  padding: 12px 22px;
  border-radius: 9px;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  color: var(--bg);
}

.cta:hover {
  transform: translateY(-2px);
}

.cta--dev {
  background: var(--accent-dev);
  box-shadow: 0 8px 28px rgba(var(--accent-dev-rgb), 0.28);
}

.cta--dev:hover {
  box-shadow: 0 12px 36px rgba(var(--accent-dev-rgb), 0.4);
}

.cta--acad {
  background: var(--accent-acad);
  box-shadow: 0 8px 28px rgba(var(--accent-acad-rgb), 0.28);
}

.cta--acad:hover {
  box-shadow: 0 12px 36px rgba(var(--accent-acad-rgb), 0.4);
}

/* ── Available indicator ── */
.available-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.available-row--center {
  justify-content: center;
}

.dot-live {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green-live);
  flex-shrink: 0;
}

.available-lbl {
  font-family: var(--font-mono);
  font-size: 8.5px;
  color: var(--fg-mute);
  text-transform: lowercase;
  letter-spacing: 0.06em;
}

/* ── Footer strip ── */
.footer-strip {
  flex-shrink: 0;
  height: 38px;
  padding: 0 44px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.foot-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.foot-link {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--fg-mute);
  text-decoration: none;
  transition: color 0.15s;
  cursor: pointer;
}

.foot-link:hover {
  color: var(--fg-dim);
}

.foot-sep {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--line);
}

/* ── Mobile topbar helpers ── */
.mono-xs {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
}

.muted {
  color: var(--fg-mute);
}

/* ═══════════════════════════════════════════
   MOBILE  ≤ 768px
═══════════════════════════════════════════ */
@media (max-width: 768px) {
  .landing {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }

  .theme-btn {
    top: 12px;
    right: 14px;
  }

  /* Topbar */
  .mob-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    flex-shrink: 0;
  }

  /* Hero row */
  .mob-hero {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 28px 22px 24px;
    border-bottom: 1px solid var(--line);
  }

  .mob-photo {
    width: 64px;
    height: 64px;
    border-radius: 10px;
    object-fit: cover;
    object-position: center 20%;
    flex-shrink: 0;
  }

  .mob-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 2px;
  }

  .mob-location {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--fg-mute);
    margin-bottom: 6px;
  }

  /* Split becomes column */
  .split {
    flex-direction: column;
    overflow: visible;
  }

  .panel {
    flex: none;
  }

  .panel--dev {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .panel--acad {
    border-left: none;
  }

  .panel-inner {
    padding: 26px 22px;
    gap: 16px;
  }

  .headline {
    font-size: 28px;
  }

  .cta {
    align-self: stretch;
    text-align: center;
  }

  /* Hide desktop-only elements */
  .center-col {
    display: none;
  }

  /* Hide stats on mobile */
  .stats-row {
    display: none;
  }

  /* Footer */
  .footer-strip {
    height: auto;
    padding: 16px 22px;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
