<!--用于创建诊室，通过门诊关联-->
<template>
  <div class="out-box">
    <div class="info-in-box">
      <span class="title">门诊名称：</span>
      <span style="color: blue;">{{ outpatientName}}</span>
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
    <!--    用作删除的弹框-->
    <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
  </div>
</template>

<script>
  import {getTreatRoom, addTreatRoom, updateTreatRoom, deleteTreatRoom} from "@/api/treatRoom";
  import {tips} from "@/common/js/optionTips";

  export default {
        name: "outCallDetail",
      data() {
          return {
            outpatientId: '',
            outpatientName: '',
            // 表格数据
            tableAllData: {
              dataNull: false,
              tableTitle: [{
                prop: 'ID',
                label: '诊室ID',
                width: '150',
                option: ''
              }, {
                prop: 'address',
                label: '地址',
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
            },
            // 底部分页的数据
            pageList: {
              pageNum: 1,
              pageSize: 5,
              total: 0
            },
            // 删除的模态框的数据
            deleteDialog: {
              title: '诊室',
              dialogFormVisible: false,
              id: ''
            },
            deleteScope: {}, // 用作当从组件传过来确认删除时用的
          }
      },
      methods: {
        getTableData: function(option){
          if (option.buttonName === '编辑') {
            this.editOutCall(option.scopeRow)
          } else if (option.buttonName === '删除') {

            this.deleteScope = option; // 将删除的数据存起来
            this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
            this.deleteDialog.id = option.scopeRow.ID; // 发送删除id

          } else if (option.buttonName === '修改') {
            this.handleUpdate(option.scopeRow)
          }
        },
        // 获取表格数据
        getTreatRoomList: function() {
          this.tableAllData.tableData = [];
          let _this = this;
          getTreatRoom(this.outpatientId, this.pageList.pageNum, this.pageList.pageSize).then(res => {
            if (res.code === 200) {
              const data = res.data.list;
              if (data.length > 0) {
                data.forEach(function (item, index) {
                  _this.tableAllData.tableData.push({
                    ID: item.id,
                    address: item.address,
                    gmtCreate: item.gmtCreate
                  })
                })
              } else {
                this.tableAllData.dataNull = true
              } // end if
            } // end if
          })
        },
        // 点击了编辑操作
        editOutCall: function(scope) {
          this.$refs.tableList.editIndex(scope)
        },
        // 删除列表中的某一条数据
        deleteData: function() {
          deleteTreatRoom(this.deleteScope.scopeRow.ID).then(res => {
            if (res.code === 200) {
              this.deleteDialog.dialogFormVisible = false;
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex)
            }
          }).catch(() => {
            this.deleteDialog.dialogFormVisible = false;
            tips('error', '删除失败')
          });
        },
        // 点击了修改按钮
        handleUpdate: function (row) {
          console.log(row);
          updateTreatRoom(row.ID, {
            outpatientId: this.outpatientId,
            address: row.address
          }).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.handleUpdate()
            }
          }).catch(() => {
            tips('error', '更新失败')
          });
        },
        // 点击添加诊室
        addOutCall: function () {
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              addTreatRoom({
                address: this.ruleForm.outCallName,
                outpatientId: this.outpatientId
              }).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                  });
                  this.ruleForm.outCallName = '';
                  this.getTreatRoomList()
                }
              }).catch(() => {
                tips('error', '添加诊室失败')
              });
            } else {
              return false;
            }
          })

        },
        // 关闭模态框
        cancelModal: function () {
          this.dialogFormVisible = false;
          this.ruleForm.outCallName = '';
          this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getTreatRoomList()
        }
      },
    mounted() {
      this.outpatientId = this.$route.query.outpatientId;
      this.outpatientName = this.$route.query.outpatientName;
      this.getTreatRoomList();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
  }
  .button-table-box{
    @include width-margin(80%, 100%);
    margin-top: 15px;
  }
</style>
