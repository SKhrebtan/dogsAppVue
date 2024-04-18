<template>
  <main class="dashboard-page">
    <h1>Create a Dog</h1>
    <form @submit.prevent="handleSubmit" class="dog-form" enctype="multipart/form-data">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required /><br />

      <label for="breed">Breed:</label>
      <input type="text" id="breed" v-model="breed" required /><br />

      <label for="photo">Photo:</label>
      <input type="file" id="photo" @change="handleFileChange" accept="image/*" required /><br />

      <button type="submit">Create</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAllDogsStore } from '@/stores/dogs'
const { addDogFromDashboard } = useAllDogsStore()
let name = ref('')
let breed = ref('')
let file = null

const handleFileChange = (e) => {
  file = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('breed', breed.value)
  formData.append('file', file)
  await addDogFromDashboard(formData)
}
</script>

<style>
.dashboard-page {
  padding: 20px;
}

.dog-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
