<!-- 加减框组件 -->
<template>
  <div>
    <v-btn
      text
      @click="carthandleDown(cartactive);handleDown(picactive);sendMsgToParent()"
      :disabled="currentValue <= min"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <input type="text" v-show="picactive" v-model="currentValue" @change="handleChange" />
    <input type="text" v-show="cartactive" v-model="cartValue"  />
    <v-btn
      text
      @click="carthandleUp(cartactive); handleUp(picactive);sendMsgToParent()"
      :disabled="currentValue >= max"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template> 
  
<script>
export default {
  props: ["max", "min", "value", "initcount", "picactive", "cartactive", "productId"],
  name: "numberBox",
  data() {
    return {
      currentValue: this.value,
      cartValue: this.initcount
    };
  },
  watch: {
    currentValue: function(val) {
      //currentValue值变动就向父组件传值
      this.$emit("input", val);
      this.$emit("on-change", val);
    },
    value: function(val) {
      //对值进行验证
      this.updataValue(val);
    },
    cartValue(curVal, oldVal) {
        // 实现input连续输入，只发一次请求
         this.cartHandleChange();//检查input值
        clearTimeout(this.timeout);
       
        this.timeout = setTimeout(() => {
          this.countChanged();
         
        }, 300);
    }
  },
  mounted() {
    this.updataValue(this.value);
  },
  methods: {
    carthandleDown(e) {
      if (e) {
        if (this.cartValue <= this.min) {
          return;
        } else {
          this.cartValue -= 1;
        }
      }
    },
   
    carthandleUp(status) {
        console.log(this.max);
      if (status) {
        if (this.cartValue >= this.max) {
          return;
        } else {
            
          this.cartValue += 1;
        }
      }
    },
    countChanged(){
        
        this.$store.commit('updateProductInfo',{id:this.productId,count:this.cartValue})


    },
    handleDown: function(e) {
      //减少
      if (e) {
        if (this.currentValue <= this.min) {
          return;
        } else {
          this.currentValue -= 1;
        }
      }
    },
    handleUp: function(e) {
      //增加

      if (e) {
        if (this.currentValue >= this.max) {
          return;
        } else {
          this.currentValue += 1;
        }
      }
    },
    updataValue: function(val) {
      if (val > this.max) {
        val = this.max;
      }
      if (val < this.min) {
        val = this.min;
      }
      this.currentValue = val;
    },
    handleChange: function(event) {
      //对值进行验证
      var val = event.target.value.trim();
      var max = this.max;
      var min = this.min;
      if (this.isNumber(val)) {
        val = Number(val);
        this.currentValue = val;
        if (val > max) {
          this.currentValue = max;
        } else if (val < min) {
          this.currentValue = min;
        }
      } else {
        this.currentValue = 0;
      }
    },
    cartHandleChange: function(event) {
      //对值进行验证
      console.log(this.cartValue);
      var val = this.cartValue;
      var max = this.$store.state.maxStock;
      var min = this.min;
      if (this.isNumber(val)) {
        val = Number(val);
        this.cartValue = val;
        if (val > max) {
          this.cartValue = max;
        } else if (val < min) {
          this.cartValue = min;
        }
      } else {
        this.cartValue = 0;
      }
    },
    isNumber: function(value) {
      return /^\-?[0-9]+$/.test(value + "");
    },
    sendMsgToParent() {
      this.$emit("listenToChildEvent", this.currentValue);
    }
  },

};
</script>
 
<style scoped>
input {
  width: 43px;
  height: 43px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.show {
  display: none;
}
</style>
