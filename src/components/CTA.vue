<template>
  <section class="cta py-5 text-center" aria-labelledby="cta-heading">
    <div class="container">
      <h2 id="cta-heading" class="fw-bold mb-3">Scarica il mio CV</h2>
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
  background: var(--accent);
  color: var(--bg);
}
.btn-cta {
  background: var(--bg);
  color: var(--accent);
  border: 2px solid var(--bg);
  transition:
    background 0.3s,
    color 0.3s;
}
.btn-cta:hover {
  background: var(--bg);
  color: #fff;
}
</style>
