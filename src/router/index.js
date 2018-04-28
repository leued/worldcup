import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import ('@/components/HelloWorld')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import ('@/components/layout/main'),
      children : [
        {
          path: 'index',
          name: 'index',
          component: () => import ('@/pages/index/index')
        },{
          path: 'test',
          name: 'test',
          component: () => import ('@/pages/test/index')
        },
        {
          path: 'table',
          name: 'table',
          component: () => import ('@/pages/test/table')
        }
      ]
    }
    
  ]
})
