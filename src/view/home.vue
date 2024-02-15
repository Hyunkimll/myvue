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
    <el-empty :image-size="200" v-if="flagA"></el-empty>
        <Card v-if="!flagA" class="card" :list="list">
       </Card>
       <Page v-if="!flagA" :total="total" @page="page"></Page>
      </div>
  </div>
</template>

<script>
import Card from '../components/card.vue'
import Area from '../components/area.vue'
import Page from '../components/page.vue'
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

        },
        total:0,
        flagA:true
        }
    },
    components:{
        Area,
        Card,
        Checkbox,
        Date,
        Page
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
         this.total = res.page.total || 0;
        console.log(this.list,'-');
        if(res.data.length){
          this.flagA = false
        }else{
          this.flagA = true
        }
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
      if(val){
      this.parmas.startTime = this.formatting(val[0]);
      this.parmas.endTime = this.formatting(val[1]);
      this.listA(this.parmas)
      }else{
      this.parmas.startTime = null;
      this.parmas.endTime = null;
      this.listA(this.parmas)
      }
      
      console.log(val,"val")

    },
    handleChange(val){
      this.parmas.areaId = val;
      this.listA(this.parmas)
      console.log(val,"val1")
    },
    page(val){
      console.log(val)
      this.parmas.page_num=val
      this.listA(this.parmas)
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
    .card{
      height: calc(100% - 27.33px - 28px - 32px - 32px);
      overflow-y: auto;
    }
  }
</style>