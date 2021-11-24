<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main">
        <div class="main-top">
          <div class="logo-nav">
            <el-avatar :size='100' icon="el-icon-user-solid" ></el-avatar>
            <div class="name">{{userInfoForm.username}}</div>
            <el-menu
              style="width: 100%;border:none"
              background-color="#fff"
              text-color="#333"
              active-text-color="#F56C6C"
              @select='changeNav'
            >
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span slot="title"> 个人资料</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">已发布菜谱</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">待审核菜谱</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="info">
            <div v-if="activeIndex == 1">
              <el-descriptions  title="无边框列表" :column="3">
                <template slot="extra">
                  <el-button type="primary" size="small" @click="changeInfo">修改用户信息</el-button>
                </template>
                <el-descriptions-item label="用户名">{{userInfoForm.username}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{userInfoForm.mobile}}</el-descriptions-item>
                <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                  <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">{{userInfoForm.email}}</el-descriptions-item>
                <el-descriptions-item label="个性签名">{{userInfoForm.bio}}</el-descriptions-item>
              </el-descriptions>
            </div>
            <div v-if="activeIndex == 2" style="cursor: pointer">
              <div style="font-size:16px;font-weight:700;margin-bottom:20px;text-align:left">已发布菜谱</div>
              <div v-for="(menu,key) in menuList" :key="key">
                <div class="menu" @click="goMenuDetail(menu)">
                  <el-empty :image='menu.main_image' description="暂无图片"></el-empty>
                  <div class="info">
                    <div style="font-size:16px;font-weight:700;">菜名：{{menu.name}}</div>
                    <div class="desc">介绍：{{menu.goods}}</div>
                    <div>主料：{{menu.main_material}}</div>
                    <div>配料：{{menu.sub_material}}</div>
                  </div>
                </div>
                <el-divider ></el-divider>
              </div>   
            </div>
            <div v-if="activeIndex == 3" style="cursor: pointer">
              <div style="font-size:16px;font-weight:700;margin-bottom:20px;text-align:left">待审核菜谱</div>
              <div v-for="(menu,key) in menuList" :key="key">
                <div class="menu" @click="goMenuDetail(menu)">
                  <el-empty :image='menu.main_image' description="暂无图片"></el-empty>
                  <div class="info">
                    <div style="font-size:16px;font-weight:700;">菜名：{{menu.name}}</div>
                    <div class="desc">介绍：{{menu.goods}}</div>
                    <div>主料：{{menu.main_material}}</div>
                    <div>配料：{{menu.sub_material}}</div>
                  </div>
                </div>
                <el-divider ></el-divider>
              </div>              
            </div>
            <div style="position:absolute;bottom:0px;right:10px;display:flex">
              <el-button size='small' type="success" style="width:100%" @click="postMenu">发布菜单</el-button>
              <el-button size='small' type="primary" style="width:100%" @click="resetPasswordFunc">重置密码</el-button>
              <el-button size='small' type="danger" style="width:100%" @click="logout">退出登录</el-button>
            </div>
          </div>
        </div>
        
      </div>
      <el-dialog
        title="修改用户信息"
        :visible.sync="isChangeUserInfo">
        <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfoForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="bio">
            <el-input v-model="userInfoForm.bio"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isChangeUserInfo = false">取 消</el-button>
          <el-button type="primary" @click="confirmInfoChange">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        width='30%'
        title="重置密码"
        :visible.sync="resetPasswordFlag">
        <el-input  size='small' v-model="mobile" placeholder="请输入注册手机号" type='number'></el-input>
        <el-input  size='small' style="margin-top:10px" v-model="resetPassword" placeholder="请输入重置密码" show-password></el-input>
        <el-input  size='small' style="margin-top:10px" v-model="confirmResetPassword" placeholder="请再次输入重置密码" show-password></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button  size='small' @click="resetPasswordFlag = false">取 消</el-button>
          <el-button  size='small' type="primary" @click="confirmChange">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Nav from '@/components/nav'
