<template>
  <section class="stats py-5" aria-labelledby="stats-heading">
    <div class="container d-flex justify-content-around" role="list">
      <div 
        class="stat text-center" 
        v-for="(item, i) in portfolioStore.stats" 
        :key="i"
        role="listitem"
      >
        <h3>{{ item.value }}</h3>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePortfolioStore } from '../stores/portfolio';

const portfolioStore = usePortfolioStore();

onMounted(() => {
  if (portfolioStore.stats.length === 0) {
    portfolioStore.loadStats();
  }
});
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