<template>
  <div class="app-container">
    <mt-header fixed title="项目名称"></mt-header>
    <router-view></router-view>
    <!-- <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-contact">
          <span class="mui-badge">9</span>
        </span>

        <span class="mui-tab-label">购物车</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav>-->

    <v-bottom-navigation class="footer" color="#7659a0">
      <router-link tag="div" to="/homepage" class="reset-height">
        <v-btn value="recent">
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
      activeBtn: 1,
      
    };
  }
};
</script>  
 
<style scoped>
.app-container {
  padding-top: 40px;
}
.mint-header {
  background-color: #7659a0;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
}
.v-btn {
  background-color: #7659a0;
}
.reset-height {
  height: 100%;
}

</style>  
