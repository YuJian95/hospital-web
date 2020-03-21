<template>
  <div class="out-box">
    <span class="top-title">{{ doctorData.isEdit | editOrAdd }}医生信息：</span>
    <div class="info-picture-box">
      <div class="info-out-box">
        <div class="info-in-box" v-show="doctorData.isEdit">
          <span class="title">编号：</span>
          <el-input v-model="doctorData.ID" placeholder="请输入内容" class="input-box" :disabled="true"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">姓名：</span>
          <el-input v-model="doctorData.name" placeholder="请输入内容" class="input-box"></el-input>
        </div>
        <div class="info-in-box">
          <span class="title">性别：</span>
          <el-select v-model="doctorData.gender" placeholder="请选择">
            <el-option
              v-for="item in genderSelectData"
              :key="item.genderID"
              :label="item.gender"
              :value="item.genderID">
            </el-option>
          </el-select>
        </div>
        <div class="info-in-box">
          <span class="title">职称：</span>
          <el-select v-model="doctorData.jobTitle" placeholder="请选择">
            <el-option
              v-for="item in jobTitleData"
              :key="item.jobTitle"
              :label="item.jobTitle"
              :value="item.jobTitle">
            </el-option>
          </el-select>
        </div>
        <div class="info-in-box">
          <span class="title">所属专科：</span>
          <el-select v-model="doctorData.specialId" placeholder="请选择">
            <el-option
              v-for="item in departmentSelectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="info-in-box">
          <span class="title">所属门诊：</span>
          <el-select v-model="doctorData.outpatientId" placeholder="请选择">
            <el-option
              v-for="item in outpatientSelectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="brief-box">
        <span class="title">简介：</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="doctorData.specialty"
          class="brief"
          maxlength="1000"
          :autosize="{ minRows: 2, maxRows: 6}"
          show-word-limit>
        </el-input>
      </div>
    </div>
    <el-button class="insure-button" type="primary" style="margin-top: 15px;"
               @click="validateData" v-loading.fullscreen.lock="loading">确定</el-button>
  </div>

</template>

<script>
  import {addDoctor, updateDoctor} from "@/api/doctor";
  import {tips} from "@/common/js/optionTips";

  export default {
    name: "doctorOption",
    props: {
      doctorData: {}
      },
    data() {
      return {
        loading: false,
        imgUrl: '',
        dialogVisible: false,
        status: '',// 用于记录当前状态是编辑还是添加
        // 上面的下拉框的医院的数据
        jobTitleData: [{
          id: 1,
          jobTitle: '医师'
        }, {
          id: 2,
          jobTitle: '副主任医师'
        }, {
          id: 3,
          jobTitle: '主任医师'
        }, {
          id: 4,
          jobTitle: '教授'
        }],
        genderSelectData: [{
          genderID: 1,
          gender: '男'
        }, {
          genderID: 2,
          gender: '女'
        }],
        // 所属专科的数据
        departmentSelectData: [],
        // 所属门诊的数据
        outpatientSelectData: [],
      }
    },
    methods: {
      // 对表单进行遍历
      validateData: function() {
        let isValidate = true;
        for(let item in this.doctorData) {
          if (this.doctorData[item] === '' || this.doctorData[item] === undefined
            || this.doctorData[item] === null) {
            isValidate = false;
            this.$message.error('请完善基本信息');
            break;
          } // end if
        } // end for
        if (isValidate) {
          if (this.doctorData.isEdit) {
            this.updateDoctor()
          } else {
            this.addDoctor()
          } // end if
        } // end if
      },
      // 向数据库添加医生数据
      addDoctor: function () {
        this.loading = true;
        addDoctor({
          gender: this.doctorData.gender,
          jobTitle: this.doctorData.jobTitle,
          name: this.doctorData.name,
          outpatientId: this.doctorData.outpatientId,
          specialId: this.doctorData.specialId,
          specialty: this.doctorData.specialty
        }).then(res => {
          if (res.code === 200) {
            this.loading = false;
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        }).catch(() => {
          this.loading = false;
          tips('error', '添加失败')
        })
      },
      // 更新医生信息
      updateDoctor: function () {
        this.loading = true;
        updateDoctor(this.doctorData.ID, {
          gender: this.doctorData.gender,
          jobTitle: this.doctorData.jobTitle,
          name: this.doctorData.name,
          outpatientId: this.doctorData.outpatientId,
          specialId: this.doctorData.specialId,
          specialty: this.doctorData.specialty
        }).then(res => {
          if (res.code === 200) {
            this.loading = false;
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        }).catch(() => {
          this.loading = false;
          tips('error', '修改失败')
        })
      }
    },
    created() {
      this.departmentSelectData = JSON.parse(sessionStorage.getItem('departmentList'));
      this.outpatientSelectData = JSON.parse(sessionStorage.getItem('outpatientList'));
    },
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
