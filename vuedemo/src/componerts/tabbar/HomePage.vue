<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imgList" :key="item.url">
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
    <button @click="show">查询天气</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      swipeList: "",
      imgList: [
        
      ], //保存轮播图的数组
      url:'',
    };
  },
  created() {
    this.getFirstImg();
     this.getSecondImg();
     
    
    
  }, 
  methods: {
    getFirstImg() {
     
      this.axios.get("api/pictures/random/?key=BingEverydayWallpaperPicture").then(result => {
          console.log(result);
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
        if (result.statusText == "OK") {
          this.url = "https://uploadbeta.com/" + result.config.url;
          // this.url = this.swipeList
          this.imgList.push(this.url);
          
        } else {
          Toast("加载轮播图失败");
        }
      });
    },
    getThirdImg() {
      
       this.axios.get("api/pictures/random/?key=flower").then(result => {
        console.log(result);
        if (result.statusText == "OK") {
          this.url = "https://uploadbeta.com/" + result.config.url;
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
    deferLoadImg() {
      setTimeout(this.getswipe(), 1000);
    }
  }
};
</script> 
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item{
    background-color: salmon;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
