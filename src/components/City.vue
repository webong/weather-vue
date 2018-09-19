<template>
  <div>
     <div class="row">
        <Weather v-for="city in cities" :key="city.id"> </Weather>
     </div>      
  </div> 
</template>

<script>

import Weather from './Weather.vue'
import moment from 'moment'
import 'moment-timezone'

export default {
    name: 'City',
    components: {
      Weather
    },
    props: {
        
    },
    mounted() {
        this.$app.dispatch('getStaticWeathers')
    },
    computed: {
        cities() {
            return this.$app.state.cities
        }
    }
}
</script>

<style>

</style>
