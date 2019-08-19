<template>
    <div>
      <h3>发表评论</h3>
      <hr>
      <!-- <textarea placeholder="请输入评论内容（最多120字）" maxlength="120"></textarea> -->
       <v-col cols="12" md="6" >
        <v-textarea
          outlined
          name="input-7-4"
          label="评论"
          auto-grow
          height="130px"
          color="success"
        ></v-textarea>
      </v-col>
        <mt-button type="primary" size="large">发表评论</mt-button>
      <div class="cmt-list">
        <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card
    max-width="500"
    class="mx-auto"
  >
   

    <v-list two-line>
      <v-list-item-group
       
        multiple
        active-class="pink--text"
      >
        <template v-for="item in comments">
          <v-list-item :key="item.add_time">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.user_name"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.content"></v-list-item-subtitle>
                
              </v-list-item-content>

              <v-list-item-action>
               <p>{{item.add_time | dateFormat('YYYY-MM-DD')}}</p>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-thumb-up-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow"
                >
                  mdi-thumb-up
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

         
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
import { Toast } from "mint-ui" 
export default {
    data: () => ({
      page:1,
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
      pageIndex:1,
      comments:[]
    }),
    created() {
      this.getComments() 
    },
    methods: {
      getComments(){
        this.axios
        .get("http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
        .then(result => { 
          console.log(result);
          if (result.data.status === 0) {
          //获取更多评论时，将新获取的数据添加在旧数据之后，而不是覆盖
          this.comments = this.comments.concat(result.data.message)
          // this.comments = result.data.message; //如果没有失败将数据保存到data上
          } else {
            Toast("获取评论列表失败");
          }
        });
      },
      getMoreCommit(){
        this.pageIndex ++ ;
        this.getComments();
      }
    },
    props:["id"]
}
</script>
<style scoped>
.col-12{
  padding-bottom: 0; 
  
}
a{
  font-size: 13px;
  display: block;
  text-align: center;
  padding-bottom: 10px;

}
.v-input{
  color: #eeeeee
}
</style> 