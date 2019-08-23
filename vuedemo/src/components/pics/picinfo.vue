<template>
  <div class="picInfo-container">
    <h3>{{picInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{picInfo.add_time | dateFormat }}</span>
      <span>点击:{{ picInfo.click}}次</span>
    </p>
    <v-divider ></v-divider>
    <!-- 缩略图区域  --> 
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    <!-- 图片内容区域 -->
    <div class="content display-4" v-html="picInfo.content"></div>
    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
    <back-to-top></back-to-top>
  </div>
</template>
<script>
import comment from "../subcomponent/comment.vue"
import backtotop from "../subcomponent/backtotop.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      picInfo:{},
      slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ]
    };
  },
  created() {
      this.getPicInfo();//调用方法获取数据
  },
  methods: {
       handleClose () {
        console.log('close event')
      },
    getPicInfo() {
        //获取图片详情、
        this.axios.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id)
        .then(result=>{
            console.log(result);
            if(result.data.status === 0){
                this.picInfo = result.data.message[0]
            }
        })
    }
  },
  components:{
      'cmt-box':comment,
      'back-to-top':backtotop
  }
};
</script>
<style lang="scss" scoped>
.picInfo-container{

 padding: 5px;
 margin-bottom: 56px;
 h3{
     color:#6e6e6e;
     font-size: 18px;
     text-align: center;
     margin :15px 0;
 }
 .subtitle{
     padding-top: 10px;
     margin: 0;
     display: flex;
     justify-content: space-between
 }
 .content{
     font-size: 13px;
     line-height: 30px;

 }
}
</style>