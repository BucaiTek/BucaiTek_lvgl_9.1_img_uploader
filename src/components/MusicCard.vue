<script setup lang="ts">
import { useMusicStore } from '@/stores/useMusicStore'
import { useTimeStore } from '@/stores/useTimeStore'
const musicStore = useMusicStore()
const timeStore = useTimeStore()

</script>

<template>
  <div>专辑: {{ musicStore.album }}</div>
  <div>歌曲: {{ musicStore.title }}</div>
  <div>歌手: {{ musicStore.artist }}</div>
  <div>{{ musicStore.currentLyric }}</div>
</template>

<style scoped></style>
