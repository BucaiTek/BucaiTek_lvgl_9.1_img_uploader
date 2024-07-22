<script setup lang="ts">
import { useHidStore } from '@/stores/useHidStore'
import { useColorStore } from '@/stores/useColorStore'
import { darkTheme, lightTheme } from 'naive-ui'
import {
  BrightnessHigh32Filled as BrightnessHigh32FilledIcon,
  BrightnessHigh32Regular as BrightnessHigh32RegularIcon
} from '@vicons/fluent'

import {
  HomeOutline as HomeOutlineIcon,
  LaptopOutline as LaptopOutlineIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const hidStore = useHidStore()
const colorStore = useColorStore()
const router = useRouter()

onMounted(() => {
  colorStore.cycleColors()
})

onUnmounted(() => {
  colorStore.stopCycle()
})

const themeRef = ref(
  window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme
)

const themeOverrides = computed(() => {
  return {
    common: {
      fontWeightStrong: '600',
      primaryColor: colorStore.color,
      secondaryColor: colorStore.color,
      primaryColorHover: colorStore.color,
      primaryColorPressed: colorStore.color,
      primaryColorSuppl: colorStore.color
    },
    Layout: {
      headerColor: null,
      siderColor: null
    },
    Menu: {
      itemColorActive: null,
      itemColorActiveHover: null,
      itemColorActiveCollapsed: null
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

const collapsed = ref(false)
const menuValue = ref('home')
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = computed(() => [
  {
    label: t('nav_lable.home'),
    key: 'home',
    icon: renderIcon(HomeOutlineIcon),
    onClick: () => {
      router.push({ name: 'home' })
      menuValue.value = 'home'
    }
  },
  {
    label: t('nav_lable.configurator'),
    key: 'configurator',
    icon: renderIcon(LaptopOutlineIcon),
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
    <n-layout has-sider>
      <n-layout-sider
        content-style="padding: 15px;"
        bordered
        collapse-mode="width"
        :collapsed-width="88"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        trigger-style="top: 84px;"
        collapsed-trigger-style="top: 84px;"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-text tag="div" class="ui-logo" :depth="1">
          <n-icon size="65" style="margin-right: 8px; margin-bottom: 10px">
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
          </n-icon>
          <span class="rgb" style="font-size: 35px">BucaiTek</span>
        </n-text>
        <div>
          <n-menu
            :value="menuValue"
            :collapsed="collapsed"
            :collapsed-width="58"
            :collapsed-icon-size="31"
            :icon-size="30"
            :options="menuOptions"
          />
        </div>
      </n-layout-sider>
      <n-layout style="height: 100vh">
        <n-layout-header class="nav">
          <div>
            <h1 style="font-size: 30px; margin: 10px 0 0 20px">
              {{ t('nav_lable.' + menuValue) }}
            </h1>
          </div>
          <div class="nav-end">
            <n-dropdown
              :disabled="hidStore.device === null"
              :options="dropdownOptions"
              @select="handleDropdownSelect"
            >
              <n-button
                :disabled="!hidStore.support"
                size="medium"
                quaternary
                class="nav-picker"
                @click="handleConectionStateButtonClick"
              >
                {{ getConnecttionState }}
              </n-button>
            </n-dropdown>
            <n-divider vertical />
            <n-button
              text
              circle
              class="nav-picker padded"
              size="large"
              @click="changeTheme"
              :color="themeRef.name === 'dark' ? '#ffffff' : '#000000'"
            >
              <template #icon>
                <n-icon v-if="themeRef.name != 'dark'">
                  <BrightnessHigh32RegularIcon />
                </n-icon>
                <n-icon v-else>
                  <BrightnessHigh32FilledIcon />
                </n-icon>
              </template>
            </n-button>
          </div>
        </n-layout-header>
        <n-layout-content style="z-index: 0">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 28px;
  height: 80px;
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
  font-size: 30px;
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
