<!--该页面是从专科排版页面进来的查看点击的那个医院的那个专科有排版什么门诊-->
<template>
    <div class="out-box">
<!--      顶部的关于医院专科的选择-->
      <div class="top-row-box">
        <div class="info-in-box margin-right">
          <span class="title">医院：</span>
          <el-select v-model="selectHospitalID" placeholder="请选择">
            <el-option
              v-for="item in hospitalData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <div class="info-in-box margin-right">
          <span class="title">门诊：</span>
          <el-select v-model="selectDepartmentID" placeholder="请选择">
            <el-option
              v-for="item in departmentSelectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" style="width: 70px;height: 90%;" @click="getOutpatientList()">查询</el-button>
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
      <el-dialog title="添加门诊" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
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
                option: ''
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
                  type: 'danger',
                  name: '删除'
                }]
              }
            },
            // 模态框的
            dialogFormVisible: false,
            // 模态框的下拉选择
            outpatientSelectData: [{
              outpatientID: '1001',
              name: '甲状腺',
              disabled: false
            }, {
              outpatientID: '1002',
              name: '内科门诊',
              disabled: false
            }, {
              outpatientID: '1003',
              name: '甲亢专科',
              disabled: false
            }, {
              outpatientID: '1004',
              name: '内分泌',
              disabled: false
            }],
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
          }
      },
      methods: {
        getTableData: function(option){
          if (option.buttonName === '查看诊室') {
            this.toOutpatient(option.scopeRow)
          } else if (option.buttonName === '删除') {
            this.deleteOutpatient(option)
          }
        },
        // 点击查看诊室按钮跳转到诊室的排版页面
        toOutpatient: function(row) {
          this.$router.push({
            path: '/outCallSetUp',
            query: {
              hospitalID: this.selectHospitalID,
              departmentID: this.selectDepartmentID,
              outpatientID: row.outpatientID
            }
          })
        },
        // 删除列表中的某一条数据
        deleteOutpatient: function(scope) {
          this.$refs.tableList.deleteData(scope.scopeIndex)
        },
        // 将在列表的专科和可添加的门诊进行对比
        compareOutpatient: function () {
          var that = this
          this.outpatientSelectData.forEach(function (item,index) {
            that.tableAllData.tableData.forEach(function (item2,index2) {
              if (item2.outpatientID === item.outpatientID) {
                console.log(item2.outpatientID)
                item.disabled = true
              }
            })
          })
        },
        // 点击添加门诊
        addOutpatient: function () {
          this.tableAllData.tableData.push({
            ID: '3',
            outpatientID: '1004',
            name: '内分泌'
          })
          this.selectOutpatientID = ''
          this.compareOutpatient()
        },
        // 关闭模态框
        cancelModal: function () {
          this.dialogFormVisible = false
          this.selectOutpatientID = ''
        },
        // 点击确认选择医院和专科
        getOutpatientList: function () {
          // 发起切换医院和专科的请求
        }
      },
      mounted() {
        this.hospitalData = JSON.parse(sessionStorage.getItem('hospitalList'));
        this.departmentSelectData = JSON.parse(sessionStorage.getItem('departmentList'));
        this.selectHospitalID = this.$route.query.hospitalID;
        this.selectDepartmentID = this.$route.query.departmentID;
        this.compareOutpatient()
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
