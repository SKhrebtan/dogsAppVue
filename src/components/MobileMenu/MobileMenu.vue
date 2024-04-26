<script setup>
import { RouterLink } from 'vue-router'
import CloseSVG from '../../assets/images/close.svg?url'
defineProps({
    showMobile: {
        required: true,
    type: Boolean
    },
    userToken: {
        required: true,
        type: [String, null]
    },
    user: {
        type:Object
    }
})

const emit = defineEmits(['toggle','close', 'signout'])
</script>

<template>
    <transition name="fade">
        <div v-if="showMobile" class="fixed top-0 right-0 z-50 bg-zinc-500 w-full h-full p-10">
            <nav class="flex flex-col gap-4">
                <RouterLink class="text-3xl text-gray-50" @click="emit('toggle')" to="/"
                    exact-active-class="text-primary">Home
                </RouterLink>
                <RouterLink class="text-3xl text-gray-50" @click="emit('toggle')" to="/mydogs"
                    exact-active-class="text-primary">My
                    Dogs</RouterLink>
                <RouterLink v-if="!userToken" class="text-3xl text-white" to="/login" exact-active-class="text-red-500">
                    Login
                </RouterLink>
                <RouterLink v-if="!userToken" class="text-3xl text-white" to="/register"
                    exact-active-class="text-red-500">Register
                </RouterLink>
            </nav>
            <div v-if="userToken"
                class="flex items-center gap-10 mt-20 flex-col mobileAvatar:flex-row mobileAvatar:justify-between">
                <p class="text-2xl text-white">{{ user.email }}</p>
                <div class="w-[200px] h-[200px] overflow-hidden rounded-full">
                    <img :src="user.avatar" alt="avatar" />
                </div>
                <button @click="emit('signout')" class="">Logout</button>
            </div>
            <button type="button" @click="emit('toggle')" class="w-14 h-14 bg-transparent absolute top-10 right-10">
                <img :src="CloseSVG" alt="My image" class="" />
            </button>
        </div>
    </transition>
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
</style>