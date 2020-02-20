<template>
    <div class="button-table-box">
      <div class="button-box">
        <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                   class="add-button" @click="toAddHospital()">添加</el-button>
      </div>
      <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
    </div>
</template>

<script>
    export default {
        name: "hospitalDetail",
      data() {
          return {
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '70',
                option: ''
              }, {
                prop: 'hospitalID',
                label: '医院ID',
                width: '100',
                option: ''
              }, {
                prop: 'name',
                label: '名称',
                width: '150',
                option: ''
              }, {
                prop: 'address',
                label: '地址',
                width: '300',
                option: ''
              }, {
                prop: 'phone',
                label: '电话',
                width: '150',
                option: ''
              }],
              tableData: [{
                ID: '1',
                hospitalID: '1001',
                name: 'XXX大学城总院',
                address: '广州番禺区大学城医院',
                phone: '020-1234567'
              }, {
                ID: '2',
                hospitalID: '1002',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院',
                phone: '020-1234568'
              }, {
                ID: '3',
                hospitalID: '1003',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院3',
                phone: '020-1234568'
              }, {
                ID: '4',
                hospitalID: '1004',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院4',
                phone: '020-1234568'
              }, {
                ID: '5',
                hospitalID: '1005',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院5',
                phone: '020-1234568'
              }, {
                ID: '6',
                hospitalID: '1006',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院6',
                phone: '020-1234568'
              }, {
                ID: '4',
                hospitalID: '1004',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院4',
                phone: '020-1234568'
              }, {
                ID: '5',
                hospitalID: '1005',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院5',
                phone: '020-1234568'
              }, {
                ID: '6',
                hospitalID: '1006',
                name: 'XXX顺德分院',
                address: '顺德XXX路XXX分院6',
                phone: '020-1234568'
              }],
              option: {
                width: '200',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看'
                }, {
                  size: 'mini',
                  type: 'danger',
                  name: '删除'
                }]
              }
            },
          }
      },
      methods: {
          // 获取从表格组件传过来的组件
        getTableData: function (option) {
          console.log(option)
          if (option.buttonName == '查看') {
            this.getData(option.scopeRow)
          } else if (option.buttonName == '删除') {
            this.deleteData(option)
          }
        },
        // 进行查看操作
        getData: function (row) {
          this.$router.push({
            path: '/checkHospital',
            query: {
              hospitalID: row.hospitalID
            }
          })
        },
        // 进行删除操作
        deleteData: function (scope) {
          console.log('删除' + scope.scopeRow.hospitalID)
          this.$refs.tableList.deleteData(scope.scopeIndex)
        },
        // 跳转到添加医院页面
        toAddHospital: function () {
          this.$router.push({
            path: '/addOrEditHospital',
            query: {
              status: 'add'
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../.././common/scss/common.scss";
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 30px;
  }
</style>
