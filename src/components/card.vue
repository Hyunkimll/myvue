<template>
  <div>
  <el-row>
  <el-col :span="24" v-for="(o, index) in list" :key="index" :offset="0">
    <el-card tabindex="1" :body-style="{ padding: '12px' }">
      <div class="cards">
      <img :src="o.img" class="image">
        <div class="bottom clearfix">
        <span class="bt bc" @click="handle">{{o.ctitle}}</span>
        <span class="text" :title="o.cparagraph">{{o.cparagraph}}</span>
        <span class="bt" :data-lng="o.lng" :data-lat="o.lat" @click="handleClick($event)">位置:{{o.adress}}</span>
        <time class="time">{{o.date | filter_date}}</time>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>

<script>
import {list_get} from '@/api/request'
import axios from 'axios'
export default {
data() {
    return {
    };
  },
  props:["list"],
  mounted(){
  },
  methods:{
    handleClick(event){
      console.log('11',event.currentTarget.getAttribute('data-lng'))
      this.$EventBus.$emit('point',(event.currentTarget.getAttribute('data-lng')+','+event.currentTarget.getAttribute('data-lat')))
    },
    handle(){
      this.$router.push('/details')
    }
  }
}
</script>

<style scoped>
  /* .el-row{
      height: calc(100% - 114px - 16px);
      overflow-y: auto;
  }
  .box{
    width:400px;
    height: calc(100% - 64px);
    margin: 16px;
    background: #fff;
    padding: 16px;
  } */
  .el-col{
      margin-bottom: 8px;
  }
  .cards {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 32px;
    height: 32px;
    display: block;
    cursor: pointer;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .text{
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
  .bt{
    color: #409EFF;
    cursor: pointer;
  }
  .bc{
    font-weight: 600;
    font-size: 16px;
  }
  .el-card.is-always-shadow{
    box-shadow: none;
  }
  .el-card.is-always-shadow:hover{
    cursor: pointer;
    border: 1px solid #409EFF;
    box-shadow: 0 2px 2px 0 skyblue;
  }
  .el-card.is-always-shadow:focus{
    cursor: pointer;
  }
</style>