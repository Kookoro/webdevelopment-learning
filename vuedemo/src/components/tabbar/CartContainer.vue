<template>
  <div class="cart-container">
    <div class="productlist">
      <v-card color="white" v-for="(item,i) in productList" :key="item.id">
        <div class="left-select-btn">
          <v-checkbox
            off-icon="mdi-checkbox-blank-circle-outline"
            on-icon="mdi-checkbox-marked-circle"
            color="#6e5b98"
            hide-details
            v-model="$store.getters.getProductChecked[item.id]"
            @change="checkedChanged(item.id,$store.getters.getProductChecked[item.id]);checkAllChange()"
          ></v-checkbox>
        </div>
        <div class="right-product-info">
          <div class="product-pic">
            <img :src="item.thumb_path" />
          </div>
          <div class="product">
            <v-btn class="delete" elevation="0" color="#ffffff" @click.prevent="remove(item.id,i)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="name">
              <span>{{item.title}}</span>
            </div>
            <div class="right-bottom">
              <div class="price">
                <span>¥ {{item.sell_price}}</span>
              </div>
              <div class="numberbox">
                <numberbox
                  :initcount="$store.getters.getProductCount[item.id]"
                  :min="1"
                  :cartactive="cartactive"
                  :max="$store.state.cart.maxStock"
                  :productId="item.id"
                ></numberbox>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <v-divider></v-divider>
      <p></p>
    </div>

    <div class="checkstand">
      <div class="select-all">
        <v-checkbox label="全选" color="#6e5b98" v-model="isChecked"  hide-details @change="selectAll"></v-checkbox>
      </div>
      <div class="rightplace">
        <div class="total-price">
          合计:
          <span>￥{{$store.getters.getProductCountAndAmount.amount}}</span>
        </div>
        <div class="settle-btn">
          <v-btn color="#6e5b98" dark>
            <span>结算({{$store.getters.getProductCountAndAmount.count}})</span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// Vue.use(Vuetify)
import numberbox from "../subcomponent/numberbox.vue";
export default {
  data() {
    return {
      dialog: false,
      routename: "",
      switch1: true,
      value: 1,
      productList: [],
      cartactive: true,
     checked: false,
     isChecked:false,
     lastRouterName:''
    };
  },
  created() {
    this.getProductlist();
  },
  
  methods: {
    checkAllChange(){
      if(this.$store.state.cart.findIndex(target=>target.checked === false)===-1){
        this.isChecked=true;
      }else{
        this.isChecked=false;
       
      }
    },
    getProductlist() {
      console.log("121");
      var idArr = [];
      this.$store.state.cart.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      this.axios
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(result => {
          if (result.data.status === 0) {
            this.productList = result.data.message;
          }
        });
    },
    remove(id, index) {
      //删除
      this.productList.splice(index, 1);
      this.$store.commit("removeFromCart", id);
    },
    checkedChanged(id, val) {
      console.log(id + "---" + val);
      this.$store.commit("updateProductChecked", { id, checked: val });
    },
    selectAll() {
      if(this.$store.state.cart.findIndex(target=>target.checked === false)===-1){
        this.isChecked=false;
        this.checked = false;
        this.$store.commit("checkAll", this.checked); 
      }else{
       this.checked = true;
       this.isChecked = true;
       this.$store.commit("checkAll", this.checked); 
       
      }
      // this.isChecked = !this.isChecked;
      // this.checked = !this.checked
      // this.$store.commit("checkAll", this.checked); 
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight * 0.2 + "px";
    }
  },
  components: {
    numberbox
  },

 
};
</script>
<style lang="scss">
.cart-container {
  padding-top: 20px;

  margin-bottom: 112px;
  padding-bottom: 10px;

  .v-card {
    height: 150px;
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    display: flex;
    flex-direction: row;

    .left-select-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-left: 5px;
      .v-input {
        margin: 0;
        .v-icon {
          color: #bebebe !important;
          font-size: 19px;
        }
      }
    }
    .right-product-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      .product-pic {
        display: flex;
        align-items: Center;
        width: 6rem;

        img {
          width: 6rem;
        }
      }
      .product {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 5px 0;
        margin: 10px;

        .delete {
          position: absolute;
          top: 0;
          right: 5px;
          padding: 0;

          min-width: 20px;

          .v-icon {
            font-size: 16px;
            color: #757575;
          }
        }
        .right-bottom {
          display: flex;

          justify-content: space-between;
          align-items: flex-end;
          .price {
            padding-bottom: 0.2rem;
            span {
              color: red;
            }
          }
          .numberbox {
            bottom: 0;
            right: 10px;
            .v-btn {
              padding: 0;
              min-width: 10px;
              height: 20px;
            }
            input {
              width: 28px;
              height: 28px;
              font-size: 12px;
              margin-bottom: 0;
              color: #757575;
              padding: 0;
            }
            .v-icon {
              color: #757575;
              font-size: 12px;
            }
          }
        }

        .name {
          height: 100%;
          width: 90%;
          span {
            display: block;
            word-break: break-all;
            overflow: hidden;
          }
        }
      }
    }
  }
}

.checkstand {
  background-color: white;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 56px;
  z-index: 10000;
  height: 56px;
  .select-all {
    height: 100%;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .v-input--selection-controls {
      margin-top: 0;
    }
  }
  .rightplace {
    display: flex;
    flex-direction: row;
    .total-price {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      color: #757575;
      font-size: 16px;
      span {
        color: red;
      }
    }
    .settle-btn {
      display: flex;
      align-items: center;
      justify-content: center;

      .v-btn {
        height: 75%;
        border-radius: 20px;
        width: 80px;
        padding: 0;
        margin-right: 0.4em;
      }
    }
  }
}
</style>  