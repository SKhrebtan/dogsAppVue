<!-- <template>
  <div>
    <h1>Login Form</h1>
    <button v-if="!user?.token" @click="loginUser">Login</button>

    <p v-if="user && user.token !== null">Logged in as {{ user.email }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
const router = useRouter()

const store = useAuthStore()
const user = ref(store.userAuth)
const loginUser = async () => {
  await store.login({ email: 'stas@mail.ua', password: 'changeme' })
  user.value = store.userAuth
  if (store.userAuth && store.userAuth.token) {
    router.push({ name: 'home' })
  }
}
</script> -->

<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
const router = useRouter()

const store = useAuthStore()
const user = ref(store.userAuth)
const email = ref('')
const password = ref('')
const error = ref(null)

const login = async () => {
  try {
    await store.login({ email: email.value, password: password.value })
    user.value = store.userAuth
    if (store.userAuth && store.userAuth.token) {
      if (store.userAuth.role === 'admin') {
        router.push({ name: 'dashboard' })
      } else {
        router.push({ name: 'mydogs' })
      }
    }
  } catch (error) {
    error.value = error.message
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
