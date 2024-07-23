import { defineStore } from 'pinia'
import axios from 'axios'
import { Temperature16Filled } from '@vicons/fluent'

export const useInfoStore = defineStore('infoStore', {
  state: () => ({
    time: new Date(),
    intervalId: null as number | null,
    timeZone: 'Asia/Shanghai' as string,
    country: '' as string,
    city: '' as string,
    coordinates: { latitude: 0 as number, longitude: 0 as number },
    temperature: {
      current: null as number | null,
      min: null as number | null,
      max: null as number | null
    }
  }),
  actions: {
    startTimer() {
      if (this.intervalId) {
        return
      }
      this.intervalId = setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    async fetchIPInfo() {
      try {
        const response = await axios.get('http://ip-api.com/json')
        if (response.data.status === 'success') {
          this.coordinates = {
            latitude: response.data.lat,
            longitude: response.data.lon
          }
          this.timeZone = response.data.timezone
          this.country = response.data.country
          this.city = response.data.city
        } else {
          console.log('Failed to fetch ip info:')
        }
      } catch (error) {
        console.error('Failed to fetch ip info:', error)
      }
    },
    async fetchWeatherInfo() {
      try {
        let json = (await axios.get('https://weather.meletrix.cn/v1/forecast.json?q=' + this.city))
          .data
        this.temperature.current = json['current']['temp_c']
        this.temperature.min = json['forecast']['forecastday'][0]['day']['mintemp_c']
        this.temperature.max = json['forecast']['forecastday'][0]['day']['maxtemp_c']
      } catch (error) {
        console.error('Failed to fetch weather info:', error)
      }
    }
  }
})
