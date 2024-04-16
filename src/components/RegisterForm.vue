<template>
  <div>
    <h1>Реєстрація</h1>
    <form @submit.prevent="registerUser">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Зареєструватися</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useAuthStore()
const user = ref(store.userAuth)
const email = ref('')
const password = ref('')

const registerUser = async () => {
  try {
    await store.register({ email: email.value, password: password.value })
    console.log(store.userAuth)
    user.value = store.userAuth
    if (store.userAuth) {
      router.push({ name: 'login' })
    }
  } catch (error) {
    console.error('Помилка реєстрації', error.response.data)
  }
}
</script>
