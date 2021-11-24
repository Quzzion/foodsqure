<template>
  <div class="nav">
        <div class="navItem">
          <el-row>
            <el-col :span="4">
              <div class="navItemHover" @click="goHome">
               <i class="el-icon-platform-eleme"></i> 首页</div>
            </el-col>
            <el-col :span="4">
              <div class="navItemHover" @click="goMenuSort">
               <i class="el-icon-s-grid"></i> 菜谱分类</div>
            </el-col>
            <el-col :span="4">
              <div class="navItemHover" @click="goHealthMenu">
               <i class="el-icon-s-opportunity"></i> 饮食健康</div>
            </el-col>
            <el-col :span="4">
              <div class="navItemHover" @click="goSearchMenu">
               <i class="el-icon-search"></i> 搜索食材</div>
            </el-col>
            <el-col :span="4" :offset="4">
              <div class="navItemHover" v-if="!userInfo">
                <i class="el-icon-s-custom"></i>
                <el-button type='text' style="color:#fff;font-size: 17px;font-weight: bold;" @click="goLogin">登陆</el-button>
                <el-button type='text' style="color:#fff;font-size: 17px;font-weight: bold;" @click="goRegister">注册</el-button>
              </div>
              <div class="navItemHover userLogo" v-else @click="goUserInfo">
                <el-avatar>{{userInfo.nickname}}</el-avatar>
                <!-- <div>{{userInfo.nickname}}</div> -->
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
</template>

<script>
import store from '@/store'
export default {
data(){
  return{
    searchMenuWord:'',
    userInfo:null
  }
},
mounted(){
  store.state.userInfo = JSON.parse(localStorage.healthyUserInfo);
  this.userInfo = store.state.userInfo;
},
methods: {
    goSearch() {
      alert("店家时间");
    },
    goMenuSort() {
      this.$router.push({path:'/menuSort'});
    },
    goHome() {
        this.$router.push({path:'/'});
    },
    goHealthMenu() {
        this.$router.push({path:'/healthMenu'});
    },
    goLogin() {
        this.$router.push({path:'/login'});
    },
    goRegister() {
        this.$router.push({path:'/register'});
    },
    goSearchMenu() {
      this.$router.push({path:'/searchMenu'});
    },
    goUserInfo() {
      this.$router.push({path:'/infoCenter'});
    }
  },
}
</script>

<style scoped>
.nav {
  height: 80px;
  line-height: 80px;
  width: 100%;
  background-color: rgba(246, 77, 54);
  color: #fff;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 99;
}
.navItem {
  height: 80px;
  width: 1200px;
  font-size: 17px;
  font-weight: bold;
  box-sizing: border-box;
}
.navItemHover:hover {
  background-color: rgb(248, 102, 62);
}
.navItemHover {
  width: 100%;
  cursor: pointer;
}
.userLogo{
  /* padding-top: 10px; */
  max-height: 80px;
  line-height: 80px;
}
</style>