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
  import {getParentPermission} from "@/api/permission";

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
              tableData: [],
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
        },
        // 将权限分级，0位一级即目录，1为二级
        getMenuText(value) {
          if (value === 0) {
            return '一级'
          } else if (value === 1) {
            return '二级'
          }
        },
        // 获取所有的权限父级和子级
        getAllPermission: function () {
          let _this = this
          getParentPermission(1).then(res => {
            if (res.code === 200 && res.data.length > 0) {
              res.data.forEach(function (item, index) {
                _this.tableAllData.tableData.push({
                  ID: item.id,
                  menuTitle: item.name,
                  type: _this.getMenuText(item.type),
                  url: item.url,
                  icon: item.icon,
                  status: item.status
                })
              })
            }
          })
        }
      },
    mounted() {
      this.getAllPermission()
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
