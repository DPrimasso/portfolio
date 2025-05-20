<template>
  <section class="stats py-5">
    <div class="container d-flex justify-content-around">
      <div class="stat text-center" v-for="(item, i) in stats" :key="i">
        <h3>{{ item.value }}</h3>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
      stats: [
        { value: '7+', label: 'Anni di esperienza' },
        { value: '50+', label: 'Progetti completati' },
        { value: '1000+', label: 'Ore di coding' }
      ]
    }
  }
}
</script>

<style scoped>
.stats {
  background: var(--section-bg);
}
.stat h3 {
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.stat p {
  color: var(--text);
  margin: 0;
}
</style>