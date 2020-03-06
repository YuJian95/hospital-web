<!--菜单管理，即用户所看到的管理有多少及，如医生管理是一级，医生管理下面的子级医生详情就是二级-->
<template>
    <div>
      <div class="button-table-box">
        <div class="button-box">
          <router-link to="/addMenu">
            <el-button type="primary"  size="small" icon="el-icon-circle-plus"
                       class="add-button">添加</el-button>
          </router-link>
        </div>
        <table-list :tableAllData="tableAllData" @getTableData="getTableData" ref="tableList"></table-list>
      </div>
    </div>
</template>

<script>
    export default {
        name: "menuList",
      data() {
          return {
            // 表格数据
            tableAllData: {
              tableTitle: [{
                prop: 'ID',
                label: '编号',
                width: '100',
                option: ''
              }, {
                prop: 'menuTitle',
                label: '菜单名称',
                width: '150',
                option: ''
              }, {
                prop: 'type',
                label: '菜单级别',
                width: '100',
                option: ''
              }, {
                prop: 'url',
                label: '前端路径',
                width: '220',
                option: ''
              }, {
                prop: 'icon',
                label: '前端图标',
                width: '100',
                option: 'icon'
              }, {
                prop: 'status',
                label: '是否启用',
                width: '100',
                option: 'radio'
              }],
              tableData: [{
                ID: 1,
                menuTitle: '医院管理',
                type: '一级',
                url: '/hospitalManagement',
                icon: 'el-icon-office-building',
                status: 1
              }, {
                ID: 2,
                menuTitle: '专科管理',
                type: '一级',
                url: '/departmentManagement',
                icon: 'el-icon-guide',
                status: 1
              }, {
                ID: 3,
                menuTitle: '医生管理',
                type: '一级',
                url: '/doctorManagement',
                icon: 'el-icon-s-custom',
                status: 0
              }, {
                ID: 4,
                menuTitle: '排版管理',
                type: '一级',
                url: '/departmentManagement',
                icon: 'el-icon-document',
                status: 1
              }, {
                ID: 5,
                menuTitle: '权限管理',
                type: '一级',
                url: '/userPermission',
                icon: 'el-icon-key',
                status: 1
              }],
              option: {
                width: '250',
                button: [{
                  size: 'mini',
                  type: 'primary',
                  name: '查看下级'
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
            }
          }
      },
      methods: {
        getTableData: function(option){
          if (option.buttonName === '查看下级') {
            this.toSonMenu(option.scopeRow)
          } else if (option.buttonName === '编辑') {
            this.toEditMenu(option.scopeRow)
          } else if (option.buttonName === '删除') {
            this.deleteAccount(option)
          }
        },
        // 点击编辑跳转到编辑页面
        toEditMenu: function(row) {
          this.$router.push({
            path: '/editMenu',
            query: {
              menuForm: row
            }
          })
        },
        // 删除列表中的某一条数据
        deleteAccount: function(scope) {
          console.log(scope.scopeIndex)
          this.$refs.tableList.deleteData(scope.scopeIndex)
        },
        // 点击查看下级跳转到二级菜单页面
        toSonMenu: function (row) {
          this.$router.push({
            path: '/sonMenu',
            query: {
              parentID: row.ID
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../../../common/scss/common";
  .button-table-box{
    @include width-margin(95%, 100%);
    margin-top: 15px;
  }
</style>
