<script setup lang="ts"></script>

<template>
  <div class="home">
    <n-card title="卡片"> 卡片内容 </n-card>
    <n-card title="卡片"> 卡片内容 </n-card>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: flex-start;
  min-height: calc(100vh - 100px);
  padding: 10px 15px;
}
.n-card {
  max-width: 300px;
  margin: 10px 10px;
  min-height: 500px;
}
</style>
