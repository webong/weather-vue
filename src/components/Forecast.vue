<template>
    <div>  
          <div class="container">
               <section v-if="errored">
              <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
          </section>
          <div v-else>
                <!-- <img v-if="loading" class="img-fluid loader" src="/static/img/loader.gif" alt=""> -->
                  <div v-if="loading" class="loading"></div>

                  <div v-else class="current">
                          <h1 class="location">{{ weather.title }}</h1>
                          <div class="row">
                              <div class="col-8 ml-5 mx-auto text-center justify-center">
                                  <div class="card mx-3 px-4 flex-md-row mb-4 shadow-sm h-md-250">
                                    <div class="card-body px-4 d-flex flex-column align-items-start">
                                      <strong class="d-inline-block mb-2 text-primary"></strong>
                                      <h3 class="mb-0">
                                        <a class="text-dark" href="#">{{ weather.consolidated_weather[0].weather_state_name }}</a>
                                      </h3>
                                      <p class="card-text mb-auto">
                                            <ul class="list-group">
                                              <li class="list-group-item">
                                                Precipitation: <strong>{{ toPercentage(weather.consolidated_weather[0].predictability) }}%</strong>
                                              </li>
                                              <li class="list-group-item">
                                                Humidity: <strong>{{ toPercentage(weather.consolidated_weather[0].humidity) }}%</strong>
                                              </li>
                                              <li class="list-group-item">
                                                Wind: <strong>{{ weather.consolidated_weather[0].wind_speed }}</strong>
                                              </li>
                                              <li class="list-group-item">
                                                Visibility: <strong>{{ weather.consolidated_weather[0].visibility }}</strong>
                                              </li>
                                            </ul>
                                            <!-- <button class="btn btn-primary" title="Switch to Fahrenheit" @click="changeUnits('us')">°F</button> -->
                                            <button class="btn btn-default" title="Switch to Celsius">                                            <span class="badge badge-dark h1">{{ Math.round(weather.consolidated_weather[0].the_temp) }}</span>
                                            °C</button>
                                      </p>
                                    </div>
                                    <img class="card-img-right flex-auto d-none d-lg-block" style="width: 200px; height: 250px;" :src="'https://www.metaweather.com/static/img/weather/' + weather.consolidated_weather[0].weather_state_abbr + '.svg'" :alt="weather.title">
                                  </div>
                              </div>
                          </div> 
                          <div class="row">
                              <Weather v-for="data in datas" :key="data.id" :data="data"> </Weather>
                          </div>
                    </div>
          </div>
          </div>  
    </div>
</template>

<script>
  import moment from 'moment'
  import 'moment-timezone'
  import axios from 'axios'
  import Weather from './partials/weather.vue'


export default {
  name: 'Forecast',
  components: {
      Weather
  },
  data(){
    return {
        info: null,
        loading: true,
        errored: false,
        weather: null,
        datas: null,
    }
  },
  created(){
   },
  mounted(){
      // console.log("Hello")
      this.getWeather()

  },
  methods: {
    changeUnits (units) {
      
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
                      vm.datas = response.data.consolidated_weather
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
  }
}
</script>

<style>

</style>
