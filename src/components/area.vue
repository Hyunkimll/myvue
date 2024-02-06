<template>
  <div class="projectmap">
    <!--一定要加ref,才能在下面引用到，并且ref的内容必须为“allmap”-->
    <div id="allmap" ref="allmap"></div>
  </div>
</template>

<script>
import {MP} from '../map'
export default {
    data(){
        return{
          point:[],
          msg:''
        }
    },
    methods:{
        initMap () {
      console.log("开始加载地图...")
       var apoint = '';
        let map = new BMap.Map(this.$refs.allmap)// 创建Map实例
        const a = this.$EventBus.$on('point',(msg)=>{
        this.msg = msg;
        apoint = new BMap.Point(msg.split(',')[0], msg.split(',')[1]);
        map.centerAndZoom(apoint, 15)
        console.log(msg,'[[[')
       })
       console.log(a,'hhhh')
       if(!this.msg){
        apoint = new BMap.Point(this.point[0].lng, this.point[0].lat);
       }
       console.log(apoint,'qq')
        map.centerAndZoom(apoint, 15)
        map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
        console.log(this.point,'---')
        var preMarker = '';
        var myIcon1 = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                        offset: new BMap.Size(10, 25), // 指定定位位置
                        imageOffset: new BMap.Size(0, 0 - 12 * 25) // 设置图片偏移使用左侧的图片
                      //  imageOffset: new BMap.Size(-20, 0 - 10 * 25) // 设置图片偏移使用右侧的图片0-x*25代表使用第x+1张图片
                    });
                    var myIcon2 = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                        offset: new BMap.Size(10, 25), // 指定定位位置
                        imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移使用左侧的图片
                      //  imageOffset: new BMap.Size(-20, 0 - 10 * 25) // 设置图片偏移使用右侧的图片0-x*25代表使用第x+1张图片
                    });
                    var opts = {
                      width:250,
                      height:100,
                      title:"信息详情"
                    }
        this.point.forEach((item)=>{
          const bpoint = new BMap.Point(item.lng,item.lat);
          const marker = new BMap.Marker(bpoint,{icon:myIcon2});
          map.addOverlay(marker)
          var content = `<div><p>${item.ctitle}</p><p class='text'>${item.cparagraph}</p><p>${item.date}</p></div>`
          var infoWindow = new BMap.InfoWindow(content,opts)
          console.log(item)
          marker.addEventListener("click", function(e){   //点击事件  
          var allOverlay = map.getOverlays();
          if(e.currentTarget){
            if(preMarker){
              preMarker.setIcon(myIcon2)
            }
              e.currentTarget.setIcon(myIcon1)
              preMarker = e.currentTarget;
          }
          map.openInfoWindow(infoWindow,bpoint)
          console.log(e.currentTarget,'--',preMarker)
        //   allOverlay.map(item => {
        //   if(item.da === e.target.da) {
        //     map.removeOverlay(item);
        // }
        //   })

        // var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        //                 offset: new BMap.Size(10, 25), // 指定定位位置
        //                 imageOffset: new BMap.Size(0, 0 - 12 * 25) // 设置图片偏移使用左侧的图片
        //               //  imageOffset: new BMap.Size(-20, 0 - 10 * 25) // 设置图片偏移使用右侧的图片0-x*25代表使用第x+1张图片
        //             });
        // var marker=new BMap.Marker(e.point,{icon:myIcon});
        // map.addOverlay(marker);
});
        })
    }
    },
    mounted(){
      const $this = this;
      async function fn(){
        console.log(1)
        await fn2();
        fn3()
      }
      function fn2(){
        return new Promise((resolve,reject)=>{
          $this.$EventBus.$on('content',(msg)=>{
          console.log(3)
          $this.point = msg;
          resolve()
         })
        })
         
      }
      function fn3(){
        console.log(2)
        console.log($this.point)
          $this.initMap();
      }
      fn()
    }
}
</script>

<style lang="less" scoped>
  .projectmap{
    height: 100%;
    margin: 0px;
    padding: 0px
  }
  #allmap {
    width: 100%;
    height: 100%;
  }
  /deep/.text{
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
  /deep/.BMap_cpyCtrl{
    display: none;
  }
</style>