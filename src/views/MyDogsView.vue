<script setup>
import { ref, toRefs, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter.js'
import { useAuthStore } from '@/stores/auth'
import { useAllDogsStore } from '@/stores/dogs'

const counter = useCounterStore()
const auth = useAuthStore()
const { state, getAllMyDogs } = useAllDogsStore()
const { count, doubleCount, increment } = toRefs(counter)
const router = useRouter()
const dogs = ref([])
watch(
  () => auth.user,
  (newValue, oldValue) => {
    console.log(newValue)
    if (!newValue?.token) {
      router.push({ name: 'login' })
    }
  }
)

onMounted(async () => {
  await getAllMyDogs()
  dogs.value = state.dogs
})
</script>

<template>
  <!-- <div class="about">
    <h1>This is an about page</h1>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div> -->
  <div class="about">
    <div v-if="state.dogs.length === 0 && !state.isLoading">No dogs...</div>
    <div v-if="state.isLoading">Loading...</div>
    <ul v-else class="dog-list">
      <li v-for="dog in dogs" :key="dog.id" class="dog-item">
        <RouterLink :to="{ name: 'onedog', params: { id: dog.id }, query: { dog: 'my' } }">
          <img :src="dog.image" :alt="dog.name" />
          <p>Name: {{ dog.name }}</p>
          <p>Breed: {{ dog.breed }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style>
.about {
  padding: 20px;
}
.dog-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* П'ять стовпців з однаковою шириною */
  grid-gap: 10px; /* Проміжок між елементами */
  list-style: none;
  padding: 0;
}

.dog-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c2c2c2;
  padding: 10px;
}
@media (min-width: 1024px) {
}
</style>
