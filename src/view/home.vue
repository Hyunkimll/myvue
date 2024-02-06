<template>
  <div style="height:100%;position: relative;">
      <div style="height:100%">
      <Area></Area>
      </div>
      <div class="box"  style="position: absolute;top: 0;left: 0;">
        <div style="margin-bottom: 16px;display: flex;align-items: center;">
        <checkbox @handleChange="handleChange" :citie="cities" size="mini" :checkboxGroup1="checkboxGroup">
        <template slot="check">位置</template>
        </checkbox>
        </div>
        <div style="margin-bottom: 16px;display: flex;align-items: center;">
        <Date @pick="pick1">
        <template slot="date">时间</template>
        </Date>
         </div>
        <Card :list="list">
       </Card>
      </div>
  </div>
</template>

<script>
import Card from '../components/card.vue'
import Area from '../components/area.vue'
import Checkbox from '../components/checkbox.vue'
import Date from '../components/Date.vue'
import {list_get,check_get} from '@/api/request'
import axios from 'axios'
export default {
    data(){
        return{
          list:[],
          checkboxGroup:[],
          cities:[],
          parmas:{

        }
        }
    },
    components:{
        Area,
        Card,
        Checkbox,
        Date
    },
    mounted(){
      this.parmas.uid=39
      this.parmas.page_num=1
      this.parmas.page_size=10
      this.listA(this.parmas)
      check_get({uid:39}).then(res=>{
      if(res&&res.data&&res.code===200){
         this.cities = res.data || [];
        console.log(this.cities,'-');
      }else{
        this.cities = []
      }
    }).catch(err=>{
      console.log(err)
      this.cities = []
    })
    },
    methods:{
      listA(parmas){
        list_get(parmas).then(res=>{
      if(res&&res.data&&res.code===200){
         this.list = res.data || [];
        console.log(this.list,'-');
        this.$EventBus.$emit('content',this.list)
      }else{
        this.list = []
      }
    }).catch(err=>{
      console.log(err)
      this.list = []
    })
      },
    pick1(val){
      console.log(val,"val")
    },
    handleChange(val){
      this.parmas.areaId = val;
      this.listA(this.parmas)
      console.log(val,"val1")
    }
    }
}
</script>

<style lang="less" scoped>
.box{
    width:440px;
    height: calc(100% - 64px);
    margin: 16px;
    background: #fff;
    padding: 16px;
  }
</style>