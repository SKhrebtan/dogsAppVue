<template>
  <div>
    <h1>Login Form</h1>
    <button v-if="!user?.token" @click="loginUser">Login</button>
    <button v-if="user?.token" @click="signOutUser">Logout</button>
    <p v-if="user && user.token !== null">Logged in as {{ user.email }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { toRefs } from 'vue'
const store = useAuthStore()

const user = store.userAuth

const loginUser = async () => {
  await store.login({ email: 'stas@mail.ua', password: 'changeme' })
}

const signOutUser = () => {
  store.signOut()
}
</script>
