<template>
  <vue-monaco-editor
    style="height: 100px"
    language="python"
    value="def say_hello():
    print('Hello Naive UI')
"
    :theme="browserStore.theme.name == 'dark' ? 'vs-dark' : 'vs-light'"
  />
</template>

<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
const browserStore = useBrowserStore()
</script>
