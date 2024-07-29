import { defineStore } from 'pinia'

export const useHidStore = defineStore('hidStore', {
  state: () => ({
    device: null as HIDDevice | null
  }),
  actions: {
    async requestDevice() {
      const devices = await navigator.hid.requestDevice({
        filters: [
          {
            usagePage: 0xff60,
            usage: 0x61
          }
        ]
      })
      this.device = devices[0] || null
      try {
        if (!this.device) {
          return
        }
        await this.device.open()
        this.device.oninputreport = (event: any) => {
          const array = new Uint8Array(event.data.buffer)

          let hexstr = ''
          for (const data of array) {
            hexstr += (Array(2).join('0') + data.toString(16).toUpperCase()).slice(-2) + ' '
          }
          console.log(hexstr)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async closeDevice() {
      try {
        if (!this.device) {
          return
        }
        await this.device.close()
        await this.device.forget()
        this.device = null
      } catch (error) {
        console.log(error)
      }
    }
  }
})
