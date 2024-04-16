import { defineStore } from 'pinia'
import { getAllDogs, getOneDog, getDogs, getOneMyDog } from './api/axios'
import { ref } from 'vue'
export const useAllDogsStore = defineStore('alldogs', () => {
  const state = ref({
    dogs: [],
    totalPages: 1,
    oneDog: null
  })

  const getAllDogsHomePage = async (page) => {
    const data = await getAllDogs({ pages: page, itemsPerPage: 10 })
    state.value.dogs = data.dogs
    state.value.totalPages = data.totalPages
  }

  const getOneDogToStore = async (id) => {
    const data = await getOneDog(id)
    state.value.oneDog = data
  }

  const getOneMyDogToStore = async (id) => {
    const data = await getOneMyDog(id)
    state.value.oneDog = data
  }

  const getAllMyDogs = async () => {
    const data = await getDogs()
    state.value.dogs = data
  }

  return { state, getAllDogsHomePage, getOneDogToStore, getAllMyDogs, getOneMyDogToStore }
})
