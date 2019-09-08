<template>
  <div class="product-detail-container">
    <!-- 轮播图区域 -->
    <v-card class="mx-auto" max-width="400">
      <div class="pic-container">
        <swiper :picList="imgList2" :isfull="false"></swiper>
      </div>
    </v-card>
    <!-- 商品购买区域 -->
     <v-card class="mx-auto" max-width="400">
      <v-card-text>
        <span class="now-price">￥2799</span>
        <br />
         <span class="old-price"> 
          <del>￥2399</del>&nbsp;&nbsp;
         
          </span>
           <br />
        <span>
         

          <span class="text--primary">
            <span>标题</span>
            <br />销售价：
            <span>￥2199</span>
          </span>
          <br />
          <span>购买数量</span>
          <p> 
             <!-- <v-btn color="#6e5b98" dark>加入购物车</v-btn>  -->

            <v-bottom-sheet >
              <template v-slot:activator="{ on }">
                <v-btn color="#6e5b98" dark v-on="on">加入购物车</v-btn>
              </template>
              <v-sheet class="text-center" height="200px">
                <div class="numberbox-container">
                  <span>购买数量:</span>
                  <numberbox v-model="value" :max="99" :min="1"></numberbox>
                </div>
                <div>The basic usage of v-bottom-sheet. Almost any content can be placed inside this component</div>
              </v-sheet>
            </v-bottom-sheet> 
             <v-btn color="#6e5b98" dark>立即购买</v-btn>
          </p>
        </span>
      </v-card-text>

      <v-btn text color="#">
        <v-icon>mdi-star</v-icon>收藏
      </v-btn>
      <v-btn text>
        <v-icon>mdi-share</v-icon>分享
      </v-btn>
    </v-card>
    <!-- 商品描述区域 -->
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-text>
        <span>Number 10</span>
        <br />
        <span class="text--primary">
          <span>Whitehaven Beach</span>
          <br />
          <span>Whitsunday Island, Whitsunday Islands</span>
        </span>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="orange">Share</v-btn>
        <v-btn text color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card> 
  </div> 
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponent/swiper.vue";
//导入加减框组件
import numberbox from "../subcomponent/numberbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的ID挂载到data中
      imgList: [], //获取到的图片列表数组
      imgList2: [], //处理后的数组
      value: 1,
     
    
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    getImg() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            //循环数组，为item添加img属性

            result.data.message.forEach(item => {
              this.imgList2.push(item.src);
            });
          }
        });
    },
    doAlert: function(val) {
      alert(val);
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>
<style lang="scss" scoped>
.pic-container {
  position: relative;
  left: 50%;
  max-width: 600px;
  transform: translateX(-50%);
}
.product-detail-container {
  
  text-align: center;
  .v-card {
    display: inline-block;
    min-width: 98%;
  }
}
.now-price {
  color: #d50000;
  font-size: 20px;
  font-weight: bold;
  left: 0;
  position: absolute;
  display: block;
}
.old-price{
  font-size: 12px;
  left: 0;
  position: absolute;
}
.numberbox-container{
  display: flex;
  justify-content: flex-start;
  span{
    display: inline-block;
    margin-left: 8px;
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #757575
  }
}
</style>