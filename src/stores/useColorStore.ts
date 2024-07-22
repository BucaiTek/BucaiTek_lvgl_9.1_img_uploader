import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorStore = defineStore('colorStore', {
  state: () => ({
    color: ref('rgb(180,90,90)'),
    r: 180,
    g: 90,
    b: 90
  }),
  actions: {
    updateColor() {
      // 更新颜色
      this.color = `rgb(${this.r},${this.g},${this.b})`
    },

    cycleColors() {
      const intervalId = setInterval(() => {
        if (this.r === 180 && this.g < 180 && this.b === 90) {
          // 增加 G
          this.g += 5
        } else if (this.r > 90 && this.g === 180 && this.b === 90) {
          // 减少 R
          this.r -= 5
        } else if (this.r === 90 && this.g === 180 && this.b < 180) {
          // 增加 B
          this.b += 5
        } else if (this.r === 90 && this.g > 90 && this.b === 180) {
          // 减少 G
          this.g -= 5
        } else if (this.r < 180 && this.g === 90 && this.b === 180) {
          // 增加 R
          this.r += 5
        } else if (this.r === 180 && this.g === 90 && this.b > 90) {
          // 减少 B
          this.b -= 5
        }

        this.updateColor()
      }, 100)

      return intervalId
    }
  }
})
