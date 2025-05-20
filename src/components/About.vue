<template>
  <section id="about" class="py-5">
    <div class="container text-center">
      <!-- Immagini profilo decorative -->
      <div class="mb-4 d-flex justify-content-center">
        <img :src="profile1" alt="Daniele Primasso ritratto 1" class="profile-img me-3" />
        <img :src="profile2" alt="Daniele Primasso ritratto 2" class="profile-img" />
      </div>
      <h2 class="fw-bold mb-4">Chi sono</h2>
      <p class="card-about">
        Software Developer orientato alla crescita continua, con oltre 7 anni di esperienza
        nella progettazione e nello sviluppo di soluzioni back-end scalabili e
        performanti. Esperto nella creazione di API REST e microservizi in Node.js,
        Golang e Python.
      </p>
      <p class="card-about">
        Forte curiosità nell’esplorare tecnologie emergenti come IA e Machine Learning per
        l’analisi di dati oppure protocolli blockchain per integrare soluzioni
        decentralizzate. Motivato da sfide tecniche e obiettivi ambiziosi, mi impegno a
        trasformare requisiti complessi in prodotti affidabili e ad alto impatto.
      </p>
    </div>
  </section>
</template>

<script>
import profile1 from '../assets/images/daniele-primasso-profilo.webp';
import profile2 from '../assets/images/daniele-primasso-profile2.jpeg';
export default {
  name: 'About',
  data() {
    return { profile1, profile2 };
  }
};
</script>
