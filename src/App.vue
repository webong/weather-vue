<template>
  <div id="app">
    <Search />
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment'
import Search from './components/partials/search.vue'

export default {
  name: 'App',
  components: {
    Search
  },
  computed: {
      app() {
          return this.$app.state
      }
  },
  methods: {
      timestamp(time, zone) {
          return moment(time).tz(zone).format('h:mm A')
      }
  },
  mounted() {
      (localStorage.units) ? this.$app.dispatch('units', localStorage.getItem('units')): null
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
