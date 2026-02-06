<template>
  <div class="divider">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,100 C360,0 720,100 1440,0 L1440,100 L0,100 Z" fill="var(--bg-alt)" />
    </svg>
  </div>
</template>

<style scoped>
.divider {
  margin-top: -1px;
  position: relative;
  z-index: 1;
}

.divider svg {
  display: block;
  width: 100%;
  height: 80px;
  filter: drop-shadow(0 -2px 10px rgba(0, 0, 0, 0.1));
}
</style>
