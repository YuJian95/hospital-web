<template>
    <div class="out-box">
      <div class="info-in-box">
        <span class="title">医院：</span>
        <el-select v-model="selectHospitalID" placeholder="请选择" @change="getDoctorDepartmentList">
          <el-option
            v-for="item in hospitalData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
      <el-dialog title="添加专科" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal"
                 v-loading="isLoading">
        <el-form>
          <el-form-item label="专科名称：" label-width="120px">
            <el-select v-model="selectDepartmentID" placeholder="请选择">
              <el-option
                v-for="item in departmentSelectData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelModal">取 消</el-button>
          <el-button type="primary" @click="addDepartmentToHospital()">确 定</el-button>
        </div>
      </el-dialog>
      <!--    用作删除的弹框-->
      <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
    </div>
</template>

<script>
  import {getDoctorDepartmentList, addDepartmentToHospital, deleteDepartmentFromHospital} from "@/api/departmentSetUp";
  import {getHospitalInfo} from "@/api/hospital";
  import {tips} from "@/common/js/optionTips";
  import {getDepartmentList} from "@/api/department";

  export default {
        name: "departmentSetUp",
      data() {
          return {
            // 上面的下拉框的医院的数据
            hospitalData: [],
            selectHospitalID: 0,
            // 表格数据
            tableAllData: {
              dataNull: false,
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
                  name: '查看门诊'
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
            // 模态框的下拉选择
            departmentSelectData: [],
            selectDepartmentID: '',
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
      methods: {
          getTableData: function(option){
            if (option.buttonName === '查看门诊') {
              this.toOutpatient(option.scopeRow)
            } else if (option.buttonName === '删除') {
              this.deleteScope = option; // 将删除的数据存起来
              this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
              this.deleteDialog.id = option.scopeRow.ID; // 发送删除id
            }
          },
        // 获取所有医院的信息
        getAllHospital: function() {
          getHospitalInfo(this.pageList.pageNum, this.pageList.pageSize, this.searchHospital).then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              this.hospitalData = res.data.list;
              this.selectHospitalID = res.data.list[0].id;
              this.getDoctorDepartmentList();
            }
          }).catch(() => {
            tips('error', '获取医院信息失败');
          })
        },
        // 获取所有的专科用于添加数据
        getAllDepartment: function() {
          getDepartmentList(this.pageList.pageNum, this.pageList.pageSize, this.searchDepartment).then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              this.departmentSelectData = res.data.list;
            }
          }).catch(() => {
            tips('error', '获取专科信息失败');
          })
        },
        // 获取医院的专科列表
        getDoctorDepartmentList: function() {
          this.tableAllData.tableData = [];
          let _this = this;
          getDoctorDepartmentList(this.selectHospitalID, this.pageList.pageNum, this.pageList.pageSize)
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                if (res.data.list !== null) {
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
                  });
                  this.compareDepartment()
                } else {
                  this.compareDepartment();
                  this.tableAllData.dataNull = true;
                }
              }
            }).catch(() => {
              tips('error', '获取专科列表失败')
          })
        },
        //
        // 点击查看门诊按钮跳转到门诊的排版页面
        toOutpatient: function(row) {
          sessionStorage.setItem('hospitalList', JSON.stringify(this.hospitalData));
          this.$router.push({
              path: '/outpatientSetUp',
              query: {
                departmentID: row.ID,
                hospitalID: this.selectHospitalID
              }
            })
        },
        // 删除列表中的某一条专科数据
        deleteData: function() {
            deleteDepartmentFromHospital(this.selectHospitalID, this.deleteScope.scopeRow.ID).then(res => {
              if (res.code === 200) {
                this.$refs.tableList.deleteData(this.deleteScope.scopeIndex);
                this.deleteDialog.dialogFormVisible = false
              }
            }).catch(() => {
              tips('error', '删除失败')
            });
            console.log(scope.scopeIndex)
            this.$refs.tableList.deleteData(scope.scopeIndex)
        },
          // 将在列表的专科和可添加的专科进行对比
        compareDepartment: function () {
          var that = this;
          this.departmentSelectData.forEach(function (item,index) {
            item.disabled = false;
            if (that.tableAllData.tableData.length > 0) {
              that.tableAllData.tableData.forEach(function (item2,index2) {
                if (item2.ID === item.id) {
                  item.disabled = true
                }
              })
            }
          })
        },
        // 点击添加专科
        addDepartmentToHospital: function () {
            this.isLoading = true;
          addDepartmentToHospital({
            hospitalId: this.selectHospitalID,
            specialId: this.selectDepartmentID,
          }).then(res => {
            if (res.code === 200) {
              this.isLoading = false;
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
              this.getDoctorDepartmentList();
              this.selectDepartmentID = '';
            }
          }).catch(() => {
            this.isLoading = false;
            tips('error', '添加列表失败')
          })
        },
        // 关闭模态框
        cancelModal: function () {
          this.dialogFormVisible = false;
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getOutpatientListById(this.selectID)
        }
      },
      mounted() {
        this.getAllHospital();
        this.getAllDepartment();
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
