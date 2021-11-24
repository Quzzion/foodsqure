<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main">
        <div class="mainNav">
          <el-menu
            style="border:none"
            background-color="#fff"
            text-color="#333"
            active-text-color="#F56C6C"
            @select='getMenu'
          >
            <el-submenu index="group">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>每日三餐</span>
              </template>
              <el-menu-item-group title="正餐">
                <el-menu-item index="2">早/中餐</el-menu-item>
                <el-menu-item index="3">晚餐</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="加餐">
                <el-menu-item index="5">下午茶</el-menu-item>
                <el-menu-item index="4">夜宵</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="6">
              <i class="el-icon-menu"></i>
              <span slot="title">汤</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-document"></i>
              <span slot="title">粥</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="menu">
          <div class="list_title">功能菜单列表</div>
          <div class="list_sort">
            <span>智能推荐</span>
            <span>智能推荐</span>
            <span>智能推荐</span>
            <span>智能推荐</span>
          </div>
          <div class="list_s2_content" v-if="menu.length != 0">
            <div class="list_s2_item" v-for="(menuItem,i) in menu" :key="i" >
              <div @click="goMenudetail(menuItem)">
                <div class="imgw">
                <div
                  class="list_s2_item_img"
                >
                <img :src="menuItem.main_image" alt=""></div>
              </div>
              <div class="list_s2_item_info">
                <strong>{{menuItem.name}}</strong>
                <div>{{menuItem.goods}}</div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="side">
          <div class="right_item_s1">
            <div class="title_s2">热门食材</div>
            <ul>
              <li>
                <a>土豆</a>
              </li>
              <li>
                <a>牛肉</a>
              </li>
              <li>
                <a>芹菜</a>
              </li>
              <li>
                <a>西红柿</a>
              </li>
              <li>
                <a>猪肉</a>
              </li>
              <li>
                <a>彩椒</a>
              </li>
              <li>
                <a>大白菜</a>
              </li>
              <li>
                <a>白萝卜</a>
              </li>
              <li>
                <a>羊肉</a>
              </li>
              <li>
                <a>带鱼</a>
              </li>
              <li>
                <a>食材大全</a>
              </li>
            </ul>
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
  data() {
    return {
      menu:[]
    };
  },
  mounted(){
    this.getMenu('2');
  },
  methods: {
    goMenudetail(menu){
      this.$router.push({path:'/menuDetail',query:{id:menu.id}});
    },
    getMenu(index){
      this.$http.post('/healthy/public/api/menu/MenuAffect',{
              // affectId:'',
              typeId:index
            })
            .then(
              (res)=>{
                let resData = res.data;
                if(resData.code == 1){
                  this.$message({
                    message: '搜索成功',
                    type: 'success'
                  });
                  this.menu = resData.data;
                }else{
                  this.$message.error(resData.msg);
                }
              }
            ).catch(
              (err)=>{
                console.log(err);
                this.$message.error('');
              }
            )
    }
  },
};
</script>

<style scoped>
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
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
.main {
  margin: 0 auto;
  width: 1200px;
  display: flex;
}
.mainNav {
  width: 220px;
  min-width: 220px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;
  text-align: left;
  margin-top: 20px;
  height: 500px;
  padding: 10px;
}
.body {
  padding: 0 400px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  /* justify-content: space-between; */
}
.navItem {
  height: 80px;
  width: 1200px;
  font-size: 17px;
  font-weight: bold;
}
.navItemHover:hover {
  background-color: rgb(248, 102, 62);
}
.navItemHover {
  width: 100%;
  cursor: pointer;
}
.list_title {
  height: 40px;
  font-size: 32px;
  color: #222;
  font-weight: 600;
  line-height: 40px;
  padding: 0px 0px 12px;
}
.menu {
  width: 800px;
  /* box-sizing: border-box; */
  padding-top: 20px;
  padding-right: 10px;
  padding-left: 30px;
  text-align: left;
}
.list_sort {
  display: flex;
  color: #666;
  margin-bottom: 20px;
}
.list_sort span {
  margin-right: 10px;
}
.list_s2_item {
  width: 224px;
  height: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin: 0px 20px 20px 0px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 0%);
  transition: all ease 0.3s;
  cursor: pointer;
}
.list_s2_item .imgw {
  position: relative;
  height: 280px;
  overflow: hidden;
}
.list_s2_item_img {
  height: 280px;
  display: block;
}
.list_s2_item_info {
  display: block;
  height: 80px;
}
.list_s2_item_info strong {
  margin: 10px;
  color: #222;
}
.list_s2_item_info div {
  margin: 10px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.right_item_s1 {
  margin-top: 20px;
  width: 200px;
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.title_s2 {
  height: 32px;
  padding: 20px 0px 20px 20px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
  position: relative;
}
.right_item_s1 ul {
  font-size: 0px;
  padding: 0px 20px 14px;
}
.right_item_s1 ul li {
  margin: 0px 10px 10px 0px;
  display: inline-block;
  vertical-align: top;
}
.right_item_s1 ul li a {
  border-radius: 4px;
  display: inline-block;
  padding: 0px 10px;
  height: 36px;
  line-height: 36px;
  font-weight: 400;
  color: #666;
  transition: all ease 0.3s;
  font-size: 16px;
  background: #f5f5f5;
}
.page{
    margin-bottom: 20px;
}
</style>