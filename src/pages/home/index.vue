<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main">
        <div class="carousel">
          <el-carousel :interval="3000" type="card" height="300px">
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=3972827057,4174765381&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=2064642481,3025974924&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=2959662161,3744175210&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img1.baidu.com/it/u=2987868719,494987900&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=3972827057,4174765381&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=2064642481,3025974924&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img0.baidu.com/it/u=2959662161,3744175210&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="height:400px">
                <img src="https://img1.baidu.com/it/u=2987868719,494987900&fm=26&fmt=auto" alt="">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <div class="card">
            <div class="title">热门推荐</div>
            <div class="hotList">
              <div class="word hot">早餐</div>
              <div class="word hot">鱼香肉丝</div>
              <div class="word hot">家常菜</div>
              <div class="word">宫保鸡丁</div>
              <div class="word">红烧肉</div>
              <div class="word">红烧排骨</div>
              <div class="word">凉拌菜</div>
              <div class="word">番茄炒蛋</div>
              <div class="word">小鸡炖蘑菇</div>
              <div class="word">凉拌菜</div>
              <div class="word">番茄炒蛋</div>
              <div class="word">小鸡炖蘑菇</div>
              <div class="word">凉拌菜</div>
              <div class="word">番茄炒蛋</div>
              <div class="word">小鸡炖蘑菇</div>
            </div>
          </div>

          <div class="card">
            <div class="title">
              今日三餐
              <ul class="sancan_tab" id="sancan_tab">
                <li tab="0" class="current">早餐</li>
                <li tab="1" class="">午餐</li>
                <li tab="2" class="">下午茶</li>
                <li tab="3" class="">晚餐</li>
                <li tab="4" class="">夜宵</li>
              </ul>
            </div>
            <div class="cardbody" >
              <div class="sancan_item" v-for="(menu,i) in threeMeal" :key="i">
                <div style="cursor: pointer;" @click="goMenudetail(menu)">
                  <div
                  class="imgw"
                >
                <img :src="menu.main_image" alt="">
                </div>
                <strong class="cardtitle">{{menu.name}}</strong>
                <div class="des">{{menu.goods}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="freshMenu">
            <div class="freshMenuTitle">新鲜推荐</div>
            <div class="freshMenuBody">
              <div class="list_s1_item" v-for="(menu,i) in freshRecMeal" :key="i">
                <div style="cursor: pointer;" @click="goMenudetail(menu)">
                  <div class="imgw">
                  <img
                    :src="menu.main_image"
                    style="
                    width:220px;
                    height:280px"
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
      threeMeal:[],//今日三餐
      freshRecMeal:[]//新鲜推荐
    };
  },
  mounted(){
    this.getMenu('1');
    this.getMenu('2');//今日三餐
    this.getMenu('3');//新鲜推荐
  },
  methods: {
    getMenu(type){
      this.$http.post('/healthy/public/api/menu/GetMenu',{
        type
      })
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            if(type == '2'){
              this.threeMeal = resData.data;
            }
            if(type == '3'){
              this.freshRecMeal = resData.data;
            }
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
    goMenudetail(menu){
      this.$router.push({path:'/menuDetail',query:{id:menu.id}});
    }
  },
};
</script>

<style>
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
.carousel{
  background-color: #fff;
  border-radius: 12px;
  margin-top: 10px;
}
.main {
  margin: 0 auto;
  width: 1200px;
  box-sizing: border-box;
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
.card {
  width: 1200px;
  border-radius: 12px;
  background: #fff;
  /* height: 192px; */
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
}
.title {
  height: 32px;
  padding: 20px 0px 20px 20px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
  position: relative;
  text-align: left;
}
.hotList {
  padding: 0px 24px;
  font-size: 0px;
  /* height: 110px;  */
  display: flex;
  flex-wrap: wrap;
}
.hotList .word {
  display: inline-block;
  vertical-align: Top;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #222;
  font-weight: 400;
  padding: 0px 16px;
  margin: 10px;
  border-radius: 20px;
  background: #f5f5f5;
}
.hotList .hot {
  background: rgba(246, 77, 54, 0.15);
  color: #f64d36;
}
.sancan_tab {
  height: 32px;
  display: inline-block;
  vertical-align: top;
  padding-left: 20px;
  font-size: 0px;
}
.sancan_tab li {
  display: inline-block;
  vertical-align: top;
  line-height: 32px;
  height: 32px;
  padding: 0px 15px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  border-radius: 16px;
  background: #eee;
  color: #999;
  margin-right: 15px;
  cursor: pointer;
}
.sancan_tab li.current {
  background: #f64d36;
  background-image: -webkit-linear-gradient(to right, #f67536, #f64d36);
  background-image: linear-gradient(to right, #f67536, #f64d36);
  color: #fff;
}
.sancan_item {
  width: 240px;
  margin: 0px 20px 0px 0px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: 0px;
  transition: all ease 0.3s;
}
.sancan_item .imgw {
  height: 240px;
  width: 240px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.cardtitle {
  font-size: 18px;
  color: #222;
  line-height: 30px;
  padding-top: 10px;
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sancan_item .des {
  font-size: 14px;
  color: #999;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cardbody {
  display: flex;
  justify-content: space-around;
  /* overflow-x: auto; */
}
.freshMenu{
  padding: 10px;
}
.freshMenuTitle {
  text-align: left;
  height: 32px;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  line-height: 32px;
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
.freshMenuBody {
  display: flex;
  justify-content: space-around;
  /* overflow-x: auto; */
}
</style>