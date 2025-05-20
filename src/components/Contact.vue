<template>
  <section id="contact" class="py-5">
    <div class="container">
      <h2 class="fw-bold mb-4 text-center">Contatti</h2>
      <p class="text-center">Email: <a :href="'mailto:' + email" >{{ email }}</a></p>
      <p class="text-center">
        <a :href="linkedin" target="_blank" class="me-3"><i class="fab fa-linkedin fa-2x"></i></a>
        <a :href="github" target="_blank"><i class="fab fa-github fa-2x"></i></a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: 'primo.note4@gmail.com',
      linkedin: 'https://www.linkedin.com/in/daniele-primasso-695ab8158/',
      github: 'https://github.com/DPrimasso?preview=true'
    }
  }
}
</script>
