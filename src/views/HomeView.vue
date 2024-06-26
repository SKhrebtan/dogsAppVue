<script setup>
import { useAllDogsStore } from '@/stores/dogs'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import defaultPhoto from '../assets/images/pravilnyj-lazy-load.jpg'
import CloseSVG from '../assets/images/close.svg?url'
const {
  state,
  getAllDogsHomePage,
  getAllMyDogs,
  addToFavorites,
  deleteFromMyFavorites,
  deleteFromAll
} = useAllDogsStore()
const authState = useAuthStore()
const dogs = ref([...state.dogs])
const totalPages = ref(0)
const page = ref(JSON.parse(localStorage.getItem('page_num')) || 1)

onMounted(async () => {
  await getAllDogsHomePage(page.value)
  const token = await JSON.parse(localStorage.getItem('token'))
  if (!token) return;
  await getAllMyDogs()
  
  dogs.value = state.dogs
  totalPages.value = state.totalPages
})
watch(page, async (newValue) => {
  await getAllDogsHomePage(newValue)
  dogs.value = state.dogs
})

watch(
  () => state.dogs,
  (newDogs) => {
    dogs.value = newDogs
  }
)
watch(
  () => state.totalPages,
  (newTotalPages) => {
    totalPages.value = newTotalPages
  }
)

const handlePage = (page_num) => {
  page.value = page_num
  localStorage.setItem('page_num', JSON.stringify(page_num))
}

const isDogInMyDogs = (dog) => {
  return state.myDogs.some((myDog) => myDog.name === dog.name)
}

const isDogInMyDogsId = (dog) => {
  return state.myDogs.find((myDog) => myDog.name === dog.name).id
}

const deleteDog = async (id) => {
  await deleteFromMyFavorites(id)
}

const addDogToFavorites = async (dog) => {
  const dogData = {
    name: dog.name,
    breed: dog.breed,
    image: dog.image
  }
  await addToFavorites(dogData)
}
</script>

<template>
  <main class="home-page">
    <div v-if="state.isLoading && state.dogs.length === 0">Loading...</div>
    <div v-if="state.dogs.length === 0 && !state.isLoading">No dogs...</div>

    <ul class="dog-list">
      <li v-for="dog in dogs" :key="dog.id" class="dog-item">
        <RouterLink :to="'/onedog/' + dog.id">
          <div class="thumb-img">
            <img
              :src="dog.image"
              :alt="dog.name"
              v-if="dog.image && !state.isLoading"
              class="dog-image"
            />
            <img :src="defaultPhoto" :alt="dog.name" v-else class="dog-image" />
          </div>

          <p>Name: {{ dog.name }}</p>
          <p>Breed: {{ dog.breed }}</p>
        </RouterLink>
        <button
          type="button"
          v-if="authState?.userAuth?.role === 'admin'"
          class="delete-btn-from-all"
          @click="
            async () => {
              const data = await deleteFromAll(dog.id, page)
              if (data.length === 0) {
                page = page - 1
              }
            }
          "
        >
          <img :src="CloseSVG" alt="My image" class="close-svg" />
        </button>
        <svg
          v-if="authState.userToken"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 471.701 471.701"
          height="40px"
          width="40px"
          class="heart-svg"
          @click="isDogInMyDogs(dog) ? deleteDog(isDogInMyDogsId(dog)) : addDogToFavorites(dog)"
        >
          <path
            :fill="isDogInMyDogs(dog) ? 'red' : 'currentColor'"
            d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z"
          />
        </svg>
      </li>
    </ul>
    <paginate
      v-if="dogs.length > 0"
      v-model="page"
      :page-count="totalPages"
      :click-handler="handlePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'paginate'"
    >
    </paginate>
  </main>
</template>

<style>
.delete-btn-from-all {
  position: absolute;
  bottom: 10px;
  right: 50px;
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  transition: all 300ms linear;
}
.close-svg {
  transition: all 300ms linear;
}
.delete-btn-from-all:hover > img {
  transform: rotate(180deg);
}
.heart-svg {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 300ms linear;
}
.heart-svg:hover {
  transform: scale(1.2); 
}
.dog-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
}
.thumb-img {
  height: 240px;
  width: 100%;
}
.dog-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.dog-item {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c2c2c2;
  padding: 0;
}

.dog-item > a {
  width: 100%;
}
@media (min-width: 480px) {
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

.paginate {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.paginate li a {
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #333;
}
.paginate .page-item > .page-link {
  cursor: pointer;
}
.paginate .page-item.disabled > .page-link {
  cursor: not-allowed;
  background-color: gray;
}
.paginate .page-item.active > .page-link {
  cursor: default;
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
.paginate li a.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.home-page {
  padding: 20px;
}

</style>
