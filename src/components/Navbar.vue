<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark fixed-top navbar-modern"
    role="navigation"
    aria-label="Navigazione principale"
  >
    <div class="container">
      <a
        class="navbar-brand fw-bold d-flex align-items-center"
        href="#"
        aria-label="Home - Daniele Primasso"
      >
        <img :src="parrots" alt="Parrot Logo" class="me-2 navbar-logo" loading="eager" />
        Daniele Primasso
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#about" aria-label="Vai alla sezione About">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#skills" aria-label="Vai alla sezione Competenze"
              >Competenze</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#experience" aria-label="Vai alla sezione Esperienza"
              >Esperienza</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#education" aria-label="Vai alla sezione Formazione"
              >Formazione</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#projects" aria-label="Vai alla sezione Progetti">Progetti</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact" aria-label="Vai alla sezione Contatti">Contatti</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import parrots from '../assets/images/parrots.png'
</script>

<style scoped>
.navbar-modern {
  background: rgba(15, 23, 42, 0.75) !important;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.navbar-logo {
  height: 30px;
  transition: transform 0.2s ease;
}

.navbar-logo:hover {
  transform: scale(1.1);
}

.navbar-brand {
  color: var(--text) !important;
  transition: color 0.2s ease;
}

.navbar-brand:hover {
  color: var(--accent-strong) !important;
}

.nav-link {
  color: var(--muted) !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  margin: 0 0.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.nav-link:hover,
.nav-link:focus {
  color: var(--accent-strong) !important;
  background: rgba(124, 58, 237, 0.1);
}

.nav-link:hover::before {
  transform: translateX(-50%) scaleX(1);
}

.navbar-toggler {
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28226, 232, 240, 0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>
