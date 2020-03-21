<template>
  <doctor-option :doctor-data="doctorData"></doctor-option>
</template>

<script>
  import doctorOption from '@/view/doctorManagement/components/doctorOption'
  export default {
    name: "addDoctor",
    components: {
      doctorOption
    },
    data() {
      return {
        doctorData: {
          name: '',
          gender: 1,
          jobTitle: '',
          specialId: '',
          outpatientId: '',
          specialty: '',
          isEdit: false
        }
      }
    },
    mounted() {
      this.doctorData.specialId = this.$route.query.specialId;
      this.doctorData.outpatientId = this.$route.query.outpatientId
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
