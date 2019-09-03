<template>
  <div>
   
    
      <div :style="{height: scrollerHeight}">
          <div class="pic-cover" >
          
        <img :src="imgURL" class="loading" v-show="flag" :style="{height: scrollerHeight}"/>
      </div>
        <swiper v-if="imgList.length > 1" :options="swiperOption"  ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->
           <!-- <swiper-slide>111</swiper-slide>
           <swiper-slide>111</swiper-slide>
           <swiper-slide>111</swiper-slide>
           <swiper-slide>111</swiper-slide>
           <swiper-slide>111</swiper-slide> --> 
          
			<swiper-slide v-for="item in imgList" :key="item">
               <img :src="item" class="picstyle" @load="loadImage ">
			</swiper-slide>
            
			<!-- 这是轮播的小圆点 -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
    </div>


   

       
<!--     
        <v-carousel hide-delimiters cycle :interval="interval" tag="div" >
          <img :src="imgURL" class="loading" v-show="flag" />
          <v-carousel-item v-for="item in imgList" :key="item" :src="item" @load="loadImage"></v-carousel-item>
        </v-carousel>
     -->
    
  </div>
</template>
<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {



 name: "swiper-view",
  data() {
    return {
      swipeList: "",
      imgList: [],
      flag: true,
      imgURL: require("../../images/loading.gif"),
      
      swiperOption:{
          pagination:{
              el:'.swiper-pagination'
          },
          slidesPerView:1,
         
          autoplay:{

              delay:3000,
              
              DisableOnInteraction:false,
          },
          spaceBetween:30,
          
          loop:true,
      } 
    };
  },
  created() {
    // this.getFirstImg();
    // this.getSecondImg();
    // this.getThirdImg();
    this.getAllImg();
  },
  methods: {
    setHeight(){
      let imgWidth = document.documentElement.clientWidth;
      console.log(imgWidth);
    },
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
    loadImage() {
      this.flag = false;
      
    },

 
  },
  computed: {
    //获取设备宽度
    
    scrollerHeight: function() {
      return (window.innerWidth*0.5625) + 'px';
    }
  },
   components: {
    swiper,
    swiperSlide

  }
};
</script>
<style lang="scss" scoped>
.loading {
  width: 100%; 

}
.picstyle {
  
  
  width: 100%
}
 
.pic-cover{
  width: 100%; 
  position: absolute;
  z-index: 100;
  
}
</style>