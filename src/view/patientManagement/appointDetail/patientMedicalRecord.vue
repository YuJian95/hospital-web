<!--医生点击的某个患者的查看时跳进来查看患者以往的病历-->
<template>
  <div>
<!--    顶部的个人信息框框-->
    <section class="out-border">
      <div class="top-text">
        <div class="text-box">
          <span>就诊排队号：</span>
          <span class="gray-text">1</span>
        </div>
        <div class="text-box">
          <span>姓名：</span>
          <span class="gray-text">杨XX</span>
        </div>
        <div class="text-box">
          <span>性别：</span>
          <span class="gray-text">女</span>
        </div>
      </div>
      <div class="top-text">
        <div class="text-box">
          <span>就诊卡号：</span>
          <span class="gray-text">1000001</span>
        </div>
        <div class="text-box">
          <span>就诊时间段：</span>
          <span class="gray-text">08:30~09:00</span>
        </div>
      </div>
    </section>
    <section class="date-button-box">
      <div class="title-text">
        <span class="title">病历：</span>
        <span class="gray-text">2020-10-20就诊</span>
      </div>
      <el-button type="primary" class="button" size="mini" @click="dialogFormVisible = true">添加新简历</el-button>
    </section>
    <section class="out-border ">
      <div class="medical-record-out-box">
        <div class="record-text">看到就烦来得及飞拉萨经典老歌看门狗</div>
        <div class="doctor-box">
          <span>医生：</span>
          <span class="doctor-name">杨XX</span>
        </div>
      </div>
    </section>
    <section class="icon-box">
      <img class="img-icon" src="../../../assets/left-icon.png">
      <img src="../../../assets/right-icon.png" class="img-icon">
    </section>
<!--    点击添加新病历弹出的框-->
    <el-dialog title="添加新病历" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form>
<!--        <el-form-item label="专科名称：" label-width="120px">-->
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="medicalRecord"
            class="brief"
            maxlength="1000"
            :autosize="{ minRows: 2, maxRows: 6}"
            show-word-limit>
          </el-input>
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addDepartment()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "show2",
    data() {
      return {
        dialogFormVisible: false,
        medicalRecord: ''
      }
    },
    methods: {
      // 关闭模态框
      cancelModal: function () {
        this.dialogFormVisible = false
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../common/scss/common";
  .out-border{
    @include width-margin(90%, auto);
    border: 1px solid #BBBBBE;
    border-radius: 6px;
    padding: 10px 0;
    /*顶部的个人信息处*/
    .top-text{
      @include width-margin(90%, 50px);
      line-height: 50px;
      @include flex-direction(row);
      .text-box{
        width: 33%;
        @include font-style(17px, #000000);
        text-align: left;
        .gray-text{
          @include font-style(17px, $gray-text-color);
          margin-left: 10px;
        }
      }
    }
    /*底部的病历*/
    .medical-record-out-box{
      @include width-margin(100%, 250px);
      @include flex-direction(column);
      text-align: left;
      .record-text{
        @include width-margin(95%, 230px);
        text-align: left;
      }
      /*医生签名*/
      .doctor-box{
        margin-left: 20px;
        @include font-style(16px, $major-blue-color);
        text-align: left;
        .doctor-name{
          margin-left: 10px;
          color: $gray-text-color;
        }
      }
    }
  }
  /*中间的简历日期和添加新按钮的病历*/
  .date-button-box{
    @include width-margin(90%,50px);
    line-height: 50px;
    @include flex-direction(row);
    justify-content: space-between;
    margin-top: 30px;
    .title-text{
      width: 40%;
      @include flex-direction(row);
      .title{color: $major-blue-color;}
      .grey-text{color: $gray-text-color; margin-left: 10px;}
    }
    .button{
      width: 100px;
      height: 40px;
    }
  }
  /*底部左右箭头*/
  .icon-box{
    @include width-margin(100px, auto);
    display: flex;
    vertical-align: center;
    margin-top: 10px;
    .img-icon{
      @include icon-style(25px, 25px);
      margin-right: 30px;
    }
  }
</style>

