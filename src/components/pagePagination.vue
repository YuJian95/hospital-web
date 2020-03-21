<!--分页组件-->
<template>
  <div class="pagination-container page-position">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes,prev, pager, next,jumper"
      :page-size="pageList.pageSize"
      :page-sizes="[5,10,15,20]"
      :current-page.sync="pageList.pageNum"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "pagePagination",
      props: {
          pageList: {
            pageNum: 1,
            pageSize: 5,
            total: 0
          }
      },
      methods: {
        //  切换页面的一页展示的条数
        handleSizeChange(val) {
          this.pageList.pageNum = 1;
          this.pageList.pageSize = val;
          this.$parent.fatherMethod(this.pageList.pageNum,this.pageList.pageSize)
        },
        // 切换到第几页的页面
        handleCurrentChange(val) {
          this.pageList.pageNum = val;
          this.$parent.fatherMethod(this.pageList.pageNum,this.pageList.pageSize)
        },
      }
    }
</script>

<style lang="scss">
  .page-position{
    width: auto;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
