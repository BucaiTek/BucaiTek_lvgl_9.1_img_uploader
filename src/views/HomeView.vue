<script setup lang="ts"></script>

<template>
  <div class="home">
    <h1 class="rgb">BucaiTek</h1>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 54px);
  text-align: center;
  margin-top: -54px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
h1 {
  position: relative;
  z-index: 2;
  font-size: 50px;
}

.rgb {
  background: linear-gradient(to right, red, green, blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue 4s linear infinite;
}
@keyframes hue {
  0% {
    filter: hue-rotate(360deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
</style>
