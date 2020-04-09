<!--该页面是点击的门诊的排版的页面-->
<template>
  <div class="out-box">
    <!--      顶部的关于医院专科的选择-->
    <div class="top-row-box">
      <div class="info-in-box margin-right">
        <span class="title">医院：</span>
        <el-select v-model="selectHospitalID" placeholder="请选择" style="width: 70%;"
                   @change="getHospitalDepartmentList">
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
        <el-select v-model="selectDepartmentID" placeholder="请选择" style="width: 70%;"
                   @change="getOutpatientByHospital">
          <el-option
            v-for="item in departmentSelectData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="info-in-box margin-right">
        <span class="title">门诊：</span>
        <el-select v-model="selectOutpatientID" placeholder="请选择" style="width: 70%;">
          <el-option
            v-for="item in outpatientSelectData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="info-in-box margin-right">
        <span class="title">日期：</span>
        <el-date-picker
          v-model="dateOutCall"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>

      <el-button type="primary" style="width: 70px;height: 90%;" @click="getAllOutCallList()">查询</el-button>
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
    <!--     添加出诊计划弹出框-->
    <el-dialog title="添加" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal"
    v-loading="isLoading">
      <el-form>
        <el-form-item label="医生ID：" label-width="120px">
          <span class="gray-text">{{ selectDoctorID}}</span>
        </el-form-item>
        <el-form-item label="医生姓名：" label-width="120px">
          <el-select v-model="selectDoctorID" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in doctorSelectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="诊室：" label-width="120px">
          <el-select v-model="selectOutCallID" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in sentTableData.address"
              :key="item.id"
              :label="item.address"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段：" label-width="120px">
          <el-select v-model="selectTimeID" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in sentTableData.time"
              :key="item.ID"
              :label="item.name"
              :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addOutCall()">确 定</el-button>
      </div>
    </el-dialog>
    <!--     修改出诊计划弹出框-->
    <el-dialog title="修改" :visible.sync="updateDialog" width="35%"  @close="cancelModal"
               v-loading="isLoading">
      <el-form>
        <el-form-item label="医生ID：" label-width="120px">
          <span class="gray-text">{{ updateForm.doctorId}}</span>
        </el-form-item>
        <el-form-item label="医生姓名：" label-width="120px">
          <span class="gray-text">{{ updateForm.doctorName}}</span>
        </el-form-item>
        <el-form-item label="诊室：" label-width="120px">
          <el-select v-model="updateForm.clinicId" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in sentTableData.address"
              :key="item.id"
              :label="item.address"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段：" label-width="120px">
          <el-select v-model="updateForm.timeId" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in sentTableData.time"
              :key="item.ID"
              :label="item.name"
              :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!--    用作删除的弹框-->
    <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
  </div>
</template>

