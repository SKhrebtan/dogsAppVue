<script setup>
import { RouterLink } from 'vue-router'
import BurgerSVG from '../../assets/images/burger.svg?url'
import { useAuthStore } from '../../stores/auth'

const store = useAuthStore()
defineProps({
  isDesktop: {
    required: true,
    type: Boolean
  },
  showMobile: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <header
    :class="{ 'mobile-header': !isDesktop }"
    class="flex flex-row items-center justify-between py-[10px] px-[40px] bg-yellow-200"
  >
    <nav v-if="isDesktop" class="flex gap-8">
      <RouterLink to="/" class="text-2xl" exact-active-class="text-blue-300">Home</RouterLink>
      <RouterLink
        v-if="store.userAuth?.role === 'admin'"
        class="text-2xl"
        to="/dashboard"
        exact-active-class="text-blue-300"
      >
        Dashboard
      </RouterLink>
      <RouterLink to="/mydogs" class="text-2xl" exact-active-class="text-blue-300"
        >My Dogs</RouterLink
      >
      <RouterLink
        v-if="!store.userToken"
        to="/login"
        class="text-2xl"
        exact-active-class="text-blue-300"
        >Login
      </RouterLink>
      <RouterLink
        v-if="!store.userToken"
        to="/register"
        class="text-2xl"
        exact-active-class="text-blue-300"
      >
        Register
      </RouterLink>
    </nav>
    <slot></slot>
    <transition name="fade">
      <button
        v-if="!isDesktop && !showMobile"
        type="button"
        @click="emit('toggle')"
        class="burger-btn"
      >
        <img :src="BurgerSVG" alt="My image" class="burger-svg" />
      </button>
    </transition>
  </header>
</template>

<style scoped>
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

.fade2-enter-active,
.fade2-leave-active {
  transition: opacity 0.5s ease;
}

.fade2-enter-from,
.fade2-leave-to {
  opacity: 0;
}

.mobile-header {
  justify-content: flex-end;
}
</style>
