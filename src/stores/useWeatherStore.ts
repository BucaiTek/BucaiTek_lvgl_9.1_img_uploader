import { defineStore } from 'pinia'
import axios from 'axios'

const weatherCodeToIcon = [
  {
    code: 1000,
    day: 'Sunny',
    night: 'Clear',
    icon: '100/150'
  },
  {
    code: 1003,
    day: 'Partly cloudy',
    night: 'Partly cloudy',
    icon: '101/151'
  },
  {
    code: 1006,
    day: 'Cloudy',
    night: 'Cloudy',
    icon: '104'
  },
  {
    code: 1009,
    day: 'Overcast',
    night: 'Overcast',
    icon: '104'
  },
  {
    code: 1030,
    day: 'Mist',
    night: 'Mist',
    icon: '500'
  },
  {
    code: 1063,
    day: 'Patchy rain possible',
    night: 'Patchy rain possible',
    icon: '399'
  },
  {
    code: 1066,
    day: 'Patchy snow possible',
    night: 'Patchy snow possible',
    icon: '499'
  },
  {
    code: 1069,
    day: 'Patchy sleet possible',
    night: 'Patchy sleet possible',
    icon: '404'
  },
  {
    code: 1072,
    day: 'Patchy freezing drizzle possible',
    night: 'Patchy freezing drizzle possible',
    icon: '313'
  },
  {
    code: 1087,
    day: 'Thundery outbreaks possible',
    night: 'Thundery outbreaks possible',
    icon: '302'
  },
  {
    code: 1114,
    day: 'Blowing snow',
    night: 'Blowing snow',
    icon: '499'
  },
  {
    code: 1117,
    day: 'Blizzard',
    night: 'Blizzard',
    icon: '403'
  },
  {
    code: 1135,
    day: 'Fog',
    night: 'Fog',
    icon: '501'
  },
  {
    code: 1147,
    day: 'Freezing fog',
    night: 'Freezing fog',
    icon: '510'
  },
  {
    code: 1150,
    day: 'Patchy light drizzle',
    night: 'Patchy light drizzle',
    icon: '309'
  },
  {
    code: 1153,
    day: 'Light drizzle',
    night: 'Light drizzle',
    icon: '309'
  },
  {
    code: 1168,
    day: 'Freezing drizzle',
    night: 'Freezing drizzle',
    icon: '313'
  },
  {
    code: 1171,
    day: 'Heavy freezing drizzle',
    night: 'Heavy freezing drizzle',
    icon: '313'
  },
  {
    code: 1180,
    day: 'Patchy light rain',
    night: 'Patchy light rain',
    icon: '300'
  },
  {
    code: 1183,
    day: 'Light rain',
    night: 'Light rain',
    icon: '305'
  },
  {
    code: 1186,
    day: 'Moderate rain at times',
    night: 'Moderate rain at times',
    icon: '306'
  },
  {
    code: 1189,
    day: 'Moderate rain',
    night: 'Moderate rain',
    icon: '306'
  },
  {
    code: 1192,
    day: 'Heavy rain at times',
    night: 'Heavy rain at times',
    icon: '307'
  },
  {
    code: 1195,
    day: 'Heavy rain',
    night: 'Heavy rain',
    icon: '307'
  },
  {
    code: 1198,
    day: 'Light freezing rain',
    night: 'Light freezing rain',
    icon: '313'
  },
  {
    code: 1201,
    day: 'Moderate or heavy freezing rain',
    night: 'Moderate or heavy freezing rain',
    icon: '313'
  },
  {
    code: 1204,
    day: 'Light sleet',
    night: 'Light sleet',
    icon: '405'
  },
  {
    code: 1207,
    day: 'Moderate or heavy sleet',
    night: 'Moderate or heavy sleet',
    icon: '405'
  },
  {
    code: 1210,
    day: 'Patchy light snow',
    night: 'Patchy light snow',
    icon: '400'
  },
  {
    code: 1213,
    day: 'Light snow',
    night: 'Light snow',
    icon: '400'
  },
  {
    code: 1216,
    day: 'Patchy moderate snow',
    night: 'Patchy moderate snow',
    icon: '401'
  },
  {
    code: 1219,
    day: 'Moderate snow',
    night: 'Moderate snow',
    icon: '401'
  },
  {
    code: 1222,
    day: 'Patchy heavy snow',
    night: 'Patchy heavy snow',
    icon: '402'
  },
  {
    code: 1225,
    day: 'Heavy snow',
    night: 'Heavy snow',
    icon: '402'
  },
  {
    code: 1237,
    day: 'Ice pellets',
    night: 'Ice pellets',
    icon: '406'
  },
  {
    code: 1240,
    day: 'Light rain shower',
    night: 'Light rain shower',
    icon: '300'
  },
  {
    code: 1243,
    day: 'Moderate or heavy rain shower',
    night: 'Moderate or heavy rain shower',
    icon: '301'
  },
  {
    code: 1246,
    day: 'Torrential rain shower',
    night: 'Torrential rain shower',
    icon: '310'
  },
  {
    code: 1249,
    day: 'Light sleet showers',
    night: 'Light sleet showers',
    icon: '406'
  },
  {
    code: 1252,
    day: 'Moderate or heavy sleet showers',
    night: 'Moderate or heavy sleet showers',
    icon: '406'
  },
  {
    code: 1255,
    day: 'Light snow showers',
    night: 'Light snow showers',
    icon: '407'
  },
  {
    code: 1258,
    day: 'Moderate or heavy snow showers',
    night: 'Moderate or heavy snow showers',
    icon: '407'
  },
  {
    code: 1261,
    day: 'Light showers of ice pellets',
    night: 'Light showers of ice pellets',
    icon: '456'
  },
  {
    code: 1264,
    day: 'Moderate or heavy showers of ice pellets',
    night: 'Moderate or heavy showers of ice pellets',
    icon: '456'
  },
  {
    code: 1273,
    day: 'Patchy light rain with thunder',
    night: 'Patchy light rain with thunder',
    icon: '302'
  },
  {
    code: 1276,
    day: 'Moderate or heavy rain with thunder',
    night: 'Moderate or heavy rain with thunder',
    icon: '303'
  },
  {
    code: 1279,
    day: 'Patchy light snow with thunder',
    night: 'Patchy light snow with thunder',
    icon: '406'
  },
  {
    code: 1282,
    day: 'Moderate or heavy snow with thunder',
    night: 'Moderate or heavy snow with thunder',
    icon: '410'
  }
]
export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weatherIntervalId: null as number | null,
    country: '' as string,
    region: '' as string,
    city: '' as string,
    ip: '' as string,
    coordinates: { latitude: 0 as number, longitude: 0 as number },
    weather: '' as string,
    weatherIcon: '' as string,
    temperature: {
      current: null as number | null,
      min: null as number | null,
      max: null as number | null
    }
  }),
  actions: {
    async init() {
      try {
        const response = await axios.get(
          'https://64090833871b4162bbbdbe9d92b87a1a-cn-shenzhen.alicloudapi.com/ip.json'
        )
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

        if (conditions.code == '1000' || conditions.code == '1003') {
          if (new Date().getHours() > 18 || new Date().getHours() < 6) {
            this.weatherIcon = weatherCodeToIcon
              .find((c: any) => c.code === currentWeather)!
              .icon.split('/')[1]
          } else {
            this.weatherIcon = weatherCodeToIcon
              .find((c: any) => c.code === currentWeather)!
              .icon.split('/')[0]
          }
        } else {
          this.weatherIcon = weatherCodeToIcon.find((c: any) => c.code === currentWeather)!.icon
        }

        const systemLanguage = navigator.language.split('-')[0]
        let languageDescription = conditions.languages.find(
          (lang: any) => lang.lang_iso === systemLanguage
        )
        if (languageDescription) {
          let time = new Date()
          if (time && (time.getHours() > 18 || time.getHours() < 6)) {
            this.weather = languageDescription.night_text
          } else {
            this.weather = languageDescription.day_text
          }
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
