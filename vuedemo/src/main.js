//入口 

//导入Vue
import Vue from 'vue'

//导入谷歌Material Design icon图标库
import '@mdi/font/css/materialdesignicons.css'

//导入App组件
import app from './App.vue'


//按需导入mint-ui Header组件以及css文件
import {
    Header
} from 'mint-ui'
Vue.component(Header.name, Header)
import {
    Swipe,
    SwipeItem
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import 'mint-ui/lib/style.css'
//导入mui 
// import '../src/lib/mui/css/mui.min.css'

//导入Vuetify ui框架
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
})

//导入vue-router路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入router.js
import router from './router.js';

//导入axios插件
import axios from 'axios';
Vue.prototype.axios = axios;
 
const vm = new Vue({
    el: '#app',
    
    vuetify: new Vuetify(),

    render: c => c(app),
    router, //挂载路由对象至vm实例
    axios,
})