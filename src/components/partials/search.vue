<template>
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading margin">Weather App</h1>
          <div class="input-group mt-1 mb-1">
            <input type="text" id="locationQuery" v-model="query" class="form-control" placeholder="Enter a Location to get Weather Results">
            <div class="input-group-append">
              <router-link :to="{name: 'search', params: { location: query }}">
                <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- <p>Message is: {{ query }}</p> -->
      </section>
</template>

<script>
  import arrive from 'arrive'

export default {
   name: 'Search',
   data() {
     return {
       query : ''
     }
   },
   props: {

   },
   methods: {
       search(){
         console.log(this.query)
       }
   }
}
</script>

<style>
   .margin{
     margin-top: -100px;
     padding-top: -50px;
   }

</style>
