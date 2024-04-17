import { defineStore } from 'pinia'
import { watch } from 'vue'
import { signIn, signUp, signOut, getProfile, updateAvatar } from './api/axios'
import { setToken } from './api/axios'
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    avatar: null
  }),
  getters: {
    userAuth: (state) => state.user,
    userToken: (state) => state.token,
    userAvatar: (state) => state.avatar
  },
  actions: {
    async getToken(token) {
      this.user = await getProfile(token)
      // this.avatar = this.user.avatar
      this.token = this.user.token
      setToken(this.user.token)
      this.persistToLocalStorage()
      return this.user
    },
    async login(body) {
      this.user = await signIn(body)
      this.token = this.user.token
      setToken(this.user.token)
      this.persistToLocalStorage()
    },
    async register(body) {
      const { user } = await signUp(body)
      this.user = user
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
      localStorage.setItem('avatar', JSON.stringify(this.avatar))
    },

    async updateUserAvatar(file) {
      const data = await updateAvatar(file)
      this.avatar = data.avatar
      this.user.avatar = data.avatar
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('avatar', JSON.stringify(this.avatar))
    },
    hydrateFromLocalStorage() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const avatar = localStorage.getItem('avatar')
      if (user) {
        this.user = JSON.parse(user)
      }
      if (token) {
        this.token = JSON.parse(token)
        setToken(this.token)
      }
      if (avatar) {
        this.avatar = JSON.parse(avatar)
      }
    }
  },
  created() {
    this.hydrateFromLocalStorage()
  }
})
