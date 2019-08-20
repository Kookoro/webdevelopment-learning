//导入vue-router
import VueRouter from 'vue-router'
//导入对应组件
import HomePage from './components/tabbar/HomePage.vue'
import Search from './components/tabbar/SearchContainer.vue'
import Cart from './components/tabbar/CartContainer.vue'
import Account from './components/tabbar/AccountContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PicShare from './components/pics/picshare.vue'
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
      
    },
    { 
      path:'/homepage/picshare',
      component:PicShare
      
    }

  ] 
})
//把路由对象暴露出去
export default router