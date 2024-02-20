<template>
  <div id="app">
    <el-menu background-color="#545c64"
  text-color="#fff" active-text-color="#ffd04b" router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="/">我的发布</el-menu-item>
  <el-menu-item index="/piazza">广场</el-menu-item>
  <el-menu-item index="/screen">大屏</el-menu-item>
    </el-menu>
    <div class="output">
    <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      activeIndex:'/'
    }
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
.el-menu-demo{
  z-index: 1;
}
.output{
  height: calc(100% - 60.67px);
  position: relative;
}
</style>
