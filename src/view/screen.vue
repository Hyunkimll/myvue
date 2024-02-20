<template>
  <div id="all">
    <div class="left">
      <div class="box first">
      <div class="bt">
        <p>城市发布条数</p>
      </div>
      <div class="content">
      <MyLine v-if="flag" id="bar" :echartsObj="echartObj1" :styleObject="styleObject"></MyLine>
      </div>
    </div>
    <div class="box">
      <div class="bt">
        <p>{{new Date().getFullYear()}}发布文章</p>
      </div>
      <div class="content">
      <MyLine v-if="flag" id="line" :echartsObj="echartObj2" :styleObject="styleObject"></MyLine>
      </div>
    </div>
    </div>
    <div class="center">
      <div class="box">
      <div class="bt">
        <p>省份总文章数</p>
      </div>
      <div class="content">
      <MyMap v-if="flag" id="map" :styleObject="styleObject" :echartsObj="echartObj5"></MyMap>
      </div>
    </div>
    </div>
    <div class="left">
      <div class="box first">
      <div class="bt">
        <p>今日TOP7</p>
      </div>
      <div class="content">
      <MyTop id="top"  v-if="flag" :echartsObj="echartObj4" :styleObject="styleObject"></MyTop>
      </div>
    </div>
    <div class="box">
      <div class="bt">
        <p>城市使用比列</p>
      </div>
      <div class="content">
      <MyPie v-if="flag" id="pie" :echartsObj="echartObj3" :styleObject="styleObject"></MyPie>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
