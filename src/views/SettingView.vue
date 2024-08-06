<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'

const browserStore = useBrowserStore()
</script>

<template>
  <main class="grid-scroll-container">
    <div class="grid-container">
      <n-card class="n-card one-by-two">1x2</n-card>
      <n-card class="n-card one-by-one">1x1</n-card>
      <n-card class="n-card one-by-one">1x1</n-card>
      <n-card class="n-card one-by-one">1x1</n-card>
      <n-card class="n-card two-by-two">2x2</n-card>
      <n-card class="n-card two-by-one">2x1</n-card>
      <n-card class="n-card one-by-one">1x1</n-card>
    </div>
  </main>
</template>

<style scoped>
.grid-scroll-container {
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: auto; /* 允许横向滚动 */
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.grid-scroll-container::-webkit-scrollbar {
  display: none; /* 针对WebKit浏览器 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 100px); /* 简化列定义 */
  grid-template-rows: repeat(2, 100px); /* 简化行定义 */
  gap: 10px;
  padding: 10px;
}

.one-by-one {
  width: 100px;
  height: 100px;
  grid-column: span 1;
  grid-row: span 1;
}

.one-by-two {
  width: 100px;
  height: 200px; /* 调整为两倍高度 */
  grid-column: span 1;
  grid-row: span 2;
}

.two-by-one {
  width: 200px; /* 调整为两倍宽度 */
  height: 100px;
  grid-column: span 2;
  grid-row: span 1;
}

.two-by-two {
  width: 200px; /* 调整为两倍宽度 */
  height: 200px; /* 调整为两倍高度 */
  grid-column: span 2;
  grid-row: span 2;
}
</style>
