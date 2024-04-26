<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AvatarInput from './components/AvatarInput/AvatarInput.vue'
import MobileMenu from './components/MobileMenu/MobileMenu.vue'
import HeaderView from './components/HeaderView/HeaderView.vue'
import { useRouter } from 'vue-router'
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
})
</script>

<template>
  <HeaderView :is-desktop="isDesktop" :show-mobile="showMobile" @toggle="toggleNav">
    <AvatarInput
      v-if="isDesktop && store.userToken"
      :is-desktop="isDesktop"
      :user="store.userAuth"
      @update="store.updateUserAvatar"
      @signout="signOutUser"
    />
  </HeaderView>
  <MobileMenu
    @toggle="toggleNav"
    :user-token="store.userToken"
    :show-mobile="showMobile"
    :is-desktop="isDesktop"
    :user="store.userAuth"
    @signout="signOutUser"
  >
    <AvatarInput
      v-if="!isDesktop && store.userToken"
      @toggle="toggleNav"
      :show-mobile="showMobile"
      :is-desktop="isDesktop"
      :user="store.userAuth"
      @update="store.updateUserAvatar"
      @signout="signOutUser"
    />
  </MobileMenu>
  <RouterView />
</template>
