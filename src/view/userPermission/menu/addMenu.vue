<!--用于添加菜单，通过调用菜单组件进行添加-->
<template>
  <menu-detail :isEdit="false" :menuForm="addMenuForm"></menu-detail>
</template>

<script>
  import MenuDetail from "@/view/userPermission/menu/component/menuDetail";
    export default {
        name: "addMenu",
      components: {MenuDetail},
      data() {
          return {
            // 表单中的form数据
            addMenuForm: {
              menuTitle: '',
              parentMenu: 0,
              url: '',
              icon: '',
              status: 1
            },
            // 选择菜单下拉框
            selectMenuData: [{
              ID: 0,
              name: '无上级菜单'
            }, {
              ID: 1,
              name: '医院管理'
            }, {
              ID: 2,
              name: '专科管理'
            }, {
              ID: 3,
              name: '医生管理'
            }, {
              ID: 4,
              name: '排版管理'
            }],
            // 表单中的验证
            rules: {
              menuTitle: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
              url: [{required: true, message: '请输入前端路径', trigger: 'blur'}],
              icon: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
            }
          }
      }
    }
</script>

<style lang="scss">
  @import "../../../common/scss/common.scss";
  .out-box{
    width: 75%;
    height: auto;
    margin-left: 5%;
    margin-top: 30px;
    .input-box{
      width: 80%;
      margin: 0 auto;
      .input{
        width: 80%;
      }
    }
  }
</style>
