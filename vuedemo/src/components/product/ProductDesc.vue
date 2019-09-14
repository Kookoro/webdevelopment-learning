<template>
    <div class="productdesc-container">
        <h3>{{info.title}}</h3>
        <div class="content" v-html="info.content">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:{},//图文数据
        }
    },
    created() {
        this.getDesc();//调用获取商品详情
    },
    methods: {
        getDesc(){
            this.axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+ this.$route.params.id)
            .then(result=>{
                if(result.data.status === 0)
                {
                    
                    this.info = result.data.message[0];
                    
                }
            })
        }
    },
}
</script>
<style lang="scss">
    .productdesc-container{
        padding: 4px;
        h3{
            font-size: 20px;
            color: #757575;
            text-align: center;
            margin: 15px 0;
        }
    }
    .content{

        img{
            width:100%;
        }
    }
</style>