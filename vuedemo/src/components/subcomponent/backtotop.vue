<!-- 
import backtotop from "../subcomponent/backtotop.vue"
components:{
    "back-to-top-button":backtotop
}
 -->
<template>
  <div>
    <transition name="toggle">
      <v-btn
        class="back-to-top"
        color="#6e5b98"
        dark
        small
        absolute
        bottom
        
        right 
        fab
        @click="backToTop"
        v-show="toggleBtn"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleBtn: false,
      scroll: "",
    };
  },
   mounted() {
    window.addEventListener("scroll", this.scrollTop);
  },
  methods: {
    backToTop() {
      window.scrollTo(0, 0);
    },
    scrollTop() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 300) {
        this.toggleBtn = true;
      } else {
        this.toggleBtn = false;
      }
    }
  },
  
}
</script>
<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  z-index: 10000;
  margin-bottom: 100px;
}
.toggle-enter,
.toggle-leave-to {
  opacity: 0;
}
.toggle-enter-to, 
.toggle-leave {
  opacity: 1;
}
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.4s ease;
}
</style>