<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useCardStore } from '@/stores/useCardStore'
import { useHardwareStore } from '@/stores/useHardwareStore'

const browserStore = useBrowserStore()
const hardwareStore = useHardwareStore()
const cardStore = useCardStore()
onMounted(() => {
  cardStore.init()
})
</script>

<template>
  <main class="scroll-container">
    <div
      class="cards-container"
      :style="{ 'scroll-padding-left': browserStore.collapsed ? '12px' : '14px' }"
    >
      <n-card
        v-for="card in cardStore.cards"
        :key="card.name"
        :class="[
          { 'expanded-card-style': !browserStore.collapsed },
          { 'no-border': !card.hasBorder }
        ]"
        :bordered="card.hasBorder"
      >
        <component :is="card.component" />
      </n-card>

      <n-card
        v-show="!hardwareStore.suppportBCMonitor"
        :class="{ 'expanded-card-style': !browserStore.collapsed }"
      >
        Not Support
      </n-card>
    </div>
  </main>
</template>

<style>
.scroll-container {
  width: 100%;
  height: calc(100vh - 80px);

  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.scroll-container ::-webkit-scrollbar {
  display: none; /* 针对WebKit浏览器 */
}

.cards-container {
  padding: 30px 0 0 12px;
  display: flex; /* 使用flex布局使元素横向排列 */
  flex-direction: row; /* 横向排列 */
  align-items: center; /* 垂直居中对齐（根据需要调整） */
  scroll-snap-type: x mandatory; /* 滑动对齐 */
  white-space: nowrap;
  overflow-x: scroll; /* 允许横向滚动 */
  overflow-y: hidden; /* 防止纵向滚动 */
}

.n-card {
  flex: 0 0 auto; /* 避免卡片被拉伸或压缩 */
  width: 255px;
  height: 470px;
  margin-right: 14px; /* 添加间隔 */
  scroll-snap-align: start;
  transition:
    margin 0.1s ease-in-out,
    width 0.2s ease-in-out; /* 添加max-width到过渡效果 */
}


.expanded-card-style {
  width: 320px;
  margin-right: 15px;
  margin-left: 3px;
}

.dynamic-margin {
  transition: margin-right 0.2s ease-in-out; /* 平滑过渡动画 */
}

.no-border {
  background-color: transparent;
}
</style>
