<template>
  <body id="poster">
    <el-form
      class="login-container"
      :model="registerForm"
      v-loading="loading"
      ref="registerForm"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">注册</h3>
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          type="text"
          v-model="registerForm.username"
          auto-complete="off"
          placeholder="请输入账号"
          ><template slot="prepend">账号：</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.mobile"
          auto-complete="off"
          placeholder="请输入电话"
          ><template slot="prepend">电话：</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.email"
          auto-complete="off"
          placeholder="请输入地址"
          ><template slot="prepend">邮箱：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">密码：</template></el-input
        >
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '确认密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          auto-complete="off"
          placeholder="请输入密码"
          ><template slot="prepend">确认密码：</template></el-input
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #0275d8; border: none"
          @click="register"
          >注册</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          size="small"
          type="text"
          style="width: 100%; color: #0275d8"
          @click="login"
          >已有账号，去登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      registerForm: { //注册的用户信息
        username: "", //用户名
        password: "", //密码
        confirmPassword: "", //确认的密码
        mobile: "", //手机
        email: "", //地址
      },
      loading:false
    };
  },
  mounted(){
  },
  methods: {
    register() {
      this.$refs["registerForm"].validate((valid) => { //校验注册的用户信息
        if (valid) { //校验的用户信息
        if(this.registerForm.password != this.registerForm.confirmPassword){
          this.$message({
              message: '两次密码不一致',
              type: 'error'
            });
          return
        }
        let {username,password,mobile,email} = {...this.registerForm}
          this.postRegister({
            username,password,mobile,email
          });
        }
      });
    },
    postRegister(data) {
      this.loading = true;
      this.$http.post('/healthy/public/api/user/register',data)
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            this.$router.push({ path: "/login" });
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
        this.$router.push({ path: "/login" });
    },
    clear() { //清空注册数据
      this.registerForm = {
        username: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        adress: "",
        qq: "",
      };
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
  margin: 200px auto;
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

