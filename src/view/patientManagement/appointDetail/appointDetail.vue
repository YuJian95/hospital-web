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

        <el-button type="primary" style="width: 70px;height: 90%;" @click="getPatientList">查询</el-button>
      </div>
      <!--      表格位置-->
      <div class="button-table-box">
        <span class="treat-room-text"></span>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
        <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>
      </div>
    </div>
</template>

<script>
  import {getPatientList} from "@/api/doctor";
  import {dateFormYMD} from "@/common/js/dateFormYMD";
  import {tips} from "@/common/js/optionTips";
  import {getGender, getTimePeriod} from "@/common/js/timeFilters";
  import {getCookie} from "@/utils/cookies";
  import {updateTreatStatusFinish, updateStatusAgain} from "@/api/patient";

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
              dataNull: false,
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
              tableData: [],
              option: {
                width: '350',
                button: [
                //   {
                //   size: 'mini',
                //   type: 'primary',
                //   name: '查看'
                // }
                ]
              }
            },
            isTimeTreat: false,
            isClickTreat: false,
            // 底部分页的数据
            pageList: {
              pageNum: 1,
              pageSize: 5,
              total: 0
            },
            statusData: []
          }
      },
      created() {
          this.getCurrentTime();
        this.addTableButton();
        this.getPatientList();
      },
      methods: {
          // 获取从表格中获取的按钮的事件
        getTableData: function(option){
          if (option.buttonName === '查看') {
            this.getPatientDetailByID(option.scopeRow)
          } else if (option.buttonName === '就诊') {
            // 修改患者状态
            updateTreatStatusFinish(option.scopeRow.ID).then(res => {
              if (res.code === 200) {
                this.getPatientList()
              }
            }).catch(() => {
              tips('error', '网络错误')
            })
          } else if (option.buttonName === '重新叫号') {
            // 修改患者状态
            updateStatusAgain(option.scopeRow.ID).then(res => {
              if (res.code === 200) {
                tips('success', '已重新叫号');
                this.getPatientList()
              }
            }).catch(() => {
              tips('error', '重新叫号失败')
            })
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
            this.selectTimeID = 1;
            this.isTimeTreat = true
          } else if (today > afternoonStart && today < afternoonEnd) {
            this.selectTimeID = 2;
            this.isTimeTreat = true
          } else {
            this.selectTimeID = 2;
            this.isTimeTreat = true
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
            // if (this.isClickTreat) {
            //   const treatAgainButton = {
            //     size: 'mini',
            //     type: 'warning',
            //     name: '重新叫号'
            //   }
            //   this.tableAllData.option.button.push(treatAgainButton)
            // }
          }
        },
        // 用户点击了查看按钮
        getPatientDetailByID: function (scope) {
          console.log(scope.ID)
          this.$router.push({
            path: '/patientMedicalRecord',
            query: {
              ID: scope.treatCardID ,
              appointId: scope.ID
            }
          });
        },
        // 获取患者挂号列表
        getPatientList: function () {
          this.statusData = [];
          this.tableAllData.tableData = [];
          let date = dateFormYMD(this.appointDate);
          getPatientList(getCookie('username'), date, this.selectTimeID,
            this.pageList.pageNum, this.pageList.pageSize).then(res => {
              if (res.code === 200) {
                let data = res.data.list
                if (data === null) {
                  this.tableAllData.dataNull = true;
                } else {
                  if (data.length !== 0) {
                    let that = this;
                    data.forEach(function (item, index) {
                      that.tableAllData.tableData.push({
                        btnStatus: item.status,
                        ID: item.appointmentId,
                        queueID: item.queueNum,
                        treatCardID: item.cardId,
                        name: item.name,
                        gender: getGender(item.gender),
                        appointTime: getTimePeriod(item.timePeriod)
                      })
                    });
                    console.log(this.tableAllData.tableData)

                    this.tableAllData.dataNull = false;
                  } else {
                    this.tableAllData.dataNull = true;
                  }
                }
              }
          }).catch(() => {
            tips('error', '获取患者列表失败 ');
            this.tableAllData.dataNull = true;
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getPatientList()
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
