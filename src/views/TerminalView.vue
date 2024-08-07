<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
import { Play as PlayIcon, Stop as StopIcon } from '@vicons/ionicons5'
const browserStore = useBrowserStore()
const pythonState = ref(false)
const runPython = () => {
  pythonState.value = !pythonState.value
}
</script>

<template>
  <n-button quaternary circle @click="runPython">
    <template #icon>
      <n-icon v-if="!pythonState"><PlayIcon /></n-icon>
      <n-icon v-else><StopIcon /></n-icon>
    </template>
  </n-button>
  <vue-monaco-editor
    style="height: 100px"
    language="python"
    value="def say_hello():
    print('Hello Naive UI')
"
    :theme="browserStore.theme.name == 'dark' ? 'vs-dark' : 'vs-light'"
  />
</template>
