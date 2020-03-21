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
    export default {
        name: "outCallDetail",
      components: {
        tableListNextWeek
      },
      data() {
        return {
          // 表格数据
          tableAllData: {
            tableTitle: [{
              prop: 'ID',
              label: '编号',
              width: '100',
              option: ''
            }, {
              prop: 'date',
              label: '日期',
              width: '140',
              option: ''
            }, {
              prop: 'time',
              label: '时间',
              width: '140',
              option: 'input'
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
            tableData: [{
              ID: '1',
              date: '2020-02-10',
              time: '08:30~12:00',
              hospital: '大学城总院',
              department: '内科/甲状腺',
              treatRoom: '内科二楼7诊室'
            }, {
              ID: '2',
              date: '2020-02-10',
              time: '08:30~12:00',
              hospital: '大学城总院',
              department: '内科/甲状腺',
              treatRoom: '内科二楼7诊室'
            }],
            option: '',
            maxHeight: '210px'
          },
          nextWeekTable: {
            tableTitle: [{
              prop: 'ID',
              label: '编号',
              width: '100',
              option: ''
            }, {
              prop: 'date',
              label: '日期',
              width: '140',
              option: ''
            }, {
              prop: 'time',
              label: '时间',
              width: '140',
              option: 'input'
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
            tableData: [{
              ID: '1',
              date: '2020-02-10',
              time: '08:30~12:00',
              hospital: '大学城总院',
              department: '内科/甲状腺',
              treatRoom: '内科二楼7诊室'
            }, {
              ID: '2',
              date: '2020-02-10',
              time: '08:30~12:00',
              hospital: '大学城总院',
              department: '内科/甲状腺',
              treatRoom: '内科二楼8诊室'
            }],
            option: '',
            maxHeight: '210px'
          }
        }
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
