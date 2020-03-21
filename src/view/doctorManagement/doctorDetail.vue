<template>
    <div>
      <!--      表格位置-->
      <div class="button-table-box">
        <div class="info-in-box">
          <span class="title">姓名：</span>
          <el-input placeholder="输入医生姓名" v-model="searchDoctor" style="width: 15%"></el-input>
          <span class="title" style="margin-left: 30px;">所在专科：</span>
          <el-select v-model="selectDepartmentID" placeholder="请选择" style="width: 15%;"
                     @change="getOutpatientByDepartmentID">
            <el-option
              v-for="item in selectDepartmentData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="title" style="margin-left: 30px;">所在门诊：</span>
          <el-select v-model="selectOutpatientID" placeholder="请选择" style="width: 20%;">
            <el-option
              v-for="item in selectOutpatientData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 30px;" @click="getDoctorList()">查询</el-button>
        </div>
        <div class="button-box" style="margin-top: 20px;">
            <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                       class="add-button" @click="addDoctor()">添加</el-button>
        </div>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      </div>
      <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>
      <!--    用作删除的弹框-->
      <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
    </div>
</template>

<script>
  import {getDoctorList, deleteDoctor} from "@/api/doctor";
  import {getDepartmentList} from "@/api/department";
  import {getOutpatientListById} from "@/api/outpatient";
  import {tips} from "@/common/js/optionTips";

  export default {
        name: "doctorDetail",
      data() {
          return {
            // 顶部筛选信息
            searchDoctor: '',
            selectDepartmentData:[],
            selectDepartmentID: 0,
            selectOutpatientData: [],
            selectOutpatientID: 0,
            // 表格数据
            tableAllData: {
              dataNull: false,
              tableTitle: [{
                prop: 'ID',
                label: '医生ID',
                width: '100',
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
                prop: 'jobTitle',
                label: '职称',
                width: '130',
                option: ''
              }, {
                prop: 'specialty',
                label: '简介',
                width: '300',
                option: ''
              }],
              tableData: [],
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
          // 获取表格的点击按钮的信息反馈
        getTableData: function (option) {
          if (option.buttonName === '删除') {

            this.deleteScope = option; // 将删除的数据存起来
            this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
            this.deleteDialog.id = option.scopeRow.ID; // 发送删除id

          } else if (option.buttonName === '编辑') {
            sessionStorage.setItem('doctorInfo', JSON.stringify(option.scopeRow));
            this.$router.push({
              path: '/editDoctor'
            })
          }
        },
        // 添加医生信息
        addDoctor: function() {
          this.$router.push({
            path: '/addDoctor',
            query: {
              specialId: this.selectDepartmentID,
              outpatientId: this.selectOutpatientID
            }
          })
        },
        // 用户点击删除某条医生信息
        deleteData: function () {
          deleteDoctor(this.deleteScope.scopeRow.ID).then(res => {
            if (res.code === 200) {
              this.deleteDialog.dialogFormVisible = false;
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex)
            }
          }).catch(() => {
            this.deleteDialog.dialogFormVisible = false;
            tips('error', '删除失败')
          });
        },
        // 判断性别
        getGender: function(id) {
          if (id === 1) {
            return '男'
          }
          return '女'
        },
        // 从数据库获取医生信息列表
        getDoctorList: function () {
          this.tableAllData.tableData = [];
          let _this = this;
          getDoctorList(
            this.selectDepartmentID,
            this.selectOutpatientID,
            this.pageList.pageNum,
            this.pageList.pageSize,
            this.searchDoctor
          ).then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              res.data.list.forEach(function (item, index) {
                _this.tableAllData.tableData.push({
                  ID: item.id,
                  name: item.name,
                  gender: _this.getGender(item.gender),
                  jobTitle: item.jobTitle,
                  specialty: item.specialty,
                  specialId: item.specialId,
                  outpatientId: item.outpatientId
                })
              })
            } else {
              this.tableAllData.dataNull = true
            }
          })
        },
        // 获取数据库中的专科信息
        getDepartmentList: function() {
          // 获取全部专科信息
          getDepartmentList(1, 50, '').then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              this.selectDepartmentData = res.data.list;
              this.selectDepartmentID = this.selectDepartmentData[0].id;
              this.getOutpatientByDepartmentID();
              sessionStorage.setItem('departmentList', JSON.stringify(this.selectDepartmentData))
            }
          }).catch(() => {
            tips('error', '获取专科信息失败');
          })
        },
        // 获取专科的门诊信息
        getOutpatientByDepartmentID: function () {
          getOutpatientListById(1, 50, this.selectDepartmentID).then(res => {
            if (res.code === 200 && res.data.list.length > 0) {
              this.selectOutpatientData = res.data.list;
              this.selectOutpatientID = this.selectOutpatientData[0].id;
              this.getDoctorList();
              sessionStorage.setItem('outpatientList', JSON.stringify(this.selectOutpatientData))
            }
          }).catch(() => {
            tips('error', '获取门诊信息失败，请检查网络');
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getDoctorList()
        }
      },
    mounted() {
      this.getDepartmentList()
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
