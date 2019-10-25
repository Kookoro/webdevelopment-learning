<template>
  <div>
    <back-to-top-button></back-to-top-button>

    <div class="fixheight">
      <swiper :picList="imgList" :isfull="true"></swiper>
    </div>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <v-hover>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/homepage/newslist">
            <v-icon class="fontsetsize">mdi-television-guide</v-icon>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
      </v-hover>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/homepage/picshare">
          <v-icon class="fontsetsize">mdi-share-variant</v-icon>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/homepage/productlist">
          <v-icon class="fontsetsize">mdi-cart-outline</v-icon>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <v-icon class="fontsetsize">mdi-message-outline</v-icon>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <v-icon class="fontsetsize">mdi-arrow-right-drop-circle-outline</v-icon>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <v-icon class="fontsetsize">mdi-email-plus-outline</v-icon>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

    <v-app id="app">
      <div class="text-center">
        <v-card>
          <music-view>
            <audio id="audio"></audio>
          </music-view>
        </v-card>
      </div>
    </v-app>
    <div>
      <div class="text-center"></div>
    </div>
    <br />
    <br />
    <br />=

    <div class="circle-bar">
      <div class="circle-bar-left"></div>
      <div class="circle-bar-right"></div>
    </div>
  </div>
</template>
<script>
  import {
    Toast
  } from "mint-ui";
  import backtotop from "../subcomponent/backtotop.vue";
  import slider from "../subcomponent/slider.vue";
  import swiper from "../subcomponent/swiper.vue";

  export default {
    data() {
      return {
        swipeList: "",
        imgList: ["http://api.dujin.org/bing/1920.php"],
        flag: true,
        imgURL: require("../../images/loading.gif"),
        playedTime: 0,
        isStore: true
      };
    },
    created() {
      this.getAllImg();
    },
    methods: {
      getFirstImg() {
        //请求第一张照片

        return this.axios.get(
          "api/pictures/random/?key=BingEverydayWallpaperPicture"
        );
      },
      //请求第二张照片
      getSecondImg() {
        return this.axios.get("api/pictures/random/");
      },
      getThirdImg() {
        ///请求第三张照片
        console.log("调用第三个接口");
        return this.axios.get("http://lorempixel.com/1600/900/");
      },
      getAllImg() {
        //并发请求
        var me = this;
        this.axios.all([me.getFirstImg(), me.getSecondImg()]).then(
          me.axios.spread(function (allTask, allCity) {
            for (let i = 0; i < arguments.length; i++) {
              if ((allTask.status === 200) & (allCity.status === 200)) {
                me.url = "https://uploadbeta.com/" + arguments[i].config.url;

                me.imgList.push(me.url);
              } else {
                Toast("获取轮播图失败");
              }
            }
          })
        );
      },
      //bing/1920.php
      // getimage(){
      //   this.axios.get("https://developers.douban.com/wiki/?title=guide").then(res=>{
      //     console.log(res);
      //   })
      // },

      loadImage() {
        this.flag = false;
        this.interval = 4000;
      }
    },

    components: {
      "back-to-top-button": backtotop,
      "music-view": slider,
      swiper: swiper
    }
  };
</script>
<style lang="scss" scoped>
  .mui-grid-view.mui-grid-9 {
    border: none;

    .mui-table-view-cell {
      background-color: white;
    }
  }

  .mui-table-view {
    background-color: white;
  }

  .fontsetsize {
    font-size: 20px;
    color: #6e5b98;
  }

  .mui-col-sm-3 {
    width: 33.33%;
  }
</style>