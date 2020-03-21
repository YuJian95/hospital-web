<template>
    <div class="button-table-box">
      <div class="info-in-box">
        <span class="title">名称：</span>
        <el-input placeholder="输入医院名称" v-model="searchHospital" style="width: 30%"></el-input>
        <el-button type="primary" size="mini" style="margin-left: 30px;" @click="getHospitalInfo">查询</el-button>
      </div>
      <div class="button-box">
        <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                   class="add-button" @click="toAddHospital()">添加</el-button>
      </div>
      <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      <page-pagination :page-list="pageList" ref="pagePagination"></page-pagination>
      <!--    用作删除的弹框-->
      <delete-dialog :dialog="deleteDialog" ref="deleteDialog"></delete-dialog>
    </div>
</template>

<script>
import {getHospitalInfo, deleteHospitalByID} from "@/api/hospital";
import {tips} from "@/common/js/optionTips";

export default {
        name: "hospitalDetail",
      data() {
          return {
            searchHospital: '',
            tableAllData: {
              tableTitle: [{
                prop: 'hospitalID',
                label: '医院ID',
                width: '100',
                option: ''
              }, {
                prop: 'name',
                label: '名称',
                width: '250',
                option: ''
              }, {
                prop: 'address',
                label: '地址',
                width: '300',
                option: ''
              }, {
                prop: 'phone',
                label: '电话',
                width: '150',
                option: ''
              }],
              tableData: [],
              option: {
                width: '200',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看'
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
              title: '医院',
              dialogFormVisible: false,
              id: ''
            },
            deleteScope: {}, // 用作当从组件传过来确认删除时用的
          }
      },
      methods: {
          // 获取从表格组件传过来的组件
        getTableData: function (option) {
          console.log(option)
          if (option.buttonName === '查看') {
            this.getData(option.scopeRow)
          } else if (option.buttonName === '删除') {

            this.deleteScope = option; // 将删除的数据存起来
            this.deleteDialog.dialogFormVisible = true; // 打开删除弹窗
            this.deleteDialog.id = option.scopeRow.hospitalID; // 发送删除id

          }
        },
        // 进行查看操作
        getData: function (row) {
          const hospitalData = JSON.stringify(row);
          sessionStorage.setItem('hospitalInfo', hospitalData);
          this.$router.push({
            path: '/checkHospital'
          })
        },
        // 进行删除操作
        deleteData: function () {
          deleteHospitalByID(this.deleteScope.scopeRow.hospitalID).then(res => {
            if (res.code === 200) {
              this.$refs.tableList.deleteData(this.deleteScope.scopeIndex);
              this.deleteDialog.dialogFormVisible = false
            }
          }).catch(() => {
            tips('error', '删除失败，请检查网络');
          })
        },
        // 跳转到添加医院页面
        toAddHospital: function () {
          this.$router.push({
            path: '/addHospital'
          })
        },
        // 获取医院的信息
        getHospitalInfo: function () {
          let _this = this;
          _this.tableAllData.tableData = [];
          getHospitalInfo(this.pageList.pageNum, this.pageList.pageSize, this.searchHospital).then(res => {
            if (res.code === 200 && res.data.list.length >0 ){
              this.pageList = {
                pageNum: res.data.pageNum,
                pageSize: res.data.pageSize,
                total: res.data.total
              };
              res.data.list.forEach(function (item, index) {
                _this.tableAllData.tableData.push({
                  hospitalID: item.id,
                  name: item.name,
                  address: item.address,
                  phone: item.phone,
                  description: item.description,
                  picture: item.picture
                })
              })
            }
          }).catch(() => {
            tips('error', '获取医院信息失败');
          })
        },
        // 子组件分页通过调用父组件的方法进行调用更新表格
        fatherMethod: function (pageNum, pageSize) {
          this.pageList.pageNum = pageNum;
          this.pageList.pageSize = pageSize;
          this.getHospitalInfo()
        }
      },
  mounted() {
          this.getHospitalInfo()
  }
}
</script>

<style scoped lang="scss">
  @import "../.././common/scss/common.scss";
  .button-table-box{
    @include width-margin(90%, 100%);
    margin-top: 30px;
  }
</style>
