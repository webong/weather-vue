<template>
    <!-- <div class="row mb-2">
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">World</strong>
              <h3 class="mb-0">
                <a class="text-dark" href="#">Featured post</a>
              </h3>
              <div class="mb-1 text-muted">Nov 12</div>
              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-lg-block" data-src="holder.js/200x250?theme=thumb" alt="Card image cap">
          </div>
        </div>
    </div> -->
    <div class="container">  
            <section v-if="errored">
                <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </section>
              <div v-else class="row">
                  <!-- <img v-if="loading" class="img-fluid loader" src="/static/img/loader.gif" alt=""> -->
                   <div v-if="loading" class="loading"></div>
                      <div v-else class="current">
                            <h1 class="location">{{ weather.title }}</h1>

                            <div class="row">
                                <div class="col main">
                                  <div>{{ date(weather.consolidated_weather[0].created * 1000, weather.timezone) }}</div>
                                  <div>{{ weather.consolidated_weather[0].weather_state_name }}</div>
                                  <div class="icon-and-temperature">
                                    <div class="icon">
                                      <WeatherIcon :icon="weather.consolidated_weather[0].weather_state_abbr"></WeatherIcon>
                                    </div>
                                    <div class="temperature">
                                      <div>{{ Math.round(weather.consolidated_weather[0].the_temp) }}</div>
                                      <sup :class="units">
                                        <button class="us" title="Switch to Fahrenheit" @click="changeUnits('us')">°F</button>
                                        <button class="si" title="Switch to Celsius" @click="changeUnits('si')">°C</button>
                                      </sup>
                                    </div>
                                  </div>
                                </div>

                                <ul class="col details">
                                  <li>
                                    Precipitation: <strong>{{ toPercentage(weather.consolidated_weather[0].predictability) }}%</strong>
                                  </li>
                                  <li>
                                    Humidity: <strong>{{ toPercentage(weather.consolidated_weather[0].humidity) }}%</strong>
                                  </li>
                                  <li>
                                    Wind: <strong>{{ weather.consolidated_weather[0].wind_speed }} {{ windSpeedLabel }}</strong>
                                  </li>
                                  <li>
                                    Visibility: <strong>{{ weather.consolidated_weather[0].visibility }} {{ visibilityLabel }}</strong>
                                  </li>
                                </ul>
                              </div> <!-- end .row -->
                      </div>
              </div>  
      </div>
</template>

<script>
  import moment from 'moment'
  import 'moment-timezone'

export default {
  name: 'Forecast',
  data(){
    return {
        info: null,
        loading: true,
        errored: false,
        weather: null
    }
  },
  methods: {
    changeUnits (units) {
      this.$dispatch('units', units)
      this.$dispatch('appStatus', {state: 'loading'})
      this.$dispatch('weather').then(() => this.$dispatch('appStatus', {state: 'loaded'}))
    },
    date (time, zone) {
      return moment(time).tz(zone).format('dddd, MMMM Do')
    },
    timestamp (time, zone) {
      return moment(time).tz(zone).format('h:mm A')
    },
    toPercentage (value) {
      return Math.round(value * 100)
    },
    getWeather(){
         let vm = this;
         console.log(this.$route.params.woeid)
         let woeid = this.$route.params.woeid
            axios.get(`http://weather-app.test/weather.php?command=location&woeid=${woeid}`,
                {
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    },
                    proxy: {
                      host: 'localhost',
                      port: 8080
                    }
                  })
                  .then(function(response) {
                      console.log(response.data)
                      vm.weather = response.data
                  })
                  .catch(error => {
                      if (error.response) {
                            console.log(error.response.headers);
                      }
                        else if (error.request) {
                          console.log(error.request);
                      }
                        else {
                          console.log(error.message);
                      }
                      console.log(error.config);
                  }).finally(() => vm.loading = false)

       },
       created(){
         console.log('Hello World')
         this.getWeather()
       }
  }
}
</script>

<style>

</style>
