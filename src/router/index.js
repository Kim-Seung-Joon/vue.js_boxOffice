import Vue from 'vue'
import Router from 'vue-router'
import todayBoxOffice from '../today/todayBoxOffice.vue'
import weeklyBoxOffice from '../weekly/weeklyBoxOffice.vue'
import home from '../home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/todayBoxOffice',
      name: 'todayBoxOffice',
      component: todayBoxOffice
    },
    {
      path:'/weeklyBoxOffice',
      name:'weeklyBoxOffice',
      component: weeklyBoxOffice
    },
    {
      path: '/',
      component: home,
    }
  ]
})
