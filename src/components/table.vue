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
      :width="item.width">
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