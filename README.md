# active-product/vuedemo

### 前端技术栈：
 1.Vue.js 2.6.10 [vue.js](https://cn.vuejs.org/)
 2.Webpack 构建工具 [webpack](https://webpack.js.org/)
 3.Mint-ui框架（按需引入） [Mint-ui](http://mint-ui.github.io/)
 4 Vuetidy ui框架 以及对应的谷歌Meterial design icon图标[Vuetify](https://vuetifyjs.com/zh-Hans/)
 5 vue-router [vue-router](https://router.vuejs.org)
 6. axios[axios](https://github.com/axios/axios)
## 制作首页app组件

1.完成header区域，采用mint-ui组件
2.制作底部Tabbar区域，采用了~~mui~~ => Vuetify 
 
3.在中间区域放置router-view展示路由匹配到的组件 
4.修改了布局，调整图标大小 
## 添加了九宫格区域
mui
## 改造了 新闻资讯 路由链接
## 新闻资讯 页面 制作
1.绘制页面 ，使用vuetify组件中的v-card
2.使用 axios 获取数据
3.渲染实际数据
## 实现新闻资讯列表 点击 跳转到新闻详情
1.将列表中的每一项改造为routerlink，同时在跳转时提供唯一的id标识符
2.创建新闻的组件页面 NewsInfo.vue
3.在router.js路由模块中，将新闻详情的路由地址 与 组件页面对应起来
## 实现新闻详情的数据渲染 以及布局

## 单独封装一个comment.vue组件
1.创建一个 单独的 comment.vue模板
2.在需要使用时，手动导入 comment.vue
 + `import comment from './comment.vue'`
 3.在父组件中，使用`components`属性,将导入的comment组件，注册为子组件
 4.将注册子组件时的组册名称以标签形式在页面中引入
 ## 获取所有的评论数据显示到页面中

 ## 实现点击加载更多评论的功能
 1.给加载更多按钮，绑定点击事件，在事件中请求下一页数据
 2.点击加载更多，上pageIndex++，然后重新调用getComments()方法重新获取评论页数据
 3.防止新数据覆盖旧数据情况，在点击加载更多时，获取到新数据，调用数组方法concat()，拼接新数组

 ##header实现点击标题实现返回上一级功能