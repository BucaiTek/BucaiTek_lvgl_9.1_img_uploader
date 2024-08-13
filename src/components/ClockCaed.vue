<script setup lang="ts">
const deg = 6
const hour = ref<HTMLElement | null>(null)
const min = ref<HTMLElement | null>(null)
const sec = ref<HTMLElement | null>(null)
onMounted(() => {
  setClock()
  setInterval(setClock, 1000)
})
const setClock = () => {
  let day = new Date()
  let hh = day.getHours() * 30
  let mm = day.getMinutes() * deg
  let ss = day.getSeconds() * deg

  if (hour.value && min.value && sec.value) {
    hour.value.style.transform = `rotateZ(${hh + mm / 12}deg)`
    min.value.style.transform = `rotateZ(${mm}deg)`
    sec.value.style.transform = `rotateZ(${ss}deg)`
  }
}
</script>

<template>
  <div class="clock-container">
    <div class="clock">
      <div class="hour" ref="hour"></div>
      <div class="min" ref="min"></div>
      <div class="sec" ref="sec"></div>
    </div>
  </div>
</template>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8); /* 缩小到原始大小的50% */
  transform-origin: center; /* 确保缩放以时钟的中心为中心 */

  height: 198px;
  width: 100%;
}
.clock {
  position: relative; /* 设置为相对定位 */
  width: 18em;
  height: 18em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);
  background-image: url('http://codingstella.com/wp-content/uploads/2024/01/download-3.png');
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  border: 4px solid var(--main-bg-color);
  box-shadow:
    0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.3),
    inset 0 15px 15px rgba(0, 0, 0, 0.3);
}
.clock:before {
  content: '';
  height: 0.75rem;
  width: 0.75rem;
  background-color: var(--main-text-color);
  border: 2px solid var(--main-bg-color);
  position: absolute;
  border-radius: 50%;
  z-index: 1000;
  transition: all ease 0.2s;
}
.hour,
.min,
.sec {
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 50%;
}
.hour {
  height: 10em;
  width: 10em;
}
.hour:before {
  content: '';
  position: absolute;
  height: 50%;
  width: 6px;
  background-color: var(--main-text-color);
  border-radius: 6px;
}
.min {
  height: 12em;
  width: 12em;
}
.min:before {
  content: '';
  height: 50%;
  width: 4px;
  background-color: var(--main-text-color);
  border-radius: 4px;
}
.sec {
  height: 13em;
  width: 13em;
}
.sec:before {
  content: '';
  height: 60%;
  width: 2px;
  background-color: #f00;
  border-radius: 2px;
}
</style>
