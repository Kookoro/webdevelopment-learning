<template>
  <div class="app-container" id="scrollWrap">
    <div>
      <v-app-bar color="#725a9c" height="45px" fixed>
        <div class="my-2">
          <v-btn class="title" text normal color="primary" @click="goback">
            <v-icon>mdi-chevron-left</v-icon>vuedemo
          </v-btn>
        </div>
        <audio id="audio"></audio>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>

    <transition name="fade" mode="out-in">
      <router-view class="main"></router-view>
    </transition>

    <v-bottom-navigation v-model="defaultBtn" class="footer" color="#7659a0">
      <router-link tag="div" to="/homepage" class="reset-height">
        <v-btn value="homepage">
          <span>首页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link tag="div" to="/search" class="reset-height">
        <v-btn value="search">
          <span>搜索</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </router-link>

      <router-link tag="div" to="/cart" class="reset-height">
        <v-btn value="cart">
          <span>购物车</span>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </router-link>

      <router-link tag="div" to="/account" class="reset-height">
        <v-btn value="account">
          <span>用户</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </div>
</template> 
<script>


export default {
  

  data() {
    return {
      showNav: true,
      message: "",
      defaultBtn: "homepage"
    };
  },
  methods: {
    goback() {
      //返回上一页
      this.$router.go(-1);
      this.defaultBtn = "homepage";
    }
  },
  
};
</script>  
 
<style scoped>
html,body{
	margin: 0;
	height: 100%;
	width: 100%;
	-webkit-overflow-scrolling: touch;
	-webkit-overflow-scrolling: touch;
}
.app-container {
  overflow-x: auto;
  margin-top: 45px;
  
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.reset-height {
  height: 100%;
}
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.title {
  width: 100px;
}

</style>  
