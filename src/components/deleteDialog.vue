<!--作为删除操作时打开的一次确认弹框-->
<template>
  <el-dialog :title="'删除' + dialog.title" :visible.sync="dialog.dialogFormVisible" width="30%"  @close="cancelModal">
    <span>是否删除编号为{{dialog.id}}的数据？</span>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelModal">取 消</el-button>
      <el-button type="primary" @click="deleteData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "deleteDialog",
      props: {
          dialog: {
            title: '',
            dialogFormVisible: false,
            id: ''
          }
      },
      data() {
          return {

          }
      },
      methods: {
        // 点击关闭取消模态框
        cancelModal: function (e) {
          this.dialog.dialogFormVisible = false;
        },
        // 确认删除数据
        deleteData: function () {
          this.$parent.deleteData()
        }
      }
    }
</script>

<style scoped>

</style>
