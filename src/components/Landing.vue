<template>
  <div class="landing">
    <div class="landing-inner">
      <header class="landing-header">
        <div class="landing-eyebrow">// dprimasso.it · 2026</div>
        <h1 class="landing-name">Daniele<br /><em>Primasso.</em></h1>
        <p class="landing-role">Software Developer &amp; Insegnante</p>
      </header>

      <div class="landing-cards">
        <div class="lcard">
          <div class="lcard-label">§ 01 — chi sono</div>
          <p class="lcard-text">
            Vivo a Brescia, amo costruire sistemi che funzionano davvero e spiegare come funzionano
            alle persone. Programmo da più di dieci anni e ancora ogni progetto mi diverte come il
            primo.
          </p>
        </div>
        <div class="lcard">
          <div class="lcard-label">§ 02 — cosa faccio</div>
          <p class="lcard-text">
            Backend, pipeline dati e blockchain in produzione. Microservizi in Node e Go, smart
            contract Ethereum, automazione con TypeScript. E quando non scrivo codice, insegno agli
            altri a farlo.
          </p>
        </div>
      </div>

      <nav class="landing-nav">
        <button class="landing-cta primary" @click="emit('go-portfolio')">
          <span class="cta-label">Portfolio tecnico</span>
          <span class="cta-arrow">→</span>
        </button>
        <button class="landing-cta secondary" @click="emit('go-academy')">
          <span class="cta-label">Academy</span>
          <span class="cta-arrow">→</span>
          <span class="cta-badge">corsi</span>
        </button>
      </nav>

      <footer class="landing-foot">
        <a :href="'mailto:' + email" class="landing-link">{{ email }}</a>
        <span class="sep">·</span>
        <a href="https://github.com/DPrimasso" target="_blank" rel="noopener" class="landing-link"
          >github</a
        >
        <span class="sep">·</span>
        <a
          href="https://www.linkedin.com/in/daniele-primasso-695ab8158/"
          target="_blank"
          rel="noopener"
          class="landing-link"
          >linkedin</a
        >
      </footer>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['go-portfolio', 'go-academy'])
const email = 'daniele.primasso@gmail.com'
</script>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.landing-inner {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.landing-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.landing-name {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 700;
  line-height: 1.05;
  margin: 0 0 14px;
  color: var(--fg);
  letter-spacing: -0.02em;
}

.landing-name em {
  font-style: italic;
  color: var(--magenta);
}

.landing-role {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--fg-dim);
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
}

.landing-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.lcard {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 22px 24px;
}

.lcard-label {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}

.lcard-text {
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-dim);
  margin: 0;
}

.landing-nav {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.landing-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.landing-cta:hover {
  transform: translateY(-2px);
}

.landing-cta.primary {
  background: var(--accent);
  color: #0b1320;
  box-shadow: 0 8px 24px rgba(88, 166, 255, 0.25);
}

.landing-cta.primary:hover {
  box-shadow: 0 12px 32px rgba(88, 166, 255, 0.4);
}

.landing-cta.secondary {
  background: var(--bg-card);
  color: var(--fg);
  border: 1px solid var(--line);
}

.landing-cta.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.cta-arrow {
  font-size: 18px;
  line-height: 1;
}

.cta-badge {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(88, 166, 255, 0.1);
  color: var(--accent);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: 4px;
  padding: 2px 7px;
}

.landing-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.landing-link {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--fg-mute);
  text-decoration: none;
  transition: color 0.15s;
}

.landing-link:hover {
  color: var(--accent);
}

.sep {
  color: var(--line);
  font-size: 12px;
}

@media (max-width: 560px) {
  .landing-cards {
    grid-template-columns: 1fr;
  }

  .landing-nav {
    flex-direction: column;
  }

  .landing-cta {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
