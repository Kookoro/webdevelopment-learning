<!-- 加减框组件 -->
<template>
    <div >
        
        
        <v-btn text  @click="handleDown();sendMsgToParent()" :disabled="currentValue <= min">
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <input type="text" v-model="currentValue" @change="handleChange">
         
        <v-btn text @click="handleUp();sendMsgToParent()" :disabled="currentValue >= max">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        
    </div>
</template>
  
<script>
    export default {
        props:['max','min','value'],
        name: "numberBox", 
        data(){
            return {
                currentValue:this.value,
                
            }
        },
        watch:{
            currentValue: function (val) { //currentValue值变动就向父组件传值
                this.$emit('input',val);
                this.$emit('on-change',val);
            },
            value:function (val) { //对值进行验证
                this.updataValue(val);
            }
        },
        mounted(){
            this.updataValue(this.value);
        },
        methods:{
            handleDown: function () {  //增加
                if(this.currentValue <= this.min){
                    return;
                }else{
                    this.currentValue -= 1;
                }
            },
            handleUp: function () { // 减少
                if(this.currentValue >= this.max){
                    return;
                }else{
                    this.currentValue += 1;
                }
            },
            updataValue: function (val) {
                if(val > this.max){val = this.max}
                if(val < this.min){val = this.min}
                this.currentValue = val;
 
            },
            handleChange: function (event) {  //对值进行验证
                var val = event.target.value.trim();
                var max = this.max;
                var min = this.min;
                if(this.isNumber(val)){
                    val = Number(val);
                    this.currentValue = val;
                    if(val > max){
                        this.currentValue = max;
                    }else if(val < min){
                        this.currentValue = min;
                    }
                }else{
                    this.currentValue = 0;
                }
            },
            isNumber: function (value) {
                return (/^\-?[0-9]+$/).test(value + '');
            },
            sendMsgToParent(){
                
                this.$emit("listenToChildEvent",this.currentValue)
            }
           
        },
        watch:{
            //属性监听max
            'max':function(newVal,oldVal){
                
            }
        }
        
    }
</script>
 
<style scoped>
    input{
        width: 43px;
        height: 43px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center
    }
    
</style>
