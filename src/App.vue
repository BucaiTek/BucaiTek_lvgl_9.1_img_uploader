<script setup lang="ts">
import { useHidStore } from '@/stores/useHidStore'
import { useColorStore } from '@/stores/useColorStore'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useTimeStore } from '@/stores/useTimeStore'
import { darkTheme, lightTheme } from 'naive-ui'
import {
  BrightnessHigh32Filled as BrightnessHigh32FilledIcon,
  BrightnessHigh32Regular as BrightnessHigh32RegularIcon
} from '@vicons/fluent'

import {
  HomeOutline as HomeOutlineIcon,
  LaptopOutline as LaptopOutlineIcon,
  SettingsOutline as SettingsOutlineIcon,
  LogoGithub as LogoGithubIcon,
  LinkOutline as LinkOutlineIcon,
  LogoPython as LogoPythonIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const hidStore = useHidStore()
const colorStore = useColorStore()
const browserStore = useBrowserStore()
const router = useRouter()
const timeStore = useTimeStore()

const weatherStore = useWeatherStore()
const hardwareStore = useHardwareStore()

onMounted(async () => {
  colorStore.cycleColors()
  router.push({ name: 'home' })
  timeStore.start()
  await hardwareStore.init()
  await hardwareStore.startReadSysData()

  await weatherStore.init()
})

onUnmounted(() => {
  timeStore.stop()
  hardwareStore.stopReadSysData()
  colorStore.stopCycle()
})

browserStore.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? darkTheme
  : lightTheme

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
    },
    FloatButton: {
      colorHover: null
    }
  }
})

const changeTheme = () => {
  browserStore.theme = browserStore.theme.name === 'dark' ? lightTheme : darkTheme
}

if ('hid' in navigator) {
  browserStore.supportHid = true
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
  browserStore.supportHid = false
}

