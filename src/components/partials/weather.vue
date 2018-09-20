<template>
       <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img class="card-img-top" width="200" height="200" :src="'https://www.metaweather.com/static/img/weather/' + data.weather_state_abbr + '.svg'" data-src="" :alt="data.title">
              <div class="card-body">
                <p class="card-text">{{ data.weather_state_name }} - {{ Math.round(data.the_temp) }}°</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">{{ data.applicable_date }}</button>
                  </div>
                     <strong>Max: {{ Math.round(data.max_temp) }}°</strong>
                     <div>Min: {{ Math.round(data.min_temp) }}°</div>         
                </div>
              </div>
             <!-- <div class="d-flex justify-content-center align-items-center mb-2">
                  <router-link :to="{name: 'weather', params: { woeid: data.woeid }}">
                     <button type="button" class="btn btn-sm btn-outline-secondary">More Details</button>
                  </router-link>
             </div>    -->
            </div>
       </div>
</template>

<script>
export default {
   name: 'Weather',
   props: {
      data: Object
   },
   data() {
      return {

      }
   },
   mounted(){
     //console.log(this.data);
   }
}
</script>

<style>

</style>
