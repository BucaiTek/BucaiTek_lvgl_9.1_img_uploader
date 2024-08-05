import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeStore', {
  state: () => ({
    time: null as null | Date,
    timerIntervalId: null as number | null,
    days: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
