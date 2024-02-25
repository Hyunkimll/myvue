<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">登陆</div>
      <el-form
        :model="param"
        ref="form"
        :rules="rules"
        label-width="80px"
        class="ms-content"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="param.username"
            placeholder="请输入用户名/邮箱/手机号"
          />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="param.pwd"
          />
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitLogin">登录</el-button>
        </div>
        <a class="go-sign-up" @click="goSignUp" >暂无账号，前往注册</a>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      param: { username: "", pwd: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: '长度在 6 个字符以上', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    const that = this;
    const getPerfile = async () => {
      const result = await axios.get("/apis/data/get-peofile").catch(e => {});
      if(result) return that.$router.push("/");
    }
    getPerfile();
  },
  methods: {
    async submitLogin() {
      let loading;
      try {
        const formDom = this.$refs.form;
        if (!formDom) return;

        loading = this.$loading({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        await formDom.validate();

        const pwd = this.param.pwd.trim();
        const username = this.param.username.trim();
        if (!username.length) {
          loading.close();
          return this.$message.warning("用户名不能全是空格");
        }
        if (!pwd.length) {
          loading.close();
          return this.$message.warning("密码不能全是空格");
        }

        // 登录信息
        try {
        const result = await axios.post("/apis/data/login-by-username", { pwd, username });
        loading.close();
        const user = result.data && result.data.user;
        if(user) localStorage.setItem("username", user);
        } catch(e) {
          return this.$message.warning(e.message);
        }

        this.$message.success("登录成功");
        return this.$router.push("/");
      } catch (e) {
        if(loading) loading.close();
        console.log("login failed: ", e);
        this.$message.warning("登录失败");
      }
    },
    async goSignUp() {
      this.$router.push("/SignUp")
    }
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  padding-top: 10px;
}
.ms-login {
  width: 800px;
  border-radius: 5px;
  background: #fff;
}
.ms-content {
  padding: 10px 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.go-sign-up {
  font-size: 12px;
  line-height: 30px;
  color: #78acda;
  cursor: pointer;
  &:hover {
    color: #0089ff;
  }
}
</style>