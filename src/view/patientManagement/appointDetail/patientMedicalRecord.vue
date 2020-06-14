<!--医生点击的某个患者的查看时跳进来查看患者以往的病历-->
<template>
  <div>
<!--    顶部的个人信息框框-->
    <section class="out-border" v-loading="isLoading">
      <div class="top-text">
        <div class="text-box">
          <span>姓名：</span>
          <span class="gray-text">{{patientData.name}}</span>
        </div>
        <div class="text-box">
          <span>就诊卡号：</span>
          <span class="gray-text">{{cardId}}</span>
        </div>
        <div class="text-box">
          <span>就诊医院：</span>
          <span class="gray-text">{{patientData.hospitalName}}</span>
        </div>
      </div>
      <div class="top-text">
        <div class="text-box">
          <span>就诊日期：</span>
          <span class="gray-text">{{patientData.day | getTreatTimeNoon}}</span>
        </div>
        <div class="text-box">
          <span>就诊专科/门诊：</span>
          <span class="gray-text">{{patientData.specialName}} / {{patientData.outpatientName}}</span>
        </div>
      </div>
    </section>
    <section class="date-button-box">
      <div class="title-text">
        <span class="title">病历：</span>
        <span class="gray-text">{{patientCase.gmtCreate | dateTime('date')}}就诊</span>
      </div>
      <el-button type="primary" class="button" size="mini" @click="dialogFormVisible = true"
      v-if="!isTodayCase">添加新简历</el-button>
      <el-button type="primary" class="button" size="mini" @click="dialogUpdateVisible = true"
                 v-if="isTodayCase">修改病历</el-button>
    </section>
    <section class="out-border ">
      <div class="medical-record-out-box">
        <div class="record-text">{{patientCase.content}}</div>
        <div class="doctor-box">
          <span>医生：</span>
          <span class="doctor-name">{{patientData.doctorName}}</span>
        </div>
      </div>
    </section>

<!--    <label v-if="dataLength === 0" style="font-size: 20px;margin-top: 100px;text-align: center">暂无病历</label>-->

    <section class="icon-box">
      <img class="img-icon" src="../../../assets/left-icon.png" @click="goLastPage">
      <img src="../../../assets/right-icon.png" class="img-icon" @click="goNextPage">
    </section>
<!--    点击添加新病历弹出的框-->
    <el-dialog title="添加新病历" :visible.sync="dialogFormVisible" width="35%"
                            @close="cancelModal" v-loading="isLoading">
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
      <el-button type="primary" @click="addPatientCase()">确 定</el-button>
    </div>
  </el-dialog>

<!--    修改病历-->
    <el-dialog title="修改病历" :visible.sync="dialogUpdateVisible" width="35%"
               @close="cancelModal" v-loading="isLoading">
      <el-form>
        <!--        <el-form-item label="专科名称：" label-width="120px">-->
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="updateCase"
          class="brief"
          maxlength="1000"
          :autosize="{ minRows: 2, maxRows: 6}"
          show-word-limit>
        </el-input>
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="updatePatientCase()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getPatientTreatRecord, getTreatRecordCase, addPatientCase, updatePatientCase} from "@/api/patient";
  import {getCookie} from "@/utils/cookies";
  import {tips} from "@/common/js/optionTips";
  import {dateFormYMD} from "@/common/js/dateFormYMD";

  export default {
    name: "show2",
    data() {
      return {
        dialogFormVisible: false,
        medicalRecord: '',
        cardId: 0,
        patientData: {},
        patientCase: '',
        appointId: 0,
        isLoading: false,
        isTodayCase: false, // 是否已经写了今天的就诊病历
        updateCase: '', // 修改病历
        dialogUpdateVisible: false,
        page: 1,
        // dataLength: 0
      }
    },
    methods: {
      // 上一页
      goLastPage: function() {
        this.page = this.page - 1;
        this.getPatientTreatRecord();
      },
      // 下一页
      goNextPage: function() {
        this.page = this.page + 1;
        this.getPatientTreatRecord();
      },
      // 关闭模态框
      cancelModal: function () {
        this.dialogFormVisible = false;
        this.dialogUpdateVisible = false;
      },
      // 获取患者就诊记录
      getPatientTreatRecord: function () {
        this.isLoading = true;
        getPatientTreatRecord(this.cardId, this.page, 1).then(res => {
          if (res.code === 200) {
            if (res.data.list !== null) {
              this.dataLength = res.data.list.length;
              this.patientData = res.data.list[0];
              this.getTreatRecordCase(this.patientData.appointmentId);
            } else {
              this.isLoading = false;
              tips('error', '无数据')
            }
          }
        })
      },
      // 获取某次就诊的病历
      getTreatRecordCase: function (appointmentId) {
        this.isLoading = true;
        this.appointId = appointmentId;
          this.isLoading = true;
        getTreatRecordCase(this.cardId, appointmentId).then(res => {
          if (res.code === 200) {
            if (res.data === null) {
              this.patientCase = '无'
            } else {
              this.patientCase = res.data;
              if (dateFormYMD(res.data.gmtCreate) == dateFormYMD(new Date()) &&
                res.data.doctorId === sessionStorage.getItem('accountID')) {
                this.isTodayCase = true;
                this.updateCase = res.data.content;
                this.isLoading = false;
              }
            }
            this.isLoading = false;
          }
        })
      },
      // 添加新病历
      addPatientCase: function () {
        this.isLoading = true;
        addPatientCase({
          appointmentId: this.appointId,
          cardId: this.cardId,
          content: this.medicalRecord,
          doctorId: getCookie('username')
        }).then(res => {
          if (res.code === 200) {
            this.isLoading = false;
            tips('success', '添加病历成功');
            this.dialogFormVisible = false;
            this.getPatientTreatRecord();
            this.getTreatRecordCase(this.appointId);
          }
        }).catch(() => {
          this.isLoading = false;
          tips('error', '添加病历失败')
        })
      },
      // 修改病历
      updatePatientCase: function () {
        this.isLoading = true;
        updatePatientCase(this.patientCase.id, {
          content: this.updateCase
        }, this.cardId).then(res => {
          if (res.code === 200) {
            this.isLoading = false;
            tips('success', '修改病历成功')
            this.dialogUpdateVisible = false;
            this.getTreatRecordCase(this.appointId);
          }
        })
      }
    },
    created() {
      this.cardId = this.$route.query.ID;
      this.appointId = this.$route.query.appointId;
      console.log(this.appointId)
      this.getPatientTreatRecord();
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

