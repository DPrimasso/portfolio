<template>
  <div class="sidebar">
    <a href="https://github.com/tuo-account" target="_blank" title="GitHub">
      <i class="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/tuo-profilo/" target="_blank" title="LinkedIn">
      <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://twitter.com/tuo-profilo" target="_blank" title="Twitter">
      <i class="fab fa-twitter"></i>
    </a>
  </div>
</template>

<script>
export default { name: 'Sidebar' }
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  background: rgba(13,17,23,0.8);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.sidebar a {
  color: var(--text);
  font-size: 1.75rem;
  padding: 0.25rem;
  transition: color 0.3s, transform 0.3s;
  position: relative;
}
.sidebar a:hover {
  color: var(--accent);
  transform: translateX(5px);
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
