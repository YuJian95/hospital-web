<!--此页面用作权限的菜单页面点击添加或者编辑时使用，isEdit为true时表示是点击了编辑，否则是点击了添加-->
<template>
  <el-card class="out-box" shadow="never">
    <el-form :model="menuForm" :rules="rules" ref="addMenuForm" label-width="150rpx;" class="input-box">
      <el-form-item label="菜单名称:" prop="menuTitle">
        <el-input v-model="menuForm.menuTitle" class="input"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单:" prop="menuTitle">
        <el-select v-model="parentID" placeholder="请选择" style="width: 80%;">
          <el-option
            v-for="item in selectMenuData"
            :key="item.ID"
            :label="item.name"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端路径:" prop="menuTitle">
        <el-input v-model="menuForm.url" class="input"></el-input>
      </el-form-item>
      <el-form-item label="前端图标:" prop="menuTitle">
        <el-input v-model="menuForm.icon" class="input"></el-input>
      </el-form-item>
      <el-form-item label="是否启用:" prop="menuTitle">
        <el-radio-group v-model="menuForm.status">
          <el-radio :label="0">受限</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('menuFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "menuDetail",
    props: {
      // 表现现在的状态是添加还是编辑
      isEdit: {
        type: Boolean,
        default: false
      },
      // 表单中的form数据
      menuForm: {
        menuTitle: '',
        url: '',
        icon: '',
        status: 1
      },
      // 从二级菜单点击编辑时有的父菜单的ID
      parentID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
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
        }, {
          ID: 5,
          name: '权限管理'
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
  @import "../../../../common/scss/common.scss";
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
