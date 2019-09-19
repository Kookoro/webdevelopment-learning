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
} from 'mint-ui'; //mint-ui轮播图

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import {
    Button
} from 'mint-ui';
Vue.component(Button.name, Button)
import 'mint-ui/lib/style.css'
//导入mui 
import '../src/lib/mui/css/mui.min.css'

//导入Vuetify ui框架
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
})

// VueAwesomeSwiper 插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
import '../node_modules/swiper/dist/css/swiper.css';




//导入vue-router路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment' //moment格式化时间插件

Vue.filter('dateFormat', (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(dataStr).format(pattern);
})
//导入router.js 
import router from './router.js';

//导入axios插件
import axios from 'axios';
Vue.prototype.axios = axios;

import preview from 'vue-preview';

import Vuex from 'vuex';
Vue.use(Vuex);
var cart = JSON.parse(localStorage.getItem('cart') || '[]')
const store = new Vuex.Store({
    state: {
        //this.$store.state.xxx
        count: 0,
        cart: cart,
            //将购物车中的数据用数组保存
            //id 
            //conut 数量
            //price 价格
            //checked 是否结算 
        
        maxStock: '',
      
    },
    mutations: {
        //操作store中的值，需要调用mutations中的值，不推荐使用$stote.state直接调用
        //防止数据紊乱
        addToCart(state, goods) {
            //加入购物车，将商品信息保存到cart中
            //如果购物车中，有对应商品，name，只需要更新数量
            //如果没有，直接push到cart

            //在购物车中，没有找到对应商品
            var flag = false

            state.cart.some(item => {
                if (item.id == goods.id) {
                    item.count += parseInt(goods.count)
                    flag = true
                    return true
                }
            })
            //如果最终循环完得到的flag还是为false，直接把商品数据push至购物车中
            if (flag === false) {
                state.cart.push(goods)
            }

            //当cart更新后，将其更新至localstorage中
            localStorage.setItem('cart', JSON.stringify(state.cart))

        },
        updateProductInfo(state, productInfo) {
            //修改数量值
            state.cart.some(item => {
                if (item.id == productInfo.id) {
                    item.count = parseInt(productInfo.count)
                    return true
                }
            })
            //修改完商品数量后保存至localstorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        getStock(state, max) {
            state.maxStock = max;

        },
        removeFromCart(state, id) {
            state.cart.some(item => {
                if (item.id == id) {
                    state.cart.splice(this.i, 1)
                    return true;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateProductChecked(state,info){
            state.cart.some(item=>{
                if(item.id == info.id){
                    item.checked = info.checked
                }
            }) 
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        checkAll(state,data){
            this.state.cart.some(item=>{
                item.checked = data;
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
       
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.cart.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getProductCount(state) {
            var o = {};
            state.cart.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getProductChecked(state){
            var o = {}
            state.cart.forEach(item=>{
                o[item.id] = item.checked;
            })
            return o;
        },
        getProductCountAndAmount(state){
            var e = {
                count:0,
                amount:0,
            }
            state.cart.forEach(item=>{
                if(item.checked){
                    e.count += item.count
                    e.amount += item.price * item.count
                }
            })
            return e;
        }
    }
})
// 图片预览插件
Vue.use(preview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {
        top: 0,
        bottom: 0
    },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})


const vm = new Vue({
    el: '#app',

    vuetify: new Vuetify(),

    render: c => c(app),
    router, //挂载路由对象至vm实例
    axios, //挂载axios
    store, //挂载store
})