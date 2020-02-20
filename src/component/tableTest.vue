<template>
  <div>
    <template>
      <el-table
        :data="tableAllData.tableData"
        border
        class="table-box">
        <el-table-column
          v-for="(item,index) in tableAllData.tableTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
          <template slot-scope="scope">
            <span v-show="item.option == '' || !isEdit || edit != scope.row.ID ">{{ scope.row[item.prop]}}</span>
            <div v-show="item.option == 'input' && edit == scope.row.ID && isEdit">
              <el-input  size="small" v-model="scope.row[item.prop]" style="width: 90%;"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="tableAllData.option.width"
          align="center">
          <template slot-scope="scope">
            <div v-show="edit != scope.row.ID || !isEdit">
              <el-button
                v-for="(item,index) in tableAllData.option.button"
                :key = "item.name"
                :size="item.size"
                :type="item.type"
                @click="emitIndex(scope.$index, scope.row, item.name)">{{item.name}}</el-button>
            </div>
              <div v-show="isEdit && edit == scope.row.ID">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="cancelEdit()">取消</el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="emitIndex(scope.$index, scope.row, '修改')">修改</el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: "tableTest",
    props: {
      tableAllData: { }
    },
    data() {
      return {
        isEdit: false,
        edit: '', // 只有点击了编辑操作的才有用
        saveEdit: {},// 作为编辑时的中间保留值
        showEdit: {}
      }
    },
    methods: {
      // 点击操作中的按钮进行相关操作
      /**
       * @param scopeIndex number 用于传达点击的按钮的是哪一行，第一行为0
       * @param scopeRow object 用于传达点击的那行的相关显示的数据
       * @param buttonName string 用于传达点击的按钮的名称
       * **/
      emitIndex: function (scopeIndex, scopeRow, buttonName) {
        let option = {
          scopeIndex: scopeIndex,
          scopeRow: scopeRow,
          buttonName: buttonName
        }
        this.$emit('getTableData', option)
      },

      // 点击的删除按钮
      deleteData: function (index) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.tableAllData.tableData.splice(index,1)
      },
      // 点击了编辑操作
      /**
       * @param row object 为点击按钮的那行的数据
       * showEdit 为那行数据的引用数据，当showEdit发生改变时那行数据也会改变
       * saveEdit 只是为了存那行数据的最开始没有进行操作时的值，用于用户修改又后悔选取消
       * **/
      // @param row 为点击的那行的数据
      editIndex: function (row) {
        this.showEdit = row
        this.saveEdit = JSON.parse(JSON.stringify(row))
        this.edit = row.ID
        this.isEdit = true
      },
      // 点击了编辑之后的取消按钮
      cancelEdit: function () {
        this.isEdit = false
        this.edit = ''
        // 此处是用户选择了取消，所以要将保留的值一个个传回去
        for (let item in this.saveEdit) {
          this.showEdit[item] = this.saveEdit[item]
        }
      },
      // 点击了编辑之后的修改按钮
      // 因为showEdit是指向那行数据的地址的，所以会相互影响，进而确定修改则直接传值
      handleUpdate: function () {
        this.isEdit = false
        this.edit = ''
      }
    },
    created() {
    }
  }
</script>

<style lang="scss">
  @import ".././common/scss/common.scss";
  .table-box{
    @include width-margin(100%, 100%);
    margin-top: 15px;
  }
</style>
