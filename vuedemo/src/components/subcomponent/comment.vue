<template>
  <div>
    <h3>发表评论</h3>
    <hr />
    <!-- <textarea placeholder="请输入评论内容（最多120字）" maxlength="120"></textarea> -->
    <v-col >
      <v-textarea outlined name="input-7-4" label="评论" auto-grow height="130px" color="success" v-model="message"></v-textarea>
    </v-col>
    <!-- <mt-button class="btn-color" size="large" @click="postComment">发表评论</mt-button> -->

     <v-btn block color="#6e5b98" @click="postComment" dark>发表评论</v-btn>
    <div class="cmt-list">
      <v-row>
        <v-col >
          <v-card max-width="100%" class="mx-auto">
            <v-list  min-width="370px">
              <v-list-item-group multiple  active-class="pink--text">
                <template v-for="item in comments">
                  <v-list-item :key="item.index">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.user_name"></v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="item.content" title="111111"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <p>{{item.add_time | dateFormat('YYYY-MM-DD')}}</p>
                        <v-icon v-if="!active" color="grey lighten-1">mdi-thumb-up-outline</v-icon>

                        <v-icon v-else color="yellow">mdi-thumb-up</v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider :key="item.id"></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
            <a @click="getMoreCommit">加载更多</a>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data: () => ({
    page: 1,
    // items: [
    //   {
    //     action: '2015-12-12',
    //     headline: 'Brunch this weekend?',
    //     title: 'Ali Connors',
    //     subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    //   },
    //   {
    //     action: '2015-12-12',
    //     headline: 'Summer BBQ',
    //     title: 'me, Scrott, Jennifer',
    //     subtitle: "Wish I could come, but I'm out of town this weekend.",
    //   },
    //   {
    //     action: '2015-12-12',
    //     headline: 'Oui oui',
    //     title: 'Sandra Adams',
    //     subtitle: 'Do you have Paris recommendations? Have you ever been?',
    //   },
    //   {
    //     action: '2015-12-12',
    //     headline: 'Birthday gift',
    //     title: 'Trevor Hansen',
    //     subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
    //   },
    //   {
    //     action: '2015-12-12',
    //     headline: 'Recipe to try',
    //     title: 'Britta Holt',
    //     subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    //   },
    // ],
    pageIndex: 1, //页码
    comments: [], //所有的评论数据
    message: "" //评论输入的内容
  }),
  created() {
    this.getComments();
  },
  methods: {
    
    getComments() {
      this.axios
        .get(
          "http://www.liulongbin.top:3005/api/getcomments/" +
            this.id +
            "?pageindex=" +
            this.pageIndex
        )
        .then(result => {
          console.log(result);
          if (result.data.status === 0) {
            //获取更多评论时，将新获取的数据添加在旧数据之后，而不是覆盖
            this.comments = this.comments.concat(result.data.message);
            // this.comments = result.data.message; //如果没有失败将数据保存到data上
          } else {
            Toast("获取评论列表失败");
          }
        });
    },
    getMoreCommit() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.message.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }
      //发表评论
      //参数1:请求的url地址
      //参数2:提交给服务器的数据对象()
      this.axios
        .post(
          "http://www.liulongbin.top:3005/api/postcomment/" +
            this.$route.params.id,
          { content: this.message.trim() }
        )
        .then(result => {
          if (result.data.status === 0) {
            //拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.message.trim()
            };
            this.comments.unshift(cmt);
            this.message = ''; 
          }
        });
    }
    
  },
  props: ["id"]
};
</script>
<style scoped>
.col-12 {
  padding-bottom: 0;
}
a {
  font-size: 13px;
  display: block;
  text-align: center;
  padding-bottom: 10px;
  color:#6e5b98
}
.v-input {
  color: #eeeeee;
}

</style> 