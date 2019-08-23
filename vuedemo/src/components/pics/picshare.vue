<template>
  <div>
    <v-tabs fixed-tabs background-color="white" centered>
      <v-tab
        class="fix"
        v-for="item in category"
        :key="item.id"
        @click="getPicListByCateId(item.id)"
      >{{item.title}}</v-tab>
    </v-tabs>
    
    <back-to-top-button></back-to-top-button>
    <v-card class="mx-auto" max-width="100%" v-for="pic in picList" :key="pic.id">
      <v-img class="white--text" :src="pic.img_url"></v-img>

      <v-card-text>
        <span>{{pic.seo_keywords}}</span>
        <br />
        <span class="text--primary">
          <span>{{pic.add_time |dateFormat('YYYY-MM-DD')}}</span>
          <br />
          <span>{{pic.seo_description}}</span>
        </span>
      </v-card-text>

      <v-card-actions>  
        <v-btn text color="#590de1">Share</v-btn>
        <router-link :to="'/homepage/picInfo/'+ pic.id">
          <v-btn text color="orange">Details</v-btn>
        </router-link>
        
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import backtotop from "../subcomponent/backtotop.vue"
export default {
  data() {
    return {
      category: [], //所有分类的列表数组
      picList: [], //图片列表的数组

    };
  },
  created() {
    this.getAllCategory();
    this.getPicListByCateId(0);
  },
 
  methods: {
    getAllCategory() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(result => {
          console.log(result);
          if (result.data.status === 0) {
            //手动拼接完整的分类
            result.data.message.unshift({ title: "全部", id: 0 });
            this.category = result.data.message;
          } else {
            Toast("获取图片失败！");
          }
        });
    },
    getPicListByCateId(cateId) {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getimages/" + cateId)
        .then(result => {
          console.log(result);
          if (result.data.status === 0) {
            this.picList = result.data.message;
          }
        });
    },
    
  },
  components:{
    "back-to-top-button":backtotop
  }
};
</script>
<style lang="scss" scoped>
.v-tabs {
  position: fixed;
  z-index: 9999;
}
.v-card{
  margin: 20px 10px;
}
.mx-auto:nth-child(3) {
  padding-top: 48px;
  margin-top: 0px;
}

* {
  touch-action: pan-y;
}

  

</style>