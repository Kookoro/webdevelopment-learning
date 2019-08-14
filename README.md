# active-product/vuedemo

### 前端技术栈：
 1.Vue.js 2.6.10 [vue.js](https://cn.vuejs.org/ "超链接title")
 2.Webpack 构建工具
 3.Mint-ui框架（按需引入） [Mint-ui](http://mint-ui.github.io/)
 4 Vuetidy ui框架 [Vuetify](https://vuetifyjs.com/zh-Hans/)以及对应的谷歌Meterial design icon图标
 5 vue-router
 6. axios
## 制作首页app组件

1.完成header区域，采用mint-ui组件
2.制作底部Tabbar区域，采用了~~mui~~ => Vuetify 

3.在中间区域放置router-view展示路由匹配到的组件 
4.修改了布局，调整图标大小
##添加了九宫格区域
## 改造了 新闻资讯 路由链接
## 新闻资讯 页面 制作
1.绘制页面 ，使用vuetify组件中的v-card
2.使用 axios 获取数据
3.渲染实际数据
## 实现新闻资讯列表 点击 跳转到新闻详情
1.将列表中的每一项改造为routerlink，同时在跳转时提供唯一的id标识符
2.创建新闻的组件页面 NewsInfo.vue
3.在router.js路由模块中，将新闻详情的路由地址 与 组件页面对应起来