<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

import MobileMenu from './components/MobileMenu/MobileMenu.vue'
import HeaderView from './components/HeaderView/HeaderView.vue'

const router = useRouter()
const isDesktop = ref(true)
const showMobile = ref(false)
const store = useAuthStore()
const toggleNav = () => {
  if (!showMobile.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  showMobile.value = !showMobile.value
}

watch(isDesktop, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    showMobile.value = false
  }
})
onMounted(async () => {
  await store.hydrateFromLocalStorage()
  isDesktop.value = window.innerWidth >= 768

  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 768
  })
})
const signOutUser = () => {
  store.signOut()
  router.replace('/')
}

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024
  })
})</script>

<template>
  <HeaderView :user-token="store.userToken" :user="store.userAuth" :is-desktop="isDesktop"
    @upload-avatar="store.updateUserAvatar" :show-mobile="showMobile" @toggle="toggleNav">
    <MobileMenu @toggle="toggleNav" @signout="signOutUser" :user-token="store.userToken" :show-mobile="showMobile"
      :user="store.userAuth" />
  </HeaderView>
  <RouterView />
</template>