<!--二级菜单管理-->
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
            ID: '1',
            menuTitle: '用户列表',
            type: '二级',
            url: '/userList',
            icon: 'el-icon-office-building',
            status: 1
          }, {
            ID: '2',
            menuTitle: '角色列表',
            type: '二级',
            url: '/roleList',
            icon: 'el-icon-guide',
            status: 1
          }, {
            ID: '3',
            menuTitle: '菜单列表',
            type: '二级',
            url: '/menuList',
            icon: 'el-icon-s-custom',
            status: 0
          }, {
            ID: '4',
            menuTitle: '资源列表',
            type: '二级',
            url: '/resourceList',
            icon: 'el-icon-document',
            status: 1
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
        // 二级菜单的父亲菜单的ID
        parentID: 0
      }
    },
    methods: {
      getTableData: function(option){
         if (option.buttonName === '编辑') {
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
            menuForm: row,
            parentID: this.parentID
          }
        })
      },
      // 删除列表中的某一条数据
      deleteAccount: function(scope) {
        console.log(scope.scopeIndex)
        this.$refs.tableList.deleteData(scope.scopeIndex)
      },
    },
    created() {
      this.parentID = this.$route.query.parentID
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
