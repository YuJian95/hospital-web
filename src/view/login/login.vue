<template>
  <div class="background">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left"
             label-width="0px" class="demo-ruleForm login-container login-background">
      <h3 class="title">挂号系统后台管理中心</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off"
                  placeholder="账号" suffix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                  placeholder="密码" suffix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getCookie, setCookie} from "@/utils/cookies";
  import {getPermission} from "@/permission";
  import {getToken} from "@/utils/auth";

  export default {
    name: "login",
    data(){
      return{
        loading: false,
        ruleForm2: {
          username: '',
          password: ''
        },
        rules2: {
          username: [{ required: true, message: '请输入账号',trigger: 'blur'}],
          password: [{required: true,message: '请输入密码',trigger: 'blur'}]
        },
        checked: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        _this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            _this.loading = true;

            // 实现登录
              this.$store.dispatch('Login', this.ruleForm2).then(() => {
              if (this.checked) {
                setCookie("username",this.ruleForm2.username,15);
                setCookie("password",this.ruleForm2.password,15);
              }

              _this.$router.push({path: this.redirect || '/home'});
              _this.loading = false

            }).catch(() => {
              _this.loading = false;
              _this.$alert('用户名或密码错误！', '提示信息', {
                confirmButtonText: '确定'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    },
    created() {
      this.ruleForm2.username = getCookie('username');
      this.ruleForm2.password = getCookie('password');
      if(this.ruleForm2.username === undefined||this.ruleForm2.username==null||this.ruleForm2.username===''){
        this.ruleForm2.username = 'admin';
      }
      if(this.ruleForm2.password === undefined||this.ruleForm2.password==null){
        this.ruleForm2.password = '';
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 100%;
    height: 100%;
    background: url("../.././assets/background.jpg") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .login-container{
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #BED2F5;
    /*border: 1px solid #eaeaea;*/
    box-shadow: 0 0 25px #A7BBD4;
  }

  label.el-checkbox.remember {
    margin: 0px 0px 30px 0px;
  }
  .title{
    color: #ffffff;
  }
</style>
