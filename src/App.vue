<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    // const token = localStorage.getItem("access_token");
    // const username = localStorage.getItem("username");
    // return{
    //   activeIndex:'/',
    //   isLogin: !!username && !!token
    // }
  },
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
