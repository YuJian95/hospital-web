<template>
  <div class="out-box">
    <span class="top-title">{{ status | option }}医生信息：</span>
    <div class="info-picture-box">
      <div class="info-out-box">
        <div class="info-in-box" v-show="status === 'edit'">
          <span class="title">编号：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">姓名：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">性别：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">职称：</span>
          <el-input v-model="input" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">所属专科：</span>
          <el-select v-model="selectDepartmentID" placeholder="请选择">
            <el-option
              v-for="item in departmentSelectData"
              :key="item.departmentID"
              :label="item.name"
              :value="item.departmentID"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div class="info-in-box">
          <span class="title">所属门诊：</span>
          <el-select v-model="selectOutpatientID" placeholder="请选择" @change="selectOutpatient">
            <el-option
              v-for="item in outpatientSelectData"
              :key="item.outpatientID"
              :label="item.name"
              :value="item.outpatientID"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="picture-box">
        <img src="../.././assets/hospital3.jpg" class="picture" v-show="status === 'edit'">
        <img src="../.././assets/change.png" class="change-icon" v-show="status === 'edit'">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          limit="1"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handlePhoto"
          :class="{hide:hideUpload}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>


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
        statusName: '',
        // 关于上传的图片的
        hideUpload: false,
        // 所属专科的数据
        departmentSelectData: [{
          departmentID: '1001',
          name: '儿科',
          disabled: false
        }, {
          departmentID: '1002',
          name: '内科',
          disabled: false
        }, {
          departmentID: '1003',
          name: '妇科',
          disabled: false
        }, {
          departmentID: '1004',
          name: '产科',
          disabled: false
        }],
        selectDepartmentID: '',
        // 所属门诊的数据
        outpatientSelectData: [{
          outpatientID: '1001',
          name: '甲状腺',
          disabled: false
        }, {
          outpatientID: '1002',
          name: '内科门诊',
          disabled: false
        }, {
          outpatientID: '1003',
          name: '甲亢专科',
          disabled: false
        }, {
          outpatientID: '1004',
          name: '内分泌',
          disabled: false
        }],
        selectOutpatientID: ''
      }
    },
    methods: {
      handlePhoto: function (file, fileList) {
        console.log(fileList.length)
        this.hideUpload = fileList.length >= 1;
      },
      handleRemove(file, fileList) {
        if (fileList.length === 0) {
          this.fileList = []
        } else {
          let dl = this.fileList.indexOf(file)
          this.fileList.splice(dl, 1)
        }
        this.hideUpload = fileList.length >= 1
      },
      handlePictureCardPreview(file) {
        this.imgUrl = file.url;
        this.dialogVisible = true;
      },
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
        console.log(status)
        if (status === 'add') {
          return '添加'
        } else {
          return '编辑'
        }
      }
    }
  }
</script>

<style lang="scss">
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
          width: 300px;
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
