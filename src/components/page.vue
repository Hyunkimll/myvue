<template>
  <el-pagination
    layout="prev, pager, next"
    :total="total" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:["total"],
    methods:{
        handleCurrentChange(val){
            console.log(val)
            this.$emit('page',val)
        }
    }

}
</script>

<style>

</style>