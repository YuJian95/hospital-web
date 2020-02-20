<template>
    <div class="out-box">
      <div class="info-in-box">
        <span class="title">医院：</span>
        <el-select v-model="selectHospitalID" placeholder="请选择">
          <el-option
            v-for="item in hospitalData"
            :key="item.hospitalID"
            :label="item.name"
            :value="item.hospitalID">
          </el-option>
        </el-select>
      </div>

      <div class="button-table-box">
        <div class="button-box">
          <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                     class="add-button" @click="dialogFormVisible = true">添加</el-button>
        </div>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      </div>

      <!--     点击添加门诊的按钮跳出来的弹出框-->
      <el-dialog title="添加专科" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
        <el-form>
          <el-form-item label="专科名称：" label-width="120px">
            <el-select v-model="selectDepartmentID" placeholder="请选择">
              <el-option
                v-for="item in departmentSelectData"
                :key="item.departmentID"
                :label="item.name"
                :value="item.departmentID"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
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
        name: "departmentSetUp",
      data() {
          return {
            // 上面的下拉框的医院的数据
            hospitalData: [{
              hospitalID: '1001',
              name: '大学城总院'
            }, {
              hospitalID: '1002',
              name: '顺德分院'
            }, {
              hospitalID: '1003',
              name: '越秀区分院'
            }, {
              hospitalID: '1004',
              name: '白云区分院'
            }],
            selectHospitalID: '',
            // 表格数据
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '100',
                option: ''
              }, {
                prop: 'departmentID',
                label: '专科ID',
                width: '150',
                option: ''
              }, {
                prop: 'name',
                label: '名称',
                width: '300',
                option: ''
              }],
              tableData: [{
                ID: '1',
                departmentID: '1001',
                name: '儿科',
              }, {
                ID: '2',
                departmentID: '1002',
                name: '内科',
              }],
              option: {
                width: '250',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看门诊'
                }, {
                  size: 'mini',
                  type: 'danger',
                  name: '删除'
                }]
              }
            },
            // 模态框的
            dialogFormVisible: false,
            // 模态框的下拉选择
            departmentSelectData: [{
              departmentID: '1001',
              name: '儿科',
              disabled: false
            }, {
              departmentID: '1002',
              name: '内科',
              disabled: false
            }, {
              departmentID: '1003',
              name: '妇科',
              disabled: false
            }, {
              departmentID: '1004',
              name: '产科',
              disabled: false
            }],
            selectDepartmentID: ''
          }
      },
      methods: {
          getTableData: function(option){
            if (option.buttonName === '查看门诊') {
              this.toOutpatient(option.scopeRow)
            } else if (option.buttonName === '删除') {
              this.deleteDepartment(option)
            }
          },
        // 点击查看门诊按钮跳转到门诊的排版页面
        toOutpatient: function(row) {
            this.$router.push({
              path: '/outpatientSetUp',
              query: {
                departmentID: row.departmentID,
                hospitalID: this.selectHospitalID
              }
            })
        },
        // 删除列表中的某一条数据
        deleteDepartment: function(scope) {
            console.log(scope.scopeIndex)
            this.$refs.tableList.deleteData(scope.scopeIndex)
        },
          // 将在列表的专科和可添加的专科进行对比
        compareDepartment: function () {
          var that = this
          this.departmentSelectData.forEach(function (item,index) {
            that.tableAllData.tableData.forEach(function (item2,index2) {
              if (item2.departmentID === item.departmentID) {
                console.log(item2.departmentID)
                item.disabled = true
              }
            })
          })
        },
        // 点击添加专科
        addDepartment: function () {
          this.tableAllData.tableData.push({
            ID: '1',
            departmentID: '1004',
            name: '产科'
          })
          this.selectDepartmentID = ''
          this.compareDepartment()
        },
        // 关闭模态框
        cancelModal: function () {
          this.dialogFormVisible = false
          this.selectDepartmentName = ''
        },
      },
      mounted() {
          this.selectHospitalID = this.hospitalData[0].hospitalID
        this.compareDepartment()
      }
    }
</script>

<style scoped lang="scss">
  @import "../../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
  }
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 15px;
  }
</style>
