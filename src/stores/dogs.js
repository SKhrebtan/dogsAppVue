import { defineStore } from 'pinia'
import {
  getAllDogs,
  getOneDog,
  getDogs,
  getOneMyDog,
  addToMyDogs,
  deleteFromMyDogs,
  addDogToAllList,
  deleteFromAllDogs
} from './api/axios'
import { ref, computed } from 'vue'
export const useAllDogsStore = defineStore('alldogs', () => {
  const state = ref({
    dogs: [],
    totalPages: 1,
    oneDog: null,
    isLoading: false,
    myDogs: []
  })

  const getAllDogsHomePage = async (page) => {
    state.value.dogs = []
    state.value.isLoading = true
    try {
      const data = await getAllDogs({ pages: page, itemsPerPage: 12 })
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
    state.value.myDogs = []
    state.value.isLoading = true
    try {
      const data = await getDogs()
      state.value.myDogs = data
    } catch (error) {
      console.log(error.message)
    } finally {
      state.value.isLoading = false
    }
  }

  const addToFavorites = async (dog) => {
    try {
      const data = await addToMyDogs(dog)
      let dogs
      if (data) {
        dogs = await getDogs()
      }
      state.value.myDogs = dogs
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteFromMyFavorites = async (id) => {
    try {
      const data = await deleteFromAllDogs(id)
      let dogs
      if (data) {
        dogs = await getDogs()
      }
      state.value.myDogs = dogs
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteFromAll = async (id, page) => {
    try {
      const data = await deleteFromAllDogs(id)
      if (data) {
        const updatedDogs = state.value.dogs.filter((dog) => dog.id !== id)
        state.value.dogs = updatedDogs
      }
      return state.value.dogs
    } catch (error) {
      console.log(error.message)
    }
  }

  const addDogFromDashboard = async (body) => {
    try {
      const data = await addDogToAllList(body)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    state,
    getAllDogsHomePage,
    getOneDogToStore,
    getAllMyDogs,
    getOneMyDogToStore,
    addToFavorites,
    deleteFromMyFavorites,
    addDogFromDashboard,
    deleteFromAll
  }
})
