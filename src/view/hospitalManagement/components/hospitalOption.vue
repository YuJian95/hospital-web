<!--用于作为添加医院或者修改医院的组件-->
<template>
  <div class="out-box">
    <span class="top-title">{{ hospitalData.isEdit | editOrAdd }}医院信息：</span>
    <div class="info-picture-box">
      <div class="info-out-box">
        <div class="info-in-box" v-show="hospitalData.isEdit">
          <span class="title">编号：</span>
          <el-input v-model="hospitalData.hospitalID" placeholder="请输入内容" class="input-box" :disabled="true"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">名称：</span>
          <el-input v-model="hospitalData.name" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">地点：</span>
          <el-input v-model="hospitalData.address" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">电话：</span>
          <el-input v-model="hospitalData.phone" placeholder="请输入内容" class="input-box"></el-input>
        </div>
      </div>

      <div class="picture-box">
        <img :src="hospitalData.picture" class="picture" v-show="hospitalData.isEdit">
        <img src="../../.././assets/change.png" class="change-icon" v-show="hospitalData.isEdit">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handlePhoto"
          :class="{hide:hideUpload}"
          v-loading.fullscreen.lock="fullscreenLoading">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>


    </div>
    <div class="brief-box">
      <span class="title">简介：</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="hospitalData.description"
        class="brief"
        maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 6}"
        show-word-limit>
      </el-input>
    </div>
    <el-button class="insure-button" type="primary" style="margin-top: 15px;" @click="uploadPicture">确定</el-button>
  </div>
</template>

<script>
  import {addHospital, updateHospital} from "@/api/hospital";
  import {tips} from "@/common/js/optionTips";
  import axios from 'axios'
  import { getToken } from "@/utils/auth";

  export default {
    name: "addHospital",
    props: {
      hospitalData: {}
    },
    data() {
      return {
        imgUrl: '',
        imgFile: {},
        dialogVisible: false,
        statusName: '',
        // 关于上传的图片的
        hideUpload: false,
        fileList: [],
        hospitalData: {},
        fullscreenLoading: false, // 进行整个屏幕的加载的
        isValidate: true, // 用作表单的验证
      }
    },
    methods: {
      // 当上传了一张照片上去
      handlePhoto: function (file, fileList) {
        this.imgFile = file;
        this.hideUpload = fileList.length >= 1;
      },
      // 删除上传的照片
      handleRemove(file, fileList) {
        if (fileList.length === 0) {
          this.fileList = []
        } else {
          let dl = this.fileList.indexOf(file);
          this.fileList.splice(dl, 1)
        }
        this.hideUpload = fileList.length >= 1
      },
      handlePictureCardPreview(file) {
        this.imgUrl = file.url;
        this.dialogVisible = true;
      },
      //  进行表单的校验
      validate: function() {
        for (let item in this.hospitalData) {
          if (item !== 'picture') {
            if (this.hospitalData[item] === '' && this.hospitalData[item] === undefined
              && this.hospitalData[item] === null) {
              this.isValidate = false;
            } // end if(this.hospitalData[item] === '')
          } // end if
        }
        if (!this.hospitalData.isEdit) {
          if (!this.hideUpload) {
            this.isValidate = false;
          }
        }
        if (isValidate) {
          this.uploadPicture() // 上传到七牛云
        }
      },
      // 上传照片到七牛云
      uploadPicture: function() {
        this.fullscreenLoading = true;
        const url = 'http://localhost:8080/hospital/picture/upload';
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
        };
        const param = new FormData();
        // 将图片加入formdata
        param.append('file', this.imgFile.raw);
        axios.post(url, param, config).then(res => {
          if (res.data.code === 200) {
            this.imgUrl = res.data.data;
            if (this.hospitalData.isEdit) {
              // 修改医院
              this.updateHospital()
            } else {
              // 添加医院
              this.addHospitalInfo()
            }

          }
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$notify.error({
            title: '错误',
            message: '修改医院失败，请检查网络或者电话号码是否重复'
          });
        })
      },
      // 向数据库进行添加医院信息的操作
      addHospitalInfo: function () {
        addHospital({
          address: this.hospitalData.address,
          description: this.hospitalData.description,
          name: this.hospitalData.name,
          phone: this.hospitalData.phone,
          picture: this.imgUrl
        }).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.fullscreenLoading = false;
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
            // 添加成功后清空所填写的信息
            let obj = this.hospitalData;
            obj.name = '';
            obj.address = '';
            obj.phone = '';
            obj.description = '';
            obj.picture = '';
            this.fileList = [];
            this.hideUpload = false
          }
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$notify.error({
            title: '错误',
            message: '添加医院失败，请检查网络或者电话号码是否重复'
          });
        })
      },
      // 向数据库进行添加医院信息的操作
      updateHospital: function () {
        updateHospital(parseInt(this.hospitalData.hospitalID), {
          address: this.hospitalData.address,
          description: this.hospitalData.description,
          name: this.hospitalData.name,
          phone: this.hospitalData.phone,
          picture: this.imgUrl || this.hospitalData.picture
        }).then(res => {
          if (res.code === 200) {
            this.fullscreenLoading = false;
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            // 修改成功后跳转到查看页面
            this.hospitalData.picture = this.imgUrl || this.hospitalData.picture;
            sessionStorage.setItem('hospitalInfo',JSON.stringify(this.hospitalData));
            this.$router.push({
              path: '/checkHospital'
            })
          }
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$notify.error({
            title: '错误',
            message: '修改医院失败，请检查网络或者电话号码是否重复'
          });
        })
      }

    }
  }
</script>

<style lang="scss">
  @import "../../.././common/scss/common.scss";
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
      @include width-margin(100%, 100%);
      @include flex-direction(row);
      margin-top: 20px;
      .info-out-box{
        width: 50%;
        height: 100%;
      }
      .picture-box{
        width: 50%;
        height: 100%;
        @include flex-direction(row);
        justify-content: center;
        align-items: center;
        .picture {
          width: 250px;
          height: 200px;
          margin-right: 30px;
        }
        .change-icon{
          @include icon-style(70px, 70px);
          margin-right: 30px;
        }
      }
    }

    // 底部的简介
    .brief-box{
      @include width-margin(100%, 100%);
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

  .hide .el-upload--picture-card {
    display: none;
  }
</style>
