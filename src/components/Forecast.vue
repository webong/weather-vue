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

    <div class="current">
       <h1 class="location">{{ app.geocode.formatted_address }}</h1>

       <div class="row">
          <div class="col main">
            <div>{{ date(app.weather.consolidated_weather[0].created * 1000, app.weather.timezone) }}</div>
            <div>{{ app.weather.consolidated_weather[0].weather_state_name }}</div>
            <div class="icon-and-temperature">
              <div class="icon">
                <WeatherIcon :icon="app.weather.consolidated_weather[0].weather_state_abbr"></WeatherIcon>
              </div>
              <div class="temperature">
                <div>{{ Math.round(app.weather.consolidated_weather[0].the_temp) }}</div>
                <sup :class="app.units">
                  <button class="us" title="Switch to Fahrenheit" @click="changeUnits('us')">°F</button>
                  <button class="si" title="Switch to Celsius" @click="changeUnits('si')">°C</button>
                </sup>
              </div>
            </div>
          </div>

          <ul class="col details">
            <li>
              Precipitation: <strong>{{ toPercentage(app.weather.consolidated_weather[0].predictability) }}%</strong>
            </li>
            <li>
              Humidity: <strong>{{ toPercentage(app.weather.consolidated_weather[0].humidity) }}%</strong>
            </li>
            <li>
              Wind: <strong>{{ app.weather.consolidated_weather[0].wind_speed }} {{ windSpeedLabel }}</strong>
            </li>
            <li>
              Visibility: <strong>{{ app.weather.consolidated_weather[0].visibility }} {{ visibilityLabel }}</strong>
            </li>
          </ul>
        </div> <!-- end .row -->
    </div>
</template>

<script>
  import moment from 'moment'
  import 'moment-timezone'

export default {
  name: 'forecast',
  computed: {
      
  },
  methods: {
    changeUnits (units) {
      this.$app.dispatch('units', units)
      this.$app.dispatch('appStatus', {state: 'loading'})
      this.$app.dispatch('weather').then(() => this.$app.dispatch('appStatus', {state: 'loaded'}))
    },
    date (time, zone) {
      return moment(time).tz(zone).format('dddd, MMMM Do')
    },
    timestamp (time, zone) {
      return moment(time).tz(zone).format('h:mm A')
    },
    toPercentage (value) {
      return Math.round(value * 100)
    }
  }
}
</script>

<style>

</style>
