<template>
<div :id="id" :style="styleObject"></div>
</template>

<script>
import 'echarts4/map/js/china.js'
export default {
props:{
        id:{
            type:String
        },
        styleObject:{
            type:Object,
            default(){
                return {width:"600px",height:"400px"}
            }
        },
        echartsObj:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {

        }
    },
    methods:{
        myEcharts(){
            var myChart = this.$echarts.init(document.getElementById(this.id));
            // 基于准备好的dom，初始化echarts实例
             const option = {
    //数据映射
    visualMap: {
      type: "piecewise", //分段标签
      min: 0, //最小值
      max: 50, //最大值，不设置为无限大
      right: 30, //距离右侧位置
      bottom: 30, //距离底部位置
      orient: "vertical", //组件竖直放置
      align: "left", //色块在左
      textGap: 14, //文字主体之间的距离
      itemSymbol: "circle", //右下角映射组件使用圆点形状
      show: true,
      seriesIndex: 0, //指定取哪个系列的数据(series.data)，若不设置则会影响图上标点颜色设置。
      //一以下是分段式视觉映射组件的每一段的范围
      //gt：大于、gte：大于等于、lt：小于、lte：小于等于。
      pieces: [
        {
          gt: 5,
          label: "5个以上",
          color: "#1492FF",
        },
        {
          gte: 2,
          lte: 5,
          label: "2-5个",
          color: "#59AAF5",
        },
        {
          gte: 1,
          lt: 2,
          label: "1-2个",
          color: "skyblue",
        },
        {
          gte: 0,
          lt: 0,
          label: "0个",
          color: "#99CBF9",
        }
      ],
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.4)", // 提示框浮层的背景颜色。
      axisPointer: {
        // 坐标轴指示器配置项。
        type: "shadow", // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
        axis: "auto", // 指示器的坐标轴。
        snap: true, // 坐标轴指示器是否自动吸附到点上
      },
      textStyle: {
        // 提示框浮层的文本样式。
        color: "#41feff",
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "sans-serif",
        fontSize: 14,
      },
      padding: 0, // 提示框浮层内边距，
      formatter: function (params) {
        let showname = params;
        console.log('params',params)
        return `
                <div>
                    <p  style="line-height: 30px; padding: 10px;">${params.name}:${
                      showname.value || "0"
                    }人</p>
              </div>
              `;
      },
    },
    geo: {
      map: "china", //这里的名称需要和china.js: echarts.registerMap('china',{})中的名称一致
      label: { show: true, color: "#fff", fontSize: 10 }, //显示省份
      roam: false, //缩放
      itemStyle: {
        areaColor: "#99CBF9", //地图区域的颜色(没有数据时会按照这个颜色显示)
        borderColor: "#fff", //地图区域的边框
        borderWidth: 0.6,
      },
      emphasis: {
        //高亮的显示设置
        label: {
          color: "#fff",
        },
        itemStyle: {
          areaColor: "#9DE3FF",
        },
      },
      select: {
        //选中显示设置
        label: {
          color: "#fff",
        },
        itemStyle: {
          areaColor: "#9DE3FF",
        },
      },
    },
    series: [
      {
        type: "map",
        geoIndex: 0,
        data:this.echartsObj
      },
    ], //地图上二开点线特效数组，按需添加
  };
  myChart.setOption(option);
        }
    },
    mounted(){
        console.log('pie',11)
        this.myEcharts();
    }
}
</script>

<style>

</style>