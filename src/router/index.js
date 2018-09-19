import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DetailPage from '@/components/DetailPage'
import SearchPage from '@/components/SearchPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/lo',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
