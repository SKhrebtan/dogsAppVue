<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { setToken } from './stores/api/axios'
import BurgerSVG from './assets/images/burger.svg?url'
import CloseSVG from './assets/images/close.svg?url'
const isDesktop = ref(true)
const showMobile = ref(false)
console.log(isDesktop)
const store = useAuthStore()
const toggleNav = () => {
  showMobile.value = !showMobile.value
}
onMounted(async () => {
  await store.hydrateFromLocalStorage()
  const data = await store.getToken(store.userToken)

  await setToken(data.token)
  isDesktop.value = window.innerWidth >= 1024
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024
  })
})
// watchEffect(() => {
//   console.log(store.userAuth)
// })
const signOutUser = () => {
  store.signOut()
}

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024
  })
})
</script>

<template>
  <header :class="{ 'mobile-header': !isDesktop }">
    <nav v-if="isDesktop">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/mydogs">My Dogs</RouterLink>
      <RouterLink v-if="!store.userToken" to="/login">Login</RouterLink>
      <RouterLink v-if="!store.userToken" to="/register">Register</RouterLink>
    </nav>
    <div v-if="store.userToken && isDesktop" class="user-div">
      <p>{{ store.userAuth.email }}</p>
      <div class="thumb">
        <img :src="store.userAuth.avatar" alt="avatar" />
      </div>
      <button @click="signOutUser">Logout</button>
    </div>
    <button v-else type="button" @click="toggleNav" class="burger-btn">
      <img :src="BurgerSVG" alt="My image" class="burger-svg" />
    </button>
    <transition name="fade">
      <div v-if="showMobile" class="mobile-menu">
        <nav class="mobile-nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/mydogs">My Dogs</RouterLink>
          <RouterLink v-if="!store.userToken" to="/login">Login</RouterLink>
          <RouterLink v-if="!store.userToken" to="/register">Register</RouterLink>
        </nav>
        <div v-if="store.userToken" class="mobile-user-div">
          <p>{{ store.userAuth.email }}</p>
          <div class="thumb">
            <img :src="store.userAuth.avatar" alt="avatar" />
          </div>
          <button @click="signOutUser">Logout</button>
        </div>
        <button type="button" @click="toggleNav" class="close-btn">
          <img :src="CloseSVG" alt="My image" class="close-svg" />
        </button>
      </div>
    </transition>
  </header>

  <RouterView />
</template>

<style scoped>
.burger-btn {
  align-self: flex-end;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: aqua;
}
.burger-svg {
  width: 20px;
  height: 20px;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: blanchedalmond;
}
.mobile-header {
  justify-content: flex-end;
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
