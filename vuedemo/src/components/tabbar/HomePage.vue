<template>
  <div>
    <!-- <v-carousel height="240px" cycle 
     hide-delimiter-background>
    
      
   
   <div >
     
     
      <v-carousel-item
      v-for="item in imgList"
      :key="item.url"
      :src="item"
    >
    </v-carousel-item>
    
   </div>
   
    </v-carousel>-->
    <keep-alive>
      <mt-swipe :auto="4000" :continuous="true">
        <img
        :src="imgURL"
          class="loading"
          v-show="flag"
           
        />
        <mt-swipe-item v-for="item in imgList" :key="item.url">
          <img :src="item" @load="loadImage()" />
        </mt-swipe-item>
      </mt-swipe>
    </keep-alive>
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
// import imgURL from '../../images/loading.gif'
export default {
  data() {
    return {
      swipeList: "",
      imgList: [],
      flag:true,
      imgURL:require('../../images/loading.gif')
    };
  },

  mounted() {
    // this.getFirstImg();
    // this.getSecondImg();
    // this.getThirdImg();
    this.getAllImg();
    
  },

  methods: {
    //  setLoading1(xhr){
    //   let loading = 'https://cdn.dribbble.com/users/209788/screenshots/1872662/loading.gif'
    //   this.imgList = xhr.map(item => {
    //     item._src = item.src
    //     item.src = loading
    //     return item
    //   })
    //   setTimeout(() => {
    //     this.imgList = xhr.map(item => {
    //       item.src = item._src
    //       return item
    //     })
    //   }, 2000)
    // },
    // // 图片加载完替换
    // setLoading2(xhr){
    //   let loading = 'https://cdn.dribbble.com/users/209788/screenshots/1872662/loading.gif'
    //   this.imgList = xhr.map(item => {
    //     item._src = item.src
    //     item.src = loading
    //     return item
    //   })
    //   xhr.forEach(item => {
    //     let pic = new Image()
    //     pic.onload = () => {
    //       item.src = item._src
    //     }
    //     pic.src = item._src
    //   })
    // },
    // getXhr(){
    //   let xhr = [
    //     {
    //       src: '/vuedemo/src/images/loading.gif'
    //     }
    //   ]
    //   this.setLoading1(xhr)
    // },
    getFirstImg() {
      console.log("调用第一个接口");
      return this.axios.get(
        "api/pictures/random/?key=BingEverydayWallpaperPicture"
      );
      // .then(result => {
      //   console.log(result);
      //   console.log("ok1");
      //   if (result.statusText == "OK") {
      //     this.url = "https://uploadbeta.com/" + result.config.url;
      //     // this.url = this.swipeList
      //     this.imgList.push(this.url);
      //   } else {
      //     Toast("加载轮播图失败");
      //   }
      // });
    },

    getSecondImg() {
      return this.axios.get("api/pictures/random/");
      // .then(result => {
      //   console.log(result);
      //   console.log("ok2");

      //   if (result.statusText == "OK") {
      //     this.url = "https://uploadbeta.com/" + result.config.url;
      //     // this.url = this.swipeList
      //     this.imgList.push(this.url);
      //   } else {
      //     Toast("加载轮播图失败");
      //   }
      // });
    },
    getThirdImg() {
      console.log("调用第三个接口");
      return this.axios.get("http://lorempixel.com/1600/900/");
      // .then(result => {
      //   console.log(result);
      //   console.log("ok3");
      //   if (result.status == 200) {
      //     this.url = "https://picsum.photos/1920/1080?random";
      //     // this.url = this.swipeList
      //     this.imgList.push(this.url);
      //   } else {
      //     Toast("加载轮播图失败");
      //   }
      // });
    },
    getAllImg() {
      var me = this;

      this.axios.all([me.getFirstImg(), me.getSecondImg()]).then(
        me.axios.spread(function(allTask, allCity) {
          console.log("所有请求完成");
          console.log("请求1结果", allTask);
          console.log("请求2结果", allCity);

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
    loadImage() {
      this.flag = false;
    },
//     ready(pics) {
//     const picsAll = pics.map((imgurl) => {
//         // 仅是为了区分下不同的图片链接
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.src = imgurl;
//             img.onload = () => resolve(imgurl);
//             img.onerror = () => reject(new Error(imgurl + ' load error'));
//         })
//     });
//     Promise.all(picsAll).then(() => {
//         console.log('load all success');
//     }).catch((e) => {
//         console.log(e);
//     })
// }
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
  background-color: white;
}
.mui-table-view {
  background-color: white;
}
.fontsetsize {
  font-size: 20px;
  color: #466cad;
}
.mui-col-sm-3 {
  width: 33.33%;
}
.loading {
  width: 100%;
  height: 100%;
}

</style>
