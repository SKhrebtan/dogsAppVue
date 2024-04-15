<script setup>
// import { onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
// import { useAuthStore } from '../stores/auth'
// const store = useAuthStore()
// onMounted(async () => {
//   await store.hydrateFromLocalStorage()
//   console.log(store.userToken)
//   const data = await store.getToken(store.userToken)
//   console.log(data)
// })
</script>

<template>
  <main class="home-page">
    <TheWelcome />
  </main>
</template>

<style>
.home-page {
  padding: 20px;
}
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
