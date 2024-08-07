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
  grid-template-columns: repeat(3, 330px); /* 简化列定义 */
  grid-template-rows: repeat(2, 250px); /* 简化行定义 */
  gap: 0px 10px;

  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  scroll-snap-type: x mandatory; /* 滑动对齐 */
  overflow-x: scroll; /* 允许横向滚动 */
  overflow-y: hidden; /* 防止纵向滚动 */
  scroll-padding-left: 10px;
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.grid-scroll-container::-webkit-scrollbar {
  display: none; /* 针对WebKit浏览器 */
}

.one-by-one {
  width: 330px;
  height: 240px;
  grid-column: span 1;
  grid-row: span 1;
}

.one-by-two {
  width: 330px;
  height: 490px; /* 调整为两倍高度 */
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
