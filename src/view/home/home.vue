<!--首页一进来用于显示用户的个人信息和更改密码-->

<template>
  <div>
    <el-card class="out-box" shadow="never">
      <el-button type="primary" class="update-password" @click="dialogFormVisible = true">修改密码</el-button>
      <el-form :model="infoForm"  class="input-box" >
        <el-form-item label="编号ID:" label-width="100px;">
          <span class="text">{{ infoForm.id }}</span>
        </el-form-item>
        <el-form-item label="用户姓名:" label-width="100px;" >
          <span class="text">{{ infoForm.name }}</span>
        </el-form-item>
        <el-form-item label="用户状态:" label-width="100px;">
          <span class="text">{{ infoForm.status | getStatusText}}</span>
        </el-form-item>
        <el-form-item label="登录时间:">
          <span class="text">{{ infoForm.loginTime | dateTime('time')}}</span>
        </el-form-item>
        <el-form-item label="创建时间:">
          <span class="text">{{ infoForm.gmtCreate | dateTime('time')}}</span>
        </el-form-item>
        <el-form-item label="修改时间:">
          <span class="text">{{ infoForm.gmtModified | dateTime('time')}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <!--     点击修改密码的按钮跳出来的弹出框-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="35%"  @close="cancelModal">
      <el-form ref="infoForm" :rules="rules" :model="infoForm">
        <el-form-item label="门诊名称：" label-width="120px" prop="password">
          <el-input v-model="infoForm.password" style="width: 90%;" autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="updatePassword('infoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "home",
      data() {
          return {
            infoForm: {
              id: '1001',
              name: 'admin',
              status: 1,
              loginTime: '',
              gmtCreate: '',
              gmtModified: '',
              password: ''
            },
            // 弹出框
            dialogFormVisible: false,
            rules: {
              password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            }
          }
      },
      methods: {
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false
          this.infoForm.password = '';
          this.$nextTick(() => {
            this.$refs['infoForm'].clearValidate()
          })
        },
        // 点击确认修改
        updatePassword: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.infoForm.password = '';
              this.dialogFormVisible = false
            } else {
              return false;
            }
          });
        }
      },
      mounted() {
          this.$store.dispatch('GetInfo').then(res => {
            this.infoForm = res.data
          });
      }
    }
</script>

<style lang="scss">
  @import "../../common/scss/common.scss";
  .out-box{
    width: 50%;
    height: auto;
    margin-left: 10%;
    position: relative;
    .input-box{
      width: 60%;
      margin: 0 auto;
      text-align: left;
      .text{
        width: 40%;
        height: auto;
        margin-left: 20%;
        @include font-style(16px, $major-blue-color);
      }
    }
  }
  .update-password{
    width: 20%;
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