export default {
  components:{
    Nav
  },
  data(){
    return{
      activeIndex:1,
      isChangeUserInfo:false,
      resetPasswordFlag:false,
      userInfoForm:{
        username:'',
        nickname:'',
        bio:''
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
      },
      resetPassword:'',
      confirmResetPassword:'',
      mobile:null,
      menuList:[]//菜单列表
    }
  },
  mounted(){
    // let {username,nickname,bio} = {...store.state.userInfo};
    store.state.userInfo = JSON.parse(localStorage.healthyUserInfo);
    this.userInfoForm = {...store.state.userInfo};
  },
  methods:{
    confirmInfoChange(){
        this.$refs['userInfoForm'].validate((valid) => {
          if (valid) {
            let {username,nickname,bio,token} = {...this.userInfoForm};
            this.$http.post('/healthy/public/api/user/profile',{
              username,nickname,bio
            },{
              headers:{
                token:token
              }
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: '信息修改成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                console.log(err);
                this.$message.error('网络异常');
              }
            )
            this.isChangeUserInfo = false;
          }
        })
    },
    changeInfo(){
      this.isChangeUserInfo = true;
    },
    changeNav(index){
      this.activeIndex = index;
      if(index == '2'){//已发布菜谱
        this.$http.get('/healthy/public/api/menu/UserMenuList',{
              status:'2',
              id:this.userInfoForm.id,
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: '获取已发布菜谱成功',
                    type: 'success'
                  });
                  this.menuList = resData.data.data;
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                console.log(err);
                this.$message.error('网络异常');
              }
            )
      }
      if(index == '3'){//待审核菜谱
        this.$http.get('/healthy/public/api/menu/UserMenuList',{
              status:'1',
              id:this.userInfoForm.id,
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: '获取已发布菜谱成功',
                    type: 'success'
                  });
                  this.menuList = resData.data.data;
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                console.log(err);
                this.$message.error('网络异常');
              }
            )
      }
    },
    logout(){
      localStorage.healthyToken = '';
      localStorage.healthyUserInfo = '';
      this.$router.push({ path: "/login" });
    },
    resetPasswordFunc(){
      this.resetPassword = '';
      this.resetPasswordFlag = true;
    },
    confirmChange(){
      if(this.resetPassword == ''){
        this.$message.error('新密码不能为空')
        return
      }
      if(this.confirmResetPassword != this.resetPassword){
        this.$message.error('两个密码不一致请重新输入')
        return
      }
      this.resetPasswordPost({
        mobile:this.mobile,
        newpassword:this.resetPassword
      })
      this.resetPasswordFlag = false;
    },
    resetPasswordPost(data){
      this.$http.post('/healthy/public/api/user/resetpwd',data)
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            localStorage.healthyToken = '';
            this.$router.push({ path: "/login" });
          }else{
            this.$message.error(resData.msg);
          }
        }
      ).catch(
        (err)=>{
          console.log(err);
          this.$message.error('网络异常');
        }
      )
    },
    postMenu(){
      this.$router.push({path:'/postMenu'});
    },
    goMenuDetail(menu){
      this.$router.push({path:'/menuDetail',query:{id:menu.id}});
    }
  }
};
</script>

<style scoped>
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f1f1f1;
  overflow: auto;
}
.main{
  width: 1200px;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px auto 0;
  border-radius: 12px;
  background-color: #fff;
}
.main-top{
  display: flex;
}
.logo-nav{
  width: 200px;
  min-width: 200px;
  border-right: 2px solid #f1f1f1;
  text-align: center;
  padding: 10px;
  padding-right: 20px;
  box-sizing: border-box;
}
.logo-nav .name{
  font-size: 20;
  font-weight: bold;
  margin: 10px;
}
.main-top .info{
  padding: 10px 20px;
  position: relative;
  width: 100%;
}
.menu{
  display: flex;
  height: 200px;
  padding: 10px;
  text-align: left;
}
.menu .info{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>