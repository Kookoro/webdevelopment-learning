<template>
<v-row>
   <v-col cols="12" sm="6" offset-sm="3">
  <div class="newsinfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time| dateFormat('YYYY-MM-DD')}}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>

    <!--  --> 
    <comment-box :id="this.id"></comment-box>
  </div>
  <back-to-top-button></back-to-top-button>
  </v-col>
  </v-row> 
  
</template>
<script>
import comment from '../subcomponent/comment.vue'
import backtotop from '../subcomponent/backtotop.vue'
import { Toast } from "mint-ui" 
export default {
    
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
      this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getnew/" + this.id)
        .then(result => {
          
          if (result.data.status === 0) {
            this.newsinfo = result.data.message[0]; //如果没有失败将数据保存到data上
          } else {
            Toast("获取新闻列表失败");
          }
        });
    }
  },
  components:{
    "comment-box":comment,
    "back-to-top-button":backtotop
  }
};

</script>
<style lang="scss" >
.newsinfo-container {
  padding: 0 4px;
  margin-bottom: 56px;
  .title {
    font-size: 20px;
    text-align: center;
    margin: 15px 0;
    color: black;
  }
  .subtitle {
    font-size: 13px;
    color: silver;
    display: flex;
    justify-content: space-between;
  }
  .content {
      width:100%
  }
}
</style>