<template>
  <div class="out-box">
    <div class="title-button">
      <span class="title">查看医生信息：</span>
      <el-button type="primary" size="small" icon="el-icon-edit" class="button"
                 @click="toEditDoctor()">编辑</el-button>
    </div>
    <div class="info-picture-box">
      <div class="info-out-box">
        <div class="info-in-box">
          <span class="title">编号：</span>
          <span class="gray-text">1001</span>
        </div>
        <div class="info-in-box">
          <span class="title">姓名：</span>
          <span class="gray-text">杨XX</span>
        </div>
        <div class="info-in-box">
          <span class="title">性别：</span>
          <span class="gray-text">女</span>
        </div>
        <div class="info-in-box">
          <span class="title">职称：</span>
          <span class="gray-text">医师</span>
        </div>
        <div class="info-in-box">
          <span class="title">所属专科：</span>
          <span class="gray-text">内科</span>
        </div>
        <div class="info-in-box">
          <span class="title">所属门诊：</span>
          <span class="gray-text">甲状腺</span>
        </div>
      </div>
      <div class="brief-box">
        <span class="title">简介：</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="doctorBrief"
          class="brief"
          maxlength="500"
          show-word-limit
          disabled="true"
          :autosize="{ minRows: 2, maxRows: 5}">
        </el-input>
      </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "addEditDoctor",
      data() {
          return {
            doctorBrief: '',
            hideUpload: false,
          }
      },
      methods: {
          // 跳转到编辑医生页面
        toEditDoctor: function () {
          this.$router.push({
            path: '/editDoctor'
          })
        }
      }
    }
</script>

<style lang="scss">
  @import "../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
    @include flex-direction(column);
    margin-top: 10px;
    // 上面的标题和按钮
    .title-button{
      width: 100%;
      @include flex-direction(row);
      .title{
        @include font-style(18px, $major-blue-color);
        margin-right: 40px;
        display: flex;
        align-items: center;
      }
    }
    // 中间的信息
    .info-picture-box{
      @include width-margin(100%, 100%);
      @include flex-direction(row);
      margin-top: 20px;
      .info-out-box{
        width: 50%;
        height: 100%;
      }
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
          @include width-margin(80%, auto);
          margin-left: 5%;
        }
      }
    }
  }

</style>
