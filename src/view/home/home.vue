<!--首页一进来用于显示用户的个人信息和更改密码-->

<template>
  <div>
    <el-card class="out-box" shadow="never">
      <el-button type="primary" class="update-password" @click="dialogFormVisible = true">修改密码</el-button>
<!--      任何账户都有的账户名字的信息-->
      <el-form :model="infoForm"  class="input-box" >
        <el-form-item label="用户账号:" label-width="100px;" >
          <span class="text">{{ accountIdentify }}</span>
        </el-form-item>
      </el-form>
<!--      只有医生管理员才有的医生信息-->
      <div class="form-class" v-if="accountIdentify !== 'admin'">
        <el-form :model="infoForm"  class="input-box"  >
          <el-form-item label="编号ID:" label-width="100px;">
            <span class="text">{{ infoForm.id }}</span>
          </el-form-item>
          <el-form-item label="用户姓名:" label-width="100px;" >
            <span class="text">{{ infoForm.name }}</span>
          </el-form-item>
          <el-form-item label="用户性别:" label-width="100px;">
            <span class="text">{{ infoForm.gender | getGenderText }}</span>
          </el-form-item>
          <el-form-item label="用户职称:">
            <span class="text">{{ infoForm.jobTitle }}</span>
          </el-form-item>
          <el-form-item label="用户所属专科:">
            <span class="text">{{ infoForm.specialName }}</span>
          </el-form-item>
          <el-form-item label="用户所属门诊:">
            <span class="text">{{ infoForm.outpatientName }}</span>
          </el-form-item>
        </el-form>
        <div class="brief-box">
          <span class="title">用户简介：</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="infoForm.specialty"
            class="brief"
            maxlength="500"
            show-word-limit
            disabled="true"
            :autosize="{ minRows: 5, maxRows: 5}">
          </el-input>
        </div>
      </div>


    </el-card>
    <!--     点击修改密码的按钮跳出来的弹出框-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="35%"
               @close="cancelModal" v-loading="isLoading">
      <el-form ref="passwordForm" :rules="rules" :model="passwordForm">
        <el-form-item label="旧密码：" label-width="120px" prop="password">
        <el-input v-model="passwordForm.password" style="width: 90%;" autofocus type="password"></el-input>
      </el-form-item>
        <el-form-item label="新密码：" label-width="120px" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" style="width: 90%;" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" label-width="120px" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" style="width: 90%;" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="updatePassword('passwordForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getCookie} from "@/utils/cookies";
  import {getDoctorInfo} from "@/api/doctor";
  import {tips} from "@/common/js/optionTips";
  import {updatePassword} from "@/api/login";
  import SHA256 from 'js-sha256';

  export default {
        name: "home",
      data() {
          return {
            // 只用于医生的infoForm
            infoForm: {},
            accountIdentify: '', // 用于判断是不是系统管理员
            // 弹出框
            dialogFormVisible: false,
            passwordForm: {
              password: '',
              newPassword: '',
              confirmPassword: ''
            },
            rules: {
              password: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
              newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
              confirmPassword: [{required: true, message: '请再次确认密码', trigger: 'blur'}]
            },
            isLoading: false
          }
      },
      methods: {
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialogFormVisible = false;
          this.passwordForm.password = '';
          this.passwordForm.newPassword = '';
          this.passwordForm.confirmPassword = '';
          this.$nextTick(() => {
            this.$refs['passwordForm'].clearValidate()
          })
        },
        // 点击确认修改
        updatePassword: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.passwordForm.newPassword === this.passwordForm.confirmPassword) {
                this.isLoading = true;
                updatePassword({
                  accountId: sessionStorage.getItem('accountID'),
                  newPassword: SHA256(this.passwordForm.newPassword),
                  password: SHA256(this.passwordForm.password)
                }).then(res => {
                  if (res.code === 200) {
                    this.isLoading = false;
                    tips('success', '修改成功');
                    this.dialogFormVisible = false;
                  } else if (res.code === 404) {
                    this.isLoading = false;
                    tips('error', '原密码错误')
                  }
                }).catch(() => {
                  this.isLoading = false;
                  tips('error', '更新密码失败')
                })
              } else {
                this.$message.error('新密码两次输入不一致');
              }
            } else {
              return false;
            }
          });
        },
        // 当登录的是医生的账号时
        getDoctorInfo: function () {
          getDoctorInfo(parseInt(this.accountIdentify)).then(res => {
            if (res.code === 200) {
              this.infoForm = res.data
            }
          }).catch(() => {
            tips('error', '获取医生信息失败')
          })
        },
      },
      created() {
          this.accountIdentify = getCookie('username');
          if (this.accountIdentify !== 'admin') {
            this.getDoctorInfo();
          }
        this.$store.dispatch('GetInfo').then(() => {})
      }
    }
</script>

<style lang="scss">
  @import "../../common/scss/common.scss";
  .out-box{
    width: 80%;
    height: auto;
    margin-left: 10%;
    position: relative;
    .input-box{
      width: 60%;
      margin: 0 auto;
      text-align: left;
      margin-left: 5%;
      .text{
        width: 40%;
        height: auto;
        margin-left: 20px;
        @include font-style(16px, $major-blue-color);
      }

    }
  }
  .form-class{
    width: 100%;
    display: flex;
    flex-direction: row;
    .brief-box{
      @include width-margin(50%,auto);
      @include flex-direction(column);
      text-align: center;
      margin-left: 5%;
      .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include font-style(16px, #000000);
      }
      .brief{
        @include width-margin(90%, auto);
        margin-left: 5%;
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
