<script setup>
import { RouterLink } from 'vue-router'
import BurgerSVG from '../../assets/images/burger.svg?url'

defineProps({
    userToken: {
        required: true,
        type: [String, null]
    },
    user: {
        required: true,
        type: [Object, null]
    },
    isDesktop: {
        required: true,
        type: Boolean
    },
    showMobile: {
        required: true,
        type: Boolean
    }
})

const emit = defineEmits(['uploadAvatar' ,'toggle'])
const uploadAvatar = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.addEventListener('change', async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        try {
            emit('uploadAvatar', formData)
            // await store.updateUserAvatar(formData)
        } catch (error) {
            console.error('Помилка при оновленні аватара:', error.message)
        }
    })
    input.click()
}
</script>

<template>
    <header :class="{ 'mobile-header': !isDesktop }"
        class="flex flex-row items-center justify-between py-[10px] px-[40px] bg-yellow-200">
        <nav v-if="isDesktop" class="flex gap-8">
            <RouterLink to="/" class="text-2xl" exact-active-class="text-3xl text-blue-300">Home</RouterLink>
            <RouterLink v-if="user?.role === 'admin'" class="text-2xl" to="/dashboard"
                exact-active-class="text-3xl text-blue-300">
                Dashboard
            </RouterLink>
            <RouterLink to="/mydogs" class="text-2xl" exact-active-class="text-3xl text-blue-300">My Dogs</RouterLink>
            <RouterLink v-if="!userToken" to="/login" class="text-2xl" exact-active-class="text-3xl text-blue-300">Login
            </RouterLink>
            <RouterLink v-if="!userToken" to="/register" class="text-2xl" exact-active-class="text-3xl text-blue-300">
                Register
            </RouterLink>
        </nav>
        <transition name="fade2">
            <div v-if="userToken && isDesktop"
                class="flex flex-row items-center gap-6 absolute top-[10px] right-[100px]">
                <p>{{ user?.email }}</p>
                <div class="w-10 h-10 rounded-full overflow-hidden" @click="uploadAvatar">
                    <img :src="user?.avatar" alt="avatar" />
                </div>
                <button @click="signOutUser">Logout</button>
            </div>
            </transition>

            <transition name="fade">
                <button v-if="!isDesktop && !showMobile" type="button" @click="emit('toggle')" class="burger-btn">
                    <img :src="BurgerSVG" alt="My image" class="burger-svg" />
                </button>
            </transition>
            <slot></slot>
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
    transition:
        opacity 0.5s ease,
}

.fade2-enter-from,
.fade2-leave-to {
    opacity: 0;
}

.mobile-header {
    justify-content: flex-end;
}
</style>
