<template>
  <div>
    <v-tabs fixed-tabs background-color="white" centered>
      <v-tab
        v-for="item in category"
        :key="item.id"
        @click="getPicListByCateId(item.id)"
      >{{item.title}}</v-tab>
    </v-tabs>
    <!-- <ul>
      <li v-for="pic in picList" :key="pic.id">
        <v-img :src="pic.img_url"></v-img>
      </li>
    </ul>-->
    <v-card class="mx-auto" max-width="100%" v-for="pic in picList" :key="pic.id">
      <v-img class="white--text" :src="pic.img_url"></v-img>

      <v-card-text>
        <span>{{pic.seo_keywords}}</span>
        <br />
        <span class="text--primary">
          <span>{{pic.add_time |dateFormat('YYYY-MM-DD')}}</span>
          <br />
          <span>{{pic.content}}</span> 
        </span>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="#590de1">Share</v-btn>
        <v-btn text color="orange">Explore</v-btn>
        
      </v-card-actions>
       <v-divider></v-divider>
    </v-card>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      category: [], //所有分类的列表数组
      picList: [] //图片列表的数组
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
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card {
  margin-top: 10px;
}
 * { touch-action: pan-y; } 
</style>