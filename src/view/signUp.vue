<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">注册</div>
      <el-form :model="param" ref="form" :rules="rules" label-width="80px" class="ms-content">
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="param.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="param.pwd" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" placeholder="请再输入密码" v-model="param.password" show-password />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input class="code-input" v-model="param.code" placeholder="请输入验证码" />
          <el-button v-show="hasCode" type="primary" disabled >请在{{ timing }}秒后重新获取验证码</el-button>
          <el-button v-show="!hasCode" type="primary" @click="getVerificationCode" >获取验证码</el-button>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitSignUp" >注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    const that = this;
    const verificationPassword = (rule, value, cb) => {
      if(!value) return cb(new Error("请再次输入密码"));
      console.log(that.param.pwd);
      if(value !== that.param.pwd) return cb(new Error("两次输入密码不一致"));
      return cb();
    };
    return {
      param: { email: "", username: "", pwd: "", code: "", password: "" },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在 6 个字符以上", trigger: "blur" }
        ],
        password: [
          { required: true, validator: verificationPassword, trigger: "blur" }
        ],
        code: [{ required: true, message: "请先输入验证码", trigger: "blur" }]
      },
      hasCode: false,
      timing: 60,
      timer: null
    };
  },
  mounted() {
    const that = this;
    const getPerfile = async () => {
      try {
        const result = await axios.get("/apis/data/get-peofile");
        if(result) return that.$router.push("/");
      } catch(e) {};
    }
    getPerfile();
  },
  methods: {
    async submitSignUp() {
      let loading;
      try {
        const formDom = this.$refs.form;
        if (!formDom) return;

        loading = this.$loading({
          lock: true,
          text: "注册中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        await formDom.validate();

        // 注册信息
        try {
          await axios.post("/apis/data/sign-up", this.param);
          loading.close();
        } catch (e) {
          loading.close();
          return this.$message.warning(e.message);
        }

        this.$message.success("注册成功");
        return this.$router.push("/login");
      } catch (e) {
        if (loading) loading.close();
        console.log("login failed: ", e);
        this.$message.warning("注册失败");
      }
    },
    async getVerificationCode() {
      try {
        const email = this.param.email;
        if(!email.length) return this.$message.warning("请先输入邮箱");
  
        const result = await axios.post("/apis/data/email-send-code", {email});

        // 获取验证码倒计时
        if(this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }

        this.timing = 60;
        this.hasCode = true;
        const that = this;
        this.timer = setInterval(function() {
          that.timing--;
          if(that.timing < 0) {
            that.hasCode = false;
            clearInterval(that.timer);
            that.timer = null;
          }
        }, 1000);
      } catch(e) {
        return this.$message.warning(e.message);
      }
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

  .code-input {
    width: 60%;
  }
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

</style>