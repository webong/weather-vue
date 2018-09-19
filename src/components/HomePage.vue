<template>
      <div class="album py-5 bg-light">
        <div class="container">          
          <div class="row">
              <Weather> </Weather>
          </div>
        </div>
      </div>
</template>

<script>
import Weather from './Weather.vue'

export default {
  name: 'HomePage',
  components: {
    Weather
  },
  data () {
    return {
      msg: 'Weather App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
