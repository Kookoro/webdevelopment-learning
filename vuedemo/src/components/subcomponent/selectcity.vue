<template>
    <div>
        <!-- <mt-index-list>
          <mt-index-section :index="item.title" v-for="item in cityArr">
              <mt-cell :title="i" v-for="i in item.lists" @click.native="selectedCity(i)"></mt-cell>
          </mt-index-section>
</mt-index-list> -->
   
      <mt-index-list>
          <mt-index-section :index="item.title" v-for="item in cityArr" :key="item.i" >
              <mt-cell :title="itemlist" v-for="itemlist in item.lists" :key="itemlist" @click.native="showCityname(itemlist)"></mt-cell>
          </mt-index-section>
</mt-index-list>
<!-- <mt-index-list>
  <mt-index-section index="A">
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
  </mt-index-section>
  <mt-index-section index="B">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  ...
  <mt-index-section index="Z">
    <mt-cell title="Zack"></mt-cell>
    <mt-cell title="Zane"></mt-cell>
  </mt-index-section>
</mt-index-list> -->
    </div>
</template>

<script>
import citydata from '../../js/cityData.json'
import vPinyin from '../../js/vue-py'
let salesmanName = '张三'

let namePinyin = vPinyin.chineseToPinYin(salesmanName);
console.log(namePinyin);
export default {
    data(){
        return {
            cityArr:[]
        }
    },
    mounted() {
        this.getCity(citydata);
    },
    methods: {
        getCity(cityData) {
      // 读取json文件
      this.cityArr = cityData.city;
      // console.log(localStorage.getItem('selectCity'));
    　　},
        showCityname(i){
          let namePinyin = vPinyin.chineseToPinYin(i)
          console.log(namePinyin);
        },
       
    },

}
</script>
<style lang="scss" scoped>
    * { touch-action: pan-y; }  
    .mint-cell-title {
  flex: 0 0 auto;
}

.mint-indexsection-index {
  text-align: left;
}
</style>