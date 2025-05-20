<template>
  <section id="education" class="py-5">
    <div class="container">
      <h2 class="fw-bold mb-4 text-center">Formazione</h2>
      <div class="timeline">
        <div
          class="timeline-item"
          v-for="(edu, index) in education"
          :key="index"
        >
          <h5 class="fw-semibold mb-1 text-accent">{{ edu.period }}</h5>
          <h6 class="mb-1">{{ edu.degree }}</h6>
          <p class="mb-2 small">{{ edu.institution }}</p>
          <p class="small">{{ edu.details }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Education',
  data() {
    return {
      education: [
        {
          period: '2005 - 2010',
          degree: 'Diploma in Informatica / Sistemi',
          institution: 'Istituto Tecnico Industriale "Bonsignori", Remedello (BS)',
          details: 'Studio di reti, sistemi operativi, programmazione e basi di dati.'
        }
      ]
    }
  }
}
</script>
