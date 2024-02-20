<template>
<div :id="id" :style="styleObject">
</div>
</template>

<script>
export default {
    props:{
        id:{
            type:String
        },
        echartsObj:{
            type:Object
        },
        styleObject:{
            type:Object,
            default(){
                return {
                    width:"600px",
                    height:"400px"
                }
            }
        }
    },
    data(){
        return {

        }
    },
    methods:{
        myEcharts(){
            console.log(this.echartsObj,'1')
            var myChart = this.$echarts.init(document.getElementById(this.id));
            // 基于准备好的dom，初始化echarts实例
            myChart.setOption({
                title:this.echartsObj.title,
                grid:this.echartsObj.grid,
                tooltip:{},
                xAxis: {
                    type: "category",
                    name: this.echartsObj.xAxis.name,
                    nameTextStyle: this.echartsObj.xAxis.nameTextStyle,
                    data: this.echartsObj.xAxis.data,
                    axisLine: this.echartsObj.xAxis.axisLine,
                },
                yAxis: {
                    type: "value",
                    name: this.echartsObj.yAxis.name,
                    nameTextStyle: this.echartsObj.yAxis.nameTextStyle,
                    axisLine: this.echartsObj.yAxis.axisLine,
                    splitLine: {     
                        show: false //隐藏网格线
                    }
                },
                series: this.echartsObj.series
            })
        }
    },
    mounted(){
        this.myEcharts();
        console.log(this.echartObj,'123')
    }
}
</script>

<style>

</style>