<template>
    <div class="out-box">
      <div class="title-button">
        <span class="title">医院详情：</span>
        <el-button type="primary" size="small" icon="el-icon-edit" class="button"
                   @click="toEditHospital()">编辑</el-button>
      </div>
      <div class="info-picture-box">
        <div class="info-out-box">
          <div class="info-in-box">
            <span class="title">编号：</span>
            <span class="gray-text">{{hospitalData.hospitalID}}</span>
          </div>
          <div class="info-in-box">
            <span class="title">名称：</span>
            <span class="gray-text">{{hospitalData.name}}</span>
          </div>
          <div class="info-in-box">
            <span class="title">地点：</span>
            <span class="gray-text">{{hospitalData.address}}</span>
          </div>
          <div class="info-in-box">
            <span class="title">电话：</span>
            <span class="gray-text">{{hospitalData.phone}}</span>
          </div>
        </div>
          <img :src="hospitalData.picture" class="picture-box">
      </div>
      <div class="brief-box">
        <span class="title">简介：</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="hospitalData.description"
          class="brief"
          maxlength="1000"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 8}">
        </el-input>
      </div>
    </div>
</template>

<script>

export default {
        name: "checkHospital",
      data() {
          return {
            hospitalData: {}
          }
      },
      created() {
          this.hospitalData = JSON.parse(sessionStorage.getItem('hospitalInfo'));
      },
      methods: {
          // 点击编辑跳转到编辑医院数据的页面
        toEditHospital: function () {
          this.$router.push({
            path: '/editHospital',
            query: {
              hospitalInfo: this.hospitalDatao
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
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
</style>
