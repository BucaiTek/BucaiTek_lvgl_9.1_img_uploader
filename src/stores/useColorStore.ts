import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorStore = defineStore('colorStore', {
  state: () => ({
    color: ref('rgb(90,150,180)'),
    r: 90,
    g: 150,
    b: 180,
    intervalId: null as number | null
  }),
  actions: {
    updateColor() {
      this.color = `rgb(${this.r},${this.g},${this.b})`
    },
    cycleColors() {
      if (this.intervalId) {
        return
      }
      this.intervalId = setInterval(() => {
        if (this.r === 180 && this.g < 180 && this.b === 90) {
          this.g += 2
        } else if (this.r > 90 && this.g === 180 && this.b === 90) {
          this.r -= 2
        } else if (this.r === 90 && this.g === 180 && this.b < 180) {
          this.b += 2
        } else if (this.r === 90 && this.g > 90 && this.b === 180) {
          this.g -= 2
        } else if (this.r < 180 && this.g === 90 && this.b === 180) {
          this.r += 2
        } else if (this.r === 180 && this.g === 90 && this.b > 90) {
          this.b -= 2
        }
        this.updateColor()
      }, 100)
    },
    stopCycle() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  }
})
