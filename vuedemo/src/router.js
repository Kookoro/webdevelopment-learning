//导入vue-router
import VueRouter from 'vue-router'
//导入对应组件
import HomePage from './componerts/tabbar/HomePage.vue'
import Search from './componerts/tabbar/SearchContainer.vue'
import Cart from './componerts/tabbar/CartContainer.vue'
import Account from './componerts/tabbar/AccountContainer.vue'
import NewsList from './componerts/news/NewsList.vue'
import NewsInfo from './componerts/news/NewsInfo.vue'
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
    {
      path:'/homepage/newslist',
      component:NewsList
    },
    {
      path:'/homepage/newsinfo/:id',
      component:NewsInfo
      
    }

  ] 
})
//把路由对象暴露出去
export default router