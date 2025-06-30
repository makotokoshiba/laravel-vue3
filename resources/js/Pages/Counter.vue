<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Pinia カウンター</h2>
    <p>現在のカウント: {{ counter.count }}</p>
    <v-btn @click="counter.increment" color="primary" class="mt-2">+1</v-btn>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>
