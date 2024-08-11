<script setup lang="ts">
import { useCardStore } from '@/stores/useCardStore'

const cardStore = useCardStore()
cardStore.init()
</script>

<template>
  <main class="grid-scroll-container">
    <div class="grid-container" :style="cardStore.calcGridColWidth()">
      <n-card
        v-for="card in cardStore.cards"
        :key="card.name"
        :style="cardStore.haneleCardStyle(card.type)"
        :bordered="card.hasBorder"
        :class="{ 'no-border': !card.hasBorder }"
      >
        <component :is="card.component" />
      </n-card>
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
  transition: grid-template-columns 0.2s ease-in-out;
}
.grid-scroll-container::-webkit-scrollbar {
  display: none; /* 针对WebKit浏览器 */
}

.n-card {
  transition:
    height 0.2s ease-in-out,
    width 0.2s ease-in-out;
}

.no-border {
  background-color: transparent;
}
</style>
