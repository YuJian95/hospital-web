<!--登录上来的医生查看自己的患者挂号的情况-->
<template>
    <div class="out-box">

<!--      顶部的选择条件-->
      <div class="top-row-box">
        <div class="info-in-box margin-right">
          <span class="title">选择日期：</span>
          <el-date-picker
            v-model="appointDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="info-in-box margin-right">
          <span class="title">时间：</span>
          <el-select v-model="selectTimeID" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in timeSelectData"
              :key="item.timeID"
              :label="item.time"
              :value="item.timeID">
            </el-option>
          </el-select>
        </div>

        <el-button type="primary" style="width: 70px;height: 90%;">查询</el-button>
      </div>
      <!--      表格位置-->
      <div class="button-table-box">
        <span class="treat-room-text">诊室：内科二楼7诊室</span>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      </div>
    </div>
</template>

<script>
  import { login } from '@/api/login.js'
  import axios from 'axios'
    export default {
        name: "show1",
      data() {
          return {
            appointDate: '', // 顶部选择的日期
            timeSelectData: [{
              timeID: 1,
              time: '08:30~12:00'
            }, {
              timeID: 2,
              time: '14:00~18:00'
            }],
            selectTimeID: 1,
            // 表格数据
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '100',
                option: ''
              }, {
                prop: 'queueID',
                label: '就诊排队号',
                width: '100',
                option: ''
              }, {
                prop: 'treatCardID',
                label: '就诊卡号',
                width: '120',
                option: 'input'
              }, {
                prop: 'name',
                label: '姓名',
                width: '120',
                option: 'input'
              }, {
                prop: 'gender',
                label: '性别',
                width: '100',
                option: 'input'
              }, {
                prop: 'appointTime',
                label: '预约时间',
                width: '150',
                option: 'input'
              }],
              tableData: [{
                ID: '1',
                queueID: 1,
                treatCardID: '1001',
                name: 'yang',
                gender: 1,
                appointTime: 1
              }, {
                ID: '2',
                queueID: 2,
                treatCardID: '1002',
                name: 'yue',
                gender: 2,
                appointTime: 2
              }],
              option: {
                width: '300',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看'
                }]
              }
            },
            isTimeTreat: false,
            isClickTreat: false
          }
      },
      created() {
          this.getCurrentTime()
        this.addTableButton()
        this.testAPI()
      },
      methods: {
          // 获取从表格中获取的按钮的事件
        getTableData: function(option){
          if (option.buttonName === '查看') {
            this.getPatientDetailByID(option.scopeRow)
          } else if (option.buttonName === '就诊') {
            // this.toPatientTreat(option.scopeRow)
            this.$refs.tableList.clickTreat(option.scopeRow.ID)
          } else if (option.buttonName == '修改') {
            this.handleUpdate(option.scopeRow)
          }
        },
          // 获取当天时间
        getCurrentTime: function () {
          let today = new Date()
          this.appointDate = today
          const year = today.getFullYear();
          const month = today.getMonth();
          const date = today.getDate();
          // 定义早上医生上班时间
          let morningStart = new Date(year, month, date, 8, 30);
          let morningEnd = new Date(year, month, date, 12);
          // 定义医生下午的上班时间
          let afternoonStart = new Date(year, month, date, 14);
          let afternoonEnd = new Date(year, month, date, 18, 30);
          if (today > morningStart && today < morningEnd) {
            this.selectTimeID = 1
            this.isTimeTreat = true
          } else if (today > afternoonStart && today < afternoonEnd) {
            this.selectTimeID = 2
            this.isTimeTreat = true
          } else {
            this.selectTimeID = ''
          }
        },
        // 到达医生出诊时间动态的添加就诊按钮和重新叫号按钮
        addTableButton: function () {
          if (this.isTimeTreat) {
            const treatButton = {
              size: 'mini',
              type: 'success',
              name: '就诊'
            }
            this.tableAllData.option.button.push(treatButton)
            if (this.isClickTreat) {
              const treatAgainButton = {
                size: 'mini',
                type: 'warning',
                name: '重新叫号'
              }
              this.tableAllData.option.button.push(treatAgainButton)
            }
          }
        },
        // 用户点击了查看按钮
        getPatientDetailByID: function (scope) {
          this.$router.push({
            path: '/patientMedicalRecord',
            query: { ID: scope.treatCardID }
          });
        },
        // 测试接口
        testAPI: function () {
          let userName = 'admin'
          let password = 'admin'
          axios.get('/hospital/power/account/login/' + userName + '/' + password).then(res => {
            console.log(res)
          })
          // login(userName,password).then(res => {
          //   console.log(res)
          // })
        }
        }
    }
</script>

<style lang="scss">
  @import "../../../common/scss/common";
  .out-box{
    @include width-margin(90%, 100%);
    .top-row-box{
      width: 100%;
      height: 100%;
      @include flex-direction(row);
      align-items: center;
      .margin-right{
        margin-right: 30px;
      }
    }
  }
  .button-table-box{
    @include width-margin(100%, 100%);
    margin-top: 15px;
    .treat-room-text{
      margin-top: 20px;
      @include font-style(16px, $major-blue-color);
      margin-bottom: 5px;
      display: flex;
      justify-content: flex-start;
    }
  }
</style>
