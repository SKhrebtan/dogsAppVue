import { defineStore } from 'pinia'
import { watch } from 'vue'
import { signIn, signUp, signOut, getProfile } from './api/axios'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    avatar: null
  }),
  getters: {
    userAuth: (state) => state.user,
    userToken: (state) => state.token
  },
  actions: {
    async getToken(token) {
      this.user = await getProfile(token)
      this.token = this.user.token
      this.persistToLocalStorage()
      return this.user
    },
    async login(body) {
      this.user = await signIn(body)
      this.token = this.user.token
      this.persistToLocalStorage()
    },
    async register(body) {
      this.user = await signUp(body)
      this.persistToLocalStorage()
    },
    signOut() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    persistToLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('token', JSON.stringify(this.token))
    },
    hydrateFromLocalStorage() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (user) {
        this.user = JSON.parse(user)
      }
      if (token) {
        this.token = JSON.parse(token)
      }
    }
  },
  created() {
    this.hydrateFromLocalStorage()
  }
})
