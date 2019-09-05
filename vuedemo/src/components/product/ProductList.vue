<template>
  <div class="product-list">
    <router-link tag="div" :to="'/homepage/productinfo/'+ item.id" class="product-item" v-for="item in productlist" :key="item.id">
      <img :src="item.img_url" class="product-pic" alt="加载失败" />
      <h1 class="title">{{item.title}}</h1>
      <div class="product-info">
        <p class="product-price">
          <span class="now-price">￥{{item.sell_price}}</span>
          <span class="old-price">￥{{item.market_price}}</span>
        </p>
        <p class="product-sell">
          <span>热卖中</span> 
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
     
    </router-link>
    <!-- <div   class="product-item" v-for="item in productlist" :key="item.id" @click="toDetail(item.id)">
      <img :src="item.img_url" class="product-pic" alt="加载失败" />
      <h1 class="title">{{item.title}}</h1>
      <div class="product-info">
        <p class="product-price">
          <span class="now-price">￥{{item.sell_price}}</span>
          <span class="old-price">￥{{item.market_price}}</span>
        </p>
        <p class="product-sell">
          <span>热卖中</span> 
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
     
    </div>  -->
     <v-btn block color="#6e5b98" @click="getMoreProduct" dark>加载更多</v-btn>
  </div>
</template>
<script>
import imgUrl from "../../images/menu1.png";
export default {
  data() {
    return {
      imgUrl,
      pageindex: 1, //分页的页数
      productlist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getProductsList(); //创建后调用请求 获取商品列表
  },
  methods: {
    getProductsList() {
      //axios请求数据 获取商品列表
      this.axios
        .get(
          "http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageindex
        )
        .then(result => {
          if (result.data.status === 0) {
            this.productlist = this.productlist.concat(result.data.message);
          }
        }); 
    },
    getMoreProduct(){
        this.pageindex++;
        this.getProductsList(); 
    },
    // toDetail(id){
    //     //注意区分this.$route与this.$router两个对象
    //     //this.$route是参数对象，所有路由中的参数，params ， query都属于它
    //     //this.$router是一个路由导航对象，能工使用JavaScript代码，实现路由前进后退，跳转到新的URL地址
    //     this.$router.push('/homepage/productinfo/'+id)
    //     // this.$router.push({
    //     //     name:"user",
    //     //     params:{
    //     //         id
    //     //     }
    //     // });
    // }
  }
};
</script>
<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin-bottom: 56px;
  justify-content: space-between;
  .product-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
      height: 154.89px;
    }
    .title {
      font-size: 14px;
    }
    .product-info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .product-price {
        .now-price {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .product-sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>