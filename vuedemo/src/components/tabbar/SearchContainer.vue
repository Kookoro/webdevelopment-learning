<template>
  <div>
    <form method="get" id="searchform" action="http://www.google.com.hk/search">
      <p>
        <label for="searched_content">搜索:</label>
        <input type="hidden" name="sitesearch" value="franksky.com" />
        <input type="text" name="as_q" class="box" id="searched_content" title="在此输入搜索内容。" />
        <input type="submit" value="搜索" class="button" title="搜索！" />
      </p>
    </form>
  </div>
</template>
<script>
</script> 
<style scoped>
</style>