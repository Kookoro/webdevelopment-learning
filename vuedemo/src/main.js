//入口 
import Vue from 'vue'



import app from './App.vue'

import VueRouter from 'vue-router'

import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
import '../src/lib/mui/css/mui.min.css'
const vm = new Vue({
    el: '#app',

    render: c => c(app),
}) 