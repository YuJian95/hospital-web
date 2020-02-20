<template>
    <div>
      <!--      表格位置-->
      <div class="button-table-box">
        <div class="button-box">
            <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                       class="add-button" @click="addDoctor()">添加</el-button>
        </div>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      </div>
    </div>
</template>

<script>
    export default {
        name: "doctorDetail",
      data() {
          return {
            // 表格数据
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '70',
                option: ''
              }, {
                prop: 'doctorID',
                label: '医生ID',
                width: '120',
                option: ''
              }, {
                prop: 'name',
                label: '姓名',
                width: '130',
                option: ''
              }, {
                prop: 'gender',
                label: '性别',
                width: '50',
                option: ''
              }, {
                prop: 'professionalTitle',
                label: '职称',
                width: '100',
                option: ''
              }, {
                prop: 'department',
                label: '所属专科',
                width: '120',
                option: ''
              }, {
                prop: 'outpatient',
                label: '所属门诊',
                width: '160',
                option: ''
              }],
              tableData: [{
                ID: '1',
                doctorID: '1001',
                name: '杨XX',
                gender: '女',
                professionalTitle: '医师',
                department: '内科',
                outpatient: '甲状腺'
              }, {
                ID: '2',
                doctorID: '1002',
                name: '杨XX3',
                gender: '男',
                professionalTitle: '教授',
                department: '内科',
                outpatient: '甲状腺'
              }],
              option: {
                width: '250',
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
          // 获取表格的点击按钮的信息反馈
        getTableData: function (option) {
          if (option.buttonName == '查看') {
            this.getDoctorDetail(option.scopeRow)
          } else if (option.buttonName == '删除') {
            this.deleteDoctor(option)
          } else if (option.buttonName == '修改') {
            this.updateDoctor(option.scopeRow)
          }
        },
        // 添加医生信息
        addDoctor: function() {
          this.$router.push({
            path: '/addEditDoctor',
            query: {
              status: 'add'
            }
          })
        },
        // 点击查看某条医生信息的详情
        getDoctorDetail: function (row) {
          this.$router.push({
            path: '/checkDoctor',
            query: {
              doctorID: row.doctorID
            }
          })
        },
        // 用户点击了编辑按钮，也是跳转到查案页面
        toEditDoctor: function (row) {
          this.$refs.tableList.editIndex(row)
        },
        // 修改某条信息
        updateDoctor: function(row) {
          console.log(row)
          this.$refs.tableList.handleUpdate()
        },
        // 用户点击删除某条医生信息
        deleteDoctor: function (scope) {
          this.$refs.tableList.deleteData(scope.scopeIndex)
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../.././common/scss/common.scss";
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 15px;
  }
</style>
