<template>
  <div>
    <div class="container">
      <Nav></Nav>
      <div class="main">
        <div class="steps">
          <el-steps :active="activeStep" align-center>
            <el-step title="材料准备"></el-step>
            <el-step title="步骤1"></el-step>
            <el-step title="步骤2"></el-step>
            <el-step title="步骤3"></el-step>
            <el-step title="步骤4"></el-step>
          </el-steps>
          <div class="percentage">
            <el-progress :percentage="percentage"></el-progress>
          </div>
        </div>
        <div class="formStep">
          <div v-show="activeStep == 0">
            <el-form
            label-position="left"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item label="菜   名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="主要工具" prop="main_role">
              <el-input v-model="ruleForm.main_role"></el-input>
            </el-form-item>
            <el-form-item label="制作时间" prop="make_time">
              <el-input v-model="ruleForm.make_time"></el-input>
            </el-form-item>
            <el-form-item label="制作方法" prop="make_way">
              <el-input v-model="ruleForm.make_way"></el-input>
            </el-form-item>
            <el-form-item label="口   味" prop="taste">
              <el-input v-model="ruleForm.taste"></el-input>
            </el-form-item>
            <el-form-item label="难   度" prop="power">
              <el-radio-group v-model="ruleForm.power">
                <el-radio label="1"></el-radio>
                <el-radio label="2"></el-radio>
                <el-radio label="3"></el-radio>
                <el-radio label="4"></el-radio>
                <el-radio label="5"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单类型" prop="menuTypeId">
              <el-radio-group v-model="ruleForm.menuTypeId">
                <!-- <el-radio label="1">早餐</el-radio> -->
                <el-radio label="2">早/午餐</el-radio>
                <el-radio label="3">晚餐</el-radio>
                <el-radio label="4">夜宵</el-radio>
                <el-radio label="5">下午茶</el-radio>
                <el-radio label="6">汤</el-radio>
                <el-radio label="7">粥</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单功效" prop="menuAffectId">
              <el-radio-group v-model="ruleForm.menuAffectId">
                <!-- <el-radio label="1">减肥</el-radio> -->
                <el-radio label="2">祛痰</el-radio>
                <el-radio label="3">乌发</el-radio>
                <el-radio label="4">滋阴补肾</el-radio>
                <el-radio label="5">健脾开胃</el-radio>
                <el-radio label="6">消化不良</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="主 料" prop="mainfood">
              <el-input v-model="ruleForm.mainfood"></el-input>
            </el-form-item>
            <el-form-item label="辅 料" prop="secfood">
              <el-input v-model="ruleForm.secfood"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" @click="goStepOne" type="danger"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
          </div>
          <div v-show="activeStep == 1">
            <el-button icon='el-icon-back' style="margin-bottom:20px" @click="preStep">上一步</el-button>
            <el-input
              placeholder="请输入步骤1图片url"
              v-model="ruleForm.stepOneImg">
            </el-input>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入步骤1内容"
              v-model="ruleForm.stepOne">
            </el-input>
            <el-button style="width: 100%;margin-top:20px" @click="nextStep" type="danger"
                >下一步</el-button
              >
          </div>
          <div v-show="activeStep == 2">
            <el-button icon='el-icon-back' style="margin-bottom:20px" @click="preStep">上一步</el-button>
            <el-input
              placeholder="请输入步骤2图片url"
              v-model="ruleForm.stepTwoImg">
            </el-input>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入步骤2内容"
              v-model="ruleForm.stepTwo">
            </el-input>
            <el-button style="width: 100%;margin-top:20px" @click="nextStep" type="danger"
                >下一步</el-button
              >
          </div>
          <div v-show="activeStep == 3">
            <el-button icon='el-icon-back' style="margin-bottom:20px" @click="preStep">上一步</el-button>
            <el-input
              placeholder="请输入步骤3图片url"
              v-model="ruleForm.stepThreeImg">
            </el-input>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入步骤3内容"
              v-model="ruleForm.stepThree">
            </el-input>
            <el-button style="width: 100%;margin-top:20px" @click="nextStep" type="danger"
                >下一步</el-button
              >
          </div>
          <div v-show="activeStep == 4">
            <el-button icon='el-icon-back' style="margin-bottom:20px" @click="preStep">上一步</el-button>
            <el-input
              placeholder="请输入步骤4图片url"
              v-model="ruleForm.stepFourImg">
            </el-input>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入步骤4内容"
              v-model="ruleForm.stepFour">
            </el-input>
            <el-input
              placeholder="请输入成品图片url"
              v-model="ruleForm.okImg">
            </el-input>
            <el-input
              placeholder="请输入主图片url"
              v-model="ruleForm.mainImage">
            </el-input>
            <el-input
              placeholder="请输入好物推荐"
              v-model="ruleForm.goods">
            </el-input>
            <el-input
              placeholder="请输入备注"
              v-model="ruleForm.menuTips">
            </el-input>
            <el-button style="width: 100%;margin-top:20px" @click="finishStep" type="success"
                >完成</el-button
              >
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Nav from "@/components/nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      userInfo:{},
      activeStep: 0,
      activeName: "second",
      ruleForm: {
        name: "",//菜名
        power:'',
        mainfood: "",
        secfood: "",
        stepOne:'',
        stepOneImg:'',
        stepTwo:'',
        stepTwoImg:'',
        stepThree:'',
        stepThreeImg:'',
        stepFour:'',
        stepFourImg:'',
        okImg:'',
        goods:'',
        mainImage:'',
        menuTypeId:'',
        menuAffectId:'',
        menuTips:'',
        main_role:'',
        make_time:'',
        make_way:'',
        taste:''
      },
      rules: {
        name: [{ required: true, message: "请输入菜名", trigger: "blur" }],
        cookWay: [{ required: true, message: "不能为空", trigger: "blur" }],
        taste: [{ required: true, message: "不能为空", trigger: "blur" }],
        power: [{ required: true, message: "不能为空", trigger: "blur" }],
        time: [{ required: true, message: "不能为空", trigger: "blur" }],
        mainfood: [{ required: true, message: "不能为空", trigger: "blur" }],
        secfood: [{ required: true, message: "不能为空", trigger: "blur" }],
        main_role:[{ required: true, message: "不能为空", trigger: "blur" }],
        make_time:[{ required: true, message: "不能为空", trigger: "blur" }],
        make_way:[{ required: true, message: "不能为空", trigger: "blur" }],
        taste:[{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted(){
    this.userInfo = {...store.state.userInfo};
  },
  computed:{
    percentage(){
      return (this.activeStep)*25;
    }
  },
  methods: {
    preStep(){
      this.activeStep--;
    },
    goStepOne(){
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.activeStep = 1;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    nextStep() {
      if (this.activeStep++ > 3) this.activeStep = 0;
    },
    finishStep() {
       for(var key in this.ruleForm){
          if(this.ruleForm[key] == ''){
            this.$message.error('请确认所有数据都已输入');
            return
          }
        } 
      this.$http.post('/healthy/public/api/menu/CreateMenu',{
        'user_id':this.userInfo.id,//用户id
        'main_image':this.ruleForm.mainImage,//主图
        'power':this.ruleForm.power,//难度
        'menutype_id':this.ruleForm.menuTypeId,
        'menuaffect_id':this.ruleForm.menuAffectId,
        'sub_material':this.ruleForm.secfood,
        'main_material':this.ruleForm.mainfood,
        'next1_image':this.ruleForm.stepOneImg,
        'next1_connect':this.ruleForm.stepOne,
        'next2_image':this.ruleForm.stepTwoImg,
        'next2_connect':this.ruleForm.stepTwo,
        'next3_image':this.ruleForm.stepThreeImg,
        'next3_connect':this.ruleForm.stepThree,
        'next4_image':this.ruleForm.stepFourImg,
        'next4_connect':this.ruleForm.stepFour,
        'ok_images':this.ruleForm.okImg,
        'menu_tips':this.ruleForm.menuTips,
        'goods':this.ruleForm.goods,
        main_role:this.ruleForm.main_role,
        name:this.ruleForm.name,
        make_time:this.ruleForm.make_time,
        make_way:this.ruleForm.make_way,
        taste:this.ruleForm.taste,
        ho_switch:'1',
        sc_switch:'1',
        frash_switch:'1'
      })
      .then(
        (res)=>{
          let resData = res.data;
          if(resData.code == 1){
            this.$message({
              message: resData.msg,
              type: 'success'
            });
            for(var key in this.ruleForm){
                this.ruleForm[key] = ''
            } 
            this.$router.push({path:'/infoCenter'});
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
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
.steps {
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  border-radius: 12px;
  background-color: #fff;
  box-sizing: border-box;
}
.formStep {
  width: 100%;
  padding: 30px 100px;
  /* margin: 10px 0; */
  border-radius: 12px;
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
}
.percentage {
  padding: 0 110px;
}
</style>