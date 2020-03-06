<!--角色列表，可以看到管理系统有哪些管理的模块，如医生管理、专科管理等-->
<!--用户列表，点击权限管理看到的有哪些用户账号有权限-->
<template>
  <div class="out-box">
    <div class="info-in-box">
      <span class="title">输入搜索：</span>
      <el-input
        placeholder="请输入角色名称"
        v-model="inputSearch"
        style="width: 200px;"
        clearable>
      </el-input>
    </div>

    <div class="button-table-box">
      <div class="button-box">
        <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                   class="add-button" @click="dialogFormVisible = true ; option = '添加'">添加</el-button>
      </div>
      <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
    </div>

    <!--     点击添加、编辑的按钮跳出来的弹出框-->
    <el-dialog :title="option + '账号'" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form ref="addAccountForm" :rules="rules" :model="addAccountForm">
        <el-form-item label="账号：" label-width="120px" prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="addAccountForm.account"
            style="width: 200px;"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="120px">
          <el-input
            v-model="addAccountForm.password"
            style="width: 200px;"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="状态：" label-width="120px">
          <el-select v-model="addAccountForm.status" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in selectStatusData"
              :key="item.status"
              :label="item.text"
              :value="item.status">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addAccount()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "roleList",
    data() {
      return {
        inputSearch: '', // 顶部的输入搜索
        // 表格数据
        tableAllData: {
          tableTitle: [{
            prop: 'ID',
            label: '编号',
            width: '100',
            option: ''
          }, {
            prop: 'englishName',
            label: '名称',
            width: '250',
            option: ''
          }, {
            prop: 'chineseName',
            label: '中文名称',
            width: '150',
            option: ''
          }, {
            prop: 'status',
            label: '是否启用',
            width: '120',
            option: 'radio'
          }],
          tableData: [{
            ID: '1',
            englishName: 'hospitalManagement',
            chineseName: '医院管理',
            status: 1
          }, {
            ID: '2',
            englishName: 'departmentManagement',
            chineseName: '专科管理',
            status: 1
          }, {
            ID: '3',
            englishName: 'doctorManagement',
            chineseName: '医生管理',
            status: 1
          }, {
            ID: '4',
            englishName: 'setUpManagement',
            chineseName: '排版管理',
            status: 1
          }, {
            ID: '5',
            englishName: 'userPermission',
            chineseName: '权限管理',
            status: 1
          }, {
            ID: '6',
            englishName: 'patientManagement',
            chineseName: '患者管理',
            status: 1
          }, {
            ID: '7',
            englishName: 'outCallManagement',
            chineseName: '出诊管理',
            status: 1
          }],
          option: {
            width: '250',
            button: [{
              size: 'mini',
              type: 'primary',
              name: '分配菜单'
            }, {
              size: 'mini',
              type: 'warning',
              name: '分配资源'
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
        option: '',
        dialogFormVisible: false,
        addAccountForm: {
          account: '',
          password: '123456',
          status: 1
        },
        // 模态框中的启用状态的下拉框
        selectStatusData: [{
          status: 0,
          text: '受限'
        }, {
          status: 1,
          text: '启用'
        }],
        rules: {
          account: [{required: 'true', message: '请输入账号', trigger: 'blur'}]
        }
      }
    },
    methods: {
      getTableData: function(option){
        if (option.buttonName === '分配角色') {
          this.toOutpatient(option.scopeRow)
        } else if (option.buttonName === '编辑') {
          this.editAccount(option.scopeRow)
        } else if (option.buttonName === '删除') {
          this.deleteAccount(option)
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
      deleteAccount: function(scope) {
        console.log(scope.scopeIndex)
        this.$refs.tableList.deleteData(scope.scopeIndex)
      },
      // 点击添加专科
      addAccount: function () {
        // 进行获取后台的数据
        this.addAccountForm.account = '';
      },
      // 关闭模态框
      cancelModal: function () {
        this.dialogFormVisible = false;
        this.addAccountForm.account = '';
        this.$nextTick(() => {
          this.$refs['addAccountForm'].clearValidate()
        })
      },
      // 点击了编辑
      editAccount: function (row) {
        console.log(row)
        this.addAccountForm.account = row.account;
        this.addAccountForm.status = row.status;
        this.dialogFormVisible = true
        this.option = '编辑'
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../common/scss/common";
  .out-box{
    @include width-margin(90%, 100%);
  }
  .button-table-box{
    @include width-margin(100%, 100%);
    margin-top: 15px;
  }
</style>
