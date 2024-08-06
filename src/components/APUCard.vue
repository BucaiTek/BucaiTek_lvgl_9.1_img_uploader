<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
const browserStore = useBrowserStore()
</script>

<template>
  <n-card :class="{ 'expanded-card-style': !browserStore.collapsed }"> 123123 </n-card>
  <n-card :class="{ 'expanded-card-style': !browserStore.collapsed }"> 123123 </n-card>
</template>

<style scoped>
.n-card {
  margin: -20px 0 30px -25px;
  width: 255px;
  height: 230px;
}
.expanded-card-style {
  width: 320px;
}
</style>
