<template>
  <div id="app">
    <div class="header">
    <el-menu background-color="#545c64"
  text-color="#fff" active-text-color="#ffd04b" router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="/page/home">我的发布</el-menu-item>
  <el-menu-item index="/page/piazza">广场</el-menu-item>
  <el-menu-item index="/page/screen">大屏</el-menu-item>
    </el-menu>
    <!-- 用户头像 -->
      <div class="header-right">
            <span class="el-dropdown-link"> {{user}}</span>
          
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <div class="user-avator">
            <img src="@/assets/img/img.jpg"/>
          </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
      </div>
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
      user:localStorage.getItem("username")
    }
  },
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCommand(command){  // 用户名下拉菜单选择事件
      console.log(command)
      if(command == 'loginout'){
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        this.$router.push({
            path: '/login'
        });
      }
    },
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
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60.67px;
  font-size: 22px;
}
.el-menu-demo{
  z-index: 1;
  width: 100%;
}
.header-right{
  display: flex;
    position: absolute;
    top: 0px;
    right: 16px;
    z-index: 1;
    height: 100%;
    align-items: center;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
}
.output{
  height: calc(100% - 60.67px);
  position: relative;
}
</style>
