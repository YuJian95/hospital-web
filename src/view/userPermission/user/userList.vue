<!--用户列表，点击权限管理看到的有哪些用户账号有权限-->
<template>
  <div class="out-box">
    <div class="info-in-box">
      <span class="title">输入搜索：</span>
      <el-input
        placeholder="请输入账号"
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
    name: "userList",
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
            prop: 'account',
            label: '登录账号',
            width: '150',
            option: ''
          }, {
            prop: 'createTime',
            label: '创建时间',
            width: '180',
            option: ''
          }, {
            prop: 'lastLogin',
            label: '最后登录',
            width: '180',
            option: ''
          }, {
            prop: 'status',
            label: '是否启用',
            width: '120',
            option: 'radio'
          }],
          tableData: [{
            ID: '1',
            account: 'admin',
            createTime: '2019-10-10 09:20:00',
            lastLogin: '2019-10-10 09:21:00',
            status: 1
          }, {
            ID: '2',
            account: 'test',
            createTime: '2019-11-10 09:20:00',
            lastLogin: '2019-10-10 09:21:00',
            status: 0
          }],
          option: {
            width: '250',
            button: [{
              size: 'mini',
              type: 'primary',
              name: '分配角色'
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
      this.selectHospitalID = this.hospitalData[0].hospitalID
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
