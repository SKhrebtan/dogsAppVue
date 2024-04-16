import { defineStore } from 'pinia'
import { getAllDogs, getOneDog, getDogs, getOneMyDog } from './api/axios'
import { ref } from 'vue'
export const useAllDogsStore = defineStore('alldogs', () => {
  const state = ref({
    dogs: [],
    totalPages: 1,
    oneDog: null,
    isLoading: false
  })

  const getAllDogsHomePage = async (page) => {
    state.value.dogs = []
    state.value.isLoading = true
    try {
      const data = await getAllDogs({ pages: page, itemsPerPage: 10 })
      state.value.dogs = data.dogs
      state.value.totalPages = data.totalPages
    } catch (error) {
      console.log(error.message)
    } finally {
      state.value.isLoading = false
    }
  }

  const getOneDogToStore = async (id) => {
    state.value.oneDog = null
    state.value.isLoading = true
    try {
      const data = await getOneDog(id)
      state.value.oneDog = data
    } catch (error) {
      console.log(error.message)
    } finally {
      state.value.isLoading = false
    }
  }

  const getOneMyDogToStore = async (id) => {
    state.value.oneDog = null
    state.value.isLoading = true
    try {
      const data = await getOneMyDog(id)
      state.value.oneDog = data
    } catch (error) {
      console.log(error.message)
    } finally {
      state.value.isLoading = false
    }
  }

  const getAllMyDogs = async () => {
    state.value.dogs = []
    state.value.isLoading = true
    try {
      const data = await getDogs()
      state.value.dogs = data
    } catch (error) {
      console.log(error.message)
    } finally {
      state.value.isLoading = false
    }
  }

  return { state, getAllDogsHomePage, getOneDogToStore, getAllMyDogs, getOneMyDogToStore }
})