const MyLine = () => import('../components/line.vue')
const MyPie = () => import('../components/pie.vue')
const MyTop = () => import('../components/top.vue')
const MyMap = () => import('../components/map.vue')
import {screen_get} from '@/api/request'
export default {
    data(){
        return{
          flag:false,
          styleObject:{
            height: "100%",
            width: "100%"
          },
        echartObj1: {
        title: {
          show:false,
          text: '安全'
        },
        tooltip: {},
        grid: {
          top:'48px',
          right: '56px',
          left: '16px',
          bottom: '16px',
          containLabel:true //自适应
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine:{
		          lineStyle:{
		            color:'#000',
		            width:1
		          }
           },
          name: "年",
          nameTextStyle :{
					  fontSize: 10
				  }
        },
        yAxis: {
          name: '文章数',
          nameTextStyle :{
					  fontSize: 10
				  },
          axisLine:{
		          lineStyle:{
                color:'#000',
		            width:1
		          }
		       }
        },
        series: [
          {
            name: '文章数',
            type: 'bar',
            color: '#1492FF',
            barWidth: 15,
            stack: 'one',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      },
      echartObj2: {
        title: {
          show:false,
          text: '安全1'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top:'48px',
          right: '56px',
          left: '16px',
          bottom: '16px',
          containLabel:true //自适应
        },
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine:{
		          lineStyle:{
		            color:'#000',
		            width:1
		          }
           },
          name: `${new Date().getFullYear()}年`,
          nameTextStyle :{
					  fontSize: 10
				  },
        },
        yAxis: {
          name: '总数',
          nameTextStyle :{
					  fontSize: 10
				  },
          axisLine:{
		          lineStyle:{
                color:'#000',
		            width:1
		          }
		       }
        },
        series: [
          {
            name: '高危',
            type: 'line',
            stack: 'Total',
            data: [1, 1, 0, 0, 0, 0,0,0,0,0,0,0]
          },
          {
            name: '危险',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 0, 0,0,0,0,0,0,1]
          },
          {
            name: '低危',
            type: 'line',
            stack: 'Total',
            data: [0, 2, 0, 0, 0, 0,0,0,0,0,0,0]
          }
        ]
      },
      echartObj3:{
    legend: {
        // 图例
        data: ["江苏", "浙江", "山东", "广东", "湖南"],
        bottom: '5%',
        left: 'center'
    },
    title: {
        // 设置饼图标题，位置设为顶部居中
        show:false,
        text: "国内院士前五省份图示",
        top: "0%",
        left: "center"
    },
    series: [
        {
            type: "pie",
            label: {
                show: true,
                formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "30%", //饼图半径
            data: [
                {
                    value: 463,
                    name: "江苏"
                },
                {
                    value: 395,
                    name: "浙江"
                },
                {
                    value: 157,
                    name: "山东"
                },
                {
                    value: 149,
                    name: "广东"
                },
                {
                    value: 147,
                    name: "湖南"
                }
            ]
        }
    ]
},
echartObj4:{
  ydata : ['上海', '北京', '深圳', '天津', '河南', '新疆', '澳门'],
  xdata : [12, 13, 14, 15, 16, 17, 19]
}
    }
    },
    components:{
        MyLine,
        MyPie,
        MyTop,
        MyMap
    },
    mounted(){
      screen_get({beginTime:this.formatting(new Date(new Date().setHours(0, 0, 0, 0))),overTime:this.formatting(new Date(new Date().setHours(23, 59, 59, 59))),endTime:this.formatting(new Date()),startTime:this.formatting(new Date().setFullYear(new Date().getFullYear() -1))}).then(res=>{
        if(res&&res.code === 200){
          var xAxis = res.adresscount.map((item)=> item.adress);
          var series = res.adresscount.map((item)=> item.adress_count);
          var data = res.adresscount.map((item)=> {
            return {
              value:item.adress_count,
              name:item.adress
            }
          });
          var ydata = res.time.map((item)=> item.adress);
          var xdata = res.time.map((item)=> item.adress_count);
          var seriesA = []
          var color = ["#CC0000","#FF0000","#CC6699","#00CC33"]
          res.adresstime.forEach((item,index)=>{
            let _acData = seriesA.findIndex(x => x.name == item.adress);
            console.log(_acData)
            var arr = new Array(12).fill(0);
            if(_acData !== -1){
              seriesA[_acData].data[item.monthA - 1] = item.adress_count
            }else{
              arr[item.monthA - 1] = item.adress_count
              seriesA.push({
                name: item.adress,
                type: 'line',
                color: color[index] ? color[index] : color[0],
                barWidth: 15,
                stack: 'one',
                data: arr
              })
            }
            // seriesA.forEach((item1)=>{
            // if(item1.indexOf(item.adress) !== -1){
            // }else{
            //   arr[item.monthA - 1] = item.adress_count
            //   seriesA.push({
            //     name: item.adress,
            //     type: 'line',
            //     color: '#CC0000',
            //     barWidth: 15,
            //     stack: 'one',
            //     data: arr
            //   })
            // }
            // })
          })
          console.log('seriesA',seriesA)

          this.echartObj1.xAxis.data = xAxis
          this.echartObj1.series[0].data = series

          this.echartObj2.series = seriesA

          this.echartObj3.series[0].data = data
          this.echartObj3.legend.data = xAxis

          this.echartObj4.xdata = xdata.slice(0,7)
          this.echartObj4.ydata = ydata.slice(0,7)

          this.echartObj5 = data

          this.flag = true
          console.log(this.echartObj1,'echartObj1',xAxis,series,data,ydata,xdata)

        }
    }).catch(err=>{
    })
    }
}
</script>

<style lang="less" scoped>
#all{
  height: calc(100% - 32px);
  overflow-y: auto;
  padding: 16px;
  background: gainsboro;
  display: flex;
  .left{
    height: 100%;
    width: 400px;
  }
  .first{
    margin-bottom: 16px;
  }
  .box{
    width: 400px;
    height: calc(50% - 8px);
    background: #fff;
    border-radius: 3px;
    .bt{
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 16px;
      border-bottom: 1px solid gainsboro;
      font-size: 18px;
      font-weight: bold;
    }
    .content{
      height: calc(100% - 48px);
      width: 100%;
    }
  }
  .center{
    height: 100%;
    flex: 1;
    .box{
      height: 100%;
      width: calc(100% - 32px);
      margin: 0px 16px;
    }
  }
}
</style>