<template>
  <div class="out-box">
      <span class="top-title">{{ status | option }}医院信息：</span>
    <div class="info-picture-box">
      <div class="info-out-box">
        <div class="info-in-box">
          <span class="title">编号：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">名称：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">地点：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">电话：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
      </div>

        <el-upload
          class="test"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-success="handleSuccessUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="imgUrl" alt="">
        </el-dialog>


    </div>
    <div class="brief-box">
        <span class="title">简介：</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        class="brief"
        maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 6}"
        show-word-limit>
      </el-input>
    </div>
    <el-button class="insure-button" type="primary" style="margin-top: 15px;">确定</el-button>
  </div>
</template>

<script>
    export default {
        name: "addOrEditHospital",
      data() {
          return {
            textarea: '',
            imgUrl: '',
            dialogVisible: false,
            status: '',// 用于记录当前状态是编辑还是添加
            statusName: ''
          }
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.imgUrl = file.url;
          this.dialogVisible = true;
        },
        // 上传成功调用的方法
        handleSuccessUpload: function () {
        }
      },
      created() {
          this.status = this.$route.query.status
      },
      computed: {
          uploadLength: function () {
            console.log('照片数量：' + this.imgUrl.length)
            return this.imgUrl.length > 0
          }
      },
      filters: {
        option: function (status) {
          if (status == 'add') {
            return '添加'
          }
          return '编辑'
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../.././common/scss/common.scss";
  .out-box{
    @include width-margin(90%, 100%);
    @include flex-direction(column);
    margin-top: 20px;
    // 上面的标题和按钮
      .top-title{
        @include font-style(18px, $major-blue-color);
        margin-right: 40px;
        display: flex;
        align-items: center;
      }
    // 中间的信息
    .info-picture-box{
      @include width-margin(95%, 100%);
      @include flex-direction(row);
      margin-top: 20px;
      .info-out-box{
        width: 70%;
        height: 100%;
      }
      .picture-box{
        width: 300px;
        height: 200px;
      }
    }
    // 底部的简介
    .brief-box{
      @include width-margin(95%, 100%);
      @include flex-direction(column);
      text-align: left;
      .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include font-style(16px, #000000);
      }
      .brief{
        @include width-margin(60%, 100%);
        margin-left: 5%;
      }
    }
  }
  .test:nth-child(2){
    /*display: none;*/
  }
</style>
