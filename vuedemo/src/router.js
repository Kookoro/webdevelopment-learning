//导入vue-router
import VueRouter from 'vue-router'
//导入对应组件
import HomePage from './componerts/tabbar/HomePage.vue'
import Search from './componerts/tabbar/SearchContainer.vue'
import Cart from './componerts/tabbar/CartContainer.vue'
import Account from './componerts/tabbar/AccountContainer.vue'
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect:'/homepage'
    },
    {
      path: '/homepage',
      component: HomePage
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/account',
      component: Account
    },

  ] 
})
//把路由对象暴露出去
export default router