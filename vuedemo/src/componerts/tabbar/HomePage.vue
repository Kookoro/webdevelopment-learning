<template>
  <div>
    <mt-swipe :auto="4000" :continuous="true">
      <mt-swipe-item v-for="item in imgList" :key="item.url">
        <img :src="item" />
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <v-hover>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <v-icon class="fontsetsize">mdi-television-guide</v-icon>
            <div class="mui-media-body">新闻资讯</div>
          </a>
        </li>
      </v-hover>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <v-icon class="fontsetsize">mdi-share-variant</v-icon>
          <div class="mui-media-body">图片分享</div> 
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <v-icon class="fontsetsize">mdi-cart-outline</v-icon>
          <div class="mui-media-body">商品购买</div>
        </a>
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
    <button @click="show">查询天气</button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
        <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
        <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
        <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      swipeList: "",
      imgList: [], //保存轮播图的数组
      url: ""
    };
  },
  created() {
    this.getFirstImg();
    this.getSecondImg();
    this.getThirdImg();
  },
  methods: {
    getFirstImg() {
      this.axios
        .get("api/pictures/random/?key=BingEverydayWallpaperPicture")
        .then(result => {
          console.log(result);
          console.log(this.imgList.length);
          if (result.statusText == "OK") {
            this.url = "https://uploadbeta.com/" + result.config.url;
            // this.url = this.swipeList
            this.imgList.push(this.url);
          } else {
            Toast("加载轮播图失败");
          }
        });
    },
    getSecondImg() {
      this.axios.get("api/pictures/random/").then(result => {
        console.log(result);
        console.log(this.imgList.length);
        if (result.statusText == "OK") {
          this.url = "https://uploadbeta.com/" + result.config.url;
          // this.url = this.swipeList
          this.imgList.push(this.url);
        } else {
          Toast("加载轮播图失败");
        }
        this.checkLoad();
      });
    },
    getThirdImg() {
      this.axios.get("https://picsum.photos/1920/1080?random").then(result => {
        console.log(result);
        if (result.status == 200) {
          this.url = "https://picsum.photos/1920/1080?random";
          // this.url = this.swipeList
          this.imgList.push(this.url);
        } else {
          Toast("加载轮播图失败");
        }
      });
    },

    show() {
      this.axios
        .get(
          "https://free-api.heweather.net/s6/weather/now?location=chongqing&key=d4cd9a5af53546188241cffc54acf9b9"
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkLoad() {
      if (this.imgList.length <= 0) {
        return 0;
      } else {
        return 3000;
      }
    }
  }
};
</script> 
<style lang="scss" scoped>
.mint-swipe {
  height: 240px;

  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view.mui-grid-9 {
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  background-color: white
}
.mui-table-view{
  background-color: white;
}
.fontsetsize {
  font-size: 20px;
  color: #466cad;
}
.mui-col-sm-3{
  width: 33.33%;
}
</style>
