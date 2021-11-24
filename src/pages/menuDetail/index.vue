<template>
  <div class="container">
    <Nav style="z-index:999"></Nav>
    <div class="menuMain">
      <div class="recipe_header">
        <div class="recipe_header_c">
          <div
            class="recipe_topimgw"
          >
            <img
              :src="menu.main_image"
              class="recipe_topimg"
            />
          </div>
          <div class="recipe_header_info">
            <h1 class="recipe_title">{{menu.name}}</h1>
            <span class="info1"> 19 收藏 · 13343 浏览</span
            >
            <div class="info2">
              <div class="info2_item info2_item1">
                <em>工艺</em> <strong>{{menu.make_way}}</strong>
              </div>
              <div class="info2_item info2_item2">
                <em>口味</em> <strong>{{menu.taste}}</strong>
              </div>
              <div class="info2_item info2_item3">
                <em>时间</em> <strong>{{menu.make_time}}</strong>
              </div>
              <div class="info2_item info2_item4">
                <em>难度</em> <strong>{{menu.power}}</strong>
              </div>
            </div>
            <div class="recipe_ingredientsw">
              <div class="recipe_ingredients">
                <div class="left"><strong>主料</strong> <em>main</em></div>
                <div class="right">
                  <strong>{{menu.main_material}}</strong>
                </div>
              </div>
              <div class="recipe_ingredients recipe_ingredients1">
                <div class="left"><strong>辅料</strong> <em>others</em></div>
                <div class="right">
                  <strong>{{menu.sub_material}}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menuStep">
      <h2 class="menuStepTitle">{{menu.name}}的做法</h2>
      <div class="recipe_step_box">
        <div class="recipe_step">
          <div class="recipe_step_num">
            <strong>步骤</strong> <em>step</em>
            <p>1</p>
          </div>
          <div class="step_content">
            <img
              :src="menu.next1_image"
              class="stepimg"
            />
            <p>{{menu.next1_connect}}</p>
          </div>
        </div>
        <div class="recipe_step">
          <div class="recipe_step_num">
            <strong>步骤</strong> <em>step</em>
            <p>2</p>
          </div>
          <div class="step_content">
            <img
              :src="menu.next2_image"
              class="stepimg"
            />
            <p>{{menu.next2_connect}}</p>
          </div>
        </div>
        <div class="recipe_step">
          <div class="recipe_step_num">
            <strong>步骤</strong> <em>step</em>
            <p>3</p>
          </div>
          <div class="step_content">
            <img
              :src="menu.next3_image"
              class="stepimg"
            />
            <p>{{menu.next3_connect}}</p>
          </div>
        </div>
        <div class="recipe_step">
          <div class="recipe_step_num">
            <strong>步骤</strong> <em>step</em>
            <p>4</p>
          </div>
          <div class="step_content">
            <img
              :src="menu.next4_image"
              class="stepimg"
            />
            <p>{{menu.next4_connect}}</p>
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
      menu:{
        id: 5,//菜品id
        main_image: "https://st-cn.meishij.net/r/212/181/5295462/s5295462_148413003855190.jpg",//主图
        main_material: "花生、花椒、八角",//主要原料
        main_role: "锅碗瓢盆",//主要餐具
        make_time: "1h",//制作shijian
        make_way: "炒",//制作方法
        menu_tips: "备注",//备注
        name: "菜谱名",//菜谱名称
        next1_connect: "步骤一",//步骤一内容
        next1_image:"https://st-cn.meishij.net/rs/246/137/1534496/n1534496_151228790971181.jpg",//步骤一图片
        next2_connect: "步骤二",
        next2_image: "https://st-cn.meishij.net/rs/246/137/1534496/n1534496_151228791125066.jpg",
        next3_connect: "步骤三",
        next3_image: "https://st-cn.meishij.net/rs/246/137/1534496/n1534496_151228791224592.jpg",
        next4_connect: "步骤四",
        next4_image: "https://st-cn.meishij.net/rs/246/137/1534496/n1534496_151228791558825.jpg",
        ok_images: "",//完成图片
        power: 1,//难度
        sub_material: "辅料",//辅料
        taste: "口味",//口味
        user_id: 1
      }
    };
  },
  watch:{

  },
  mounted(){
    this.getMenu();
  },
  methods: {
    getMenu(){
      this.$http.post('/healthy/public/api/menu/MenuInfo',{
        id:this.$route.query.id
      })
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
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
          this.$message.error('网络异常');
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
p{
    margin: 0;
    padding: 0;
    font-size: 12px;
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
.menuMain {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  box-sizing: border-box;
}
.recipe_header {
  width: 100%;
  background: #efeeec;
}
.recipe_header_c {
  width: 1200px;
  margin: 0px auto;
  padding: 40px 0px;
  font-size: 0px;
}
.recipe_topimgw {
  width: 350px;
  display: inline-block;
  vertical-align: top;
  height: 535px;
  border-radius: 4px;
}
.recipe_topimg {
  /* opacity: 0; */
  width: 350px;
  height: 535px;
}
.recipe_header_info {
  width: 590px;
  display: inline-block;
  vertical-align: top;
  padding-left: 30px;
  box-sizing: border-box;
}
.recipe_header_info .recipe_title {
  font-size: 32px;
  color: #222;
  line-height: 42px;
  font-weight: 700;
  padding-top: 10px;
  margin-right: 40px;
}
.recipe_header_info .info1 {
  font-size: 16px;
  line-height: 26px;
  color: #666;
  font-weight: 400;
}
.recipe_header_info .info1 a {
  color: #666;
}
.recipe_header_info .info2 {
  height: 160px;
  margin: 25px 0px 0px 0px;
  font-size: 0px;
}
.recipe_header_info .info2 .info2_item1 {
  background-position: 0px 0px;
}
.recipe_header_info .info2 .info2_item2 {
  background-position: 0px -160px;
}
.recipe_header_info .info2 .info2_item3 {
  background-position: 0px -320px;
}
.recipe_header_info .info2 .info2_item4 {
  background-position: 0px -480px;
}
.recipe_header_info .info2 .info2_item {
  display: inline-block;
  vertical-align: top;
  height: 160px;
  width: 80px;
  margin-right: 20px;
  border-radius: 16px;
  background: #fff
    url(https://st-cn.meishij.net/p2/20210118/20210118111520_116.png) no-repeat;
  background-size: 80px 640px;
  position: relative;
  position: relative;
  overflow: hidden;
}
.recipe_header_info .info2 .info2_item em {
  font-size: 12px;
  color: #666;
  line-height: 18px;
  position: absolute;
  left: 12px;
  bottom: 37px;
  font-weight: 400;
}
.recipe_header_info .info2 .info2_item strong {
  font-size: 14px;
  color: #222;
  line-height: 20px;
  position: absolute;
  left: 12px;
  bottom: 17px;
  font-weight: 600;
}
.recipe_ingredientsw {
  width: 520px;
  margin: 30px 0px 0px 0px;
}
.recipe_ingredients {
  background: #ffe851;
  border-radius: 16px;
  position: relative;
  margin-bottom: 15px;
}
.recipe_ingredients .left {
  width: 80px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.recipe_ingredients .left strong {
  font-size: 20px;
  text-align: right;
  color: #000;
  font-weight: 600;
  line-height: 22px;
  margin-top: 17px;
  display: block;
  padding-right: 20px;
}
.recipe_ingredients .left em {
  font-size: 12px;
  text-align: right;
  color: #000;
  font-weight: 600;
  line-height: 14px;
  display: block;
  padding-right: 20px;
}
.recipe_ingredients .right {
  background: #fff;
  padding: 18px 20px 8px 20px;
  margin-left: 80px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  position: relative;
  z-index: 100;
}
.recipe_ingredients .right strong {
  font-size: 15px;
  color: #222;
  border-radius: 8px;
  background: #f5f5f5;
  display: inline-block;
  vertical-align: top;
  margin: 0px 12px 12px 0px;
  height: 32px;
  padding: 0px 10px;
  line-height: 32px;
  border-radius: 8px;
}
.recipe_ingredients .right strong a {
  color: #222;
  margin-right: 6px;
}
.recipe_ingredients1 {
  margin-bottom: 0px;
}
.recipe_ingredients {
  background: #ffe851;
  border-radius: 16px;
  position: relative;
  margin-bottom: 15px;
}
.recipe_ingredients .left {
  width: 80px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.recipe_ingredients1 .right {
  background: #fff;
  padding: 18px 20px 8px 20px;
  margin-left: 80px;
}
.recipe_ingredients .left strong {
  font-size: 20px;
  text-align: right;
  color: #000;
  font-weight: 600;
  line-height: 22px;
  margin-top: 17px;
  display: block;
  padding-right: 20px;
}
.recipe_ingredients .left em {
  font-size: 12px;
  text-align: right;
  color: #000;
  font-weight: 600;
  line-height: 14px;
  display: block;
  padding-right: 20px;
}
.recipe_ingredients .right strong {
  font-size: 15px;
  color: #222;
  border-radius: 8px;
  background: #f5f5f5;
  display: inline-block;
  vertical-align: top;
  margin: 0px 12px 12px 0px;
  height: 32px;
  padding: 0px 10px;
  line-height: 32px;
  border-radius: 8px;
}
.recipe_ingredients .right strong a {
  color: #222;
  margin-right: 6px;
}
.menuStep {
  margin: 0 auto;
  width: 1200px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px;
}
.menuStepTitle {
  height: 32px;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 20px;
  line-height: 32px;
  /* text-align: left; */
}
.recipe_step_box {
    background: #fff;
    border-radius: 12px;
}
.recipe_step {
    position: relative;
    padding: 24px 24px 4px 134px;
    min-height: 128px;
}
.recipe_step .recipe_step_num {
    height: 128px;
    width: 86px;
    position: absolute;
    left: 24px;
    top: 24px;
    background: #ffe851;
    border-radius: 16px;
    border-bottom-right-radius: 2px;
}
.recipe_step .recipe_step_num strong {
    font-size: 20px;
    text-align: right;
    color: #000;
    font-weight: 600;
    line-height: 22px;
    margin-top: 17px;
    display: block;
    padding-right: 20px;
}
.recipe_step .recipe_step_num em {
    font-size: 12px;
    text-align: right;
    color: #000;
    font-weight: 600;
    line-height: 14px;
    display: block;
    padding-right: 20px;
}
.recipe_step .recipe_step_num p {
    font-size: 36px;
    text-align: right;
    color: #000;
    font-weight: 600;
    line-height: 70px;
    display: block;
    padding-right: 20px;
}
.recipe_step .step_content {
    min-height: 128px;
}
.recipe_step .step_content .stepimg {
    border-radius: 4px;
    display: block;
    width: 100%;
    margin-bottom: 15px;
}
.recipe_step .step_content p {
    font-size: 18px;
    color: #222;
    line-height: 28px;
    font-weight: 600;
    padding: 2px 0px 20px 0px;
}
</style>