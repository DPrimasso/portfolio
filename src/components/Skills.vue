<template>
  <section id="skills" class="py-5">
    <div class="container">
      <h2 class="fw-bold mb-4 text-center">Competenze Dettagliate</h2>
      <div class="row">
        <div v-for="(skill, index) in skills" :key="index" class="col-md-6 col-lg-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <div>
              <i :class="skill.icon + ' me-2'"></i>{{ skill.title }}
            </div>
            <div class="fw-bold">
              {{ skill.level }}%
            </div>
          </div>
          <div class="progress mb-2">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              :style="{ width: skill.level + '%' }"
              :aria-valuenow="skill.level"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p class="small">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      skills: [
        { title: 'JavaScript', icon: 'fab fa-js', level: 90, description: 'ES6+, DOM manipulation, async/await' },
        { title: 'TypeScript', icon: 'fab fa-js', level: 80, description: 'Static typing, interfaces, generics' },
        { title: 'Vue.js', icon: 'fab fa-vuejs', level: 70, description: 'Vue 3 Composition API, Vuex, Vue Router' },
        { title: 'Node.js', icon: 'fab fa-node-js', level: 90, description: 'Express, NestJS, REST API' },
        { title: 'Python', icon: 'fab fa-python', level: 75, description: 'Flask, Django, scripting' },
        { title: 'Golang', icon: 'fas fa-code', level: 70, description: 'Gin framework, microservices' },
        { title: 'Docker', icon: 'fab fa-docker', level: 50, description: 'Containerization, Docker Compose' },
        { title: 'MongoDB', icon: 'fas fa-database', level: 80, description: 'Schema design, aggregation pipeline' },
        { title: 'SQL', icon: 'fas fa-database', level: 75, description: 'MySQL, PostgreSQL, joins, indexing' },
        { title: 'Git', icon: 'fab fa-git-alt', level: 90, description: 'Branching, merging, rebasing' }
      ]
    };
  }
};
</script>
