<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column v-for="(item,index) in header" :key="index"
      fixed
      :prop="item.value"
      :label="item.name"
      :width="item.width"
      :formatter="formatter">
    </el-table-column>
      <slot name="myslot">
      </slot>
  </el-table>
</div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      formatter(row,column,cellValue,index){
        row.date = this.formatting(row.date);
        console.log(row,cellValue,index,'11')
        return cellValue;
      }
    },
    props:["tableData","header","flag"],
    data() {
      return {
      }
    }
  }
</script>

<style>

</style>