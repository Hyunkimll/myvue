<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        currentPage:{//当前页
            type:[String,Number],
            default:1
        },
        total:{//总条数
            type:[String,Number],
            default:0
        },
        pageSizes:{//分页条数选择器
            type:Array,
            default:()=>[10,15,30,50]
        },
        pageSize:{//分页条数
            type:[String,Number],
            default:10
        }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('sizeChange',val)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$emit('currentChange',val)
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
      };
    }
}
</script>

<style>

</style>