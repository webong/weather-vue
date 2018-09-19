import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let units = 'si'

if (window.navigator.language === 'en-US') {
  units = 'us'
}

export default new Vuex.Store({
      state: {
        appStatus: {
          message: null,
          state: 'loading'
        },
        weather: {},
        geocode: {},
        coordinates: {
          latitude: null,
          longitude: null
        },
        cities: [{
            name: 'Istanbul',
            woeid: 2344116,
            weather: {}
          },
          {
            name: 'Berlin',
            woeid: 638242,
            weather: {}
          },
          {
            name: 'London',
            woeid: 44418,
            weather: {}
          },
          {
            name: 'Helsinki',
            woeid: 565346,
            weather: {}
          },
          {
            name: 'Dublin',
            woeid: 560743,
            weather: {}
          },
          {
            name: 'Vancouver',
            woeid: 9807,
            weather: {}
          },
        ],
        inputQuery: null,
        locationIcon: 'search',
        units: units
      },
actions: {
    appStatus({
      commit
    }, appStatus) {
      commit('setAppStatus', appStatus)
    },

    coordinates({
      commit
    }, coordinates) {
      commit('setCoordinates', coordinates)
    },

    getStaticWeathers({
      commit,
      dispatch,
      state
    }) {
      for (let idx = 0; idx < state.cities.length; idx++) {
        dispatch('weather', {
          woeid: state.cities[idx].woeid,
          type: 'static',
          idxCity: idx
        })
      }
    },

    geocode({
      commit,
      state
    }, type) {
      return new Promise((resolve, reject) => {
        let query;
        if (type === 'default') {
          query = `lattlong=${state.coordinates.latitude},${state.coordinates.longitude}`
        } else {
          query = `query=${encodeURIComponent(state.inputQuery)}`
        }

        fetch(`${process.env.API_URL.search}${query}`)
          .then(response => {
            if (response.status !== 200) {
              commit('setAppStatus', {
                state: 'error',
                message: 'Uh oh, the geolocation API is not responding. Please try again.'
              })
              return
            }
            response.json().then(data => {
              if (!data.length) {
                commit('setAppStatus', {
                  state: 'error',
                  message: 'No results found. Please try another search.'
                })
                return
              }
              commit('setGeocode', data[0])
              resolve(data[0])
            })
          })
          .catch(() => {
            commit('setAppStatus', {
              state: 'error',
              message: 'Uh oh, the geolocation API is not responding.'
            })
          })
      })
    },

    inputQuery({
      commit
    }, inputQuery) {
      commit('setInputQuery', inputQuery)
    },

    locationIcon({
      commit
    }, locationIcon) {
      commit('setLocationIcon', locationIcon)
    },

    units({
      commit
    }, units) {
      commit('setUnits', units)
    },

    weather({
      commit,
      state
    }, {
      woeid,
      type,
      idxCity
    }) {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.API_URL.weather}${woeid}`)
          .then(response => {
            if (response.status !== 200 && type !== 'static') {
              commit('setAppStatus', {
                state: 'error',
                message: 'Uh oh, the geolocation API is not responding. Please try again.'
              })
              return
            }
            response.json().then(data => {
              if (!data && type !== 'static') {
                commit('setAppStatus', {
                  state: 'error',
                  message: 'No results found. Please try another search.'
                })
                return
              }
              if (type === 'static') {
                commit('setStaticWeather', {
                  data: data.consolidated_weather[0],
                  idxCity: idxCity
                })
              } else {
                commit('setWeather', data)
              }
              resolve(response)
            })
          })
          .catch(() => {
            commit('setAppStatus', {
              state: 'error',
              message: 'Uh oh, the geolocation API is not responding.'
            })
          })
      })
    }
  },

  mutations: {
    setAppStatus: (state, appStatus) => {
      state.appStatus.state = appStatus.state
      state.appStatus.message = appStatus.message
    },

    setCoordinates: (state, coordinates) => {
      state.coordinates.latitude = coordinates.latitude
      state.coordinates.longitude = coordinates.longitude
    },

    setGeocode: (state, geocode) => {
      state.geocode = geocode

      const latlng = geocode.latt_long.split(',')
      state.coordinates.latitude = parseFloat(latlng[0])
      state.coordinates.longitude = parseFloat(latlng[1])
    },

    setInputQuery: (state, inputQuery) => {
      state.inputQuery = inputQuery
    },

    setLocationIcon: (state, locationIcon) => {
      state.locationIcon = locationIcon
    },

    setUnits: (state, units) => {
      state.units = units
      localStorage.setItem('units', units)
    },

    setWeather: (state, weather) => {
      state.weather = weather
    },

    setStaticWeather: (state, {
      weather,
      idxCity
    }) => {
      state.cities[idx].weather = weather
    }
  }
})