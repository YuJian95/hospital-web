<!--该页面是从专科排版页面进来的查看点击的那个医院的那个专科有排版什么门诊-->
<template>
    <div class="out-box">
<!--      顶部的关于医院专科的选择-->
      <div class="top-row-box">
        <div class="info-in-box margin-right">
          <span class="title">医院：</span>
          <el-select v-model="selectHospitalID" placeholder="请选择" @change="getHospitalDepartmentList">
            <el-option
              v-for="item in hospitalData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <div class="info-in-box margin-right">
          <span class="title">专科：</span>
          <el-select v-model="selectDepartmentID" placeholder="请选择">
            <el-option
              v-for="item in departmentSelectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" style="width: 70px;height: 90%;" @click="getOutpatientByHospital()">查询</el-button>
      </div>
<!--      表格位置-->
      <div class="button-table-box">
        <div class="button-box">
          <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                     class="add-button" @click="dialogFormVisible = true">添加</el-button>
        </div>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
        <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>
      </div>
<!--      弹出框-->
      <el-dialog title="添加门诊" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal"
      v-loading="isLoading">
        <el-form>
          <el-form-item label="门诊名称：" label-width="120px">
            <el-select v-model="selectOutpatientID" placeholder="请选择" @change="selectOutpatient">
              <el-option
                v-for="item in outpatientSelectData"
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
          <el-button type="primary" @click="addOutpatient()">确 定</el-button>
        </div>
      </el-dialog>
      <!--    用作删除的弹框-->
      <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
    </div>
</template>

<script>
  import {getOutpatientByHospital,
    addOutpatientToHospital,
    getNoHospitalOutpatientList,
    getOutpatientListById,
    deleteOutpatientFromHospital
  } from "@/api/outpatient";
  import {tips} from "@/common/js/optionTips";
  import {getDoctorDepartmentList} from "@/api/departmentSetUp";

  export default {
        name: "outpatientSetUp",
      data() {
          return {
            // 上面的下拉框的医院的数据
            hospitalData: [],
            selectHospitalID: 0,
            // 顶部的专科信息
            departmentSelectData: [],
            selectDepartmentID: 0,
            // 表格数据
            tableAllData: {
              dataNull: false,
              tableTitle: [{
                prop: 'ID',
                label: '门诊ID',
                width: '200',
                option: ''
              }, {
                prop: 'name',
                label: '名称',
                width: '350',
                option: ''
              }],
              tableData: [],
              option: {
                width: '250',
                button: [{
                  size: 'mini',
                  type: 'danger',
                  name: '删除'
                }]
              }
            },
            // 模态框的
            dialogFormVisible: false,
            // 模态框的下拉选择
            outpatientSelectData: [],
            selectOutpatientID: '',
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
            isLoading: false
          }
      },
      methods: {
        getTableData: function(option){
          if (option.buttonName === '删除') {
            this.deleteScope = option; // 将删除的数据存起来
            this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
            this.deleteDialog.id = option.scopeRow.ID; // 发送删除id
          }
        },
        // 获取医院的专科列表
        getHospitalDepartmentList: function() {
          this.departmentSelectData = [];
          getDoctorDepartmentList(this.selectHospitalID, 1, 50)
            .then(res => {
              if (res.code === 200) {
                if (res.data.list !== null) {
                  this.departmentSelectData = res.data.list;
                  // this.selectDepartmentID = res.data.list[0].id;
                  this.getOutpatientByHospital()
                }
              }
            }).catch(() => {
            tips('error', '获取专科列表失败')
          })
        },
        // 获取专科编号下的门诊列表
        getOutpatientListById: function () {
          this.outpatientSelectData = [];
          getOutpatientListById(this.pageList.pageNum, this.pageList.pageSize, this.selectDepartmentID)
            .then(res => {
            if (res.code === 200) {
              const data = res.data;
              if (data.list.length > 0) {
                this.outpatientSelectData = data.list;
                this.compareDepartment()
              }
            }
          }).catch(() => {
            tips('error', '获取门诊信息失败，请检查网络');
          })
        },
        // 获取医院的门诊列表
        getOutpatientByHospital: function() {
          this.tableAllData.tableData = [];
          let _this = this;
          getOutpatientByHospital(this.selectHospitalID, this.selectDepartmentID,
          this.pageList.pageNum, this.pageList.pageSize).then(res => {
            if (res.code === 200) {
              const data = res.data.list;
              if (data === null || data.length === 0) {
                this.tableAllData.dataNull = true;
              } else {
                data.forEach(function (item, index) {
                  _this.tableAllData.tableData.push({
                    ID: item.id,
                    name: item.name
                  })
                });
              }
              this.getOutpatientListById()
            }
          }).catch(() => {
            tips('error', '获取列表信息失败')
          })
        },
        // 获取没有添加到医院的门诊
        // getNoHospitalOutpatientList: function() {
        //   this.outpatientSelectData = [];
        //   getNoHospitalOutpatientList(1,50, this.selectDepartmentID).then(res => {
        //     if (res.code === 200) {
        //       if (res.data.list.length > 0) {
        //         this.outpatientSelectData = res.data.list;
        //         this.selectOutpatientID = this.outpatientSelectData[0].id
        //       } else {
        //         this.selectOutpatientID = ''
        //       }
        //     }
        //   }).catch(() => {
        //     tips('error', '获取未添加的门诊列表失败')
        //   })
        // },
        // 将在列表的门诊和可添加的门诊进行对比
        compareDepartment: function () {
          var that = this;
          this.outpatientSelectData.forEach(function (item,index) {
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
        // 点击添加门诊
        addOutpatient: function () {
          this.isLoading = true;
          addOutpatientToHospital({
            hospitalId: this.selectHospitalID,
            outpatientId: this.selectOutpatientID
          }).then(res => {
            if (res.code === 200) {
              tips('success', '添加成功');
              this.compareDepartment();
              this.getOutpatientByHospital();
              this.isLoading = false;
              this.selectOutpatientID = ''
            }
          }).catch(() => {
            this.isLoading = false;
            tips('error', '添加失败')
          });
        },
        // 关闭模态框
        cancelModal: function () {
          this.dialogFormVisible = false
          this.selectOutpatientID = ''
        },
        // 点击从医院删除门诊列表的门诊信息
        deleteData: function () {
          deleteOutpatientFromHospital(this.selectHospitalID, this.deleteScope.scopeRow.ID).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex);
              this.deleteDialog.dialogFormVisible = false;
            }
          }).catch(() => {
            this.deleteDialog.dialogFormVisible = false;
            tips('error', '删除失败')
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getOutpatientListById(this.selectID)
        }
      },
      mounted() {
        this.hospitalData = JSON.parse(sessionStorage.getItem('hospitalList'));
        this.selectHospitalID = this.$route.query.hospitalID;
        this.selectDepartmentID = this.$route.query.departmentID;
        this.getHospitalDepartmentList();
        this.compareOutpatient();
        sessionStorage.removeItem('hospitalList')
      }
    }
</script>

<style scoped lang="scss">
  @import "../../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
    .top-row-box{
      width: 100%;
      height: 100%;
      @include flex-direction(row);
      align-items: center;
      .margin-right{
        margin-right: 30px;
      }
    }
  }
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 15px;
  }
</style>
