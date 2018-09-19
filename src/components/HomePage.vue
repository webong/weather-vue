<template>
      <div class="album py-5 bg-light">
        <div class="container">          
              <City> </City>
        </div>
      </div>
</template>

<script>
import City from './City.vue'
import axios from 'axios'
export default {
  name: 'HomePage',
  components: {
    City
  },
  data () {
    return {
      msg: 'Weather App',
      cities: [
            { name: 'Istanbul', woeid: 2344116, weather: {} },
            { name: 'Berlin', woeid: 638242, weather: {} },
            { name: 'London', woeid: 44418, weather: {} },
            { name: 'Helsinki', woeid: 565346, weather: {} },
            { name: 'Dublin', woeid: 560743, weather: {} },
            { name: 'Vancouver', woeid: 9807, weather: {} },
        ],
    }
  },
  methods: {

  },
  mounted() {
     
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
