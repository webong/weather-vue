<template>
    <div>
        <div class="h5 mb-5 py-5">Showing Results for {{ $route.params.location }}</div>
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
import moment from 'moment'
import 'moment-timezone'
import axios from 'axios'
import Weather from './Weather.vue'

export default {
    name: 'Search',
    props: {
        
    },
    components: {
      Weather
    },
    data() {
      return {
        searchResult: null,
        cities: [],
        info: null,
        loading: true,
        errored: false,
      }
    },
    methods: {   
      search(){
          let vm = this;
      console.log('route', this.$route.params.location);
      let query = this.$route.params.location

        axios.get(`http://weather-app.test/weather.php?command=search&keyword=${query}`,
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
                vm.searchResult = response.data
                console.log(response.data.length)
                if(response.data.length === 0){
                  vm.loading = false
                  vm.errored = true
                }
                  vm.getWeather()
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
         })
      },
       getWeather(){
         let vm = this;
         this.searchResult.forEach(function(elem){
            axios.get(`http://weather-app.test/weather.php?command=location&woeid=${elem.woeid}`,
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
       }
    },
    created() {
      this.search() 
    },
    mounted() {
           //console.log(this.searchResult);
           //console.log(this.cities);

  },
  watch: {
    '$route.params.location': function (location) {
      this.loading = true
      this.search()
    }
  }
}
</script>

<style>

</style>
