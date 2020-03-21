<!--用于修改页面，调用与添加页面相同的组件页面-->
<template>
  <doctor-option :doctor-data="doctorInfo"></doctor-option>
</template>

<script>
  import doctorOption from '@/view/doctorManagement/components/doctorOption'
  export default {
    name: "editHospital",
    components: {
      doctorOption
    },
    data() {
      return {
        doctorInfo: {}
      }
    },
    created() {
      this.doctorInfo = JSON.parse(sessionStorage.getItem('doctorInfo'));
      if (this.doctorInfo.gender === '男') {
        this.doctorInfo.gender = 1
      } else {
        this.doctorInfo.gender = 2
      }
      this.doctorInfo['isEdit'] = true
      console.log(this.doctorInfo)
    }
  }
</script>

<style scoped>

</style>
