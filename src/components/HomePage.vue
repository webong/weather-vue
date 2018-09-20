<template>
      <div class="album py-5 bg-light">
            <div class="container">  
              <section v-if="errored">
                <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
             </section>
              <div v-else class="row">
                  <img v-if="loading" class="img-fluid loader" src="/static/img/loader.gif" alt="">

                    <Weather  v-else v-for="city in cities" :key="city.id" :city="city"> </Weather>
              </div>  
            </div>
      </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import 'moment-timezone'
import Weather from './Weather.vue'

export default {
  name: 'HomePage',
  components: {
    Weather
  },
  props: {
  },
  data () {
    return {
      msg: 'Weather App',
      info: null,
      loading: true,
      errored: false,
      static: [
            { name: 'Istanbul', woeid: 2344116, weather: {} },
            { name: 'Berlin', woeid: 638242, weather: {} },
            { name: 'London', woeid: 44418, weather: {} },
            { name: 'Helsinki', woeid: 565346, weather: {} },
            { name: 'Dublin', woeid: 560743, weather: {} },
            { name: 'Vancouver', woeid: 9807, weather: {} },
        ],
        cities: []
    }
  },
  methods: {

  },
  mounted() {
     var config = {
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        },    
     };
    let vm = this;
     this.static.forEach(function(elem){
           axios.get(`${process.env.WEATHER_API}?command=location&woeid=${elem.woeid}`,
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
                //console.log(response.data)
                vm.cities.push(response.data)
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
      })
           //console.log(this.cities);

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
