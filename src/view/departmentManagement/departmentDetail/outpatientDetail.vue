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
      <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>
    </div>

<!--     点击添加门诊的按钮跳出来的弹出框-->
    <el-dialog title="添加门诊" :visible.sync="dialogFormVisible" width="35%"
               @close="cancelModal" v-loading="isLoading">
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
<!--    用作删除的弹框-->
    <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
  </div>
</template>

<script>
  import { getDepartmentList } from "@/api/department";
  import {tips } from "@/common/js/optionTips";
  import { getOutpatientListById, updateOutpatient, addOutpatient, deleteOutpatient } from "@/api/outpatient";

  export default {
        name: "outpatientDetail",
      data() {
          return {
            // 上面的下拉框的专科的数据
            departmentData: [],
            selectName: '',
            selectID: '',
            // 表格数据
            tableAllData: {
              dataNull: false,
              tableTitle: [{
                prop: 'ID',
                label: '门诊ID',
                width: '150',
                option: ''
              }, {
                prop: 'name',
                label: '门诊名称',
                width: '300',
                option: 'input'
              }, {
                prop: 'gmtCreate',
                label: '创建时间',
                width: '150',
                option: 'time'
              }],
              tableData: [],
              option: {
                width: '250',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看诊室'
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
            isLoading: false, // 默认不打开加载
            dialogFormVisible: false,
            ruleForm: {
              outpatientName:'',
            },
            rules: {
              outpatientName: [
                { required: 'true', message: '请输入门诊名称', trigger: 'blur'}
              ]
            },
            // 底部分页的数据
            pageList: {
              pageNum: 1,
              pageSize: 5,
              total: 0
            },
            // 删除的模态框的数据
            deleteDialog: {
              title: '门诊',
              dialogFormVisible: false,
              id: ''
            },
            deleteScope: {}, // 用作当从组件传过来确认删除时用的
          }
      },
      created() {
          this.selectID = this.$route.query.departmentID;
          this.selectName = this.$route.query.name;
          this.getOutpatientListById(this.selectID);
          this.getAllDepartment()
      },
      methods: {
        // 获取从表格组件传过来的组件
        getTableData: function (option) {
          if (option.buttonName === '删除') {
            this.isDeleteData(option)
          } else if (option.buttonName === '编辑') {
            this.editOutpatient(option.scopeRow)
          } else if (option.buttonName === '修改') {
            this.handleUpdate(option.scopeRow)
          } else if (option.buttonName === '查看诊室') {
            // 跳转到创建诊室
            this.$router.push({
              path: '/treatRoomDetail',
              query: {
                outpatientId: option.scopeRow.ID,
                outpatientName: option.scopeRow.name
              }
            })
          }
        },
        // 点击了编辑操作
        editOutpatient: function(scope) {
          this.$refs.tableList.editIndex(scope)
        },
        // 点击了表格中的删除、弹出模态框
        isDeleteData: function(scope) {
          this.deleteDialog.dialogFormVisible = true;
          this.deleteDialog.id = scope.scopeRow.ID;
          this.deleteScope = scope
        },
        // 进行最终确认删除数据
        deleteData: function (scope) {
          deleteOutpatient(this.deleteScope.scopeRow.ID).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex);
              this.deleteDialog.dialogFormVisible = false;
            }
          }).catch(() => {
            tips('error', '删除失败');
          });
        },
        // 点击了修改按钮
        handleUpdate: function (row) {
          updateOutpatient(row.ID, {
            name: row.name,
            specialId: this.selectID
          }).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.handleUpdate()
            }
          }).catch(() => {
            tips('error', '更新失败');
          });
        },
          // 点击选中值时直接触发方法获取相关的门诊
          selectDepartment: function (departmentID) {
          this.selectID = departmentID;
            this.getOutpatientListById(departmentID)
          },
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false;
          this.ruleForm.outpatientName = '';
          this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
          })
        },
        // 确认添加到表格里
        addOutpatient: function (formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.isLoading = true;
                addOutpatient({
                  name: this.ruleForm.outpatientName,
                  specialId: this.selectID
                }).then(res => {
                  if (res.code === 200) {
                    this.getOutpatientListById(this.selectID);
                    this.isLoading = false;
                    this.$notify({
                      title: '成功',
                      message: '添加成功',
                      type: 'success'
                    });
                  }
                }).catch(() => {
                  this.isLoading = false;
                  tips('error', '添加门诊失败');
                });
                this.ruleForm.outpatientName = ''
              } else {
                return false;
              }
            });

        },
        // 获取全部的专科的列表（将页面条数设置为50）
        getAllDepartment: function () {
          let _this = this;
          getDepartmentList(1,50,'').then(res => {
            if (res.code === 200 && res.data.list.length >0) {
              const data = res.data.list;
              let _this = this;
              data.forEach(function (item, index) {
                _this.departmentData.push({
                  departmentID: item.id,
                  name: item.name
                })
              }) // end forEach
            } // end if
          }).catch(() => {
            tips('error', '获取专科信息失败，请检查网络');
          })
        },
        // 获取该专科编号的门诊信息
        getOutpatientListById: function (ID) {
          this.tableAllData.tableData = [];
          let _this = this;
          getOutpatientListById(this.pageList.pageNum, this.pageList.pageSize, ID).then(res => {
            if (res.code === 200) {
              const data = res.data;
              this.pageList = {
                pageNum: data.pageNum,
                pageSize: data.pageSize,
                total: data.total
              };
              if (data.list.length > 0) {
                data.list.forEach(function (item, index) {
                  _this.tableAllData.tableData.push({
                    ID: item.id,
                    name: item.name,
                    gmtCreate: item.gmtCreate
                  })
                })
              } else {
                this.tableAllData.dataNull = true;
              }
            }
          }).catch(() => {
            tips('error', '获取门诊信息失败，请检查网络');
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getOutpatientListById(this.selectID)
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
