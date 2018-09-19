import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Forecast from '@/components/Forecast'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/weather/:woeid',
    },
    {
      path: '/search/:location',
      name: 'search',
      component: Forecast
    }
  ]
})
