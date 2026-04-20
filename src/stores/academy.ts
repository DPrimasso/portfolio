import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FirebaseError } from 'firebase/app'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { auth, db, firebaseInitError } from '../services/firebaseService'

export interface UserProfile {
  displayName: string
  email: string
  enrolledCourses: string[]
  bio?: string
  city?: string
}

/** Fields persisted under `progress/{uid}/{courseId}/{moduleId}` in Firestore. */
export interface ModuleProgress {
  completed: boolean
  quizScore: number
  quizAnswers: number[]
  completedAt?: Date
}

export type CourseProgress = Record<string, ModuleProgress>

export const useAcademyStore = defineStore('academy', () => {
  const user = ref<User | null>(null)
  const userProfile = ref<UserProfile | null>(null)
  const progress = ref<Record<string, CourseProgress>>({})
  const authLoading = ref(true)
  const authInitError = ref('')
  const loginError = ref('')

  const isLoggedIn = computed(() => !!user.value)

  if (!auth || !db) {
    authInitError.value = firebaseInitError || 'Firebase non disponibile.'
    authLoading.value = false
  }

  // ── Listen to Firebase auth state ─────────────────────────
  let authInitTimer: ReturnType<typeof setTimeout> | null = null
  if (auth) {
    authInitTimer = setTimeout(() => {
      if (authLoading.value) {
        authInitError.value =
          'Academy sta impiegando troppo tempo a inizializzarsi. Verifica configurazione Firebase e rete.'
        authLoading.value = false
      }
    }, 8000)

    try {
      onAuthStateChanged(auth, async firebaseUser => {
        try {
          user.value = firebaseUser
          if (firebaseUser) {
            await loadUserProfile()
          } else {
            userProfile.value = null
            progress.value = {}
          }
          authInitError.value = ''
        } catch (e) {
          if (import.meta.env.DEV) console.error('Academy auth initialization failed', e)
          authInitError.value =
            "Errore durante l'inizializzazione Academy. Ricarica la pagina o riprova più tardi."
          userProfile.value = null
        } finally {
          if (authInitTimer) clearTimeout(authInitTimer)
          authLoading.value = false
        }
      })
    } catch (e) {
      if (authInitTimer) clearTimeout(authInitTimer)
      authInitError.value =
        "Academy non riesce ad avviare l'autenticazione. Verifica dominio autorizzato e config Firebase."
      authLoading.value = false
      if (import.meta.env.DEV) console.error('Academy onAuthStateChanged registration failed', e)
    }
  }

  // ── Auth ───────────────────────────────────────────────────
  async function login(email: string, password: string): Promise<boolean> {
    if (!auth) {
      loginError.value = 'Academy non configurata correttamente.'
      return false
    }
    loginError.value = ''
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (e: unknown) {
      const code = (e as FirebaseError)?.code ?? ''
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        loginError.value = 'Email o password non corretti.'
      } else if (code === 'auth/too-many-requests') {
        loginError.value = 'Troppi tentativi. Riprova tra qualche minuto.'
      } else {
        loginError.value = 'Errore di accesso. Riprova.'
      }
      return false
    }
  }

  async function logout() {
    if (!auth) return
    await signOut(auth)
  }

  async function resetPassword(email: string): Promise<boolean> {
    if (!auth) return false
    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch {
      return false
    }
  }

  // ── Profile ────────────────────────────────────────────────
  async function loadUserProfile() {
    if (!user.value || !db) return
    try {
      const snap = await getDoc(doc(db, 'users', user.value.uid))
      if (snap.exists()) {
        userProfile.value = snap.data() as UserProfile
      } else {
        // Fallback: crea un profilo base dal record Firebase Auth
        userProfile.value = {
          displayName: user.value.displayName || user.value.email?.split('@')[0] || 'Studente',
          email: user.value.email || '',
          enrolledCourses: [],
        }
      }
    } catch (e) {
      if (import.meta.env.DEV)
        console.error('Failed to load academy profile, using fallback profile', e)
      userProfile.value = {
        displayName: user.value.displayName || user.value.email?.split('@')[0] || 'Studente',
        email: user.value.email || '',
        enrolledCourses: [],
      }
    }
  }

  async function updateUserProfile(updates: Partial<UserProfile>): Promise<boolean> {
    if (!user.value || !db) return false
    try {
      const userDocRef = doc(db, 'users', user.value.uid)
      await setDoc(userDocRef, updates, { merge: true })
      if (updates.displayName) {
        await updateProfile(user.value, { displayName: updates.displayName })
      }
      userProfile.value = { ...userProfile.value!, ...updates }
      return true
    } catch {
      return false
    }
  }

  async function changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ ok: boolean; error?: string }> {
    if (!user.value?.email) return { ok: false, error: 'Utente non trovato.' }
    try {
      const credential = EmailAuthProvider.credential(user.value.email, currentPassword)
      await reauthenticateWithCredential(user.value, credential)
      await updatePassword(user.value, newPassword)
      return { ok: true }
    } catch (e: unknown) {
      const code = (e as FirebaseError)?.code ?? ''
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        return { ok: false, error: 'Password attuale non corretta.' }
      }
      return { ok: false, error: 'Errore durante il cambio password.' }
    }
  }

  // ── Course progress ────────────────────────────────────────
  async function loadProgress(courseId: string) {
    if (!user.value || !db) return
    if (progress.value[courseId]) return
    const colRef = collection(db, 'progress', user.value.uid, courseId)
    const snap = await getDocs(colRef)
    const data: CourseProgress = {}
    snap.forEach(d => {
      data[d.id] = d.data() as ModuleProgress
    })
    progress.value = { ...progress.value, [courseId]: data }
  }

  /** Writes `completed`, `quizScore`, `quizAnswers`, `completedAt` (server). Firestore rules should allow access only when `request.auth.uid == userId` for path `progress/{userId}/…`. */
  async function markModuleComplete(
    courseId: string,
    moduleId: string,
    quizAnswers: number[],
    correctAnswers: number[]
  ) {
    if (!user.value || !db) return
    const total = correctAnswers.length
    const score =
      total === 0
        ? 100
        : Math.round((quizAnswers.filter((a, i) => a === correctAnswers[i]).length / total) * 100)
    const data: ModuleProgress = {
      completed: true,
      quizScore: score,
      quizAnswers,
      completedAt: new Date(),
    }
    await setDoc(doc(db, 'progress', user.value.uid, courseId, moduleId), {
      ...data,
      completedAt: serverTimestamp(),
    })
    progress.value = {
      ...progress.value,
      [courseId]: { ...(progress.value[courseId] || {}), [moduleId]: data },
    }
  }

  function getModuleProgress(courseId: string, moduleId: string): ModuleProgress | null {
    return progress.value[courseId]?.[moduleId] ?? null
  }

  function getCourseCompletionPercent(courseId: string, totalModules: number): number {
    if (totalModules === 0) return 0
    const done = Object.values(progress.value[courseId] || {}).filter(m => m.completed).length
    return Math.round((done / totalModules) * 100)
  }

  function getCompletedModulesCount(courseId: string): number {
    return Object.values(progress.value[courseId] || {}).filter(m => m.completed).length
  }

  function getAverageQuizScore(courseId: string): number {
    const mods = Object.values(progress.value[courseId] || {}).filter(m => m.completed)
    if (!mods.length) return 0
    return Math.round(mods.reduce((sum, m) => sum + m.quizScore, 0) / mods.length)
  }

  return {
    user,
    userProfile,
    progress,
    authLoading,
    authInitError,
    loginError,
    isLoggedIn,
    login,
    logout,
    resetPassword,
    loadUserProfile,
    updateUserProfile,
    changePassword,
    loadProgress,
    markModuleComplete,
    getModuleProgress,
    getCourseCompletionPercent,
    getCompletedModulesCount,
    getAverageQuizScore,
  }
})
