<script setup>
import { useAllDogsStore } from '@/stores/dogs'
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
const { state, getAllDogsHomePage } = useAllDogsStore()
const dogs = ref([])
const totalPages = ref(0)
const page = ref(1)

onMounted(async () => {
  await getAllDogsHomePage(page.value)
  dogs.value = state.dogs
  totalPages.value = state.totalPages
})
watch(page, async (newValue, oldValue) => {
  await getAllDogsHomePage(newValue)
  dogs.value = state.dogs
})
const handlePage = (page_num) => {
  page.value = page_num
}
</script>

<template>
  <main class="home-page">
    <div v-if="dogs.length === 0">Loading...</div>
    <ul v-else class="dog-list">
      <li v-for="dog in dogs" :key="dog.id" class="dog-item">
        <RouterLink :to="'/onedog/' + dog.id">
          <img :src="dog.image" :alt="dog.name" />
          <p>Name: {{ dog.name }}</p>
          <p>Breed: {{ dog.breed }}</p>
        </RouterLink>
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
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
