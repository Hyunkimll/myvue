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
      {{basic.uid}}
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
      {{basic.area_name}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        时间
      </template>
      {{basic.date | filter_date}}
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
    <el-empty :image-size="200" v-if="flagA"></el-empty>
    <el-card shadow="hover">
        <div class="block">
  <el-timeline>
    <el-timeline-item v-for="(item,index) in diary" :key="index" :timestamp="formatting(item.data)" placement="top">
      <el-card>
        <h4>{{item.cparagraph}}</h4>
        <p>{{item.data | filter_date}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
    </el-card>
    </div>
    <div id="photograph">
    <div class="basicA">拍照攻略</div>
    <el-empty :image-size="200" v-if="flagB"></el-empty>
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
    <el-empty :image-size="200" v-if="flagC"></el-empty>
    <el-card shadow="hover">
        <div class="demo-image__lazy">
  <el-image v-for="(url,index) in photoalbum" :key="index" :src="url.img || ''" lazy></el-image>
</div>
    </el-card>
    </div>
    <div id="comment">
    <div class="basicA">评论<span v-if="total > 0">（{{total}}条）</span></div>
    <el-empty :image-size="200" v-if="flagD" description="暂时评论"></el-empty>

    <el-card shadow="hover">
      <comment :comments="comment" v-if="flag" @likenum="likenum" @content="content"></comment>
    </el-card>
    </div>
    </div>
    </div>
</div>
</template>

<script>
import {details_get,comment_get,like_post,notlike_post,content_post,Replycontent_post} from '@/api/request'
import comment from '../components/comment.vue'
import axios from 'axios'
export default {
    data() {
      return {
        flagA:true,
        flagB:true,
        flagC:true,
        flagD:true,

        basic:{},
        diary:[],
        photograph:[],
        photoalbum:[],
        activeNames: ['1'],
        flag:false,
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
      details_get({id:this.$route.query.id,uid:this.$route.query.uid}).then(res=>{
        console.log(res)
      if(res&&res.code===200){
        this.basic = res.basic || {};
        this.diary = res.diary || [];
        this.photograph = res.photograph || [];
        this.photoalbum = res.photoalbum || [];
        if(!res.diary.length){
        this.flagA = true
      }else{
        this.flagA = false
      }
      if(!res.photograph.length){
        this.flagB = true
      }else{
        this.flagB = false
      }if(!res.photoalbum.length){
        this.flagC = true
      }else{
        this.flagC = false
      }
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
      
      console.log(this.flagA,'flagA')
      this.commentA({id:this.$route.query.id,uid:this.$route.query.uid});
    },
methods:{
  commentA(params){
    console.log('hhh')
    comment_get(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
          this.flag = true;
          this.comment = res.comment || [];
          this.total =  0
          if(!res.comment.length){
        this.flagD = true;
      }else{
        this.flagD = false;
      }
        }else{
          this.comment = []
          this.total = 0
        }
      }).catch(err =>{
          this.comment = []
          this.total = 0
      })
      
  },
    handleChange(val) {
        console.log(val);
      },
      likenum(item){
        console.log(item);
        if (item.isLike === null) {
          console.log(1)
            Vue.$set(item, "isLike", true);
            item.likeNum++;
            this.likenumpost({uid:item.uid,ownerId:item.ownerId,fromId:item.fromId})
        } else {
          if (item.isLike) {
            item.likeNum--
        this.notlike({uid:item.uid,ownerId:item.ownerId,fromId:item.fromId})
          } else {
            item.likeNum++
        this.likenumpost({uid:item.uid,ownerId:item.ownerId,fromId:item.fromId})
          }
          item.isLike = !item.isLike;
        }
      },
      likenumpost(params){
        console.log(params)
      like_post(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
        }else{
        }
      }).catch(err =>{
      })
      },
       notlike(params){
        console.log(params)
      notlike_post(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
        }else{
        }
      }).catch(err =>{
        console.log(err,1)
      })
      },
      content(val){
        console.log(val,111)
        console.log(this.formatting(new Date()))
        if(!val.inputComment || val.inputComment.length > 200){
          return this.$message({
          message: '评论内容不为空&不大于200字符',
          type: 'warning'
        });
        }
        var params = {
          date:this.formatting(new Date()),
          content:val.inputComment,
          uid:this.$route.query.uid,
          fromName:"小Q",
          fromAvatar:"",
          fromId:new Date().getTime() + Math.random().toString(36).substr(2)
        }
        if(val.input === 1){
          params.commentId = val.data.commentId;
          params.toName = val.data.fromName;
          params.buid = val.data.fromId;
          params.toId = val.data.toId;
          params.ownerId = undefined;
         Replycontent_post(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
         this.commentA({id:this.$route.query.id,uid:this.$route.query.uid});
         this.flag = false
        }else{

        }
      }).catch(err =>{

        this.$message({
          message: '接口报错',
          type: 'warning'
      })

      })
        }else if(val.input === 2){
          params.commentId = val.data.ownerId;
          params.toName = val.data.fromName;
          params.buid = val.data.fromId;
          params.toId = val.data.fromId;
          params.ownerId = undefined;
          console.log(params)
           Replycontent_post(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
         this.commentA({id:this.$route.query.id,uid:this.$route.query.uid});
         this.flag = false
        }else{

        }
      }).catch(err =>{

        this.$message({
          message: '接口报错',
          type: 'warning'
      })

      })
        }else if(val.input === 3){
          params.ownerId = this.$route.query.id;
          params.commentId = undefined;
          params.toName = undefined;
          params.buid = undefined;
          params.toId = undefined;
            content_post(params).then(res =>{
        console.log(res,'111')
        if(res&&res.code===200){
         this.commentA({id:this.$route.query.id,uid:this.$route.query.uid});
         this.flag = false
        }else{

        }
      }).catch(err =>{

        this.$message({
          message: '接口报错',
          type: 'warning'
      })
        
      })
        }

      
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