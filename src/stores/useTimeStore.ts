import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeStore', {
  state: () => ({
    time: null as null | Date,
    timerIntervalId: null as number | null
  }),
  actions: {
    start() {
      if (this.timerIntervalId) {
        return
      }
      this.time = new Date()
      this.timerIntervalId = setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    stop() {
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId)
        this.timerIntervalId = null
      }
    }
  }
})
