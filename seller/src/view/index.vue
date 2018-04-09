<template>
  <div>
    <div class="beside-nav">
     <beside-nav></beside-nav>
    </div>
    <div class="index-main" :style="{height:high,width:width}">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import besideNav from '../components/besideNav'
  export default {
    data(){
      return {
//        high: '',
//        width: ''
      };
    },
    components: {
      besideNav
    },
    computed: {
      high() {
        return `${window.innerHeight - 80}px`;
      },
      width() {
        return `${window.innerWidth - 200}px`;
      }
    }
//    mounted() {
//      this.high= `${window.innerHeight - 80}px`;
//      this.width= `${window.innerWidth - 200}px`;
//    }
  }
</script>
<style>
  .beside-nav {
    width: 180px;
  }
  .index-main {
    position: fixed;
    top: 80px;
    left: 201px;
    overflow-y:auto;
  }
</style>
