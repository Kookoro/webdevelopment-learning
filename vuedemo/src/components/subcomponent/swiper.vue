<!-- 轮播图组件 -->
<template>
  <div>
    <div :style="{height: scrollerHeight}">
      <div class="pic-cover">
        <img :src="imgURL" class="loading" v-show="flag" :style="{height: scrollerHeight}" />
      </div>
      <swiper v-if="picList.length > 1" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in picList" :key="item.id">
          <img :src="item"  class="picstyle" @load="loadImage" :class="{'full':isfull}"/>
        </swiper-slide>
 
        <!-- 这是轮播的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

  
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  props: ["picList","isfull"],

  name: "swiper-view",
  data() {
    return {
      swipeList: "",
     
      flag: true,
      imgURL: require("../../images/loading.gif"),

      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        slidesPerView: 1,

        autoplay: {
          delay: 3000,

          DisableOnInteraction: false
        },
        spaceBetween: 30,

        loop: true
      }
    };
  },
 
  methods: {
    
    setHeight() {
      let imgWidth = document.documentElement.clientWidth;
     
    },
   
    loadImage() {
      this.flag = false;
    }
  },
  computed: {
    //获取设备宽度

    scrollerHeight: function() {
      return window.innerWidth * 0.5625 + "px";
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

.picstyle{
  height: 100%;
}

.pic-cover {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.swiper-container{
  height: 100%;
  
}
.swiper-wiper{
  text-align: center;
  .swiper-slide{
    position: absolute;
    margin: 0 auto;
    margin-right: 0;
  }
}
.full{
  width: 100%;
}
</style>