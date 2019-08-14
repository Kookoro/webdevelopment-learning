<template>
  <div class="app-container">
     <div>
   <v-app-bar
      color="#725a9c"
      height="45px"
     ·
    >
      <v-app-bar-nav-icon to="/homepage/"></v-app-bar-nav-icon>

      <v-toolbar-title>demo</v-toolbar-title>

      <v-spacer></v-spacer>

      
    </v-app-bar>
  </div>
   
    <transition name="fade">
      <keep-alive>
       <router-view></router-view>
      </keep-alive> 
    </transition>


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
      
      
    }
   
  },
   
}; 
</script>  
 
<style scoped>
.app-container {
  
  overflow-x: hidden;
}
.mint-header {
  background-color: #725a9c; 
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
.fade-enter{
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.5s ease;
}

</style>  
