<script setup lang="ts">
import { useMusicStore } from '@/stores/useMusicStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
import { LibraryMusicRound as LibraryMusicRoundIcon } from '@vicons/material'

import {
  PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon,
  PlaySkipBackCircle as PlaySkipBackCircleIcon,
  PlaySkipForwardCircle as PlaySkipForwardCircleIcon
} from '@vicons/ionicons5'
const musicStore = useMusicStore()
const browserStore = useBrowserStore()
</script>

<template>
  <div style="height: 59px">
    <n-collapse-transition style="display: flex; height: 59px" :show="musicStore.title != ''">
      <div style="padding-right: 5px">
        <n-icon size="53">
          <LibraryMusicRoundIcon />
        </n-icon>
      </div>
      <div>
        <div>
          <n-ellipsis style="max-width: 160px" :tooltip="false">
            <span style="font-size: 20px">{{ musicStore.title }}</span>
          </n-ellipsis>
        </div>
        <n-ellipsis style="max-width: 180px" :tooltip="false">
          <span style="font-size: 12px">{{ musicStore.artist }}</span>
        </n-ellipsis>
      </div>
    </n-collapse-transition>
  </div>

  <div style="width: 100%; height: 60px; text-align: center; margin-top: 25px">
    <n-collapse-transition :show="musicStore.currentLyric != ''">
      <div style="font-size: 15px">
        {{ musicStore.currentLyric }}
      </div>
    </n-collapse-transition>
  </div>

  <div style="display: flex; justify-content: center; margin-bottom: 15px">
    <n-progress
      type="line"
      :percentage="musicStore.percentage"
      :show-indicator="false"
      :color="browserStore.theme.name == 'dark' ? 'white' : 'black'"
    />
  </div>

  <div style="display: flex; justify-content: center">
    <n-button size="large" quaternary circle @click="musicStore.previous()">
      <n-icon size="35"><PlaySkipBackCircleIcon /></n-icon>
    </n-button>

    <n-button
      size="large"
      quaternary
      circle
      @click="musicStore.togglePlayPause"
      style="margin-left: 20px; margin-right: 20px"
    >
      <n-icon size="38" v-if="musicStore.playbackRate == 0"><PlayCircleIcon /></n-icon>
      <n-icon size="38" v-else><PauseCircleIcon /></n-icon>
    </n-button>

    <n-button size="large" quaternary circle @click="musicStore.next()">
      <n-icon size="35"><PlaySkipForwardCircleIcon /></n-icon>
    </n-button>
  </div>
</template>

<style scoped></style>
