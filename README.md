# webdeveloping/vuedemo

### 前端技术栈：
 1.Vue.js 2.6.10 [vue.js](https://cn.vuejs.org/)  

 2.Webpack 构建工具 [webpack](https://webpack.js.org/)  

 3.Mint-ui框架（按需引入） [Mint-ui](http://mint-ui.github.io/)  

 4 Vuetify ui框架 以及对应的谷歌Meterial design icon图标[Vuetify](https://vuetifyjs.comzh-Hans)  
 5 vue-router [vue-router](https://router.vuejs.org)

 6. axios[axios](https://github.com/axios/axios)  
## 制作首页app组件

1.完成header区域，采用mint-ui组件
2.制作底部Tabbar区域，采用了~~mui~~ => Vuetify 
 
3.在中间区域放置`router-view`展示路由匹配到的组件 
4.修改了布局，调整图标大小 
5.轮播图组件 ~~vuetify~~mint-ui
### 轮播图加载
1.调用2个公共图片API接口，通过 `axios` 并发请求获取图片url保存至相应轮播图数组中
2.轮播图图片加载中通过本地添加一张loading图片代替加载时白屏，提高体验
## 添加了九宫格区域
mui  
图标:mdn-icon
## 改造了 新闻资讯 路由链接

## 新闻资讯 页面 制作
1.绘制页面 ，使用vuetify组件中的`v-card`
2.使用 axios 获取数据
3.渲染实际数据
## 实现新闻资讯列表 点击 跳转到新闻详情
1.将列表中的每一项改造为`router-link`，同时在跳转时提供唯一的id标识符
2.创建新闻的组件页面 `NewsInfo.vue`
3.在`router.js`路由模块中，将新闻详情的路由地址 与 组件页面对应起来
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
 2.点击加载更多，上`pageIndex++`，然后重新调用`getComments()`方法重新获取评论页数据
 3.防止新数据覆盖旧数据情况，在点击加载更多时，获取到新数据，调用数组方法concat()，拼接新数组

 ## header实现点击标题实现返回上一级功能

 ## 发表评论
1.把文本库做双向数据绑定
2.为发表按钮绑定点击事件
3.校验评论内容是否为空，若为空，则返回`Toast()`
4.通过`axios`发送`post`请求将内容提交至服务器
5.当发表评论后，~~重新刷新列表~~，查看最新评论
 +当评论成功后，手动拼接一个最新评论对象，调用unshift方法将最新评论追加到`data`中`comments`开头

 ## 改造图片分享按钮为路由链接


 ## 绘制图片列表组件页面结构，并设置样式
 1.顶部横向tabbar
 2.图片列表
 ### 顶部滚动条
 1.vuetify中的`v-tabs`组件
 2.获取请求信息渲染数据
## 获取所有分类，并渲染分类列表
点击顶部tabbar获取相应分类id渲染相关列表图片 
## 制作图片列表区域
~1.懒加载~

2渲染图片列表数据
## 音乐播放组件
1.进度条组件
   拖动进度条改变播放时间

2.显示播放时间以及总时间
3.环形进度条设计


## 实现 detail 跳转图片详情页面

##实现 详情页面 布局与样式

## 实现 图片详情页 缩略图功能 
1. 使用第三方插件vue-preview
2. 获取所有图片列表 v-for命令渲染
3. foreach循环数组 给定宽高(每一个图片数组对象中需要w与h属性)
4. image属性中的class属性不能去掉
## 商品列表页


## 在ios上调试页面
 借助google/`ios-webkit-debug-proxy`调试h5界面 (mac环境)
 1.安装 
    +