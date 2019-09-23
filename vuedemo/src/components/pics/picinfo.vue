<template>
  <div class="picInfo-container">
    <h3>{{picInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{picInfo.add_time | dateFormat }}</span>
      <span>点击:{{ picInfo.click}}次</span>
    </p>
    <v-divider></v-divider>
    <!-- 缩略图区域  -->
    <div class="preview-container">
      <vue-preview :slides="list"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content display-4" v-html="picInfo.content"></div>
    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>-
    <back-to-top></back-to-top>
  </div>
</template>
<script>
import comment from "../subcomponent/comment.vue";
import backtotop from "../subcomponent/backtotop.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      picInfo: {},
      list: []
    };
  },
  created() {
    this.getPicInfo(); //调用方法获取数据
    this.getThumbs();
  },
  methods: {
   
    getPicInfo() {
      //获取图片详情、
      this.axios
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(result => {

          if (result.data.status === 0) {
            this.picInfo = result.data.message[0];
          }
        });
    },
    getThumbs() {
      //获取缩略图
      this.axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            //循环每个图片数据，不全图片的宽高
            result.data.message.forEach(item => {
              item.w = 1000;
              item.h = 720;
              item.src = item.src; //大图
              item.msrc = item.src; //小图
            });
            this.list = result.data.message;
          }
        });
    }
  },
  components: {
    "cmt-box": comment,
    "back-to-top": backtotop
  }
};
</script>
<style lang="scss" scoped>
.picInfo-container {
  padding: 5px;
  margin-bottom: 56px;

  .preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
   
  }

  h3 {
    color: #6e6e6e;
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    padding-top: 10px;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .my-gallery {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  img {
    margin: 0 auto;
  }
}
</style>