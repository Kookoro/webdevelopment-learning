//导入vue-router
import VueRouter from 'vue-router'
//导入对应组件
import HomePage from './components/tabbar/HomePage.vue'
import Weather from './components/tabbar/WeatherContainer.vue'
import Cart from './components/tabbar/CartContainer.vue'
import Account from './components/tabbar/AccountContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PicShare from './components/pics/picshare.vue'
import PicInfo from './components/pics/picinfo.vue'
import ProductList from './components/product/ProductList.vue'
import ProductInfo from './components/product/ProductInfo.vue'
import ProductDesc from './components/product/ProductDesc.vue'
import ProductComment from './components/product/ProductComment.vue'
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
      path: '/weather',
      component: Weather
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
      
    },
    { 
      path:'/homepage/picinfo/:id',
      component:PicInfo
    },
    {
      path:'/homepage/productlist',
      component:ProductList
    },
    {
      path:'/homepage/productinfo/:id',
      component:ProductInfo
    },
    {
      path:'/homepage/productdesc/:id',
      name:'/homepage/productdesc',
      component:ProductDesc,
      
    },
    {
      path:'/homepage/productcomment/:id',
      name:'/homepage/productcomment',
      component:ProductComment,
      
    }

 
  ] 
})
//暴露路由对象
export default router