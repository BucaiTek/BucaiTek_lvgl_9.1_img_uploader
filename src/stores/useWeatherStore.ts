import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    time: null as null | Date,
    timerIntervalId: null as number | null,
    weatherIntervalId: null as number | null,
    country: '' as string,
    region: '' as string,
    city: '' as string,
    ip: '' as string,
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
      if (this.timerIntervalId) {
        return
      }
      this.time = new Date()
      this.timerIntervalId = setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    stopTimer() {
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId)
        this.timerIntervalId = null
      }
    },
    async init() {
      try {
        const response = await axios.get(
          'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/ip.json'
        )
        console.log(response.data)
        this.coordinates = {
          latitude: response.data.lat,
          longitude: response.data.lon
        }
        this.ip = response.data.ip
        this.country = response.data.country_name
        this.region = response.data.region
        this.city = response.data.city
        this.startWeatherUpdates()
      } catch (error) {
        console.error('Failed to fetch IP info:', error)
        setTimeout(() => this.init(), 3000)
      }
    },
    async fetchWeatherInfo() {
      try {
        if (!this.ip) return
        let weatherResponse = await axios.get(
          'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/weather.json?q=' +
            this.ip
        )
        let currentWeather = weatherResponse.data.current.condition.code

        let conditionsResponse = await axios.get('https://www.weatherapi.com/docs/conditions.json')
        let conditions = conditionsResponse.data.find((c: any) => c.code === currentWeather)

        const systemLanguage = navigator.language.split('-')[0]
        console.log('System language:', systemLanguage)

        let languageDescription = conditions.languages.find(
          (lang: any) => lang.lang_iso === systemLanguage
        )
        if (languageDescription) {
          if (this.time && (this.time.getHours() > 18 || this.time.getHours() < 6)) {
            this.weather = languageDescription.night_text
          } else {
            this.weather = languageDescription.day_text
          }
        } else {
          console.log('No description available for your language.')
        }

        this.temperature.current = weatherResponse.data.current.temp_c
        this.temperature.min = weatherResponse.data.forecast.forecastday[0].day.mintemp_c
        this.temperature.max = weatherResponse.data.forecast.forecastday[0].day.maxtemp_c
        this.startWeatherUpdates()
      } catch (error) {
        console.error('Failed to fetch weather info:', error)
        setTimeout(() => this.fetchWeatherInfo(), 3000)
      }
    },
    startWeatherUpdates() {
      if (this.weatherIntervalId) clearInterval(this.weatherIntervalId)
      if (this.ip && this.weather) {
        this.weatherIntervalId = setInterval(() => this.fetchWeatherInfo(), 30 * 60 * 1000)
      } else if (this.ip) {
        this.fetchWeatherInfo()
      } else {
        this.init()
      }
    }
  }
})
