<template>
<div class="all">
    <div class="top">
      <div style="margin-bottom: 16px;display: flex;align-items: center;justify-content: space-between;">
        <checkbox @handleChange="handleChange" :citie="cities" size="mini" :checkboxGroup1="checkboxGroup">
        <template slot="check">位置</template>
        </checkbox>
        <Date @pick="pick1">
        <template slot="date">时间</template>
        </Date>
        </div>
        
    </div>
  <div class="bottom">
  <Piazza :header="header" :tableData="tableData">
    <template slot="myslot">
        <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
      </template>
    </el-table-column>
    </template>
  </Piazza>  
  <pagination :currentPage="page.pagenum" :total="page.total" 
  :pageSize="page.pageSizes" v-if="flag"
  @sizeChange ="sizeChange1" @currentChange ="currentChange1"
  >
  </pagination>
  </div>

</div>

</template>

<script>
import {list_get,check_get} from '@/api/request'
import axios from 'axios'
import Piazza from '../components/table.vue'
import pagination from '../components/pagination.vue'
import Checkbox from '../components/checkbox.vue'
import Date from '../components/Date.vue'
export default {
    data(){
        return{
            flag:true,
            header:[{
                name:'标题',
                value:'ctitle',
                width:''
            },
            {
                name:'主旨',
                value:'cparagraph',
                width:''
            },
            {
                name:'地址',
                value:'area_name',
                width:''
            },
            {
                name:'时间',
                value:'date',
                width:''
            }],
            tableData:[],
        page:{
          pageSizes:10,
          pagenum:1,
          total:0
        },
        parmas:{

        },
        cities:[],
        checkboxGroup:[]
        }
    },
    methods: {
      handleChange(val){
      this.parmas.areaId = val;
        this.parmas.page_size = 10;
        this.parmas.page_num = 1;
      this.list(this.parmas)
      console.log(val,"val1")
     },
      handleClick(row) {
        console.log(row);
        this.$router.push({path:'/page/details',query:{id:row.id,uid:row.uid}})
      },
      sizeChange1(val){
        this.parmas.page_size = val
        this.list(this.parmas);
        console.log(val,'1')
      },
      currentChange1(val){
        this.parmas.page_num = val
        this.list(this.parmas);
        
        console.log(val,'2')
      },
      list(parmas){
        console.log(222)
        list_get(parmas).then(res=>{
      if(res&&res.data&&res.code===200){
        this.tableData = res.data || [];
        this.page = res.page || {}
        console.log(res,'--');
      }else{
        this.tableData = []
      }
    }).catch(err=>{
      console.log(err)
      this.tableData = []
    })
      },
      pick1(val){
      if(val){
      this.parmas.startTime = this.formatting(val[0]);
      this.parmas.endTime = this.formatting(val[1]);
      this.parmas.page_size = 10;
        this.parmas.page_num = 1;
      this.list(this.parmas)
      }else{
        this.parmas.page_size = 10;
        this.parmas.page_num = 1;
      this.parmas.startTime = null;
      this.parmas.endTime = null;
      this.list(this.parmas)
      }
      
      console.log(val,"val")

    },
    },
    components:{
        Piazza,
        pagination,
        Checkbox,
        Date
    },
    mounted(){
        this.parmas.page_num = 1;
        this.parmas.page_size = 10;
        this.list(this.parmas);
       check_get().then(res=>{
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
    //     list_get({page_num:1,page_size:10}).then(res=>{
    //   if(res&&res.data&&res.code===200){
    //     this.tableData = res.data || [];
    //     this.page = res.page || {}
    //     console.log(res,'--');
    //   }else{
    //     this.tableData = []
    //   }
    // }).catch(err=>{
    //   console.log(err)
    //   this.tableData = []
    // })
    }
}
</script>

<style lang="less" scoped>
.all{
    height: calc(100% - 32px);
    overflow-y: auto;
    padding: 16px;
    background: gainsboro;
}
.top{
    background: #fff;
    border-radius: 3px;
    padding: 16px 16px 0px 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
}
.el-table{
    border-radius: 3px;
}
</style>