<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main">
        <div class="searchBar">
          <el-input v-model="searchMenuName" placeholder="请输入搜索菜名"></el-input>
          <el-button style="margin-left:20px;" type='danger' @click="searchMenu"> 搜 索 </el-button>
        </div>
        <div v-if="searchFlag" class="menuList">
          <div class="list_s1_item" @click="goMenuDetail">
                <div class="imgw">
                  <img
                    :src="menu.main_image"
                    style="
                    width；220px"
                  />
                </div>
                <div class="list_s1_item_info">
                  <strong class="list_s1_item_info_title"
                    >{{menu.name}}</strong
                  >
                  <span class="list_s1_item_info_sc"
                    >{{menu.goods}}</span
                  >
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav'
export default {
  components:{
    Nav
  },
  data(){
    return{
      searchMenuName:'',
      menu:{
        name:'',
        goods:'',
        main_image:'',
        id:''
      },
      searchFlag:false
    }
  },
  methods:{
    searchMenu(){
       this.$http.post('/healthy/public/api/menu/MenuSearch',{
              name:this.searchMenuName
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: '搜索成功',
                    type: 'success'
                  });
                  this.searchFlag = true;
                  this.menu = resData.data;
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
    goMenuDetail(){
      this.$router.push({path:'/menuDetail',query:{id:this.menu.id}});
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
.main {
  margin: 0 auto;
  width: 1200px;
  box-sizing: border-box;
}
.searchBar{
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  margin-top: 10px;
  display: flex;
}
.menuList{
  display: flex;
  /* justify-content: space-around; */
  margin-top: 20px;
}
.list_s1_item {
  width: 224px;
  height: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  /* margin: 0px 20px 20px 0px; */
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 0%);
  transition: all ease 0.3s;
  cursor: pointer;
}
.list_s1_item .imgw {
  position: relative;
  height: 280px;
  overflow: hidden;
}
.list_s1_item_info {
  text-align: left;
}
.list_s1_item_info_title {
  font-size: 16px;
  color: #222;
  font-weight: 600;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 12px 20px 0px;
}
.list_s1_item_info_sc {
  font-size: 14px;
  color: #999;
  font-weight: 400;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0px 20px 0px;
  padding-left: 24px;
  position: relative;
}
</style>