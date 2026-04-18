<template>
  <section class="cta py-5 text-center" aria-labelledby="cta-heading">
    <div class="container">
      <h2 id="cta-heading" class="fw-bold mb-2">Scarica il mio CV</h2>
      <p class="cta-sub mb-4">Curriculum completo con esperienza, competenze e progetti.</p>
      <a
        href="/Curriculum_Vitae_Primasso_Daniele.pdf"
        class="btn btn-lg btn-cta"
        download="Curriculum_Vitae_Primasso_Daniele.pdf"
        aria-label="Scarica il curriculum vitae di Daniele Primasso"
      >
        <i class="fas fa-download me-2" aria-hidden="true"></i>Download CV
      </a>
    </div>
  </section>
</template>

<script setup>
// CTA component - no logic needed
</script>

<style scoped>
.cta {
  background: linear-gradient(120deg, var(--accent), var(--accent-strong));
  color: white;
}

.cta-sub {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.btn-cta {
  background: white;
  color: var(--accent);
  border: none;
  font-weight: 700;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-cta:hover {
  background: rgba(255, 255, 255, 0.92);
  color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}
</style>
