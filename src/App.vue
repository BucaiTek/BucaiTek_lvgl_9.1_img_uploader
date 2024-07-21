<script setup lang="ts">
import { useHidStore } from '@/stores/useHidStore'
const hidStore = useHidStore()
const router = useRouter()

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
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
