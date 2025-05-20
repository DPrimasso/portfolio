<template>
  <div>
    <button
        class="btn btn-warning tour-launcher"
        @click="startTour"
    >
      🚀 Fai un tour del sito
    </button>
    <!-- Navigation & sections -->
    <Navbar />
<!--    <Sidebar />-->
    <Hero />
    <About />
    <Divider />
    <Skills />
    <Divider />
    <Experience />
    <Divider />
    <Education />
    <Divider />
    <Projects />
    <Divider />
    <CTA />
    <Divider />
    <Chatbot/>

    <!-- Guided Tour ------------------------------------------------------ -->
    <v-tour
        name="myTour"
        :steps="steps"
        v-slot="{
        currentStep,
        steps,
        previousStep,
        nextStep,
        stop,
        skip,
        isFirst,
        isLast,
        labels
      }"
    >
      <transition name="fade">
        <v-step
            v-if="steps[currentStep]"
            :key="currentStep"
            :step="steps[currentStep]"
            :previous-step="previousStep"
            :next-step="nextStep"
            :stop="stop"
            :skip="skip"
            :is-first="isFirst"
            :is-last="isLast"
            :labels="labels"
            :class="['tour-step', { 'tour-step-final': isLast }]"
        >
          <!-- Navigation buttons -->
          <template #actions>
            <img
                :src="avatar"
                alt="Guida"
                class="avatar-img"
            />
            <button
                v-if="!isFirst"
                @click="previousStep"
                class="btn btn-primary me-2"
            >
              ◀ Indietro
            </button>
            <button
                v-if="!isLast"
                @click="nextStep"
                class="btn btn-primary"
            >
              Avanti ▶
            </button>
            <button
                v-if="isLast"
                @click="stop"
                class="btn btn-success"
            >
              Finito
            </button>
            <button
                v-else
                @click="skip"
                class="btn btn-secondary"
            >
              Salta
            </button>
          </template>
        </v-step>
      </transition>
    </v-tour>

    <!-- Footer ----------------------------------------------------------- -->
    <footer class="bg-dark text-light py-5">
      <div class="container">
        <div class="row">
          <div id="contact" class="col-md-8">
            <h3>Contatti</h3>
            <p>Email: daniele.primasso@gmail.com</p>
            <a :href="linkedin" target="_blank" class="me-3"
            ><i class="fab fa-linkedin fa-2x"></i
            ></a>
            <a :href="github" target="_blank"
            ><i class="fab fa-github fa-2x"></i
            ></a>
          </div>
          <div class="col-md-4">
            <h3>Link utili</h3>
            <ul class="list-unstyled">
              <li><a href="#about" class="text-light">About</a></li>
              <li><a href="#skills" class="text-light">Competenze</a></li>
              <li><a href="#experience" class="text-light">Esperienza</a></li>
              <li><a href="#contact" class="text-light">Contatti</a></li>
            </ul>
          </div>
        </div>
        <hr class="bg-secondary mt-4" />
        <p class="text-center small mb-0">
          &copy; 2025 Daniele Primasso. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Hero from "./components/Hero.vue";
import Stats from "./components/Stats.vue";
import Divider from "./components/Divider.vue";
import About from "./components/About.vue";
import Skills from "./components/Skills.vue";
import Experience from "./components/Experience.vue";
import Education from "./components/Education.vue";
import CTA from "./components/CTA.vue";
import Contact from "./components/Contact.vue";
import Chatbot from "./components/Chatbot.vue";
import Projects from "./components/Projects.vue";

// ✅ Import dell'immagine per avere l'URL processato dal bundler
import parrots from "./assets/images/parrots.png";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Hero,
    Stats,
    Divider,
    About,
    Skills,
    Experience,
    Education,
    CTA,
    Contact,
    Chatbot,
    Projects
  },
  data() {
    return {
      avatar: parrots,
      steps: [
        {
          target: "#about",
          content: "Scopri chi sono e <strong>una breve presentazione</strong>!"
        },
        {
          target: "#skills",
          content:
              "Dai un'occhiata alle mie <strong>competenze principali</strong>."
        },
        {
          target: "#experience",
          content: "Ecco le mie <strong>esperienze lavorative</strong>."
        },
        {
          target: "#projects",
          content:
              "I <strong>progetti più significativi</strong> che ho realizzato."
        },
        {
          target: "#chatbot_minimize",
          content:
              "Puoi anche <strong>chattare con PrimoBot</strong>, il mio assistente virtuale!"
        }
      ]
    };
  },
  methods: {
    startTour() {
      this.$tours["myTour"].start();
    }
  },
};
</script>

<style scoped>
/* ------------------------------- Tour styles ------------------------------- */
.tour-step {
  background: transparent !important; /* remove default background */
  box-shadow: none !important; /* remove default shadow */
  left: 50em !important;
  top: -25em !important;

}
.tour-step-final {
  background: transparent !important; /* remove default background */
  box-shadow: none !important; /* remove default shadow */
  left: 0em !important;
  top: -15em !important;
}

.tour-launcher {
  position: fixed;
  z-index: 9999;
}

.v-step {
  max-width: 250px;
}

.avatar-img {
  width: 250px;
  height: auto;
  border-radius: 50%;
  margin-right: 1rem;
  user-select: none;
  position: absolute;
  top: 10px;
  left: -175px;
}

.speech-bubble {
  position: relative;
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  line-height: 1.3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.speech-bubble::after {
  content: "";
  position: absolute;
  left: -12px;
  top: 20px;
  width: 0;
  height: 0;
  border-right: 12px solid #ffffff;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

/* Buttons */
.btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  margin: 0.4em
}
</style>