<script>
  import {getHospitalInfo} from "@/api/hospital";
  import {getDoctorDepartmentList} from "@/api/departmentSetUp";
  import {getOutpatientByHospital} from "@/api/outpatient";
  import {tips} from "@/common/js/optionTips";
  import {getAllOutCallList, addOutCall, updateOutCall, deleteOutCallById} from "@/api/outCall";
  import {dateFormYMD} from "@/common/js/dateFormYMD";
  import {getDoctorList} from "@/api/doctor";
  import {getTreatRoom} from "@/api/treatRoom";
  import {outCallTime, timeToNum} from "@/common/js/timeFilters";

  export default {
    name: "setUpDetail",
    data() {
      return {
        // 上面的下拉框的医院的数据
        hospitalData: [],
        selectHospitalID: 0,
        // 顶部的专科信息
        departmentSelectData: [],
        selectDepartmentID: 0,
        // 下拉框门诊数据
        outpatientSelectData: [],
        selectOutpatientID: 0,
        // 顶部下拉框的日期的数据
        dateOutCall: new Date(),
        // 表格数据
        tableAllData: {
          dataNull: false,
          tableTitle: [{
            prop: 'ID',
            label: '编号',
            width: '70',
            option: ''
          }, {
            prop: 'doctorId',
            label: '医生ID',
            width: '110',
            option: ''
          }, {
            prop: 'doctorName',
            label: '医生姓名',
            width: '120',
            option: ''
          }, {
            prop: 'address',
            label: '诊室',
            width: '250',
            option: ''
          }, {
            prop: 'time',
           label: '时间段',
           width: '200',
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
        // 时间段的下拉框
        sentTableData: {
          address: [],
          time: [{
            ID: 1,
            name: '08：30~12：00'
          }, {
            ID: 2,
            name: '14：00~18：00'
          }]
        },
        // 添加模态框的
        dialogFormVisible: false,
        doctorSelectData: [], // 添加出诊计划时的医生信息列表
        selectDoctorID: '',
        selectOutCallID: '', // 选择的诊室的id
        selectTimeID: 1,  // 选择的时间的id
        // 底部分页的数据
        pageList: {
          pageNum: 1,
          pageSize: 5,
          total: 0
        },
        // 删除的模态框的数据
        deleteDialog: {
          title: '出诊计划',
          dialogFormVisible: false,
          id: ''
        },
        deleteScope: {}, // 用作当从组件传过来确认删除时用的
        isLoading: false,
        // 修改模态框的
        updateDialog: false,
        updateForm: {}
      }
    },
    methods: {
      getTableData: function(option){
        if (option.buttonName === '编辑') {
          this.updateForm = option.scopeRow;
          this.updateDialog = true;
        } else if (option.buttonName === '删除') {
          this.deleteScope = option; // 将删除的数据存起来
          this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
          this.deleteDialog.id = option.scopeRow.ID; // 发送删除id
        }
      },
      // 删除列表中的某一条数据
      deleteData: function() {
        deleteOutCallById(this.deleteScope.scopeRow.ID).then(res => {
          if (res.code === 200) {
            this.deleteDialog.dialogFormVisible = false;
            this.$refs.tableList.deleteData(this.deleteScope.scopeIndex)
          }
        }).catch(() => {
          tips('error', '删除失败')
        });
      },
      // 点击了修改按钮
      handleUpdate: function () {
        const data = this.updateForm;
        this.isLoading = true;
        updateOutCall(data.ID, {
          clinicId: data.clinicId,
          day: this.dateOutCall,
          doctorId: data.doctorId,
          hospitalId: this.selectHospitalID,
          outpatientId: this.selectOutpatientID,
          specialId: this.selectDepartmentID,
          time: data.time
        }).then(res => {
          if (res.code === 200) {
            this.getAllOutCallList();
            this.updateDialog = false;
          }
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
          tips('error', '更新出诊计划失败')
        })
        // this.$refs.tableList.handleUpdate()
      },
      // 点击添加诊室
      addOutCall: function () {
        this.isLoading = true;
        addOutCall({
          clinicId: this.selectOutCallID,
          day: this.dateOutCall,
          doctorId: this.selectDoctorID,
          hospitalId: this.selectHospitalID,
          outpatientId: this.selectOutpatientID,
          specialId: this.selectDepartmentID,
          time: this.selectTimeID
        }).then(res => {
          if (res.code === 200) {
            this.isLoading = false;
            this.getAllOutCallList();
            tips('success', '添加成功')
          }
        }).catch(() => {
          this.isLoading = false;
          tips('error', '添加失败')
        })
      },
      // 关闭模态框
      cancelModal: function () {
        this.dialogFormVisible = false;
        this.deleteDialog.dialogFormVisible = false;
        this.updateDialog = false;
        this.selectDoctorID = '';
      },
      // 获取所有医院
      getHospitalInfo: function () {
        this.hospitalData = [];
        getHospitalInfo(1, 50, '').then(res => {
          if (res.code === 200 && res.data.list.length >0 ){
            this.hospitalData = res.data.list;
            this.selectHospitalID = res.data.list[0].id;
            this.getHospitalDepartmentList()
          }
        }).catch(() => {
          tips('error', '获取医院信息失败');
        })
      },
      // 获取医院的专科列表
      getHospitalDepartmentList: function() {
        this.departmentSelectData = [];
        getDoctorDepartmentList(this.selectHospitalID, 1, 50)
          .then(res => {
            if (res.code === 200) {
              if (res.data.list !== null) {
                this.departmentSelectData = res.data.list;
                this.selectDepartmentID = res.data.list[0].id;
                this.getOutpatientByHospital()
              }
            }
          }).catch(() => {
          tips('error', '获取专科列表失败')
        })
      },
      // 获取门诊列表
      getOutpatientByHospital: function() {
        this.outpatientSelectData = [];
        getOutpatientByHospital(this.selectHospitalID, this.selectDepartmentID, 1, 50).then(res => {
          if (res.code === 200) {
            const data = res.data.list;
            if (res.data.list.length > 0) {
              this.outpatientSelectData = data;
              this.selectOutpatientID = data[0].id;
              this.getAllOutCallList()
            }
          }
        }).catch(() => {
          tips('error', '获取门诊信息失败')
        })
      },
      // 获取列表数据，医生排版的数据
      getAllOutCallList: function() {
        this.tableAllData.tableData = [];
        getAllOutCallList(dateFormYMD(this.dateOutCall), this.pageList.pageNum, this.pageList.pageSize,
          this.selectHospitalID, this.selectDepartmentID, this.selectOutpatientID).then(res => {
            if (res.code === 200) {
              const data = res.data.list;
              let that = this;
              if (data.length > 0) {
                data.forEach(function (item, index) {
                  that.tableAllData.tableData.push({
                    ID: item.id,
                    doctorId: item.doctorId,
                    doctorName: item.doctorName,
                    address: item.clinicName,
                    clinicId: item.clinicId, // 用于修改的时候的诊室的id
                    time: outCallTime(item.time),
                    timeId: item.time
                  })
                });
                // this.selectDoctorID = '';
              } else {
                this.tableAllData.dataNull = true
              }
              this.getDoctorList()
            }
        }).catch(() => {
          tips('error', '获取出诊列表失败')
        })
      },
      // 获取该专科门诊的医生
      getDoctorList: function() {
        this.doctorSelectData = [];
        getDoctorList(this.selectDepartmentID, this.selectOutpatientID, 1,100, '').then(res => {
          if (res.code === 200) {
            if (res.data.list.length > 0) {
              this.doctorSelectData = res.data.list;
              // this.selectDoctorID = this.doctorSelectData[0].id
              this.getTreatRoom()
            }
          }
        }).catch(() => {
          tips('error', '获取所属医生列表失败')
        })
      },
      // 获取门诊的诊室信息
      getTreatRoom: function() {
        this.sentTableData.address = [];
        getTreatRoom(this.selectOutpatientID, 1, 100).then(res => {
          if (res.code === 200) {
            this.sentTableData.address = res.data.list;
            // this.selectOutCallID = this.sentTableData.address[0].id
          }
        }).catch(() => {
          tips('error', '获取诊室信息失败')
        })
      },
      // 子组件分页通过调用父组件的方法进行调用更新表格
      fatherMethod: function (pageNum, pageSize) {
        this.pageList.pageNum = pageNum;
        this.pageList.pageSize = pageSize;
        this.getAllOutCallList()
      }

    },
    mounted() {
      this.getHospitalInfo()
    }
  }
</script>

<style scoped lang="scss">
  @import "../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
    .top-row-box{
      width: 100%;
      height: 100%;
      @include flex-direction(row);
      align-items: center;
      flex-wrap: wrap;
      .margin-right{
        margin-right: 30px;
      }
    }
  }
  .button-table-box{
    @include width-margin(100%, 100%);
    margin-top: 15px;
  }
</style>
