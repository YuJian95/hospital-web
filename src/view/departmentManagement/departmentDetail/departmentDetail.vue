<template>
  <div class="button-table-box">
    <div class="button-box">
      <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                 class="add-button" @click="dialogFormVisible = true">添加</el-button>
    </div>
<!--    <table-test :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-test>-->
    <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>

    <!--     点击添加门诊的按钮跳出来的弹出框-->
    <el-dialog title="添加专科" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
        <el-form-item label="专科名称：" label-width="120px" prop="departmentName">
          <el-input v-model="ruleForm.departmentName" style="width: 90%;" autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addOutpatient('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "departmentDetail",
      data() {
          return {
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
                option: 'input'
              }],
              tableData: [{
                ID: '1',
                departmentID: '1001',
                name: '儿科',
              }, {
                ID: '2',
                departmentID: '1002',
                name: '内科',
              }, {
                ID: '3',
                departmentID: '1003',
                name: '妇科',
              }, {
                ID: '4',
                departmentID: '1004',
                name: '产科',
              }, {
                ID: '5',
                departmentID: '1005',
                name: '皮肤科',
              }],
              option: {
                width: '250',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看'
                }, {
                  size: 'mini',
                  type: 'success',
                  name: '编辑'
                }, {
                  size: 'mini',
                  type: 'danger',
                  name: '删除'
                }]
              }
            },
            // 模态框的
            dialogFormVisible: false,
            ruleForm: {
              departmentName:'',
            },
            rules: {
              departmentName: [
                { required: 'true', message: '请输入门诊名称', trigger: 'blur'}
              ]
            }
          }
      },
      methods: {
        // 获取从表格组件传过来的组件
        getTableData: function (option) {
          if (option.buttonName == '查看') {
            this.getData(option.scopeRow)
          } else if (option.buttonName == '删除') {
            this.deleteData(option)
          } else if (option.buttonName == '编辑') {
            this.editDepartment(option.scopeRow)
          } else if (option.buttonName == '修改') {
            this.handleUpdate(option.scopeRow)
          }
        },
        // 进行查看操作
        getData: function (row) {
          this.$router.push({
            path: '/outpatientDetail',
            query: {
              hospitalID: row.departmentID,
              name: row.name
            }
          })
        },
        // 点击了编辑操作
        editDepartment: function(scope) {
          this.$refs.tableList.editIndex(scope)
        },
        // 进行删除操作
        deleteData: function (scope) {
          // console.log('删除' + scope.scopeRow.departmentID)
          this.$refs.tableList.deleteData(scope.scopeIndex)
        },
        // 点击了修改按钮
        handleUpdate: function (row) {
          console.log(row)
          this.$refs.tableList.handleUpdate()
        },
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false
          this.ruleForm.departmentName = ''
          this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
          })
        },
        // 确认添加到表格里
        addOutpatient: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.tableAllData.tableData = [{
                ID: '1',
                departmentID: '1001',
                name: '儿科',
              }, {
                ID: '2',
                departmentID: '1002',
                name: '内科',
              }, {
                ID: '3',
                departmentID: '1003',
                name: '妇科',
              }, {
                ID: '4',
                departmentID: '1004',
                name: '产科',
              }, {
                ID: '5',
                departmentID: '1005',
                name: '皮肤科',
              }, {
                ID: '6',
                departmentID: '1006',
                name: '眼科',
              }]
              this.ruleForm.departmentName = ''
            } else {
              return false;
            }
          });

        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../../.././common/scss/common.scss";
  .button-table-box{
    @include width-margin(80%, 100%);
    margin-top: 30px;
  }
</style>
