import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeStore', {
  state: () => ({
    time: null as null | Date,
    timerIntervalId: null as number | null,
    days: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
    days_All: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    days_zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    month_zh: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    clockHourCss: '',
    clockMinCss: '',
    clockSecCss: ''
  }),
  actions: {
    start() {
      if (this.timerIntervalId) {
        return
      }
      this.time = new Date()
      this.timerIntervalId = setInterval(() => {
        this.time = new Date()
        const hh = this.time.getHours() * 30
        const mm = this.time.getMinutes() * 6
        const ss = this.time.getSeconds() * 6

        this.clockHourCss = `rotateZ(${hh + mm / 12}deg)`
        this.clockMinCss = `rotateZ(${mm}deg)`
        this.clockSecCss = `rotateZ(${ss}deg)`
      }, 1000)
    },
    stop() {
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId)
        this.timerIntervalId = null
      }
    },
    formatTime: (unit: number) => {
      return unit.toString().padStart(2, '0')
    }
  }
})
