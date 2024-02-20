<template>
<div :id="id" :style="styleObject"></div>
</template>

<script>
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
            myChart.setOption({
                title:this.echartsObj.title,
                tooltip:{},
                legend:this.echartsObj.legend,
                series: this.echartsObj.series
            })
        }
    },
    mounted(){
        console.log('pie')
        this.myEcharts();
    }
}
</script>

<style>

</style>