<template>
       <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img class="card-img-top" :src="'https://www.metaweather.com/static/img/weather/' + city.weatherweather_state_abbr + '.svg'" data-src="" :alt="city.name">
              <div class="card-body">
                <p class="card-text">{{ city.weather.weather_state_name }} - {{ Math.round(city.weather.the_temp) }}°</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">{{ city.name }}</button>
                  </div>
                     <strong>{{ Math.round(city.weather.max_temp) }}°</strong>
                     <div>{{ Math.round(city.weather.min_temp) }}°</div>         
                </div>
              </div>
            </div>
       </div>
</template>

<script>
export default {
   name: 'Weather',
}
</script>

<style>

</style>
