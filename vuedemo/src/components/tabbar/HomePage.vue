<template>
  <div>
    <back-to-top-button></back-to-top-button>
    <keep-alive>
      <mt-swipe :auto="4000" :continuous="true">
        <img :src="imgURL" class="loading" v-show="flag" />
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
    <audio
      id="audio"
     
      
      src="https://v1.itooi.cn/netease/url?id=498187&quality=flac"
    ></audio>
    <div>
      <div class="text-center">
        <v-bottom-sheet inset>
          <template v-slot:activator="{ on }">
            <v-btn light v-on="on">Open Player</v-btn>
          </template>
          <v-card tile>
            <v-progress-linear v-model="progress" color="#6e5b98"></v-progress-linear>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>βios</v-list-item-title>
                  <v-list-item-subtitle>小林未郁</v-list-item-subtitle>
                </v-list-item-content>

                <v-spacer></v-spacer>

                <v-list-item-icon>
                  <v-btn icon small>
                    <v-icon>mdi-skip-previous</v-icon>
                  </v-btn>
                </v-list-item-icon>

                <v-list-item-icon >
                  <v-btn icon   small @click="changeStart">
                    <v-icon v-show="downIcon">mdi-play</v-icon>
                     <v-icon v-show="!downIcon">mdi-pause</v-icon>

                  </v-btn>
                </v-list-item-icon>

                <v-list-item-icon class="repair" >
                  <v-btn  small icon>
                    <v-icon>mdi-skip-next</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>
    </div>
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
import backtotop from "../subcomponent/backtotop.vue";

export default {
  data() {
    return {
      swipeList: "",
      imgList: [],
      flag: true,
      imgURL: require("../../images/loading.gif"),
      playedTime: 0,
      isStore:true,
      progress:0,
      downIcon: true
    };
  },

  mounted() {
    // this.getFirstImg();
    // this.getSecondImg();
    // this.getThirdImg();
    this.getAllImg();
    document.getElementById('audio').pause();
    this.changeProgress();
  },

  methods: {
    getFirstImg() {
      console.log("调用第一个接口");
      return this.axios.get(
        "api/pictures/random/?key=BingEverydayWallpaperPicture"
      );
    },

    getSecondImg() {
      return this.axios.get("api/pictures/random/");
    },
    getThirdImg() {
      console.log("调用第三个接口");
      return this.axios.get("http://lorempixel.com/1600/900/");
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
    getmusic() {
      this.axios
        .get("https://v1.itooi.cn/netease/song?id=1304688448")
        .then(result => {
          console.log(result);
        });
    },
    changeStart(){
      this.isStore = !this.isStore;
      const audio = document.getElementById('audio')
      if(!this.isStore){
        audio.play();
        this.downIcon = !this.downIcon
      }else{
        audio.pause();
         this.downIcon = !this.downIcon
      }
    }, 
    changeProgress(){
      const audio = document.getElementById('audio');
      const timer = setInterval(()=>{
        const numbers = audio.currentTime / audio.duration
        let perNumber = (numbers * 100).toFixed(2)
        if(perNumber >= 100){
          this.isStore = true
          this.progress = 0
          clearInterval(timer)
        }
        this.progress = perNumber
      },30)
    },
    
    // playMusic() {
    //   alert("ok");
    //   let player = document.getElementById("audio");
    //   player.play();
    // },
    // transTime() {
    //   let player = document.getElementById("audio");
    //   this.playedTime = player.currentTime;
    //   var duration = parseInt(this.playedTime);
    //   var minute = parseInt(duration / 60);
    //   var sec = (duration % 60) + "";
    //   var isM0 = ":";
    //   if (minute == 0) {
    //     minute = "00";
    //   } else if (minute < 10) {
    //     minute = "0" + minute;
    //   }
    //   if (sec.length == 1) {
    //     sec = "0" + sec;
    //   }
    //   console.log(minute + isM0 + sec);
    //   return minute + isM0 + sec;
    // },
    // updatelength() {

    //   function updateProgress() {
    //     let audio = document.getElementById("audio"); //js获取的方式
    //     let value = Math.round(
    //       (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100
    //     ); //当前时间/总长 再乘以一个100变成百分数
    //       return value
    //   }
      
    //   this.timer = setInterval(() => {
    //   updateProgress();

    //   }, 1000);
    // }
  },

  components: {
    "back-to-top-button": backtotop
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
.v-list-item__icon:last-of-type:not(:only-child){
  margin-left: 0px;
}
.v-list-item{
  padding: 0px 12px;
}
</style>
