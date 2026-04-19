<template>
  <div class="academy-app">
    <div v-if="academyStore.authLoading" class="ac-loading">
      <div class="ac-spinner" />
    </div>

    <div v-else-if="screen === 's1'" class="ac-screen s1">
      <div class="auth-wrap">
        <div class="auth-header">
          <div class="brand-mark"><span class="ac-dot" />dprimasso · academy</div>
          <h2>Bentornato</h2>
          <p>Inserisci le tue credenziali per accedere ai corsi</p>
        </div>
        <div class="form-card">
          <div class="field">
            <label>email</label>
            <input
              v-model="loginEmail"
              type="email"
              placeholder="mario@esempio.it"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="field">
            <label>password</label>
            <input
              v-model="loginPassword"
              type="password"
              placeholder="••••••••"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="forgot-row">
            <a href="#" @click.prevent="handleResetPassword">password dimenticata?</a>
          </div>
          <div v-if="academyStore.loginError" class="login-error">
            {{ academyStore.loginError }}
          </div>
          <div v-if="resetSent" class="login-success">
            Email di reset inviata. Controlla la casella.
          </div>
          <button class="btn-submit" :disabled="loginLoading" @click="handleLogin">
            {{ loginLoading ? '...' : '→ accedi' }}
          </button>
        </div>
        <div class="info-box">
          <div class="ico">🔐</div>
          <div>
            <div class="ib-title">Accesso riservato</div>
            <div class="ib-desc">
              Le credenziali vengono fornite da Daniele dopo l'iscrizione al corso. Hai bisogno di
              aiuto? Scrivimi.
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <div v-if="['s3', 's4'].includes(screen)" class="academy-topbar">
        <button class="ac-back" @click="screen === 's4' ? goTo('s3') : goTo('s2')">
          {{ screen === 's4' ? '← corsi' : '← dashboard' }}
        </button>
        <div class="ac-brand"><span class="ac-dot" /><b>dprimasso · academy</b></div>
        <span class="ac-spacer" />
        <button class="ac-nav-btn" @click="goTo('s2')">dashboard</button>
        <button class="ac-nav-btn" @click="academyStore.logout()">esci</button>
      </div>

      <div v-if="screen === 's2'" class="ac-screen s2">
        <div class="s2-layout">
          <aside class="s2-sidebar">
            <div class="s2-user-block">
              <div class="s2-av">{{ userInitial }}</div>
              <div class="s2-name">{{ academyStore.userProfile?.displayName }}</div>
              <div class="s2-email">{{ academyStore.userProfile?.email }}</div>
            </div>
            <div class="s2-nav-section">
              <div class="s2-nav-label">principale</div>
              <button
                :class="['s2-nav-btn', { active: dashSection === 'dashboard' }]"
                @click="dashSection = 'dashboard'"
              >
                <span>⊞</span>dashboard
              </button>
              <button class="s2-nav-btn" @click="goTo('s3')"><span>◫</span>i miei corsi</button>
            </div>
            <div class="s2-nav-section">
              <div class="s2-nav-label">account</div>
              <button
                :class="['s2-nav-btn', { active: dashSection === 'settings' }]"
                @click="dashSection = 'settings'"
              >
                <span>⚙</span>impostazioni
              </button>
            </div>
            <div class="s2-sidebar-foot">
              <button class="s2-back-btn" @click="emit('close')">← portfolio</button>
              <button class="s2-logout-btn" @click="academyStore.logout()">esci →</button>
            </div>
          </aside>

          <main class="s2-main">
            <template v-if="dashSection === 'dashboard'">
              <div class="s2-page-head">
                <div class="s2-eyebrow">// dashboard</div>
                <h2 class="s2-title">Ciao, {{ firstName }} 👋</h2>
              </div>
              <div class="s2-stat-row">
                <div class="stat-card accent-blue">
                  <div class="sk">corsi iscritti</div>
                  <div class="sv">{{ enrolledCourses.length }}</div>
                  <div class="sd">
                    {{ enrolledCourses.length === 1 ? 'corso attivo' : 'corsi attivi' }}
                  </div>
                </div>
                <div class="stat-card">
                  <div class="sk">moduli completati</div>
                  <div class="sv">{{ totalCompletedModules }}</div>
                  <div class="sd">su {{ totalModules }} totali</div>
                </div>
                <div class="stat-card">
                  <div class="sk">media quiz</div>
                  <div class="sv">{{ overallAvgScore > 0 ? overallAvgScore + '%' : '—' }}</div>
                  <div class="sd">sui moduli completati</div>
                </div>
              </div>

              <template v-if="enrolledCourses.length > 0">
                <div class="s2-section-h">
                  <h3># i tuoi corsi</h3>
                  <div class="rule" />
                  <button class="s2-link" @click="goTo('s3')">tutti →</button>
                </div>
                <div
                  v-for="course in enrolledCourses"
                  :key="course.id"
                  class="course-row"
                  @click="openCourse(course)"
                >
                  <div class="cr-thumb">{{ courseIcon(course.id) }}</div>
                  <div class="cr-info">
                    <div class="cr-title">{{ course.title }}</div>
                    <div class="cr-sub">
                      {{ academyStore.getCompletedModulesCount(course.id) }} /
                      {{ course.modules.length }} moduli completati
                    </div>
                    <div class="cr-progress-wrap">
                      <div class="cr-progress-bar">
                        <div
                          class="progress-bar"
                          :style="{
                            width:
                              academyStore.getCourseCompletionPercent(
                                course.id,
                                course.modules.length
                              ) + '%',
                          }"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="cr-right">
                    <div class="cr-pct">
                      {{
                        academyStore.getCourseCompletionPercent(course.id, course.modules.length)
                      }}%
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="s2-empty">
                <p>I tuoi corsi appariranno qui dopo l'iscrizione.</p>
              </div>
            </template>

            <template v-else-if="dashSection === 'settings'">
              <div class="s2-page-head">
                <div class="s2-eyebrow">// impostazioni</div>
                <h2 class="s2-title">Il tuo account</h2>
              </div>
              <div class="settings-form">
                <div class="settings-section">
                  <h3>Profilo</h3>
                  <div class="field">
                    <label>nome visualizzato</label>
                    <input v-model="settingsName" type="text" placeholder="Mario Rossi" />
                  </div>
                  <div class="field">
                    <label>bio <span class="opt-label">(opzionale)</span></label>
                    <textarea v-model="settingsBio" placeholder="Qualcosa su di te..." rows="3" />
                  </div>
                  <div class="field">
                    <label>città <span class="opt-label">(opzionale)</span></label>
                    <input v-model="settingsCity" type="text" placeholder="Milano" />
                  </div>
                  <div
                    v-if="settingsSaveMsg"
                    :class="['settings-msg', settingsSaveOk ? 'ok' : 'err']"
                  >
                    {{ settingsSaveMsg }}
                  </div>
                  <button class="btn-submit" :disabled="settingsSaving" @click="saveProfile">
                    {{ settingsSaving ? '...' : '→ salva profilo' }}
                  </button>
                </div>

                <div class="settings-section">
                  <h3>Cambia password</h3>
                  <div class="field">
                    <label>password attuale</label>
                    <input v-model="pwCurrent" type="password" placeholder="••••••••" />
                  </div>
                  <div class="field">
                    <label>nuova password</label>
                    <input v-model="pwNew" type="password" placeholder="••••••••" />
                  </div>
                  <div class="field">
                    <label>conferma nuova password</label>
                    <input v-model="pwConfirm" type="password" placeholder="••••••••" />
                  </div>
                  <div v-if="pwMsg" :class="['settings-msg', pwOk ? 'ok' : 'err']">{{ pwMsg }}</div>
                  <button class="btn-submit" :disabled="pwSaving" @click="changePassword">
                    {{ pwSaving ? '...' : '→ cambia password' }}
                  </button>
                </div>
              </div>
            </template>
          </main>
        </div>
      </div>

      <div v-else-if="screen === 's3'" class="ac-screen s3">
        <div class="s3-wrap">
          <div class="s3-hero">
            <div class="s3-eyebrow"># academy · i miei corsi</div>
            <h2 class="s3-h2">I tuoi <i>corsi</i></h2>
            <p class="s3-lead">
              Segui le lezioni al tuo ritmo, completa i quiz e traccia il tuo avanzamento.
            </p>
          </div>
          <div v-if="enrolledCourses.length > 0" class="s3-grid">
            <div
              v-for="course in enrolledCourses"
              :key="course.id"
              class="c-card"
              @click="openCourse(course)"
            >
              <div :class="['c-top', courseColor(course.id)]">
                <div class="c-top-glow" />
                <div class="c-icon">{{ courseIcon(course.id) }}</div>
              </div>
              <div class="c-body">
                <div class="c-cat">{{ course.language }}</div>
                <div class="c-title">{{ course.title }}</div>
                <div class="c-desc">{{ course.description }}</div>
                <div class="c-progress-wrap">
                  <div class="c-progress-bar">
                    <div
                      class="progress-bar"
                      :style="{
                        width:
                          academyStore.getCourseCompletionPercent(
                            course.id,
                            course.modules.length
                          ) + '%',
                      }"
                    />
                  </div>
                  <span class="c-progress-pct"
                    >{{
                      academyStore.getCourseCompletionPercent(course.id, course.modules.length)
                    }}%</span
                  >
                </div>
              </div>
              <div class="c-footer">
                <span
                  >{{ academyStore.getCompletedModulesCount(course.id) }} /
                  {{ course.modules.length }} moduli</span
                >
                <span class="chip done">→ continua</span>
              </div>
            </div>
          </div>
          <div v-else class="s3-empty">
            <div class="s3-empty-ico">◫</div>
            <p>I tuoi corsi appariranno qui dopo l'iscrizione.</p>
            <p class="s3-empty-sub">Hai bisogno di aiuto? Contattami direttamente.</p>
          </div>
        </div>
      </div>

      <div v-else-if="screen === 's4' && currentCourse" class="ac-screen s4">
        <div class="s4-wrap">
          <button class="s4-back" @click="goTo('s3')">← corsi</button>
          <div class="s4-hero">
            <div>
              <div class="s4-eyebrow">
                <span class="chip done">{{ currentCourse.language }}</span>
              </div>
              <h2 class="s4-h2">{{ currentCourse.title }}</h2>
              <p class="s4-lead">{{ currentCourse.description }}</p>
            </div>
            <div class="enroll-box">
              <div class="eb-label">il tuo avanzamento</div>
              <div class="eb-progress-block">
                <div class="eb-pct">
                  {{
                    academyStore.getCourseCompletionPercent(
                      currentCourse.id,
                      currentCourse.modules.length
                    )
                  }}%
                </div>
                <div class="eb-progress-bar">
                  <div
                    class="progress-bar"
                    :style="{
                      width:
                        academyStore.getCourseCompletionPercent(
                          currentCourse.id,
                          currentCourse.modules.length
                        ) + '%',
                    }"
                  />
                </div>
                <div class="eb-sub">
                  {{ academyStore.getCompletedModulesCount(currentCourse.id) }} /
                  {{ currentCourse.modules.length }} moduli completati
                </div>
              </div>
              <div v-if="academyStore.getAverageQuizScore(currentCourse.id) > 0" class="eb-score">
                media quiz: <b>{{ academyStore.getAverageQuizScore(currentCourse.id) }}%</b>
              </div>
              <button class="btn-enroll-lg" @click="continueToNextModule">→ continua</button>
            </div>
          </div>

          <div class="s4-module-list">
            <div class="s4-section-h">
              <h3># moduli del corso</h3>
              <div class="rule" />
            </div>
            <div
              v-for="{ mod, mi, progress: modProg } in moduleProgressList"
              :key="mod.id"
              class="module"
              @click="openModule(mod)"
            >
              <div class="mod-head">
                <span :class="['mod-status', { done: modProg?.completed }]">
                  {{ modProg?.completed ? '✓' : '○' }}
                </span>
                <span class="mod-num">{{ String(mi + 1).padStart(2, '0') }}</span>
                <span class="mod-title">{{ mod.title }}</span>
                <span class="mod-meta">
                  {{ mod.quiz.length }} domande
                  <span v-if="modProg?.completed" class="mod-score"
                    >· {{ modProg?.quizScore }}%</span
                  >
                </span>
                <span class="mod-chev">›</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="screen === 's5' && currentModule" class="ac-screen s5">
        <div class="ac-topbar-inner">
          <button class="s5-back" @click="goTo('s4')">← corso</button>
          <div class="s5-breadcrumb">
            {{ currentCourse?.title }}
            <span>/ {{ currentModule.title }}</span>
          </div>
          <span class="ac-spacer" />
          <div class="ac-avatar">{{ userInitial }}</div>
        </div>
        <div class="viewer-layout">
          <div class="viewer-main">
            <div class="lesson-content" v-html="renderedContent" />

            <div v-if="currentModule.quiz.length > 0" class="quiz-block">
              <h3 class="quiz-title">Quiz di completamento</h3>

              <div v-if="alreadyCompleted" class="quiz-completed-notice">
                <span class="qcn-check">✓</span>
                Modulo completato · score:
                <b
                  >{{
                    academyStore.getModuleProgress(currentCourse?.id, currentModule.id)?.quizScore
                  }}%</b
                >
              </div>

              <template v-else>
                <p class="quiz-intro">Rispondi alle domande per completare il modulo.</p>
                <div v-for="(q, qi) in currentModule.quiz" :key="q.id" class="quiz-question">
                  <div class="qq-text">{{ qi + 1 }}. {{ q.question }}</div>
                  <div class="qq-options">
                    <button
                      v-for="(opt, oi) in q.options"
                      :key="oi"
                      :class="[
                        'quiz-option',
                        {
                          selected: quizAnswers[qi] === oi,
                          correct: quizSubmitted && oi === q.correct,
                          wrong: quizSubmitted && quizAnswers[qi] === oi && oi !== q.correct,
                        },
                      ]"
                      :disabled="quizSubmitted"
                      @click="selectAnswer(qi, oi)"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </div>

                <div v-if="quizSubmitted" class="quiz-result">
                  <div class="qr-score">{{ lastQuizScore }}%</div>
                  <div class="qr-label">
                    {{ lastQuizScore >= 60 ? 'Ottimo lavoro!' : 'Continua a studiare!' }}
                  </div>
                </div>

                <button
                  v-if="!quizSubmitted"
                  class="btn-submit quiz-submit"
                  :disabled="!allAnswered"
                  @click="submitQuiz"
                >
                  → conferma risposte
                </button>
              </template>
            </div>

            <div class="nav-btns">
              <button v-if="prevModule" class="nav-btn" @click="openModule(prevModule)">
                ← modulo precedente
              </button>
              <span v-else />
              <button
                v-if="nextModule"
                class="nav-btn primary"
                :disabled="!alreadyCompleted && !quizSubmitted"
                @click="openModule(nextModule)"
              >
                modulo successivo →
              </button>
            </div>
          </div>

          <div class="sidebar-mat">
            <div class="sm-head"><b>Curriculum</b></div>
            <div
              v-for="(mod, mi) in currentCourse?.modules"
              :key="mod.id"
              :class="['sm-item', { current: mod.id === currentModule.id }]"
              @click="openModule(mod)"
            >
              <span class="sm-ico">{{
                academyStore.getModuleProgress(currentCourse?.id, mod.id)?.completed ? '✓' : '○'
              }}</span>
              <div class="sm-info">
                <div class="sm-num">{{ String(mi + 1).padStart(2, '0') }}</div>
                <div class="sm-name">{{ mod.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { marked } from 'marked'
import { useAcademyStore } from '../stores/academy'
import programmazioneBase from '../data/courses/programmazione-base.json'
import codeTogether from '../data/courses/code-together.json'

const props = defineProps({
  initialScreen: { type: String, default: 's2' },
})
const emit = defineEmits(['close'])

const academyStore = useAcademyStore()

const allCourses = {
  'programmazione-base': programmazioneBase,
  'code-together': codeTogether,
}

const screen = ref('s1')
const dashSection = ref('dashboard')

function goTo(s) {
  screen.value = s
}

async function loadAllProgress() {
  await Promise.all(
    (academyStore.userProfile?.enrolledCourses || []).map(id => academyStore.loadProgress(id))
  )
}

watch(
  [() => academyStore.authLoading, () => academyStore.isLoggedIn],
  ([loading, loggedIn]) => {
    if (loading) return
    if (loggedIn) {
      loadAllProgress()
      if (screen.value === 's1') {
        screen.value = props.initialScreen === 's1' ? 's2' : props.initialScreen
      }
    } else {
      screen.value = 's1'
    }
  },
  { immediate: true }
)

const loginEmail = ref('')
const loginPassword = ref('')
const loginLoading = ref(false)
const resetSent = ref(false)

async function handleLogin() {
  if (!loginEmail.value || !loginPassword.value) return
  loginLoading.value = true
  resetSent.value = false
  await academyStore.login(loginEmail.value, loginPassword.value)
  loginLoading.value = false
}

async function handleResetPassword() {
  if (!loginEmail.value) {
    academyStore.loginError = 'Inserisci prima la tua email.'
    return
  }
  const ok = await academyStore.resetPassword(loginEmail.value)
  if (ok) resetSent.value = true
}

const userInitial = computed(() => (academyStore.userProfile?.displayName || 'U')[0].toUpperCase())
const firstName = computed(
  () => (academyStore.userProfile?.displayName || '').split(' ')[0] || 'studente'
)

const enrolledCourses = computed(() =>
  (academyStore.userProfile?.enrolledCourses || []).map(id => allCourses[id]).filter(Boolean)
)

const totalModules = computed(() =>
  enrolledCourses.value.reduce((sum, c) => sum + c.modules.length, 0)
)
const totalCompletedModules = computed(() =>
  enrolledCourses.value.reduce((sum, c) => sum + academyStore.getCompletedModulesCount(c.id), 0)
)
const overallAvgScore = computed(() => {
  const scores = enrolledCourses.value
    .map(c => academyStore.getAverageQuizScore(c.id))
    .filter(s => s > 0)
  if (!scores.length) return 0
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
})

function courseIcon(id) {
  return id === 'programmazione-base' ? '{ }' : '⟨⟩'
}
function courseColor(id) {
  return id === 'code-together' ? 'purple' : ''
}

const currentCourse = ref(null)

function openCourse(course) {
  currentCourse.value = course
  academyStore.loadProgress(course.id)
  goTo('s4')
}

function continueToNextModule() {
  if (!currentCourse.value) return
  const first =
    currentCourse.value.modules.find(
      m => !academyStore.getModuleProgress(currentCourse.value.id, m.id)?.completed
    ) || currentCourse.value.modules[0]
  openModule(first)
}

const moduleProgressList = computed(() => {
  if (!currentCourse.value) return []
  return currentCourse.value.modules.map((mod, mi) => ({
    mod,
    mi,
    progress: academyStore.getModuleProgress(currentCourse.value.id, mod.id),
  }))
})

const currentModule = ref(null)
const quizAnswers = ref({})
const quizSubmitted = ref(false)
const lastQuizScore = ref(0)

const renderedContent = computed(() =>
  currentModule.value ? marked(currentModule.value.content) : ''
)

const alreadyCompleted = computed(() => {
  if (!currentCourse.value || !currentModule.value) return false
  return !!academyStore.getModuleProgress(currentCourse.value.id, currentModule.value.id)?.completed
})

const allAnswered = computed(() =>
  currentModule.value
    ? Object.keys(quizAnswers.value).length === currentModule.value.quiz.length
    : false
)

const currentModuleIdx = computed(() => {
  if (!currentCourse.value || !currentModule.value) return -1
  return currentCourse.value.modules.findIndex(m => m.id === currentModule.value.id)
})

const prevModule = computed(() =>
  currentModuleIdx.value > 0 ? currentCourse.value.modules[currentModuleIdx.value - 1] : null
)
const nextModule = computed(() =>
  currentModuleIdx.value >= 0 && currentModuleIdx.value < currentCourse.value.modules.length - 1
    ? currentCourse.value.modules[currentModuleIdx.value + 1]
    : null
)

function openModule(mod) {
  currentModule.value = mod
  quizAnswers.value = {}
  quizSubmitted.value = false
  lastQuizScore.value = 0
  goTo('s5')
}

function selectAnswer(qi, oi) {
  if (quizSubmitted.value) return
  quizAnswers.value = { ...quizAnswers.value, [qi]: oi }
}

async function submitQuiz() {
  if (!currentCourse.value || !currentModule.value) return
  const answers = currentModule.value.quiz.map((_, i) => quizAnswers.value[i] ?? -1)
  const correct = currentModule.value.quiz.map(q => q.correct)
  await academyStore.markModuleComplete(
    currentCourse.value.id,
    currentModule.value.id,
    answers,
    correct
  )
  lastQuizScore.value =
    academyStore.getModuleProgress(currentCourse.value.id, currentModule.value.id)?.quizScore ?? 0
  quizSubmitted.value = true
}

const settingsName = ref('')
const settingsBio = ref('')
const settingsCity = ref('')
const settingsSaving = ref(false)
const settingsSaveMsg = ref('')
const settingsSaveOk = ref(false)

watch(
  () => academyStore.userProfile,
  (p, prevP) => {
    if (!prevP && p) {
      settingsName.value = p.displayName || ''
      settingsBio.value = p.bio || ''
      settingsCity.value = p.city || ''
    }
  },
  { immediate: true }
)

async function saveProfile() {
  settingsSaving.value = true
  const ok = await academyStore.updateUserProfile({
    displayName: settingsName.value,
    bio: settingsBio.value,
    city: settingsCity.value,
  })
  settingsSaveOk.value = ok
  settingsSaveMsg.value = ok ? 'Profilo aggiornato!' : 'Errore durante il salvataggio.'
  settingsSaving.value = false
  setTimeout(() => {
    settingsSaveMsg.value = ''
  }, 3000)
}

const pwCurrent = ref('')
const pwNew = ref('')
const pwConfirm = ref('')
const pwSaving = ref(false)
const pwMsg = ref('')
const pwOk = ref(false)

async function changePassword() {
  pwMsg.value = ''
  if (pwNew.value !== pwConfirm.value) {
    pwMsg.value = 'Le password non coincidono.'
    pwOk.value = false
    return
  }
  if (pwNew.value.length < 6) {
    pwMsg.value = 'La nuova password deve essere di almeno 6 caratteri.'
    pwOk.value = false
    return
  }
  pwSaving.value = true
  const result = await academyStore.changePassword(pwCurrent.value, pwNew.value)
  pwOk.value = result.ok
  pwMsg.value = result.ok ? 'Password aggiornata!' : result.error || 'Errore.'
  if (result.ok) {
    pwCurrent.value = ''
    pwNew.value = ''
    pwConfirm.value = ''
  }
  pwSaving.value = false
  setTimeout(() => {
    pwMsg.value = ''
  }, 4000)
}
</script>
