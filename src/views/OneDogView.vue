<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useAllDogsStore } from '@/stores/dogs'

const { state, getOneDogToStore, getOneMyDogToStore } = useAllDogsStore()
const route = useRoute()
const my = route.query.dog

onMounted(async () => {
  const { id } = route.params
  const myDog = route.query.dog
  if (id) {
    if (myDog === 'my') {
      await getOneMyDogToStore(id)
    } else {
      await getOneDogToStore(id)
    }
  }
})
</script>

<template>
  <main class="onedog-page">
    <div v-if="state.oneDog" class="onedog">
      <div class="thumb-onedog">
        <img :src="state.oneDog.image" :alt="state.oneDog.name" />
      </div>

      <div class="info-block">
        <p>Name: {{ state.oneDog.name }}</p>
        <p>Breed: {{ state.oneDog.breed }}</p>

        <RouterLink :to="my === 'my' ? '/mydogs' : '/'" class="back-button">Back</RouterLink>
      </div>
    </div>
    <h1 v-else="state.isLoading">Loading...</h1>
  </main>
</template>

<style>
.thumb-onedog {
  width: 900px;
}
.onedog {
  padding: 20px;
  display: flex;
  gap: 20px;
}
.info-block {
  width: 500px;
}
.back-button {
  background-color: #4caf50; /* Зелений колір */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #104211;
}
</style>
