<template>
  <body id="poster">
    <el-form
      :model="loginForm"
      v-loading="loading"
      ref="loginForm"
      class="login-container"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">登录</h3>
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入账号"
          ><template slot="prepend">账号：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">密码：</template></el-input
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #0275d8; border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          size="small"
          type="text"
          style="width: 100%; color: #0275d8"
          @click="register"
          >没有账号，去注册</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
import store from '@/store'
export default {
  name: "Login",
  data() {
    return {
      loginForm: { //登录的用户信息
        username: "", //用户名
        password: "", //密码
      },
      loading:false
    };
  },
  methods: {
    loginPost(data){
      this.loading = true;
      this.$http.post('/healthy/public/api/user/login',data)
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            console.log(resData);
            const {id,username,nickname,mobile,avatar,email,token,bio} = {...resData.data.userinfo}
            store.state.userInfo = {id,username,nickname,mobile,avatar,email,token,bio};
            localStorage.healthyToken = resData.data.userinfo.token;
            localStorage.healthyUserInfo = JSON.stringify(store.state.userInfo);
            this.$router.push({ path: "/" });
          }else{
            this.$message.error(resData.msg);
          }
          this.loading = false;
        }
      ).catch(
        (err)=>{
          console.log(err);
          this.$message.error('网络异常');
          this.loading = false;
        }
      )
    },
    login() {
      this.$refs["loginForm"].validate((valid) => { //校验用户名和密码数据
        //校验用户名和密码是否为空
        if (valid) {
          this.loginPost({
            account:this.loginForm.username,
            password:this.loginForm.password,
          })
        }
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    clear() {
      //清除登录信息
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
  },
};
</script>

<style>
#poster {
  background: url(https://img.zcool.cn/community/010e645bff9c02a801209252fdd000.jpg@2o.jpg)
    no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 300px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

