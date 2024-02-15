<template>
<div class="date">
  <div class="demonstration"><slot name="date" class="demonstration"></slot></div>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right" @change="handleStartChange" size="mini">
    </el-date-picker>
 </div> 
</template>

<script>
export default {
data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value:''
      };
    },
    methods:{
        handleStartChange(val){
          console.log(val)
            this.$emit('pick',val)
        }
    }
}
</script>

<style lang="less" scoped>
.date{
    display: flex;
}
.demonstration{
    margin-right: 16px;
    display: flex;
    align-items: center;
}
</style>