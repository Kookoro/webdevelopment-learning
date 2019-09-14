<template>
  <div>
              
    <div class="productlist">
      <v-card 
        color="#AAAAAA"
      
      >
         <v-card-text class="white--text">
              <div class="headline mb-2">Unlimited music now</div>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
      </v-card>
      <v-card 
        color="#AAAAAA"
      
      >
         <v-card-text class="white--text">
              <div class="headline mb-2">Unlimited music now</div>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
      </v-card>
      <v-card 
        color="#AAAAAA"
      
      >
         <v-card-text class="white--text">
              <div class="headline mb-2">Unlimited music now</div>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
      </v-card>
      <div class="checkstand">
        <div class="selectall">
          <input type="checkbox" name="全选" >
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
      routename: ""
    };
  },
  components: {
    numberbox
  },
  beforeRouteEnter(to, from, next) {
    var route = from.path.slice(1);
    next(vm => {
      vm.$data.routername = route;
      console.log(vm.$data.routername);
    });
  }
};
</script>
<style scoped lang="scss">
.checkstand{
  position: fixed;
  bottom: 56  px;
  z-index: 10000;
  height: 56px;
  width: 100%;
  background-color: saddlebrown;
  
  .check{
    
  }
  
  
}
</style>  