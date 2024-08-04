import { defineStore } from 'pinia'
import axios from 'axios'

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
        let weatherResponse = await axios.get(
          'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/weather.json?q=' +
            this.city
        )
        let currentWeather = weatherResponse.data.current.condition.code

        let conditionsResponse = await axios.get('https://www.weatherapi.com/docs/conditions.json')
        let conditions = conditionsResponse.data.find((c: any) => c.code === currentWeather)

        // Determine the system language
        const systemLanguage = navigator.language.split('-')[0]
        console.log('System language:', systemLanguage)

        // Find the language-specific description for the current condition
        let languageDescription = conditions.languages.find(
          (lang: any) => lang.lang_iso === systemLanguage
        )
        if (languageDescription) {
          this.weather = `${languageDescription.day_text} / ${languageDescription.night_text}`
        } else {
          console.log('No description available for your language.')
        }

        this.temperature.current = weatherResponse.data.current.temp_c
        this.temperature.min = weatherResponse.data.forecast.forecastday[0].day.mintemp_c
        this.temperature.max = weatherResponse.data.forecast.forecastday[0].day.maxtemp_c
      } catch (error) {
        console.error('Failed to fetch weather info:', error)
      }
    }
  }
})
