<!--该页面是从专科排版页面进来的查看点击的那个医院的那个专科有排版什么门诊-->
<template>
  <div class="out-box">
    <!--      顶部的关于医院专科的选择-->
    <div class="top-row-box">
      <div class="info-in-box margin-right">
        <span class="title">医院：</span>
        <el-select v-model="selectHospitalID" placeholder="请选择" style="width: 70%;">
          <el-option
            v-for="item in hospitalData"
            :key="item.hospitalID"
            :label="item.name"
            :value="item.hospitalID">
          </el-option>
        </el-select>
      </div>

      <div class="info-in-box margin-right">
        <span class="title">专科：</span>
        <el-select v-model="selectDepartmentID" placeholder="请选择" style="width: 70%;">
          <el-option
            v-for="item in departmentSelectData"
            :key="item.departmentID"
            :label="item.name"
            :value="item.departmentID">
          </el-option>
        </el-select>
      </div>

      <div class="info-in-box margin-right">
        <span class="title">门诊：</span>
        <el-select v-model="selectOutpatientID" placeholder="请选择" style="width: 70%;">
          <el-option
            v-for="item in outpatientSelectData"
            :key="item.outpatientID"
            :label="item.name"
            :value="item.outpatientID">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" style="width: 70px;height: 90%;" @click="getOutCallList">查询</el-button>
    </div>
    <!--      表格位置-->
    <div class="button-table-box">
      <div class="button-box">
        <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                   class="add-button" @click="dialogFormVisible = true">添加</el-button>
      </div>
      <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
    </div>
    <!--      弹出框-->
    <el-dialog title="添加诊室" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="诊室地址：" label-width="120px" prop="outCallName">
          <el-input v-model="ruleForm.outCallName" style="width: 90%;" autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="addOutCall()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "outCallSetUp",
    data() {
      return {
        // 上面的下拉框的医院的数据
        hospitalData: [{
          hospitalID: '1001',
          name: '大学城总院'
        }, {
          hospitalID: '1002',
          name: '顺德分院'
        }, {
          hospitalID: '1003',
          name: '越秀区分院'
        }, {
          hospitalID: '1004',
          name: '白云区分院'
        }],
        selectHospitalID: '',
        // 顶部的专科信息
        departmentSelectData: [{
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
        }],
        selectDepartmentID: '',
        // 下拉框门诊数据
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
        // 表格数据
        tableAllData: {
          tableTitle: [{
            prop: 'ID',
            label: '编号',
            width: '100',
            option: ''
          }, {
            prop: 'outCallID',
            label: '诊室ID',
            width: '150',
            option: ''
          }, {
            prop: 'address',
            label: '地址',
            width: '300',
            option: 'input'
          }],
          tableData: [{
            ID: '1',
            outCallID: '1001',
            address: '内科二楼7诊室',
          }, {
            ID: '2',
            outCallID: '1002',
            address: '内科二楼8诊室',
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
          outCallName: ''
        },
        rules: {
          outCallName: [
            {required: 'true', message: '请输入诊室地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 点击确认选择医院和专科门诊等
      getOutCallList: function () {
        // 发起切换医院和专科的请求
      },
      getTableData: function(option){
        if (option.buttonName === '编辑') {
          this.editOutCall(option.scopeRow)
        } else if (option.buttonName === '删除') {
          this.deleteOutpatient(option)
        } else if (option.buttonName == '修改') {
          this.handleUpdate(option.scopeRow)
        }
      },
      // 点击了编辑操作
      editOutCall: function(scope) {
        this.$refs.tableList.editIndex(scope)
      },
      // 删除列表中的某一条数据
      deleteOutpatient: function(scope) {
        this.$refs.tableList.deleteData(scope.scopeIndex)
      },
      // 点击了修改按钮
      handleUpdate: function (row) {
        console.log(row)
        this.$refs.tableList.handleUpdate()
      },
      // 点击添加诊室
      addOutCall: function () {
        this.$refs['ruleForm'].dateForm((valid) => {
          if (valid) {
            this.tableAllData.tableData.push({
              ID: '3',
              outCallID: '1003',
              address: '内科儿科9诊室'
            })
            this.ruleForm.outCallName = ''
          } else {
            return false;
          }
        })

      },
      // 关闭模态框
      cancelModal: function () {
        this.dialogFormVisible = false
        this.ruleForm.outCallName = ''
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate()
        })
      },

    },
    mounted() {
      this.selectHospitalID = this.$route.query.hospitalID
      this.selectDepartmentID = this.$route.query.departmentID
      this.selectOutpatientID = this.$route.query.outpatientID
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
