<template>
  <div class="button-table-box">
    <div class="info-in-box">
      <span class="title">名称：</span>
      <el-input placeholder="输入专科名称" v-model="searchDepartment" style="width: 30%"></el-input>
      <el-button type="primary" size="mini" style="margin-left: 30px;" @click="getDepartmentList">查询</el-button>
    </div>
    <div class="button-box">
      <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                 class="add-button" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
    <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>

    <!--     点击添加门诊的按钮跳出来的弹出框-->
    <el-dialog title="添加专科" :visible.sync="dialogFormVisible" width="35%"
               @close="cancelModal" v-loading="isLoading">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
        <el-form-item label="专科名称：" label-width="120px" prop="departmentName">
          <el-input v-model="ruleForm.departmentName" style="width: 90%;" autofocus></el-input>
        </el-form-item>
        <el-form-item label="专科描述：" label-width="120px" prop="description">
          <el-input v-model="ruleForm.description" style="width: 90%;" autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addDepartment('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--    用作删除的弹框-->
    <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
  </div>
</template>

<script>
  import {tips} from "@/common/js/optionTips";
  import {getDepartmentList, addDepartment, updateDepartment, deleteDepartmentByID} from "@/api/department";

  export default {
        name: "departmentDetail",
      data() {
          return {
            searchDepartment: '',
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '150',
                option: ''
              }, {
                prop: 'name',
                label: '名称',
                width: '150',
                option: 'input'
              }, {
                prop: 'description',
                label: '描述',
                width: '300',
                option: 'input'
              }],
              tableData: [],
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
            isLoading: false,
            dialogFormVisible: false,
            ruleForm: {
              departmentName:'',
              description: ''
            },
            rules: {
              departmentName: [{ required: 'true', message: '请输入专科名称', trigger: 'blur'}],
              description: [{ required: 'true', message: '请输入专科描述', trigger: 'blur'}]
            },
            // 底部分页的数据
            pageList: {
              pageNum: 1,
              pageSize: 5,
              total: 0
            },
            // 删除的模态框的数据
            deleteDialog: {
              title: '专科',
              dialogFormVisible: false,
              id: ''
            },
            deleteScope: {}, // 用作当从组件传过来确认删除时用的
          }
      },
      methods: {
        // 获取从表格组件传过来的组件
        getTableData: function (option) {
          if (option.buttonName === '查看') {
            this.getData(option.scopeRow)
          } else if (option.buttonName === '删除') {

            this.deleteScope = option; // 将删除的数据存起来
            this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
            this.deleteDialog.id = option.scopeRow.ID; // 发送删除id

          } else if (option.buttonName === '编辑') {
            this.editDepartment(option.scopeRow)
          } else if (option.buttonName === '修改') {
            this.handleUpdate(option.scopeRow)
          }
        },
        // 进行查看操作
        getData: function (row) {
          this.$router.push({
            path: '/outpatientDetail',
            query: {
              departmentID: row.ID,
              name: row.name
            }
          })
        },
        // 点击了编辑操作
        editDepartment: function(scope) {
          this.$refs.tableList.editIndex(scope)
        },
        // 进行最终确认删除操作
        deleteData: function () {
          deleteDepartmentByID(this.deleteScope.scopeRow.ID).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex);
              this.deleteDialog.dialogFormVisible = false;
            }
          }).catch(() => {
            tips('error', '删除失败，请检查网络');
          });
        },
        // 点击了修改按钮
        handleUpdate: function (row) {
          updateDepartment(row.ID, {
            name: row.name,
            description: row.description
          }).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.handleUpdate()
            }
          }).catch(() => {
            tips('error', '更新失败，请检查网络');
          })
        },
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false;
          this.ruleForm.departmentName = '';
          this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
          })
        },
        // 确认添加到表格里
        addDepartment: function (formName) {
          this.$refs[formName].dateForm((valid) => {
            if (valid) {
              this.isLoading = true;
              addDepartment({
                name: this.ruleForm.departmentName,
                description: this.ruleForm.description
              }).then(res => {
                if (res.code === 200) {
                  this.isLoading = false;
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                  });
                  this.deleteDialog.dialogFormVisible = false;
                  this.ruleForm.departmentName = '';
                  this.ruleForm.description = '';
                  this.getDepartmentList()
                }

              }).catch(() => {
                this.isLoading = false;
                tips('error', '添加专科失败，请检查网络');
              })
            } else {
              return false;
            }
          });

        },
        // 从数据库获取专科信息列表
        getDepartmentList: function () {
          this.tableAllData.tableData = [];
          let _this = this;
          getDepartmentList(this.pageList.pageNum, this.pageList.pageSize, this.searchDepartment).then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              this.pageList = {
                pageNum: res.data.pageNum,
                pageSize: res.data.pageSize,
                total: res.data.total
              };
              res.data.list.forEach(function (item, index) {
                _this.tableAllData.tableData.push({
                  ID: item.id,
                  name: item.name,
                  description: item.description,
                })
              })
            }
          }).catch(() => {
            tips('error', '获取信息失败，请检查网络');
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getDepartmentList()
        }
      },
    mounted() {
          this.getDepartmentList()
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
