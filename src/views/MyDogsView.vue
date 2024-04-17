<script setup>
import { ref, toRefs, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter.js'
import { useAuthStore } from '@/stores/auth'
import { useAllDogsStore } from '@/stores/dogs'
import defaultPhoto from '../assets/images/pravilnyj-lazy-load.jpg'

const counter = useCounterStore()
const auth = useAuthStore()
const { state, getAllMyDogs, deleteFromMyFavorites } = useAllDogsStore()
const router = useRouter()
const dogs = ref([])
watch(
  () => auth.user,
  (newValue, oldValue) => {
    if (!newValue?.token) {
      router.push({ name: 'login' })
    }
  }
)

onMounted(async () => {
  await getAllMyDogs()
  dogs.value = state.myDogs
})

const deleteDog = async (id) => {
  await deleteFromMyFavorites(id)
  dogs.value = state.myDogs
}
</script>

<template>
  <div class="about">
    <div v-if="state.isLoading">Loading...</div>
    <div v-if="state.myDogs.length === 0 && !state.isLoading">No dogs...</div>

    <ul v-else class="dog-list">
      <li v-for="dog in dogs" :key="dog.id" class="dog-item">
        <RouterLink :to="{ name: 'onedog', params: { id: dog.id }, query: { dog: 'my' } }">
          <img :src="state.isLoading ? defaultPhoto : dog.image" :alt="dog.name" />
          <p>Name: {{ dog.name }}</p>
          <p>Breed: {{ dog.breed }}</p>
        </RouterLink>
        <button type="button" class="delete-btn" @click="deleteDog(dog.id)">Delete</button>
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
  grid-template-columns: repeat(1, 1fr);
  padding: 0;
  list-style: none;
  padding: 0;
}

.dog-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c2c2c2;
  padding: 0;
}
.delete-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: red;
}

.delete-btn:hover {
  background-color: #c82333; /* Зміна фону при наведенні */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Додавання тіні при наведенні */
}
@media (min-width: 768px) {
  .dog-list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}
@media (min-width: 1024px) {
  .dog-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
