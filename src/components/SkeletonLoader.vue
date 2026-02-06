<template>
  <div class="skeleton-loader" :class="variant">
    <div
      v-for="i in lines"
      :key="i"
      class="skeleton-line"
      :style="{ width: lineWidths[i - 1] || '100%' }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  lines: {
    type: Number,
    default: 3,
  },
  variant: {
    type: String,
    default: 'default',
  },
  lineWidths: {
    type: Array,
    default: () => ['100%', '80%', '90%'],
  },
})
</script>

<style scoped>
.skeleton-loader {
  padding: 1rem;
}

.skeleton-line {
  height: 1rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-line:last-child {
  margin-bottom: 0;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-loader.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
</style>
