<template>
  <div class="out-box">
    <div class="info-in-box">
      <span class="title">专科：</span>
      <el-select v-model="selectName" placeholder="请选择" @change="selectDepartment">
        <el-option
          v-for="item in departmentData"
          :key="item.departmentID"
          :label="item.name"
          :value="item.departmentID">
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
    <el-dialog title="添加门诊" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
        <el-form-item label="门诊名称：" label-width="120px" prop="outpatientName">
          <el-input v-model="ruleForm.outpatientName" style="width: 90%;" autofocus></el-input>
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
        name: "outpatientDetail",
      data() {
          return {
            // 上面的下拉框的专科的数据
            departmentData: [{
              departmentID: '1001',
              name: '儿科'
            }, {
              departmentID: '1002',
              name: '内科'
            }, {
              departmentID: '1003',
              name: '妇科'
            }, {
              departmentID: '1004',
              name: '产科'
            }, {
              departmentID: '1005',
              name: '皮肤科'
            }],
            selectName: '',
            // 表格数据
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '100',
                option: ''
              }, {
                prop: 'outpatientID',
                label: '门诊ID',
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
                outpatientID: '1001',
                name: '甲状腺',
              }, {
                ID: '2',
                outpatientID: '1002',
                name: '内科门诊',
              }],
              option: {
                width: '250',
                button: [{
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
              outpatientName:'',
            },
            rules: {
              outpatientName: [
                { required: 'true', message: '请输入门诊名称', trigger: 'blur'}
              ]
            }
          }
      },
      created() {
          this.selectName = this.$route.query.name
      },
      methods: {
        // 获取从表格组件传过来的组件
        getTableData: function (option) {
          if (option.buttonName == '删除') {
            this.deleteData(option)
          } else if (option.buttonName == '编辑') {
            this.editOutpatient(option.scopeRow)
          } else if (option.buttonName == '修改') {
            this.handleUpdate(option.scopeRow)
          }
        },
        // 点击了编辑操作
        editOutpatient: function(scope) {
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
          // 点击选中值时直接触发方法获取相关的门诊
          selectDepartment: function (departmentID) {
            console.log(departmentID)
          },
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false
          this.ruleForm.outpatientName = ''
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
                  outpatientID: '1001',
                  name: '甲状腺',
                }, {
                  ID: '2',
                  outpatientID: '1002',
                  name: '内科门诊',
                },{
                  ID: '3',
                  outpatientID: '1003',
                  name: '内科诊',
                }]
                this.ruleForm.outpatientName = ''
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
  .out-box{
    @include width-margin(90%, 100%);
  }
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 15px;
  }
</style>
