import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DetailPage from '@/components/DetailPage'
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
      path: '/weather',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/search/location',
      name: 'Forecast',
      component: Forecast
    }
  ]
})
