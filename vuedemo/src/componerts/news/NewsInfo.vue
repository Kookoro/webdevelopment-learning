<template>
    <div>
        <h3>13 --{{id}}</h3>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id
        }
    },
} 
</script>
<style lang="css" scoped>
    
</style> 