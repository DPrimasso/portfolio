<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
        <img :src="parrots" alt="Parrot Logo" class="me-2" style="height:30px;" />
        Daniele Primasso
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#skills">Competenze</a></li>
          <li class="nav-item"><a class="nav-link" href="#experience">Esperienza</a></li>
          <li class="nav-item"><a class="nav-link" href="#education">Formazione</a></li>
          <li class="nav-item"><a class="nav-link" href="#projects">Progetti</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">Contatti</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import parrots from '../assets/images/parrots.png';
export default {
  name: 'Navbar',
  data() {
    return { parrots };
  }
};
</script>
