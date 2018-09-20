<template>
    <div>
            <div class="h5">Showing Results for {{ $route.params.location }}</div>
              <div class="row">
                <Weather v-for="city in cities" :key="city.id"> </Weather>
            </div> 
    </div>       
</template>

<script>
import moment from 'moment'
import 'moment-timezone'

export default {
    name: 'Forecast',
    props: {
        
    },
    created() {
      console.log('route', this.$route.params.location);
      console.log('app', this.$app)
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
    },
    computed: {
      app () {
        return this.$app.state
      },
      daily () {
        return this.$app.state.weather.consolidated_weather
      }
    },
    methods: {
      dayOfWeek (time, zone) {
        return moment(time).tz(zone).format('ddd')
      }
    }
}
</script>

<style>

</style>
