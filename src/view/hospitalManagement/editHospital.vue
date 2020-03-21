<!--用于修改页面，调用与添加页面相同的组件页面-->
<template>
  <hospital-option :hospital-data="hospitalInfo"></hospital-option>
</template>

<script>
    import HospitalOption from "@/view/hospitalManagement/components/hospitalOption";
    export default {
        name: "editHospital",
      components: {HospitalOption},
      data() {
          return {
            hospitalInfo: {},
            isEdit: true
          }
      },
      created() {
          this.hospitalInfo = JSON.parse(sessionStorage.getItem('hospitalInfo'));
        this.hospitalInfo['isEdit'] = true
      }
    }
</script>

<style scoped>

</style>
