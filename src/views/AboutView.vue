<script setup>
import { toRefs } from 'vue'
import { useCounterStore } from '../stores/counter.js'
const counter = useCounterStore()
const { count, doubleCount, increment } = toRefs(counter)
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style>
.about {
  padding: 20px;
}
@media (min-width: 1024px) {
}
</style>
