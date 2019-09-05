<template>
  <div class="product-detail-container">
      <!-- 轮播图区域 -->
      <v-card
    class="mx-auto"
    max-width="400"
    
  >
    <div class="pic-container">
        <swiper :picList="imgList2" :isfull="false"></swiper>
    </div>
 
  </v-card>
  <!-- 商品购买区域 -->
  <v-card
    class="mx-auto"
    max-width="400"
  >
   
    <v-card-text>
      <span>Number 10</span><br>
      <span class="text--primary">
        <span>Whitehaven Beach</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="orange"
      >
        Share
      </v-btn>
      <v-btn
        text
        color="orange"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- 商品描述区域 -->
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-text>
      <span>Number 10</span><br>
      <span class="text--primary">
        <span>Whitehaven Beach</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="orange"
      >
        Share
      </v-btn>
      <v-btn
        text
        color="orange"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
//导入轮播图组件
import swiper from '../subcomponent/swiper.vue'
export default {
 data() {
     return {
         id:this.$route.params.id,//将路由参数对象中的ID挂载到data中
         imgList:[],//获取到的图片列表数组
         imgList2:[]//处理后的数组
     }
 },
 created() {
     this.getImg();
 },
 methods: {
     getImg(){
         this.axios.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
         .then(result=>{
             if(result.data.status === 0)
             {
                 //循环数组，为item添加img属性
                 
                 result.data.message.forEach(item=>{
                     this.imgList2.push(item.src)
                 })
             }
         })
     }
 },
 components:{
     swiper
 }
}
</script>
<style lang="scss" scoped>
  .pic-container{
  
   max-width: 600px;
   text-align: center;
  }
  .product-detail-container{
      position: absolute;
      padding: 0 1.5%;
  
  }
</style>