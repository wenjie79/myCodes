<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'lottery',
    data() {
      return {
      }
    },
    mounted: function() {
      this.$router.replace({
        path:'/manage'
      });
    }
  }
</script>
<style lang="less">
  body{
    margin:0;
    padding:0;
  }
</style>
