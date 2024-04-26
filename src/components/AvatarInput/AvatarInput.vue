<script setup>
import { computed } from 'vue'
const props = defineProps({
  user: {
    type: Object
  },
  isDesktop: {
    type: Boolean
  }
})
const emit = defineEmits(['update', 'signout'])
const uploadAvatar = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.addEventListener('change', async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      emit('update', formData)
    } catch (error) {
      console.error('Помилка при оновленні аватара:', error.message)
    }
  })
  input.click()
}

const styles = computed(() => {
  return props.isDesktop
    ? 'flex flex-row items-center gap-6 absolute top-[10px] right-[100px]'
    : 'flex items-center gap-10 mt-20 flex-col mobileAvatar:flex-row mobileAvatar:justify-between'
})

const imageStyles = computed(() => {
  return props.isDesktop
    ? 'w-10 h-10 rounded-full overflow-hidden'
    : 'w-[200px] h-[200px] overflow-hidden rounded-full'
})

const userNameStyles = computed(() => {
  return props.isDesktop ? 'text-xl text-black' : 'text-3xl text-white'
})
</script>

<template>
  <div :class="styles">
    <p :class="userNameStyles">{{ props.user?.email }}</p>
    <div :class="imageStyles" @click="uploadAvatar">
      <img :src="props.user?.avatar" alt="avatar" />
    </div>
    <button @click="emit('signout')">Logout</button>
  </div>
</template>
