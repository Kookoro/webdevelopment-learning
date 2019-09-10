<template>
  <v-app>
    <div class="product-detail-container">
      <!-- 轮播图区域 -->

      <div>
        <swiper :picList="imgList2" :isfull="false"></swiper>
      </div>

      <!-- 商品购买区域 -->
      <v-card class="mx-auto" max-width="400">
        <v-card-text>
          <span class="now-price">￥{{productinfo.sell_price}}</span>
          <br />
          <span class="old-price">
            价格
            <del>￥{{productinfo.market_price}}</del>
            &nbsp;&nbsp;
          </span>
          <br />
          <div class="content-container">
            <div class>
              <div class="text--primary">
                <v-card-title class="align-end fill-height" >{{productinfo.title}}</v-card-title>
                
              </div>
            </div>
            <!-- <v-btn color="#6e5b98" dark>加入购物车</v-btn>  -->
            <div class="operate-container">
              <div class="operate-left">
                <v-btn text small color="#757575">
                  <v-icon>mdi-star-outline</v-icon>收藏
                </v-btn>
                <v-btn text small color="#757575">
                  <v-icon>mdi-share-outline</v-icon>分享
                </v-btn>
              </div>
              <div class="operate-right">
                <v-bottom-sheet hide-overlay>
                  <template v-slot:activator="{ on }">
                    <v-btn color="#77699c" dark v-on="on" depressed>加入购物车</v-btn>
                  </template>
                  <v-sheet class="shoppingcart-container" height="200px">
                    <div class="numberbox-container">
                      <span>购买数量:</span>
                      <numberbox
                        v-on:listenToChildEvent="showMsgFromChild"
                        v-model="value"
                        :max="99"
                        :min="1"
                      ></numberbox>
                    </div>
                    <span style>颜色分类</span>

                    <div></div>
                    <v-btn class="confirm-btn" color="#6e5b98" dark>确定</v-btn>
                  </v-sheet>
                </v-bottom-sheet>
                <v-btn color="#6e5b98" dark depressed>立即购买</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <!-- 商品描述区域 -->
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="align-end fill-height">商品参数</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="product-describe">
          <span>商品货号:{{productinfo.goods_no}}</span>

          <span>库存情况:{{productinfo.stock_quantity}}件</span>

          <span>上架时间:{{productinfo.add_time | dateFormat }}</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="product-operate-button">
          <v-btn color="#6e5b98" dark @click="goDesc(id)">查看详情</v-btn>
          <v-btn color="#6e5b98" outlined dark @click="goDesc(id)">商品评论</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponent/swiper.vue";
//导入加减框组件
import numberbox from "../subcomponent/numberbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的ID挂载到data中
      imgList: [], //获取到的图片列表数组
      imgList2: [], //处理后的图片列表数组
      value: 1,
      productinfo: {} //获取到的图片列表信息
    };
  },
  created() {
    this.getImg();
    this.getProductInfo();
  },
  methods: {
    getImg() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            //循环数组，为item添加img属性
            result.data.message.forEach(item => {
              this.imgList2.push(item.src);
            });
          }
        });
    },
    doAlert: function(val) {
      alert(val);
    },
    showMsgFromChild(data) {
      this.value = data;
    },
    getProductInfo() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            this.productinfo = result.data.message[0];
          }
        });
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>
<style lang="scss" scoped>
.pic-container {
  position: relative;
  left: 50%;
  max-width: 600px;
  transform: translateX(-50%);
}
.product-detail-container {
  text-align: center;
  .v-card {
    display: inline-block;
    min-width: 98%;
    margin-top: 5px;
  }
}
.now-price {
  color: #d50000;
  font-size: 20px;
  font-weight: bold;
  left: 0;
  position: absolute;
  display: block;
}
.old-price {
  font-size: 14px;
  left: 0;
  position: absolute;
}
.numberbox-container {
  display: flex;
  justify-content: flex-start;
  span {
    display: inline-block;
    margin-left: 8px;
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #757575;
  }
}

.v-btn__content {
  display: flex;
}
.operate-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .operate-right {
    display: flex;
    padding-right: 5px;
    .v-btn:nth-child(1) {
      border-radius: 18px 0 0 18px;
    }
    .v-btn:nth-child(3) {
      border-radius: 0 18px 18px 0;
    }
  }
  .operate-left {
    display: flex;
  }
}
.v-card__text {
  padding: 0;
}
.product-describe {
  display: flex;
  flex-direction: column;
  text-align: left;
  span {
    margin: 10px;
  }
}
.shoppingcart-container {
  .confirm-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    border-radius: 18px;
  }
}
.product-operate-button {
  display: flex;
  flex-direction: column;
  button {
    width: 100%;
    margin: 5px;
  }
}
</style>