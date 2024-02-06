<template>
<div>
    <el-page-header content="详情页面" @back="goBack"></el-page-header>
    <div class="content">
     <div style="height:600px;" class="step">
        <el-button class="stepBtn"  @click="jump('basic')" icon="el-icon-user-solid" circle=""></el-button> -基本信息 <br>
        <el-button class="stepBtn"  @click="jump('diary')" icon="el-icon-s-order" circle=""></el-button> -游记日记 <br>
        <el-button class="stepBtn"  @click="jump('photograph')" icon="el-icon-camera-solid" circle=""></el-button> -拍照攻略 <br>
        <el-button class="stepBtn"  @click="jump('photoalbum')" icon="el-icon-picture" circle=""></el-button> -相册 <br>
        <el-button class="stepBtn"  @click="jump('comment')" icon="el-icon-s-promotion" circle=""></el-button> -评论 <br>
     </div>
    <div class="bottom">
    <div id="basic">
    <div class="basicA">基本信息</div>
    <el-card shadow="hover">
    <el-descriptions class="margin-top"  :column="3" size="medium" border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{basic.username}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-postcard"></i>
        标题
      </template>
      {{basic.ctitle}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        地址
      </template>
      {{basic.adress}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        时间
      </template>
      {{basic.data}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        主旨
      </template>
      {{basic.cparagraph}}
    </el-descriptions-item>
    </el-descriptions>
    </el-card>
    </div>
    <div id="diary">
    <div class="basicA">游记日记</div>
    <el-card shadow="hover">
        <div class="block">
  <el-timeline>
    <el-timeline-item v-for="(item,index) in diary" :key="index" :timestamp="item.data" placement="top">
      <el-card>
        <h4>{{item.cparagraph}}</h4>
        <p>{{item.data}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
    </el-card>
    </div>
    <div id="photograph">
    <div class="basicA">拍照攻略</div>
    <el-card shadow="hover">
        <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item v-for="(item,index) in photograph" :key="index" :title="item.ctitle" :name="index">
    <div>{{item.cparagraph}}</div>
  </el-collapse-item>
</el-collapse>
    </el-card>
    </div>
    <div id="photoalbum">
    <div class="basicA">相册</div>
    <el-card shadow="hover">
        <div class="demo-image__lazy">
  <el-image v-for="(url,index) in photoalbum" :key="index" :src="url.img" lazy></el-image>
</div>
    </el-card>
    </div>
    <div id="comment">
    <div class="basicA">评论<span v-if="total > 0">（{{total}}条）</span></div>
    <el-card shadow="hover">
      <comment :comments="comment"></comment>
    </el-card>
    </div>
    </div>
    </div>
</div>
</template>

<script>
import {details_get,comment_get} from '@/api/request'
import comment from '../components/comment.vue'
import axios from 'axios'
export default {
    data() {
      return {
        basic:{},
        diary:[],
        photograph:[],
        photoalbum:[],
        activeNames: ['1'],
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
        comment:[],
        total:'',
      };
    },
    components:{
      comment
    },
    mounted(){
      details_get({id:100}).then(res=>{
        console.log(res)
      if(res&&res.data&&res.data.code===200){
        this.basic = res.data.basic || {};
        this.diary = res.data.diary || [];
        this.photograph = res.data.photograph || [];
        this.photoalbum = res.data.photoalbum || [];
      }else{
        this.basic = {};
        this.diary = [];
        this.photograph = [];
        this.photoalbum = []
      }
      }).catch(err=>{
        this.basic = {};
        this.diary = [];
        this.photograph = [];
        this.photoalbum = []
      })
      comment_get({id:100}).then(res =>{
        console.log(res,'111')
        if(res&&res.data&&res.data.code===200){
          this.comment = res.data.list || [];
          this.total = res.data.total || 0
        }else{
          this.comment = []
          this.total = 0
        }
      }).catch(err =>{
          this.comment = []
          this.total = 0
      })
    },
methods:{
    handleChange(val) {
        console.log(val);
      },
      goBack(){
        this.$router.push('/')
      },
        jump(domId){
            // 当前窗口正中心位置到指定dom位置的距离

            //页面滚动了的距离-
            var dom1 = document.getElementsByClassName('content')[0];

            let height = dom1.scrollTop; 
            
            //指定dom到页面顶端的距离
            let dom = document.getElementById(domId);
            let domHeight = dom.offsetTop;
            
            //滚动距离计算
            var S = Number(height) - Number(domHeight);
            console.log(height,domHeight,S)

            //判断上滚还是下滚
            if(S<0){
                //下滚
                S = Math.abs(S);
                dom1.scrollBy({ top: S, behavior: "smooth" });
            }else if(S==0){
                //不滚
                dom1.scrollBy({ top: 0, behavior: "smooth" });
            }else{
                //上滚
                S = -S
                dom1.scrollBy({ top: S, behavior: "smooth" });
            }
        }
    }


}
</script>

<style lang="less" scoped>
.el-page-header{
    position: fixed;
    width: 100%;
    z-index: 1;
    background: darkgray;
}
.content{
    display: flex;
    position: absolute;
    top: 24px;
    width: 100%;
    height: calc(100% - 24px);
    overflow-y: auto;
}
.step{
    font-family: "Helvetica Neue";
    position: fixed;
    padding: 16px;
}
.stepBtn{
    margin-bottom: 15px;
}
.bottom{
    position: absolute;
    left: 128px;
    padding: 0px 16px 16px 0px;
    width: calc(100% - 144px);
}
#basic,#diary,#photograph,#photoalbum,#comment{
  width: 100%;
}
.basicA{
    height: 48px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    border-bottom: 3px solid gray;
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 16px;
}
.el-image{
  margin-right: 8px;
}
</style>