import { defineStore } from 'pinia'
import axios from 'axios'
import { Temperature16Filled } from '@vicons/fluent'

export const useInfoStore = defineStore('infoStore', {
  state: () => ({
    time: null as null | Date,
    intervalId: null as number | null,
    country: '' as string,
    region: '' as string,
    city: '' as string,
    coordinates: { latitude: 0 as number, longitude: 0 as number },
    weather: '' as string,
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
      this.time = new Date()
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
        const response = await axios.get(
          'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/ip.json'
        )
        console.log(response)
        this.coordinates = {
          latitude: response.data.lat,
          longitude: response.data.lon
        }
        this.country = response.data.country_name
        this.region = response.data.region
        this.city = response.data.city
      } catch (error) {
        console.error('Failed to fetch IP info:', error)
      }
    },
    async fetchWeatherInfo() {
      try {
        let json = (
          await axios.get(
            'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/weather.json?q=' +
              this.city
          )
        ).data
        this.weather = json['current']['condition']['code']
        this.temperature.current = json['current']['temp_c']
        this.temperature.min = json['forecast']['forecastday'][0]['day']['mintemp_c']
        this.temperature.max = json['forecast']['forecastday'][0]['day']['maxtemp_c']
      } catch (error) {
        console.error('Failed to fetch weather info:', error)
      }
    }
  }
})
