<template>
    <div class="account-container">
       
      <selectcity></selectcity>
    </div>
</template>
<script>
import selectcity from '../subcomponent/selectcity.vue'
 export default{
    data(){
       return{
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
       }
     
    },
      methods: {
           show(){
              
           }
       },
    components:{
       selectcity
    }
 }
 
</script>
<style scoped>
.account-container{
    margin-bottom: 56px;
}
</style> 