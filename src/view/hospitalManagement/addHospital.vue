<template>
  <hospital-option :hospital-data="hospitalData"></hospital-option>
</template>

<script>
    import HospitalOption from "@/view/hospitalManagement/components/hospitalOption";
    export default {
        name: "addHospital",
      components: {HospitalOption},
      data() {
          return {
            hospitalData: {
              name: '',
              address: '',
              phone: '',
              description: '',
              picture: '',
              isEdit: false
            }
          }
      },
      methods: {

      },
      /*created() {
          this.status = this.$route.query.status
      },
      computed: {

      },
      filters: {
        option: function (status) {
          if (status == 'add') {
            return '添加'
          }
          return '编辑'
        }
      }*/
    }
</script>

<style scoped lang="scss">
</style>
