import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      viteOptimizeDeps: true,
      dts: true
    }),
    electron({
      main: {
        entry: 'electron/index.ts'
      },
      preload: {
        input: 'electron/preload.ts'
      },
      renderer: {}
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
