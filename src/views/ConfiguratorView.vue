<script setup lang="ts">
import { useColorStore } from '@/stores/useColorStore'

const colorStore = useColorStore()
</script>

<template>
  <main>
    <h1>Configurator</h1>
    <p>Welcome to the Configurator page!</p>
    <n-color-picker  v-model:value="colorStore.color" />
  </main>
</template>
