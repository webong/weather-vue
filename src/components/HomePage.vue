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
import axios from 'axios'
export default {
  name: 'HomePage',
  components: {
    Weather
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
     let cities = this.cities
     let weathers = []
     cities.forEach( city => {
          axios.get(`${process.env.API_URL.search}${query}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    proxy: {
                        host: '127.0.0.1',
                        port: 8080
                    }
                }).then(function (response) {
                    console.log('response is : ' + response.data);
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

                }).catch(function (error) {
                    commit('setAppStatus', {
                        state: 'error',
                        message: 'Uh oh, the geolocation API is not responding.'
                    })
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
                });
     });
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
