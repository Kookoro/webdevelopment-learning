<template>
  <v-container class="pa-2" fluid>
    <v-row>
      <v-col v-for="(item, i) in newsList" :key="i">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :to="'/homepage/newsinfo/'+item.id"
            dark
            max-height="136px"
            class="mx-auto"
            color="#aaaaaa"
          >
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title class="headline mb-2" v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle v-text="item.zhaiyao"></v-list-item-subtitle>
                <p>{{item.add_time | dateFormat('YYYY-MM-DD')}}</p>
              </v-list-item-content>

              <v-list-item-avatar size="90" tile>
                <v-img :src="item.img_url"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    newsList: []
  }),
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(result => {
          console.log(result);
          if (result.data.status === 0) {
            this.newsList = result.data.message; //如果没有失败将数据保存到data上
          } else {
            Toast("获取新闻列表失败");
          }
        });
    }
  }
};
</script>
<style scoped>
.col {
  padding-bottom: 5px;
  padding-top: 5px;
}
.row {
  margin-bottom: 56px;
}

.v-card:hover {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  -o-box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}
.v-card::before {
  -webkit-filter: blur(10px) contrast(0.8);

  filter: blur(10px) contrast(0.8);
}
p {
  color: white;
}
</style>  