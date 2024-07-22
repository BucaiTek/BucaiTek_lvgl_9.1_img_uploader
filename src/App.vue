<script setup lang="ts">
import { useHidStore } from '@/stores/useHidStore'
import { useColorStore } from '@/stores/useColorStore'
import { darkTheme, lightTheme } from 'naive-ui'
import {
  BrightnessHigh24Filled as BrightnessHigh24FilledIcon,
  DarkTheme20Filled as DarkTheme24FilledIcon
} from '@vicons/fluent'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const hidStore = useHidStore()
const colorStore = useColorStore()
const router = useRouter()

let intervalId = 0

onMounted(() => {
  intervalId = colorStore.cycleColors()
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const themeRef = ref(lightTheme)
const themeOverrides = computed(() => {
  return {
    common: {
      primaryColor: colorStore.color,
      secondaryColor: colorStore.color,
      primaryColorHover: colorStore.color,
      primaryColorPressed: colorStore.color,
      primaryColorSuppl: colorStore.color
    }
  }
})

const changeTheme = () => {
  console.log(themeRef.value)
  if (themeRef.value.name === 'dark') {
    themeRef.value = lightTheme
  } else {
    themeRef.value = darkTheme
  }
}

if ('hid' in navigator) {
  hidStore.support = true
  navigator.hid.onconnect = (event: any) => {
    console.log('HID connected: ', event.device)
  }
  navigator.hid.ondisconnect = (event: any) => {
    console.log(
      `HID disconnected:\n${event.device.productName}\nPID ${event.device.productId} VID ${event.device.vendorId}\n\n`
    )
    if (
      event.device.productId === hidStore.device?.productId &&
      event.device.vendorId === hidStore.device?.vendorId
    ) {
      router.push({ name: 'home' })
      hidStore.device = null
    }
  }
} else {
  hidStore.support = false
}

const menuValue = ref('home')
const menuOptions = computed(() => [
  {
    label: t('nav_lable.home'),
    key: 'home',
    onClick: () => {
      router.push({ name: 'home' })
      menuValue.value = 'home'
    }
  },
  {
    label: t('nav_lable.configurator'),
    key: 'configurator',
    onClick: () => {
      router.push({ name: 'configurator' })
      menuValue.value = 'configurator'
    }
  }
])
const dropdownOptions = computed(() => {
  try {
    if (hidStore.device) {
      console.log('hidStore.device: ', hidStore.device)
    }
    return [
      {
        label: t('connection.disconnect'),
        key: 'disconnect'
      }
    ]
  } catch (error) {
    return []
  }
})

const handleDropdownSelect = (key: string) => {
  if (key === 'disconnect') {
    hidStore.closeDevice()
    menuValue.value = 'home'
    router.push({ name: 'home' })
  }
}

const handleConectionStateButtonClick = async () => {
  try {
    if (!hidStore.device) {
      await hidStore.requestDevice()
    }
    if (hidStore.device) {
      menuValue.value = 'configurator'
      router.push({ name: 'configurator' })
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}

const getConnecttionState = computed(() => {
  if (hidStore.device) {
    return t('connection.connected')
  } else {
    return t('connection.notConnected')
  }
})
</script>

<template>
  <n-config-provider :theme="themeRef" :theme-overrides="themeOverrides">
    <n-layout-header bordered class="nav">
      <n-text tag="div" class="ui-logo" :depth="1">
        <div class="ui-logo">
          <svg
            width="65"
            height="106"
            viewBox="0 0 65 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 3L3 103" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
            <path
              d="M61.4243 83.5802C58.7066 89.9843 53.841 95.2403 47.6653 98.443C41.4895 101.646 34.3903 102.595 27.5901 101.127C20.79 99.6586 14.7146 95.8652 10.4103 90.3998C6.10593 84.9345 3.84207 78.1393 4.00858 71.1844C4.17508 64.2296 6.76151 57.5505 11.3224 52.2974C15.8834 47.0443 22.1333 43.546 28.9959 42.405C35.8585 41.2639 42.9043 42.5516 48.9197 46.0462C54.935 49.5408 59.5436 55.0236 61.9517 61.5504"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <span>BucaiTek</span>
      </n-text>
      <div>
        <div class="nav-menu">
          <n-menu
            ref="menuInstRef"
            responsive
            mode="horizontal"
            :value="menuValue"
            :options="menuOptions"
          />
        </div>
      </div>
      <div class="nav-end">
        <n-dropdown
          :disabled="hidStore.device === null"
          :options="dropdownOptions"
          @select="handleDropdownSelect"
        >
          <n-button
            :disabled="!hidStore.support"
            size="small"
            quaternary
            class="nav-picker"
            @click="handleConectionStateButtonClick"
          >
            {{ getConnecttionState }}
          </n-button></n-dropdown
        >
        <n-divider vertical />
        <n-button quaternary circle class="nav-picker padded" @click="changeTheme">
          <template #icon>
            <n-icon v-if="themeRef.name != 'dark'">
              <BrightnessHigh24FilledIcon />
            </n-icon>
            <n-icon v-else>
              <DarkTheme24FilledIcon />
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-layout-header>
    <n-layout style="height: calc(100vh - 54px)">
      <n-layout-content content-style="padding: 12px 0 24px 0">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 28px;
  height: 54px;
}

.nav-menu {
  padding-left: 36px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 1;
}

.nav-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ui-logo {
  user-select: none;
  display: flex;
  align-items: center;
  font-size: 18px;
}
.ui-logo > div {
  margin-right: 15px;
  margin-bottom: 4px;
  height: 20px;
  width: 20px;
}
</style>
