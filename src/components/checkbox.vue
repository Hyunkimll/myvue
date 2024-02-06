<template>
  <div class="check">
    <div class="demonstration"><slot name="check"></slot></div>
    <el-checkbox-group @change="handleChange" v-model="checkboxGroup" :size="size">
      <el-checkbox-button v-for="city in citie" :label="city.area_id" :key="city.area_id">{{city.area_name}}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
    props:["citie","size","checkboxGroup1"],
    data(){
        return{
            checkboxGroup:[]
        }
    },
    mounted(){
        console.log(this.citie,'e')
    },
    methods:{
        handleChange(val){
            let val1 = val.map((item)=>{
                return item
            })
            console.log(val,'33',val1)

            this.$emit('handleChange',val1)
        }
    }
}
</script>

<style lang="less" scoped>
.check{
    display: flex;
}
.demonstration{
    margin-right: 16px;
    display: flex;
    align-items: center;
}
</style>