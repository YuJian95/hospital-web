<!--该页面用于展示医生的当周和下周的出诊安排-->
<template>
  <div class="out-box">
    <section>
        <span class="title">本周出诊详情</span>
      <div class="table-box">
        <table-list :tableAllData="tableAllData"></table-list>
      </div>
    </section>
    <section class="next-box">
      <span class="title">下周出诊详情</span>
      <tableListNextWeek :tableAllData="nextWeekTable"></tableListNextWeek>
    </section>
  </div>

</template>

<script>
  import tableListNextWeek from '../../components/tableList'
  import {getVisitPlanList} from "@/api/doctor";
  import {getCookie} from "@/utils/cookies";
  import {tips} from "@/common/js/optionTips";
  import {outCallTime} from "@/common/js/timeFilters";
  import {getWeek, dateForm} from "@/common/js/visitPlanData";
  import {getTreatRoomById} from "@/api/treatRoom";

  export default {
        name: "outCallDetail",
      components: {
        tableListNextWeek
      },
      data() {
        return {
          // 表格数据
          tableAllData: {
            dataNull: false,
            tableTitle: [{
              prop: 'ID',
              label: '编号',
              width: '100',
              option: ''
            }, {
              prop: 'date',
              label: '日期',
              width: '140',
              option: 'time'
            }, {
              prop: 'time',
              label: '时间',
              width: '140',
              option: ''
            }, {
              prop: 'hospital',
              label: '医院',
              width: '180',
              option: ''
            }, {
              prop: 'department',
              label: '专科/门诊',
              width: '213',
              option: 'input'
            }, {
              prop: 'treatRoom',
              label: '诊室',
              width: '250',
              option: 'input'
            }],
            tableData: [],
            option: '',
            maxHeight: '210px'
          },
          nextWeekTable: {
            dataNull: false,
            tableTitle: [{
              prop: 'ID',
              label: '编号',
              width: '100',
              option: ''
            }, {
              prop: 'date',
              label: '日期',
              width: '140',
              option: 'time'
            }, {
              prop: 'time',
              label: '时间',
              width: '140',
              option: ''
            }, {
              prop: 'hospital',
              label: '医院',
              width: '180',
              option: 'input'
            }, {
              prop: 'department',
              label: '专科/门诊',
              width: '213',
              option: 'input'
            }, {
              prop: 'treatRoom',
              label: '诊室',
              width: '250',
              option: 'input'
            }],
            tableData: [],
            option: '',
            maxHeight: '210px'
          }
        }
      },
    methods: {
          // 通过诊室id获取诊室信息
      getTreatRoomById: function(id, table, item, item2, info) {
        let that = this;
        console.log(info)
        getTreatRoomById(id).then(res => {
          if (res.code === 200) {
            table.tableData.push({
              ID: item2.id,
              date: item2.day,
              time: outCallTime(item2.time),
              hospital: item.info.name,
              department: info.specialName + '/' + info.outpatientName,
              treatRoom: res.data.address
            })
          }
        }).catch(() => {
          tips('error', '获取诊室信息失败')
        })
      },
          // 通过医生账号获取每周周医生出诊计划
      getVisitPlanList: function (date, table) {
        table.tableData = [];
        let week = getWeek(date);
        let sunday = dateForm(week.sunday);
        let saturday = dateForm(week.saturday);
        let that = this;
        getVisitPlanList(getCookie("username"), sunday, saturday).then(res => {
          if (res.code === 200) {
            if (res.data.planListDTOList.length === 0) {
              table.dataNull = true;
            } else {
              const data = res.data.planListDTOList;
              data.forEach(function (item) {
                item.planResiduesDTOList.forEach(function (item2){
                 that.getTreatRoomById(item2.clinicId, table, item, item2, res.data.doctorDTO);
                })
              })
            }
          }
        }).catch(() => {
          tips('error', "获取出诊计划失败")
        })
      }
    },
    created() {
      let that = this;
      let currentDate = new Date();
      let nextWeek = new Date();
      let date = currentDate.getDate();
      nextWeek.setDate(date + 7); // 下周对应的日期
      this.getVisitPlanList(currentDate, that.tableAllData); // 获取本周的出诊计划
      this.getVisitPlanList(nextWeek, that.nextWeekTable)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/common";
  .out-box{
    @include width-margin(95%, auto);
    text-align: left;
    .title{
      height: 30px;
      @include font-style(16px, $major-blue-color);
    }
    .table-box{
      width: 100%;
      height: 210px;
    }
  }
  .next-box{
    margin-top: 30px;
  }
</style>
