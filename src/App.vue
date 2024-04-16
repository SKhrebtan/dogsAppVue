<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, watchEffect } from 'vue'
import { useAuthStore } from './stores/auth'
import { setToken } from './stores/api/axios'
const store = useAuthStore()
onMounted(async () => {
  await store.hydrateFromLocalStorage()
  const data = await store.getToken(store.userToken)

  await setToken(data.token)
})
// watchEffect(() => {
//   console.log(store.userAuth)
// })
const signOutUser = () => {
  store.signOut()
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/mydogs">My Dogs</RouterLink>
      <RouterLink v-if="!store.userToken" to="/login">Login</RouterLink>
      <RouterLink v-if="!store.userToken" to="/register">Register</RouterLink>
    </nav>
    <div v-if="store.userToken" class="user-div">
      <p>{{ store.userAuth.email }}</p>
      <div class="thumb">
        <img :src="store.userAuth.avatar" alt="avatar" />
      </div>
      <button @click="signOutUser">Logout</button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: blanchedalmond;
}

nav {
  width: 100%;
  font-size: 14px;
}

nav a {
  color: var(--color-text);
}

a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-div {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

/* @media (min-width: 1024px) {

} */
</style>