const handleLogoClick = () => {
  router.push({ name: 'home' })
  menuValue.value = 'home'
}
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
  },
  {
    label: 'Python',
    key: 'python',
    icon: renderIcon(LogoPythonIcon),
    onClick: () => {
      router.push({ name: 'python' })
      menuValue.value = 'python'
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

const isMouseNearButton = ref(false)

const buttonTransform = computed(() => {
  if (router.currentRoute.value.name != 'home') {
    return 'translateX(+200%)'
  }
  if (!browserStore.collapsed) {
    return isMouseNearButton.value ? 'translateX(0px)' : 'translateX(+200%)'
  } else {
    return 'translateX(0px)'
  }
})
const showMenu = ref(false)
const handleMouseMove = (event: MouseEvent) => {
  // 假设监视区域在视口的右下角
  const nearRightEdge = window.innerWidth - event.clientX < 110 // 右边缘100px以内
  const nearBottomEdge = window.innerHeight - event.clientY < 240 // 底边缘100px以内
  if (nearRightEdge && nearBottomEdge) {
    if (window.innerHeight - event.clientY > 85) {
      showMenu.value = true
    } else {
      showMenu.value = false
    }
    isMouseNearButton.value = true
  } else {
    showMenu.value = false
    isMouseNearButton.value = false
  }
}

const handleMouseLeave = () => {
  isMouseNearButton.value = false
}
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('python', python)
</script>

<template>
  <n-config-provider :theme="browserStore.theme" :theme-overrides="themeOverrides" :hljs="hljs">
    <n-layout has-sider>
      <n-layout-sider
        content-style="padding: 15px;"
        bordered
        collapse-mode="width"
        :collapsed-width="82"
        :width="210"
        :collapsed="browserStore.collapsed"
        show-trigger
        trigger-style="top: 90px;"
        collapsed-trigger-style="top: 90px;"
        @collapse="browserStore.collapsed = true"
        @expand="browserStore.collapsed = false"
      >
        <n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
          <n-icon size="55" style="margin: 3px 12px 15px 0px">
            <svg
              width="564"
              height="868"
              viewBox="0 0 564 868"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 50L50 562"
                :stroke="browserStore.theme.name === 'dark' ? 'white' : 'black'"
                stroke-width="100"
                stroke-linecap="round"
              />
              <path
                d="M513.108 712.473C481.332 756.21 436.524 788.764 385.108 805.47C333.692 822.177 278.308 822.177 226.892 805.47C175.476 788.764 130.668 756.21 98.8916 712.473C67.1148 668.736 50 616.062 50 562C50 507.938 67.1149 455.264 98.8917 411.527C130.668 367.79 175.476 335.236 226.892 318.53C278.308 301.823 333.693 301.823 385.108 318.53C436.524 335.236 481.332 367.79 513.108 411.527"
                :stroke="browserStore.theme.name === 'dark' ? 'white' : 'black'"
                stroke-width="100"
                stroke-linecap="round"
              />
            </svg>
          </n-icon>
          <span class="rgb" style="font-size: 28px">BucaiTek</span>
        </n-text>
        <div>
          <n-menu
            :value="menuValue"
            :collapsed="browserStore.collapsed"
            :collapsed-width="52"
            :collapsed-icon-size="30"
            :icon-size="30"
            :options="menuOptions"
            style="font-size: 15px"
          />
        </div>
      </n-layout-sider>
      <n-layout style="height: 100vh">
        <n-layout-header class="nav" style="-webkit-app-region: drag">
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
              style="-webkit-app-region: no-drag"
            >
              <n-button
                :disabled="!browserStore.supportHid"
                size="large"
                quaternary
                @click="handleConectionStateButtonClick"
                style="-webkit-app-region: no-drag"
              >
                {{ getConnecttionState }}
              </n-button>
            </n-dropdown>
            <n-divider vertical style="margin-right: 8px" />
            <div class="themeButton">
              <n-icon @click="changeTheme" size="30" v-if="browserStore.theme.name != 'dark'">
                <BrightnessHigh32RegularIcon />
              </n-icon>
              <n-icon @click="changeTheme" size="30" v-else>
                <BrightnessHigh32FilledIcon />
              </n-icon>
            </div>
          </div>
        </n-layout-header>
        <n-layout-content
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          style="z-index: 0"
        >
          <router-view />
          <n-float-button
            type="default"
            menu-trigger="hover"
            :style="{ transform: buttonTransform }"
            :right="25"
            :bottom="20"
            width="60"
            height="60"
            :show-menu="showMenu"
          >
            <n-icon size="40">
              <svg
                width="564"
                height="868"
                viewBox="0 0 564 868"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 50L50 562"
                  :stroke="browserStore.theme.name === 'dark' ? 'white' : 'black'"
                  stroke-width="100"
                  stroke-linecap="round"
                />
                <path
                  d="M513.108 712.473C481.332 756.21 436.524 788.764 385.108 805.47C333.692 822.177 278.308 822.177 226.892 805.47C175.476 788.764 130.668 756.21 98.8916 712.473C67.1148 668.736 50 616.062 50 562C50 507.938 67.1149 455.264 98.8917 411.527C130.668 367.79 175.476 335.236 226.892 318.53C278.308 301.823 333.693 301.823 385.108 318.53C436.524 335.236 481.332 367.79 513.108 411.527"
                  :stroke="browserStore.theme.name === 'dark' ? 'white' : 'black'"
                  stroke-width="100"
                  stroke-linecap="round"
                />
              </svg>
            </n-icon>
            <template #menu>
              <n-button quaternary round style="right: 2px">
                <n-icon size="30">
                  <LinkOutlineIcon />
                </n-icon>
              </n-button>
              <n-button quaternary round style="right: 2px">
                <n-icon size="30">
                  <LogoGithubIcon />
                </n-icon>
              </n-button>
              <n-button quaternary round style="right: 2px">
                <n-icon size="30">
                  <SettingsOutlineIcon />
                </n-icon>
              </n-button>
            </template>
          </n-float-button>
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
  padding: 0 12px;
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
.themeButton {
  padding: 15px;
  margin-top: 5px;
  -webkit-app-region: no-drag;
  z-index: 2;
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

.n-float-button {
  transition: transform 0.3s ease-in-out;
}
</style>
