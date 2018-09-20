<template>
       <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img class="card-img-top" width="200" height="200" :src="'https://www.metaweather.com/static/img/weather/' + city.consolidated_weather[0].weather_state_abbr + '.svg'" data-src="" :alt="city.title">
              <div class="card-body">
                <p class="card-text">{{ city.consolidated_weather[0].weather_state_name }} - {{ Math.round(city.consolidated_weather[0].the_temp) }}°</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">{{ getDate(city.consolidated_weather[0].applicable_date) }}</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">{{ city.consolidated_weather[0].applicable_date }}</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">{{ city.title }}</button>
                  </div>
                     <strong>Max: {{ Math.round(city.consolidated_weather[0].max_temp) }}°</strong>
                     <div>Min: {{ Math.round(city.consolidated_weather[0].min_temp) }}°</div>         
                </div>
              </div>
             <div class="d-flex justify-content-center align-items-center mb-2">
                  <router-link :to="{name: 'weather', params: { woeid: city.woeid }}">
                     <button type="button" class="btn btn-sm btn-outline-secondary">More Details</button>
                  </router-link>
             </div>   
            </div>
       </div>
</template>

<script>
  import moment from 'moment'
  import 'moment-timezone'

export default {
   name: 'Weather',
   props: {
      city: Object
   },
   data() {
      return {

      }
   },
   methods: {
     getDate(date){
       var dt = moment(date, "YYYY-MM-DD HH:mm:ss")
       return dt.format('dddd');
     }
   },
   mounted(){
     //console.log(this.city);
   }
}
</script>

<style>

</style>
