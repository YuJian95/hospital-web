<template>
  <menu-detail :is-edit="true" :menu-form="menuForm" :parent-i-d="parentID"></menu-detail>
</template>

<script>
    import MenuDetail from "@/view/userPermission/menu/component/menuDetail";
    export default {
        name: "editMenu",
      components: {MenuDetail},
      data() {
          return {
            menuForm: {},
            parentID: 0
          }
      },
      created() {
          this.menuForm = this.$route.query.menuForm
        this.parentID = this.$route.query.parentID

      }
    }
</script>

<style scoped>

</style>
