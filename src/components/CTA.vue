<template>
  <section class="cta py-5 text-center">
    <div class="container">
      <h2 class="fw-bold mb-3">Scarica il mio CV</h2>
      <a href="/src/assets/Curriculum_Vitae_Primasso_Daniele.pdf" class="btn btn-lg btn-cta" download>
        <i class="fas fa-download me-2"></i>Download CV
      </a>
    </div>
  </section>
</template>

<script>
export default { name: 'CTA' }
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
  transition: background 0.3s, color 0.3s;
}
.btn-cta:hover {
  background: var(--bg);
  color: #fff;
}
</style>